/**
 * Happy Birthday Interactive Template
 * A fun, multi-step birthday celebration experience
 */

$(document).ready(function() {
    // ============================================
    // CONFIGURATION - CHANGE THE NAME HERE!
    // ============================================
    var birthdayName = 'Birthday Person Name';  // <-- CHANGE THIS NAME!

    // ============================================
    // GLOBAL VARIABLES
    // ============================================
    var currentStep = 1;
    var totalSteps = 10;
    var soundEnabled = true;
    var balloonsRemaining = 10;
    var candlesRemaining = 5;
    var giftsOpened = 0;
    var totalGifts = 4;
    var wheelSpun = false;
    var memoryMoves = 0;
    var memoryPairsFound = 0;
    var memoryCards = [];
    var flippedCards = [];
    var canFlip = true;
    var scratchPercentage = 0;

    // Memory game emojis (4 pairs for 3x3 grid with one bonus card)
    var memoryEmojis = ['🎂', '🎁', '🎈', '🎉'];
    var memoryTotalPairs = 4;

    // Emoji catcher game
    var catcherScore = 0;
    var catcherTimeLeft = 15;
    var catcherInterval = null;
    var emojiSpawnInterval = null;

    // Typing challenge
    var typingWords = ['HAPPY', 'BIRTHDAY', 'PARTY', 'CAKE', 'WISH', 'JOY', 'LOVE', 'FUN'];
    var currentTypingWord = '';
    var typingScore = 0;
    var typingTimeLeft = 20;
    var typingInterval = null;

    // ============================================
    // INITIALIZATION
    // ============================================
    init();

    function init() {
        createParticles();
        createFloatingBalloons();
        createFloatingHearts();
        initCursorTrail();
        bindEvents();
    }

    // ============================================
    // CURSOR SPARKLE TRAIL
    // ============================================
    function initCursorTrail() {
        $(document).on('mousemove', function(e) {
            if (Math.random() > 0.7) {
                createSparkle(e.pageX, e.pageY);
            }
        });
    }

    function createSparkle(x, y) {
        var colors = ['#ff6b9d', '#ffd700', '#4c6fff', '#c44cff', '#ff9f43'];
        var sparkle = $('<div class="sparkle"></div>');
        sparkle.css({
            left: x + 'px',
            top: y + 'px',
            background: 'radial-gradient(circle, ' + colors[Math.floor(Math.random() * colors.length)] + ' 0%, transparent 70%)',
            width: (Math.random() * 10 + 5) + 'px',
            height: (Math.random() * 10 + 5) + 'px'
        });
        $('#cursor-trail').append(sparkle);
        setTimeout(function() {
            sparkle.remove();
        }, 800);
    }

    // ============================================
    // BACKGROUND PARTICLES
    // ============================================
    function createParticles() {
        var container = $('#particles-container');
        var colors = ['#ff6b9d', '#ffd700', '#4c6fff', '#c44cff', '#ff9f43', '#48dbfb'];
        
        for (var i = 0; i < 30; i++) {
            var particle = $('<div class="particle"></div>');
            particle.css({
                left: Math.random() * 100 + '%',
                width: (Math.random() * 8 + 4) + 'px',
                height: (Math.random() * 8 + 4) + 'px',
                background: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: (Math.random() * 15) + 's',
                animationDuration: (Math.random() * 10 + 10) + 's'
            });
            container.append(particle);
        }
    }

    // ============================================
    // FLOATING BALLOONS BACKGROUND
    // ============================================
    function createFloatingBalloons() {
        var container = $('#balloons-container');
        var colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd'];
        
        for (var i = 0; i < 8; i++) {
            var balloon = $('<div class="floating-balloon"></div>');
            balloon.css({
                left: Math.random() * 100 + '%',
                background: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: (Math.random() * 20) + 's',
                animationDuration: (Math.random() * 10 + 15) + 's'
            });
            container.append(balloon);
        }
    }

    // ============================================
    // FLOATING HEARTS (Step 2)
    // ============================================
    function createFloatingHearts() {
        var container = $('.hearts-bg');
        var hearts = ['❤️', '💕', '💖', '💗', '💝'];
        
        for (var i = 0; i < 15; i++) {
            var heart = $('<div class="floating-heart"></div>');
            heart.text(hearts[Math.floor(Math.random() * hearts.length)]);
            heart.css({
                left: Math.random() * 100 + '%',
                top: Math.random() * 100 + '%',
                animationDelay: (Math.random() * 6) + 's',
                fontSize: (Math.random() * 1.5 + 1) + 'rem'
            });
            container.append(heart);
        }
    }

    // ============================================
    // CONFETTI BURST
    // ============================================
    function createConfetti(count) {
        count = count || 50;
        var container = $('#confetti-container');
        var colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#ffd700'];
        var shapes = ['square', 'circle'];
        
        for (var i = 0; i < count; i++) {
            var confetti = $('<div class="confetti"></div>');
            var shape = shapes[Math.floor(Math.random() * shapes.length)];
            confetti.css({
                left: Math.random() * 100 + '%',
                background: colors[Math.floor(Math.random() * colors.length)],
                width: (Math.random() * 10 + 5) + 'px',
                height: (Math.random() * 10 + 5) + 'px',
                borderRadius: shape === 'circle' ? '50%' : '0',
                animationDelay: (Math.random() * 0.5) + 's',
                animationDuration: (Math.random() * 2 + 3) + 's'
            });
            container.append(confetti);
            
            setTimeout(function() {
                confetti.remove();
            }, 5000);
        }
    }

    // ============================================
    // FIREWORKS (Finale)
    // ============================================
    function createFirework(x, y) {
        var container = $('#fireworksContainer');
        var colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#ffd700'];
        var particleCount = 30;
        
        for (var i = 0; i < particleCount; i++) {
            var particle = $('<div class="firework"></div>');
            var angle = (i / particleCount) * 360;
            var velocity = Math.random() * 100 + 50;
            var color = colors[Math.floor(Math.random() * colors.length)];
            
            particle.css({
                left: x + 'px',
                top: y + 'px',
                background: color,
                boxShadow: '0 0 6px ' + color
            });
            
            container.append(particle);
            
            var radians = angle * Math.PI / 180;
            var endX = x + Math.cos(radians) * velocity;
            var endY = y + Math.sin(radians) * velocity;
            
            particle.animate({
                left: endX + 'px',
                top: endY + 'px',
                opacity: 0
            }, 1000, function() {
                $(this).remove();
            });
        }
    }

    function startFireworksShow() {
        var interval = setInterval(function() {
            var x = Math.random() * $(window).width();
            var y = Math.random() * $(window).height() * 0.6;
            createFirework(x, y);
        }, 500);
        
        setTimeout(function() {
            clearInterval(interval);
        }, 10000);
    }

    // ============================================
    // STEP NAVIGATION
    // ============================================
    function goToStep(step) {
        if (step < 1 || step > totalSteps) return;
        
        var $currentStep = $('#step' + currentStep);
        var $nextStep = $('#step' + step);
        
        $currentStep.addClass('exit');
        
        setTimeout(function() {
            $currentStep.removeClass('active exit');
            $nextStep.addClass('active');
            currentStep = step;
            updateProgressIndicator();
            
            // Initialize step-specific content
            if (step === 2) initBalloonGame();
            if (step === 3) updateCakeTitle();
            if (step === 5) initScratchCard();
            if (step === 6) initEmojiCatcher();
            if (step === 7) initTypingChallenge();
            if (step === 8) initMemoryGame();
            if (step === 10) {
                updateFinaleTitle();
                startFireworksShow();
                createConfetti(100);
            }
        }, 400);
        
        playSound('magic');
        createConfetti(30);
    }

    function updateProgressIndicator() {
        $('.progress-dot').removeClass('active completed');
        for (var i = 1; i < currentStep; i++) {
            $('.progress-dot[data-step="' + i + '"]').addClass('completed');
        }
        $('.progress-dot[data-step="' + currentStep + '"]').addClass('active');
    }

    // ============================================
    // SOUND EFFECTS
    // ============================================
    function playSound(type) {
        if (!soundEnabled) return;
        
        var sound;
        switch(type) {
            case 'pop':
                sound = document.getElementById('popSound');
                break;
            case 'magic':
                sound = document.getElementById('magicSound');
                break;
            case 'candle':
                sound = document.getElementById('candleSound');
                break;
            case 'music':
                sound = document.getElementById('birthdayMusic');
                break;
        }
        
        if (sound) {
            sound.currentTime = 0;
            sound.play().catch(function() {});
        }
    }

    // ============================================
    // EVENT BINDINGS
    // ============================================
    function bindEvents() {
        // Step 1: Mystery Box
        $('#mysteryBox').on('click', function() {
            $(this).addClass('opened');
            createConfetti(50);
            playSound('magic');
            setTimeout(function() {
                goToStep(2);
            }, 1000);
        });

        // Step 3: Candles
        $(document).on('click', '.candle', function() {
            var $flame = $(this).find('.flame');
            if (!$flame.hasClass('blown')) {
                $flame.addClass('blown');
                candlesRemaining--;
                $('#candleCount').text(candlesRemaining);
                playSound('candle');
                
                if (candlesRemaining === 0) {
                    createConfetti(80);
                    setTimeout(function() {
                        goToStep(4);
                    }, 1500);
                }
            }
        });

        // Step 4: Gifts
        $(document).on('click', '.gift-box:not(.opened)', function() {
            $(this).addClass('opened');
            giftsOpened++;
            playSound('magic');
            createConfetti(20);
            
            if (giftsOpened === totalGifts) {
                setTimeout(function() {
                    $('#continueToScratch').removeClass('hidden');
                }, 500);
            }
        });

        $('#continueToScratch').on('click', function() {
            goToStep(5);
        });

        // Step 5: Scratch Card Continue
        $('#continueToEmojiCatcher').on('click', function() {
            goToStep(6);
        });

        // Step 6: Emoji Catcher Continue
        $('#continueToTyping').on('click', function() {
            goToStep(7);
        });

        // Step 7: Typing Challenge Continue
        $('#continueToWheel').on('click', function() {
            goToStep(8);
        });

        // Step 8: Fortune Wheel
        $('#fortuneWheel').on('click', function() {
            if (wheelSpun) return;
            wheelSpun = true;
            spinWheel();
        });

        $('#continueToMemory').on('click', function() {
            goToStep(9);
        });

        // Step 9: Memory Game Continue
        $('#continueToFinaleFromMemory').on('click', function() {
            goToStep(10);
        });

        // Step 9: Restart
        $('#restartBtn').on('click', function() {
            location.reload();
        });

        // Sound Toggle
        $('#soundToggle').on('click', function() {
            soundEnabled = !soundEnabled;
            $(this).toggleClass('muted');
            $(this).text(soundEnabled ? '🔊' : '🔇');
            
            var music = document.getElementById('birthdayMusic');
            if (soundEnabled) {
                music.play().catch(function() {});
            } else {
                music.pause();
            }
        });

        // Progress dots click (for navigation)
        $('.progress-dot').on('click', function() {
            var step = parseInt($(this).data('step'));
            if (step <= currentStep) {
                goToStep(step);
            }
        });
    }

    // ============================================
    // STEP 2: BALLOON POP GAME
    // ============================================
    function initBalloonGame() {
        var container = $('#balloonGameArea');
        container.empty();
        balloonsRemaining = 10;
        $('#balloonCount').text(balloonsRemaining);
        
        var colors = ['#ff6b6b', '#feca57', '#48dbfb', '#ff9ff3', '#54a0ff', '#5f27cd', '#00d2d3', '#ff9f43'];
        
        for (var i = 0; i < 10; i++) {
            var balloon = $('<div class="game-balloon"></div>');
            balloon.css({
                left: (Math.random() * 80 + 5) + '%',
                top: (Math.random() * 60 + 20) + '%',
                background: colors[Math.floor(Math.random() * colors.length)],
                animationDelay: (Math.random() * 2) + 's'
            });
            balloon.on('click', function() {
                if (!$(this).hasClass('popped')) {
                    $(this).addClass('popped');
                    balloonsRemaining--;
                    $('#balloonCount').text(balloonsRemaining);
                    playSound('pop');
                    createConfetti(10);
                    
                    var $this = $(this);
                    setTimeout(function() {
                        $this.remove();
                    }, 300);
                    
                    if (balloonsRemaining === 0) {
                        createConfetti(60);
                        setTimeout(function() {
                            goToStep(3);
                        }, 1000);
                    }
                }
            });
            container.append(balloon);
        }
    }

    // ============================================
    // STEP 3: UPDATE CAKE TITLE
    // ============================================
    function updateCakeTitle() {
        if (birthdayName) {
            $('#cakeTitle').text('Happy Birthday, ' + birthdayName + '!');
        }
    }

    // ============================================
    // STEP 5: SCRATCH CARD
    // ============================================
    function initScratchCard() {
        var canvas = document.getElementById('scratchCard');
        var ctx = canvas.getContext('2d');
        var isDrawing = false;
        var lastX = 0;
        var lastY = 0;
        
        // Set canvas size
        var wrapper = document.querySelector('.scratch-card-wrapper');
        canvas.width = wrapper.offsetWidth;
        canvas.height = wrapper.offsetHeight;
        
        // Create gradient scratch surface
        var gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#667eea');
        gradient.addColorStop(0.5, '#764ba2');
        gradient.addColorStop(1, '#f093fb');
        
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add text
        ctx.fillStyle = '#fff';
        ctx.font = 'bold 24px Poppins';
        ctx.textAlign = 'center';
        ctx.fillText('✨ Scratch Here! ✨', canvas.width / 2, canvas.height / 2);
        
        // Add sparkle decorations
        ctx.font = '30px Arial';
        ctx.fillText('🎁', 50, 50);
        ctx.fillText('🎉', canvas.width - 50, 50);
        ctx.fillText('⭐', 50, canvas.height - 30);
        ctx.fillText('🌟', canvas.width - 50, canvas.height - 30);
        
        function scratch(e) {
            if (!isDrawing) return;
            
            var rect = canvas.getBoundingClientRect();
            var x = (e.clientX || e.touches[0].clientX) - rect.left;
            var y = (e.clientY || e.touches[0].clientY) - rect.top;
            
            ctx.globalCompositeOperation = 'destination-out';
            ctx.beginPath();
            ctx.arc(x, y, 25, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.lineWidth = 50;
            ctx.lineCap = 'round';
            ctx.moveTo(lastX, lastY);
            ctx.lineTo(x, y);
            ctx.stroke();
            
            lastX = x;
            lastY = y;
            
            checkScratchProgress(ctx, canvas);
        }
        
        $(canvas).on('mousedown touchstart', function(e) {
            isDrawing = true;
            var rect = canvas.getBoundingClientRect();
            lastX = (e.clientX || e.originalEvent.touches[0].clientX) - rect.left;
            lastY = (e.clientY || e.originalEvent.touches[0].clientY) - rect.top;
        });
        
        $(canvas).on('mousemove touchmove', function(e) {
            e.preventDefault();
            scratch(e.originalEvent || e);
        });
        
        $(document).on('mouseup touchend', function() {
            isDrawing = false;
        });
    }

    function checkScratchProgress(ctx, canvas) {
        var imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        var pixels = imageData.data;
        var transparent = 0;
        var total = pixels.length / 4;
        
        for (var i = 3; i < pixels.length; i += 4) {
            if (pixels[i] === 0) {
                transparent++;
            }
        }
        
        scratchPercentage = (transparent / total) * 100;
        
        if (scratchPercentage > 50 && $('#continueToEmojiCatcher').hasClass('hidden')) {
            $('#continueToEmojiCatcher').removeClass('hidden').addClass('pop-in');
            createConfetti(40);
            playSound('magic');
        }
    }

    // ============================================
    // STEP 6: EMOJI CATCHER GAME
    // ============================================
    function initEmojiCatcher() {
        catcherScore = 0;
        catcherTimeLeft = 15;
        $('#catcherScore').text(catcherScore);
        $('#catcherTime').text(catcherTimeLeft);
        $('#catcherGameArea').empty();
        $('#continueTotyping').addClass('hidden');
        
        // Start timer
        catcherInterval = setInterval(function() {
            catcherTimeLeft--;
            $('#catcherTime').text(catcherTimeLeft);
            
            if (catcherTimeLeft <= 0) {
                endEmojiCatcher();
            }
        }, 1000);
        
        // Spawn emojis
        emojiSpawnInterval = setInterval(function() {
            spawnCatchEmoji();
        }, 800);
    }

    function spawnCatchEmoji() {
        var emojis = ['🎂', '🎁', '🎈', '🎉', '⭐', '💖', '🌟', '🎊', '💎', '🍰'];
        var badEmojis = ['💣', '👻'];
        var allEmojis = Math.random() > 0.2 ? emojis : badEmojis;
        var emoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
        var isBad = badEmojis.indexOf(emoji) !== -1;
        
        var $emoji = $('<div class="catch-emoji"></div>');
        $emoji.text(emoji);
        $emoji.data('bad', isBad);
        $emoji.css({
            left: (Math.random() * 80 + 5) + '%',
            top: '-50px'
        });
        
        $emoji.on('click', function() {
            var wasBad = $(this).data('bad');
            if (wasBad) {
                catcherScore = Math.max(0, catcherScore - 2);
                $(this).addClass('bad-catch');
            } else {
                catcherScore++;
                $(this).addClass('caught');
                createConfetti(5);
            }
            $('#catcherScore').text(catcherScore);
            playSound('pop');
            
            var $this = $(this);
            setTimeout(function() {
                $this.remove();
            }, 200);
        });
        
        $('#catcherGameArea').append($emoji);
        
        // Animate falling
        $emoji.animate({
            top: '100%'
        }, 3000, 'linear', function() {
            $(this).remove();
        });
    }

    function endEmojiCatcher() {
        clearInterval(catcherInterval);
        clearInterval(emojiSpawnInterval);
        $('#catcherGameArea').empty();
        
        var message = catcherScore >= 10 ? 'Amazing! 🌟' : catcherScore >= 5 ? 'Great job! 🎉' : 'Nice try! 💪';
        $('#catcherResult').html('You caught <strong>' + catcherScore + '</strong> items! ' + message).removeClass('hidden');
        $('#continueToTyping').removeClass('hidden').addClass('pop-in');
        createConfetti(40);
        playSound('magic');
    }

    // ============================================
    // STEP 7: TYPING CHALLENGE
    // ============================================
    function initTypingChallenge() {
        typingScore = 0;
        typingTimeLeft = 20;
        $('#typingScore').text(typingScore);
        $('#typingTime').text(typingTimeLeft);
        $('#typingInput').val('').prop('disabled', false).focus();
        $('#continueToWheel').addClass('hidden');
        $('#typingResult').addClass('hidden');
        
        showNewTypingWord();
        
        // Start timer
        typingInterval = setInterval(function() {
            typingTimeLeft--;
            $('#typingTime').text(typingTimeLeft);
            
            if (typingTimeLeft <= 0) {
                endTypingChallenge();
            }
        }, 1000);
        
        // Check input
        $('#typingInput').off('input').on('input', function() {
            var typed = $(this).val().toUpperCase();
            if (typed === currentTypingWord) {
                typingScore++;
                $('#typingScore').text(typingScore);
                $(this).val('');
                createConfetti(10);
                playSound('pop');
                showNewTypingWord();
            }
        });
    }

    function showNewTypingWord() {
        currentTypingWord = typingWords[Math.floor(Math.random() * typingWords.length)];
        $('#typingWord').text(currentTypingWord).addClass('pop-in');
        setTimeout(function() {
            $('#typingWord').removeClass('pop-in');
        }, 500);
    }

    function endTypingChallenge() {
        clearInterval(typingInterval);
        $('#typingInput').prop('disabled', true);
        
        var message = typingScore >= 8 ? 'Speed demon! 🚀' : typingScore >= 4 ? 'Well done! 🎯' : 'Keep practicing! 💪';
        $('#typingResult').html('You typed <strong>' + typingScore + '</strong> words! ' + message).removeClass('hidden');
        $('#continueToWheel').removeClass('hidden').addClass('pop-in');
        createConfetti(40);
        playSound('magic');
    }

    // ============================================
    // STEP 8: FORTUNE WHEEL
    // ============================================
    function spinWheel() {
        var wheel = $('#fortuneWheel');
        var segments = ['Love 💕', 'Wealth 💰', 'Health 💪', 'Success 🏆', 'Adventure ✈️', 'Happiness 😊', 'Luck 🍀', 'Wisdom 📚'];
        
        var spins = Math.floor(Math.random() * 3) + 5; // 5-7 full rotations
        var extraDegrees = Math.floor(Math.random() * 360);
        var totalDegrees = spins * 360 + extraDegrees;
        
        wheel.css('transform', 'rotate(' + totalDegrees + 'deg)');
        
        playSound('magic');
        
        setTimeout(function() {
            // Calculate which segment is at the top
            var normalizedDegrees = extraDegrees % 360;
            var segmentIndex = Math.floor((360 - normalizedDegrees + 22.5) / 45) % 8;
            var result = segments[segmentIndex];
            
            $('#wheelResult').removeClass('hidden').html('🎊 You won: <strong>' + result + '</strong> for this year! 🎊');
            $('#continueToMemory').removeClass('hidden').addClass('pop-in');
            createConfetti(60);
        }, 5000);
    }

    // ============================================
    // STEP 9: MEMORY GAME (3x3 grid)
    // ============================================
    function initMemoryGame() {
        var container = $('#memoryGrid');
        container.empty();
        memoryMoves = 0;
        memoryPairsFound = 0;
        flippedCards = [];
        canFlip = true;
        
        $('#moveCount').text(memoryMoves);
        $('#pairsFound').text(memoryPairsFound);
        
        // Create pairs of cards (4 pairs = 8 cards + 1 bonus = 9 cards for 3x3)
        memoryCards = [];
        memoryEmojis.forEach(function(emoji) {
            memoryCards.push(emoji);
            memoryCards.push(emoji);
        });
        // Add one bonus card (auto-matched when clicked)
        memoryCards.push('🎊');
        
        // Shuffle cards
        memoryCards = shuffleArray(memoryCards);
        
        // Create card elements
        memoryCards.forEach(function(emoji, index) {
            var isBonus = emoji === '🎊';
            var card = $('<div class="memory-card" data-index="' + index + '" data-emoji="' + emoji + '" data-bonus="' + isBonus + '"></div>');
            var inner = $('<div class="memory-card-inner"></div>');
            var front = $('<div class="memory-card-front"></div>');
            var back = $('<div class="memory-card-back"></div>').text(emoji);
            
            inner.append(front).append(back);
            card.append(inner);
            
            card.on('click', function() {
                flipCard($(this));
            });
            
            container.append(card);
        });
    }

    function flipCard($card) {
        if (!canFlip) return;
        if ($card.hasClass('flipped') || $card.hasClass('matched')) return;
        if (flippedCards.length >= 2) return;
        
        $card.addClass('flipped');
        playSound('pop');
        
        // Check if bonus card
        if ($card.data('bonus') === true) {
            setTimeout(function() {
                $card.addClass('matched bonus-matched');
                createConfetti(20);
            }, 300);
            checkMemoryComplete();
            return;
        }
        
        flippedCards.push($card);
        
        if (flippedCards.length === 2) {
            memoryMoves++;
            $('#moveCount').text(memoryMoves);
            canFlip = false;
            
            var card1 = flippedCards[0];
            var card2 = flippedCards[1];
            
            if (card1.data('emoji') === card2.data('emoji')) {
                // Match found
                setTimeout(function() {
                    card1.addClass('matched');
                    card2.addClass('matched');
                    memoryPairsFound++;
                    $('#pairsFound').text(memoryPairsFound);
                    flippedCards = [];
                    canFlip = true;
                    createConfetti(15);
                    
                    checkMemoryComplete();
                }, 500);
            } else {
                // No match
                setTimeout(function() {
                    card1.removeClass('flipped');
                    card2.removeClass('flipped');
                    flippedCards = [];
                    canFlip = true;
                }, 1000);
            }
        }
    }

    function checkMemoryComplete() {
        if (memoryPairsFound === memoryTotalPairs) {
            setTimeout(function() {
                $('#continueToFinaleFromMemory').removeClass('hidden').addClass('pop-in');
                createConfetti(50);
                playSound('magic');
            }, 500);
        }
    }

    function shuffleArray(array) {
        var shuffled = array.slice();
        for (var i = shuffled.length - 1; i > 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = shuffled[i];
            shuffled[i] = shuffled[j];
            shuffled[j] = temp;
        }
        return shuffled;
    }

    // ============================================
    // STEP 10: UPDATE FINALE TITLE
    // ============================================
    function updateFinaleTitle() {
        if (birthdayName) {
            $('#finaleTitle').text('Happy Birthday, ' + birthdayName + '!');
        }
    }

    // ============================================
    // EASTER EGG: Konami Code
    // ============================================
    var konamiCode = [38, 38, 40, 40, 37, 39, 37, 39, 66, 65];
    var konamiIndex = 0;
    
    $(document).on('keydown', function(e) {
        if (e.keyCode === konamiCode[konamiIndex]) {
            konamiIndex++;
            if (konamiIndex === konamiCode.length) {
                // Easter egg activated!
                createConfetti(200);
                $('body').css('animation', 'rainbow-bg 2s infinite');
                konamiIndex = 0;
            }
        } else {
            konamiIndex = 0;
        }
    });

    // Add rainbow background animation
    $('<style>@keyframes rainbow-bg { 0% { filter: hue-rotate(0deg); } 100% { filter: hue-rotate(360deg); } }</style>').appendTo('head');

});
