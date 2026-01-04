🎉 Happy Birthday – Interactive Celebration Experience
=====================================================

An over-the-top, single-page birthday celebration built with HTML, CSS, and jQuery.

This version walks the guest of honor through **8 interactive scenes** – from a playful
welcome and light switch, to a music visualizer, memory lane, balloon-popping game,
gift box, microphone-powered birthday cake, and a final greeting card.

It’s perfect for:

- **Surprising a friend** with a personalized link.
- **Party landing pages** or virtual celebrations.
- **A fun front-end mini-project** to tweak and extend.

> **Branch availability:** This codebase represents the **Gemini branch** of the project.
> The experience described here does **not** exist on `main`.


✨ Highlights
------------

- **8 interactive scenes** connected as a guided story.
- **Animated loading screen** with a spinning birthday cake icon.
- **Global audio control** and background birthday song.
- **Music visualizer** driven by the Web Audio API.
- **Memory lane gallery** with animated photo-card transitions.
- **Balloon popping mini-game** that unlocks a key.
- **3D-style floating gift box** that opens with confetti.
- **Interactive cake candle** you can blow out using your microphone (with click fallback).
- **Final flip card** with a heartfelt birthday message and replay button.
- **Fully client-side** – no backend, no build tools.


📂 Project Structure
--------------------

```text
Happy-Birthday/
├── main/
│   ├── index.html        # Markup for all 8 scenes + global audio control
│   ├── style.css         # Theme, animations, layout, and scene styling
│   ├── app.js            # Scene flow, game logic, audio/visual effects
│   └── resources/
│       ├── happy-birthday.mp3      # Background music (looped)
│       └── photos/
│           ├── photo1.svg          # Memory lane image 1
│           ├── photo2.svg          # Memory lane image 2
│           └── photo3.svg          # Memory lane image 3
├── 404.html              # (Optional) GitHub Pages / static hosting helper
├── robots.txt            # Basic crawler / indexing directives
├── LICENSE               # Project license
└── README.md             # You are here
```


🕹️ Experience Flow (Scenes)
---------------------------

Each scene is a full-screen section with its own animations and logic. The flow is
managed in `app.js` using a simple `scenes` array and `changeScene` / `updateScene`.

| # | Scene ID | Title / Purpose | Main Elements |
|---|---------|------------------|---------------|
| 1 | `welcome` | **Welcome Screen** | Animated heading, waving emoji, subtitle, `Let's Go!` button. `#scene-welcome` in `index.html`. |
| 2 | `lights` | **Light Switch** | Dark overlay + light switch button. Toggling it fades in light and advances to the party. `#scene-lights`. |
| 3 | `party` | **Music & Visualizer** | Canvas-based audio visualizer, spinning DJ record, `Drop the Beat` button. `#scene-party` + Web Audio API visualizer in `app.js`. |
| 4 | `memories` | **Memory Lane** | Photo gallery with 3 `photo-card` entries, next/prev arrows, and `Next Surprise →` button. `#scene-memories`. |
| 5 | `game` | **Balloon Popping Game** | Balloons float up inside `#game-area`; clicking pops them, increases score, and plays a pop sound. After enough pops, a key appears. `#scene-game`. |
| 6 | `gift` | **Gift Box with Key** | Floating 3D-style gift box that requires the key; clicking with key opens the lid, launches confetti, and proceeds to cake. `#scene-gift`. |
| 7 | `cake` | **Birthday Cake + Microphone** | Cute cake with candle and animated flame. The mic listens for a `blow` sound to extinguish the flame and move to the final card (click also works). `#scene-cake`. |
| 8 | `card` | **Final Card & Replay** | 3D flip card with front and inside message, confetti on open, and a `Replay` button that reloads the entire flow. `#scene-card`. |

Additional global elements:

- **Loading screen** (`#loading-screen`) with spinning cake icon and `Loading Awesomeness...` text.
- **Global audio toggle** (`#audio-control` + `#btn-audio-toggle`) to mute/unmute background music.
- **Hidden main container** (`#main-container`) that fades in after loading.


🧱 Tech Stack
-------------

- **HTML5** – Single-page layout with `<div>`-based scenes and semantic audio element.
- **CSS3** –
  - CSS variables for colors and gradients (`:root` in `style.css`).
  - Scene transitions (opacity + scale) and multiple keyframe animations.
  - Custom styling for gallery, balloons, gift box, cake, and card.
- **jQuery 3.6** – For DOM ready, event binding, animations, and dynamic element creation.
- **Font Awesome** – For icons (birthday cake, heart, volume, arrows, etc.).
- **Canvas-Confetti** – For celebratory confetti bursts in key moments.
- **Web Audio API** – For:
  - Visualizing the background music on a `<canvas>`.
  - Simple oscillator-based pop sound in the balloon game.
  - Microphone amplitude analysis to detect blowing on the candle.


🚀 Getting Started
------------------

You can run this as a plain static site. For best results (especially for audio and
microphone access), serve it over `http://` using a simple local server.

1. **Clone or download** this repository

   ```bash
   git clone https://github.com/Kaushik-Paul/Happy-Birthday.git
   cd Happy-Birthday
   ```

2. **Ensure assets are present**

   - Background music: `main/resources/happy-birthday.mp3`.
   - Memory photos: `main/resources/photos/photo1.svg`, `photo2.svg`, `photo3.svg`.
   - If you do not want music, you can remove the `<source>` or file – the page will
     simply be silent.

3. **Start a simple static server** (recommended)

   From the project root:

   ```bash
   # Python 2.7 (often available by default)
   python2 -m SimpleHTTPServer 8000

   # or, Python 3
   python3 -m http.server 8000
   ```

4. **Open the celebration**

   Visit:

   ```text
   http://localhost:8000/main/
   ```

   Use a modern browser (Chrome, Edge, Firefox, or Safari). Microphone access will
   prompt for permission when you reach the cake scene.

### 💡 Branch Availability (Gemini)

This repository is already on the `gemini` branch—the Gemini-authored experience lives
only here and is not present on `main`. You can confirm with:

```bash
git status
git branch
```

Switching to `main` will drop you into a branch that **does not contain** this
interactive celebration. Stay on `gemini` (or create your own branch) if you want to
preserve and customize this flow.


🔧 Customization Guide
----------------------

You can easily personalize this project without changing the overall structure.

1. **Change texts and messages**

   - All scene titles, subtitles, and the final card text live in `main/index.html`.
   - Update headings like `Hey There!`, card messages (e.g. `Dear Friend,`), and
     signature to match the person you’re celebrating.

2. **Update images in Memory Lane**

   - Replace the SVGs under `main/resources/photos/` with your own photos or artwork.
   - Preserve filenames (`photo1.svg`, `photo2.svg`, `photo3.svg`) or update the
     `src` attributes and `data-img` values in the memory scene section of
     `main/index.html`.

3. **Change colors and fonts**

   - Edit CSS variables in `:root` at the top of `main/style.css`:
     - `--primary`, `--secondary`, `--accent`, `--dark`, `--light`, `--purple`, `--pink`, etc.
   - Swap Google Fonts by editing the `<link>` lines in the `<head>` of `main/index.html`.

4. **Tune game difficulty**

   - In `main/app.js`, adjust the following to make the balloon game easier/harder:
     - `targetScore` (how many balloons need to be popped before the key appears).
     - Balloon spawn interval in `initGame()` (the `setInterval` delay), and balloon
       animation duration in `createGameBalloon()`.

5. **Adjust audio behavior**

   - Background music is controlled via the `<audio id="bg-music">` element in
     `index.html` and the `playMusic` / `toggleAudio` functions in `app.js`.
   - Change the MP3 file, volume, or remove audio entirely if you want a silent version.

6. **Confetti moments**

   - Confetti is triggered in `launchConfetti()` (used when opening the gift, blowing
     out the candle, and opening the final card).
   - You can call `launchConfetti()` from additional events to celebrate other actions.


🌐 Deployment Tips
------------------

Because everything is static, you can deploy this project almost anywhere:

- **GitHub Pages**
  - Host the repo and configure Pages to serve from the root or `main/` folder.
  - `404.html` is included and can be used as a simple fallback page.
- **Static hosting (Netlify, Vercel, Surge, S3, etc.)**
  - Deploy the entire folder or the `main/` directory as a static site.
  - No build step or server-side code is required.
- **Kiosk / Offline mode**
  - Download all assets locally.
  - Open `main/index.html` in a Chromium-based browser with kiosk/fullscreen flags.
  - Great for putting this on a tablet or a dedicated celebration screen.


🐞 Troubleshooting
------------------

| Issue | Possible Fix |
|-------|--------------|
| **Music doesn’t play** | Many browsers block autoplay: click the page or press the play/volume buttons first. Ensure `happy-birthday.mp3` exists at `main/resources/`. |
| **No microphone prompt on cake scene** | Check browser permissions for microphone, ensure you are serving via `http://` (not just opening the file as `file://`), and try a Chromium-based browser. |
| **Blow detection feels too sensitive / not sensitive enough** | Adjust the average volume threshold in `detectBlow` inside `main/app.js` (the `avg > 50` line). |
| **Balloons move too fast or too slow** | Tweak the animation duration in `createGameBalloon()` and the spawn interval in `initGame()` in `main/app.js`. |
| **Layout looks off on small screens** | Inspect the CSS in `main/style.css` and consider adding media queries or reducing font sizes and container widths. |


📜 License
----------

This project is released under the terms described in [`LICENSE`](LICENSE).

Have fun customizing it and making someone’s day extra special! 🎂

