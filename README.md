# Jarvas Assist — Premium Rule-Based AI Assistant

A premium, arc-reactor inspired rule-based chatbot with 40+ conversation rules, fuzzy typo matching, midnight/pearl themes, localStorage persistence, chat export, and a cinematic UI — built with zero frameworks and zero APIs.

## Features

- **40+ conversation rules** across 12+ categories
- **Fuzzy typo matching** using Levenshtein distance
- **Midnight & Pearl premium themes** with persistence
- **Arc-reactor robot logo** (SVG, no image files)
- **localStorage** — saves chat history across sessions
- **Chat export** — download conversation as a text file
- **Command system** — `/help`, `/clear`, `/export`, `/theme`, `/rules`, `/about`
- **Math calculator** — handles inline expressions (e.g., `calculate 25 * 4`)
- **Text formatting** — bold, code, and line breaks in responses
- **Typing indicator** with randomized delay
- **Lag-optimized** — no backdrop-filter, opacity/transform-only animations, debounced storage
- **Responsive design** with mobile sidebar toggle
- **Keyboard shortcuts** — `Ctrl+K` to focus input, `Esc` to close sidebar
- **Quick suggestion chips** in sidebar, chat, and welcome screen
- **Message & rule counters**
- **Google Fonts (Sora + JetBrains Mono)**
- **No external dependencies** — pure HTML, CSS, JavaScript

## Conversation Categories

| Category | Topics |
|----------|--------|
| Greetings | Hello, good morning/afternoon/evening/night |
| Well-being | How are you, mood detection |
| Identity | Name, creator, what am I |
| Capabilities | Features, help, how to use |
| Time & Date | Current time, date, year |
| Entertainment | Jokes, fun facts, motivational quotes |
| Math | Inline calculations and expressions |
| Programming | Language descriptions, learning advice |
| Tech & Science | AI, blockchain, quantum computing, space |
| History | Tech history, inventions, discoveries |
| Culture | Music, games, food, sports, languages |
| Meta | Rule engine explanation, NLP, project info |

## Commands

| Command | Description |
|---------|-------------|
| `/help` | Show available commands |
| `/clear` | Clear the conversation |
| `/export` | Download chat as text file |
| `/theme` | Toggle dark/light mode |
| `/rules` | List all loaded rules |
| `/about` | About Jarvas Assist |

## Project Structure

```
rule-based-chatbot/
├── index.html      # App shell with sidebar & chat UI
├── style.css       # Themes, glassmorphism, animations, responsive
├── script.js       # 40+ rules, fuzzy matching, commands, persistence
└── README.md       # This file
```

## How to Run

1. Open `index.html` in any modern browser.
2. For the best experience, use VS Code with the **Live Server** extension.
3. Use `/theme` or the 🌙 button to switch between Midnight and Pearl themes.

## How the Rule Engine Works

1. User input is normalized (lowercased, trimmed).
2. Commands (`/...`) are checked first.
3. Input is tested against 40+ regex patterns in order.
4. First matching rule provides a response.
5. If no rule matches, fuzzy matching checks for typos (Levenshtein distance ≤ 2).
6. If still no match, a helpful fallback is returned.

## How to Deploy (Free)

### GitHub Pages
1. Create a GitHub repo and push this folder.
2. Go to Settings → Pages → Enable.
3. Share the URL.

### Netlify (Fastest)
1. Go to [app.netlify.com](https://app.netlify.com).
2. Drag the `rule-based-chatbot` folder onto the page.
3. Done — instant public URL.

## Tech Stack

- HTML5 (semantic markup)
- CSS3 (custom properties, glassmorphism, animations, responsive grid)
- Vanilla JavaScript (ES6+, regex, localStorage, DOM API)
- Google Fonts (Inter)

## License

Free to use for educational and personal projects.
