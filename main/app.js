$(document).ready(function() {
    // --- Configuration & State ---
    const scenes = ['welcome', 'lights', 'party', 'memories', 'game', 'gift', 'cake', 'card'];
    let currentSceneIndex = 0;
    let audioContext = null;
    let analyser = null;
    let microphone = null;
    let audioSource = null;
    let isMusicPlaying = false;
    let score = 0;
    const targetScore = 5;
    let hasKey = false;
    
    // --- Initialization ---
    function init() {
        // Simulate loading
        setTimeout(() => {
            $('#loading-screen').css('opacity', 0);
            setTimeout(() => {
                $('#loading-screen').remove();
                $('#main-container').removeClass('hidden');
                updateScene(0);
            }, 500);
        }, 2000);

        setupEventListeners();
        setupVisualizer();
    }

    // --- Event Listeners ---
    function setupEventListeners() {
        // Global
        $('#btn-audio-toggle').click(toggleAudio);

        // Scene 1: Welcome
        $('#btn-enter').click(() => changeScene('lights'));

        // Scene 2: Lights
        $('#btn-light-switch').click(function() {
            $(this).toggleClass('on');
            if ($(this).hasClass('on')) {
                $('.dark-overlay').css('opacity', 0.2);
                setTimeout(() => {
                    changeScene('party');
                    $('.dark-overlay').remove(); // Cleanup
                }, 1000);
            }
        });

        // Scene 3: Party
        $('#btn-play-music').click(function() {
            playMusic();
            $('.record').addClass('playing');
            $(this).html('<i class="fas fa-pause"></i> Party On!');
            setTimeout(() => changeScene('memories'), 5000); // Auto advance after 5s of partying
        });

        // Scene 4: Memories
        let currentPhoto = 0;
        const photos = $('.photo-card');
        
        $('#next-photo').click(() => {
            $(photos[currentPhoto]).removeClass('active').css('transform', 'rotateY(-90deg)');
            currentPhoto = (currentPhoto + 1) % photos.length;
            $(photos[currentPhoto]).addClass('active').css('transform', 'rotateY(0deg)');
        });

        $('#prev-photo').click(() => {
            $(photos[currentPhoto]).removeClass('active').css('transform', 'rotateY(90deg)');
            currentPhoto = (currentPhoto - 1 + photos.length) % photos.length;
            $(photos[currentPhoto]).addClass('active').css('transform', 'rotateY(0deg)');
        });

        $('#btn-continue-memories').click(() => changeScene('game'));

        // Scene 5: Game (Balloons generated dynamically)
        
        // Scene 6: Gift
        $('#gift-box').click(function() {
            if (hasKey) {
                $(this).addClass('opened');
                launchConfetti();
                setTimeout(() => changeScene('cake'), 2000);
            } else {
                alert("You need a key to open this! Complete the balloon game.");
            }
        });

        // Scene 7: Cake
        $('#flame').click(blowOutCandle); // Fallback click

        // Scene 8: Card
        $('.card').click(function() {
            $(this).toggleClass('open');
            if ($(this).hasClass('open')) {
                launchConfetti();
            }
        });

        $('#btn-replay').click(() => location.reload());
    }

    // --- Scene Management ---
    function changeScene(sceneName) {
        const targetIndex = scenes.indexOf(sceneName);
        if (targetIndex !== -1) {
            updateScene(targetIndex);
        }
    }

    function updateScene(index) {
        // Hide current
        $('.scene').removeClass('active');
        
        // Show next with delay for transition
        setTimeout(() => {
            $(`#scene-${scenes[index]}`).addClass('active');
            
            // Scene specific init
            if (scenes[index] === 'game') initGame();
            if (scenes[index] === 'cake') initMicrophone();
        }, 500);
        
        currentSceneIndex = index;
    }

    // --- Audio & Visualizer ---
    function playMusic() {
        const audio = document.getElementById('bg-music');
        if (audio.paused) {
            audio.play().then(() => {
                isMusicPlaying = true;
                startVisualizer(audio);
            }).catch(e => console.log("Audio play failed:", e));
        } else {
            audio.pause();
            isMusicPlaying = false;
        }
    }

    function toggleAudio() {
        const audio = document.getElementById('bg-music');
        if (audio.paused) {
            playMusic();
            $('#btn-audio-toggle').html('<i class="fas fa-volume-up"></i>');
        } else {
            audio.pause();
            $('#btn-audio-toggle').html('<i class="fas fa-volume-mute"></i>');
        }
    }

    function setupVisualizer() {
        // Just prep the canvas
        const canvas = document.getElementById('visualizer');
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight / 2;
    }

    function startVisualizer(audioElement) {
        if (!audioContext) {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            analyser = audioContext.createAnalyser();
            audioSource = audioContext.createMediaElementSource(audioElement);
            audioSource.connect(analyser);
            analyser.connect(audioContext.destination); // Connect to speakers
            
            analyser.fftSize = 256;
            const bufferLength = analyser.frequencyBinCount;
            const dataArray = new Uint8Array(bufferLength);
            const canvas = document.getElementById('visualizer');
            const ctx = canvas.getContext('2d');
            
            function renderFrame() {
                requestAnimationFrame(renderFrame);
                analyser.getByteFrequencyData(dataArray);
                
                ctx.fillStyle = 'rgba(0, 0, 0, 0)'; // Transparent clear
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                
                const barWidth = (canvas.width / bufferLength) * 2.5;
                let barHeight;
                let x = 0;
                
                for(let i = 0; i < bufferLength; i++) {
                    barHeight = dataArray[i];
                    
                    const r = barHeight + (25 * (i/bufferLength));
                    const g = 250 * (i/bufferLength);
                    const b = 50;
                    
                    ctx.fillStyle = "rgb(" + r + "," + g + "," + b + ")";
                    ctx.fillRect(x, canvas.height - barHeight, barWidth, barHeight);
                    
                    x += barWidth + 1;
                }
            }
            renderFrame();
        }
    }

    // --- Game Logic ---
    function initGame() {
        score = 0;
        hasKey = false;
        $('#score').text(score);
        $('#game-area').empty();
        
        // Spawn balloons
        const interval = setInterval(() => {
            if (score >= targetScore) {
                clearInterval(interval);
                spawnKey();
                return;
            }
            createGameBalloon();
        }, 800);
    }

    function createGameBalloon() {
        const balloon = $('<div class="game-balloon">🎈</div>');
        const x = Math.random() * ($('#game-area').width() - 50);
        const y = $('#game-area').height();
        
        balloon.css({ left: x + 'px', bottom: -60 + 'px' });
        $('#game-area').append(balloon);
        
        // Animate up
        balloon.animate({ bottom: $('#game-area').height() + 'px' }, 4000, 'linear', function() {
            $(this).remove();
        });
        
        // Click to pop
        balloon.click(function() {
            $(this).stop().addClass('popped');
            score++;
            $('#score').text(score);
            playPopSound();
            setTimeout(() => $(this).remove(), 200);
        });
    }

    function spawnKey() {
        const key = $('<div class="key-item" style="position:absolute; top:50%; left:50%; transform:translate(-50%,-50%); cursor:pointer;">🗝️ Click Me!</div>');
        $('#game-area').append(key);
        key.click(function() {
            hasKey = true;
            $(this).remove();
            alert("You got the key! Now go open the gift.");
            changeScene('gift');
        });
    }
    
    function playPopSound() {
        // Simple oscillator beep
        if (audioContext) {
            const osc = audioContext.createOscillator();
            const gain = audioContext.createGain();
            osc.connect(gain);
            gain.connect(audioContext.destination);
            osc.frequency.value = 400 + Math.random() * 200;
            osc.type = 'triangle';
            gain.gain.setValueAtTime(0.1, audioContext.currentTime);
            gain.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);
            osc.start();
            osc.stop(audioContext.currentTime + 0.1);
        }
    }

    // --- Microphone Logic ---
    function initMicrophone() {
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            navigator.mediaDevices.getUserMedia({ audio: true })
            .then(stream => {
                if (!audioContext) audioContext = new (window.AudioContext || window.webkitAudioContext)();
                const micInput = audioContext.createMediaStreamSource(stream);
                const micAnalyser = audioContext.createAnalyser();
                micInput.connect(micAnalyser);
                micAnalyser.fftSize = 256;
                detectBlow(micAnalyser);
            })
            .catch(err => console.log('Mic error:', err));
        }
    }

    function detectBlow(micAnalyser) {
        const dataArray = new Uint8Array(micAnalyser.frequencyBinCount);
        
        function check() {
            micAnalyser.getByteFrequencyData(dataArray);
            let sum = 0;
            for(let i = 0; i < dataArray.length; i++) sum += dataArray[i];
            const avg = sum / dataArray.length;
            
            if (avg > 50) { // Blow detected
                blowOutCandle();
            } else {
                if (!$('#flame').hasClass('out')) requestAnimationFrame(check);
            }
        }
        check();
    }

    function blowOutCandle() {
        $('#flame').addClass('out');
        launchConfetti();
        setTimeout(() => changeScene('card'), 2000);
    }

    // --- Effects ---
    function launchConfetti() {
        confetti({
            particleCount: 100,
            spread: 70,
            origin: { y: 0.6 }
        });
    }

    // Start
    init();
});
