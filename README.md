
# 🎉 Happy Birthday – Interactive Celebration Template

An over-the-top, single-page celebration experience built with HTML, CSS, and jQuery. It walks the guest of honor through 10 animated mini-interactions—balloon popping, candle blowing, memory games, and a fireworks finale—making it perfect for personalized greetings, party landing pages, or quick surprises.

## ✨ Highlights

- **10 interactive stages** covering mini-games, surprises, and a grand finale.
- **Fully client-side** (pure HTML/CSS/JS) with zero build tooling.
- **Custom name support** so you can tailor the experience instantly.
- **Optional sound pack** (pop, magic, looping music) that gracefully degrades if files are missing.
- **Konami-code Easter egg** to unleash rainbow confetti mode. @main/app.js#6-874

## 📂 Project Structure

```
Happy-Birthday/
├── main/
│   ├── index.html        # Markup for all 10 steps + audio + progress UI
│   ├── style.css         # Theme, animations, gradients, responsive tweaks
│   ├── app.js            # Game logic, step flow, sound, effects
│   └── resources/        # (Optional) audio files & resource README
├── 404.html              # GitHub Pages-compatible redirect page
├── robots.txt            # Basic crawl directives
├── LICENSE               # MIT License
└── README.md             # You are here
```

## 🕹️ Experience Flow

| Step | Title | What happens |
| --- | --- | --- |
| 1 | Mystery Box | Tap to open the celebration and trigger confetti. @main/index.html#23-38 |
| 2 | Balloon Pop | Pop 10 balloons rendered at random positions. @main/app.js#405-444 |
| 3 | Birthday Cake | Blow out candles and personalize the greeting with `birthdayName`. @main/app.js#447-454 |
| 4 | Gift Unwrapping | Reveal four heartfelt messages, then continue. @main/index.html#79-110 |
| 5 | Scratch Card | Scratch off canvas paint to expose a fortune message. @main/app.js#456-553 |
| 6 | Emoji Catcher | Click falling emojis, avoid traps, beat the timer. @main/app.js#555-637 |
| 7 | Typing Challenge | Type random celebratory words against the clock. @main/app.js#638-693 |
| 8 | Fortune Wheel | Spin to win blessings with easing + confetti. @main/app.js#695-720 |
| 9 | Memory Game | 3x3 grid with emoji pairs + bonus auto-match card. @main/app.js#722-828 |
| 10 | Grand Finale | Personalized finale message with looping fireworks + restart CTA. @main/index.html#207-225 |

Each step triggers its own confetti, sound cues, and progress updates handled in `goToStep`. @main/app.js#225-399

## 🧱 Tech Stack

- **HTML5** for structure and semantic sections per step.
- **CSS3** for theming (CSS variables, gradients, animations). @main/style.css#1-104
- **jQuery 3.6** for DOM manipulation, events, and animations. @main/index.html#257-259
- **Canvas API** for the scratch card reveal.
- **Optional audio** via HTML `<audio>` elements, sourced from `/main/resources`. @main/index.html#227-237

## 🚀 Getting Started

1. **Clone or download** the repository.
2. **Add optional audio files** to `main/resources/` following the guidance below.
3. **Serve the files** through a lightweight static server (recommended to avoid browser autoplay/security constraints):
   ```bash
   # from the repo root
   python2 -m SimpleHTTPServer 8000
   # or, with Python 3
   python3 -m http.server 8000
   ```
4. Visit `http://localhost:8000/main/` in a modern browser (Chrome, Edge, Firefox, Safari).

Because everything is static, deployment to GitHub Pages, Netlify, or any S3 bucket is as simple as uploading the `main` folder.

### 💡 Gemini Variant

If you want the Gemini-generated version of this celebration (auto-written copy & variations), switch to the `gemini` branch:

```bash
git checkout gemini
```

That branch contains the original Gemini prompt output plus any assets unique to that flow.

## 🔧 Customization Guide

1. **Personalize the celebrant's name**  
   Open `main/app.js` and edit the `birthdayName` constant near the top. @main/app.js#6-34

2. **Update per-step messages**  
   - Cake titles, instructions, and button labels live directly in `main/index.html`.  
   - Modify gift messages, fortune wheel text, and finale quotes inline. @main/index.html#79-225

3. **Change colors or typography**  
   - Adjust CSS variables in `:root` for theme-wide updates. @main/style.css#5-42  
   - Swap Google Fonts in the `<head>` section of `index.html`. @main/index.html#3-9

4. **Tune game difficulty**  
   - Balloon count, candle count, gift totals, and timer lengths are defined at the top of `app.js`. @main/app.js#13-48  
   - For example, set `catcherTimeLeft`, `typingTimeLeft`, or `memoryTotalPairs` to control pacing.

5. **Disable or force sound**  
   - Toggle the default `soundEnabled` flag or adjust the sound toggle button logic in `bindEvents`. @main/app.js#15-399  
   - Replace audio sources in `index.html` with your own MP3s. Ensure filenames match.

6. **Add more steps or games**  
   - Append new `<section>` elements following the existing pattern (`step11`, etc.).  
   - Register them inside `goToStep` to initialize custom logic and update the progress bar.

## 🔊 Optional Sound Pack

Place the following files inside `main/resources/`:

| Filename | Purpose |
| --- | --- |
| `pop.mp3` | Balloon pops, candle blows, quick effects |
| `magic.mp3` | Transitions, surprise reveals |
| `birthday-music.mp3` | Looping background ambience |

See `main/resources/README.md` for download sources and licensing-friendly links. @main/resources/README.md#1-23  
If files are missing, the experience still works—sounds just won't play. `playSound` already guards for null audio elements. @main/app.js#268-291

## 🌐 Deployment Tips

- **GitHub Pages**: Point `main/` to the Pages root or copy its contents into the published branch. Include `404.html` for SPA routing fallback.
- **Static hosting (Netlify, Vercel, Surge, S3)**: Deploy the folder as-is; no build step required.
- **Kiosk / offline mode**: Preload all assets, then open `index.html` in a Chromium-based browser with kiosk flags for full-screen party booths.

## 🐞 Troubleshooting

| Issue | Fix |
| --- | --- |
| Sounds do not play | Confirm MP3 file names, ensure user interacted before autoplay, and keep the browser tab in focus. |
| Scratch card not revealing | Canvas size is tied to `.scratch-card-wrapper`; ensure the section is visible and not hidden by CSS. |
| Emoji/typing timers keep running when navigating | The flow only progresses forward; avoid manually skipping steps via the DOM unless you also reset timers. |
| Wheel result looks off | CSS transform relies on 8 segments; add multiples of 45° if changing the segment count. |

## 📜 License

Released under the MIT License. See [`LICENSE`](LICENSE) for details.

---

If you build something fun with this template, share a screenshot or link—happy celebrating! 🎂
