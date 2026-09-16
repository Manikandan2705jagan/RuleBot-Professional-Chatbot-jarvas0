const chatMessages = document.getElementById("chatMessages");
const chatForm = document.getElementById("chatForm");
const userInput = document.getElementById("userInput");
const clearBtn = document.getElementById("clearBtn");
const messageCount = document.getElementById("messageCount");
const ruleCount = document.getElementById("ruleCount");
const themeToggle = document.getElementById("themeToggle");
const exportBtn = document.getElementById("exportBtn");
const sidebarToggle = document.getElementById("sidebarToggle");
const sidebar = document.getElementById("sidebar");

let totalMessages = 0;
let lastTopic = null;
let chatHistory = [];

let saveTimer = null;
function scheduleSave() {
  clearTimeout(saveTimer);
  saveTimer = setTimeout(saveChat, 400);
}

const jokes = [
  "Why do programmers prefer dark mode? Because light attracts bugs! 🐛",
  "Why did the developer go broke? He used up all his cache! 💰",
  "A SQL query walks into a bar, walks up to two tables and asks: 'Can I join you?' 🍺",
  "Why do Java developers wear glasses? Because they can't C#! 👓",
  "What's a programmer's favorite hangout place? Foo Bar! 🍸",
  "Why was the JavaScript developer sad? Because he didn't Node how to Express himself! 😢",
  "How many programmers does it take to change a light bulb? None — that's a hardware problem! 💡",
  "Why do programmers hate nature? It has too many bugs! 🦗",
  "What do you call a snake that is 3.14 meters long? A πthon! 🐍",
  "Why do programmers always mix up Halloween and Christmas? Because Oct 31 = Dec 25! 🎃🎄",
  "There are only 10 types of people in the world: those who understand binary and those who don't! 🔢",
  "Why did the programmer quit his job? Because he didn't get arrays! 💸"
];

const funFacts = [
  "Honey never spoils. Archaeologists found 3,000-year-old honey in Egyptian tombs that was still edible! 🍯",
  "Octopuses have three hearts and blue blood! 🐙",
  "The first computer bug was an actual bug — a moth found in a Harvard Mark II computer in 1947! 🦋",
  "A group of flamingos is called a 'flamboyance'! 🦩",
  "Bananas are berries, but strawberries aren't! 🍌",
  "The shortest war in history was between Britain and Zanzibar — it lasted only 38 to 45 minutes! ⚔️",
  "Venus is the only planet that spins clockwise! 🪐",
  "The human brain uses about 20% of the body's total energy! 🧠",
  "A teaspoonful of neutron star would weigh about 6 billion tons on Earth! ⭐",
  "Cows have best friends and get stressed when separated! 🐄",
  "The inventor of the Pringles can is buried in one! 🥫",
  "Wombat poop is cube-shaped! 🧊",
  "There are more possible chess games than atoms in the observable universe! ♟️",
  "The dot over the letters 'i' and 'j' is called a tittle! ✏️"
];

const quotes = [
  "\"The only way to do great work is to love what you do.\" — Steve Jobs 💪",
  "\"Innovation distinguishes between a leader and a follower.\" — Steve Jobs 🚀",
  "\"Stay hungry, stay foolish.\" — Steve Jobs 🌟",
  "\"The best time to plant a tree was 20 years ago. The second best time is now.\" — Chinese Proverb 🌳",
  "\"Code is like humor. When you have to explain it, it's bad.\" — Cory House 😄",
  "\"First, solve the problem. Then, write the code.\" — John Johnson 🧩",
  "\"Talk is cheap. Show me the code.\" — Linus Torvalds 💻",
  "\"Programs must be written for people to read, and only incidentally for machines to execute.\" — Abelson & Sussman 📖",
  "\"The only limit to our realization of tomorrow is our doubts of today.\" — F.D. Roosevelt 🔥",
  "\"Simplicity is the soul of efficiency.\" — Austin Freeman ✨",
  "\"It does not matter how slowly you go as long as you do not stop.\" — Confucius 🐢",
  "\"Success is not final, failure is not fatal: it is the courage to continue that counts.\" — Winston Churchill 🏆"
];

const rules = [
  // Greetings
  {
    patterns: [/\b(hi|hello|hey|yo|howdy|hiya|sup|whats up|what'?s up|hola|greetings)\b/i],
    response: () => "Hello! 👋 I'm Jarvas Assist. How can I help you today?"
  },
  {
    patterns: [/\b(good\s*morning|gm)\b/i],
    response: () => "Good morning! ☀️ Hope you're having a great day. How can I help?"
  },
  {
    patterns: [/\b(good\s*afternoon|ga)\b/i],
    response: () => "Good afternoon! 🌤️ What can I do for you?"
  },
  {
    patterns: [/\b(good\s*evening|ge)\b/i],
    response: () => "Good evening! 🌙 How may I assist you?"
  },
  {
    patterns: [/\b(good\s*night|gn)\b/i],
    response: () => "Good night! 🌙 Sweet dreams! I'll be here if you need me."
  },

  // Well-being
  {
    patterns: [/\bhow are you\b/i, /\bhow r u\b/i, /\bhow'?s it going\b/i, /\bhows life\b/i],
    response: () => "I'm doing great! 😊 Running on pure JavaScript energy. How about you?"
  },
  {
    patterns: [/\b(i'?m (fine|good|great|ok|okay|well|doing well))\b/i],
    response: () => "That's wonderful to hear! 😄 Is there anything I can help you with?"
  },
  {
    patterns: [/\b(i'?m (sad|upset|not great|bad|terrible|awful|depressed|lonely))\b/i],
    response: () => "I'm sorry to hear that. 😔 Remember, tough times don't last forever. Want me to tell you a joke or a motivational quote to brighten your day?"
  },

  // Identity
  {
    patterns: [/\bjarvas\b/i],
    response: () => "Yes? 😊 I'm Jarvas Assist, your personal assistant! How can I help you today?"
  },
  {
    patterns: [/\bwhat('?s| is) your name\b/i, /\bwho are you\b/i, /\btell me about yourself\b/i],
    response: () => "I'm Jarvas Assist 🤖 — a professional rule-based chatbot built with HTML, CSS, and JavaScript. I use 40+ regex rules to understand your messages!"
  },
  {
    patterns: [/\bwhat are you\b/i, /\bwhat kind of (bot|chatbot|ai)\b/i],
    response: () => "I'm a rule-based chatbot — no AI or machine learning, just clever pattern matching with regular expressions! 🧠"
  },
  {
    patterns: [/\b(creator|maker|who made you|built you|who created you)\b/i],
    response: () => "I was created as a project to demonstrate rule-based conversational logic using pure JavaScript. No frameworks, no APIs! 🛠️"
  },

  // Capabilities
  {
    patterns: [/\bwhat can you do\b/i, /\bcapabilit(y|ies)\b/i, /\bfeatures\b/i, /\bwhat do you know\b/i],
    response: () => "I can help with:\n\n👋 Greetings & small talk\n😄 Jokes & fun facts\n💪 Motivational quotes\n🧮 Math calculations\n🕐 Date & time\n🧠 Science & tech facts\n💻 Programming tips\n📖 History & trivia\n🔍 Fuzzy typo matching\n📥 Chat export\n🎨 Dark/light themes\n\nTry asking me something!"
  },
  {
    patterns: [/\bhelp\b/i, /\bhow do i use\b/i, /\bwhat should i ask\b/i],
    response: () => "Type any message and I'll match it against my rules. You can:\n\n• Ask questions\n• Request jokes, facts, or quotes\n• Do math calculations (e.g., 'calculate 15 * 3')\n• Check the time or date\n• Type /help for commands\n\nI also handle typos — try misspelling something!"
  },

  // Thanks
  {
    patterns: [/\bthank(s| you|s a lot| you very much)?\b/i],
    response: () => {
      const responses = ["You're welcome! 😊", "Happy to help! 🙌", "Anytime! Feel free to ask more.", "Glad I could assist! ✨"];
      return responses[Math.floor(Math.random() * responses.length)];
    }
  },

  // Goodbye
  {
    patterns: [/\b(bye|goodbye|see you|farewell|take care|cya|ttyl|gotta go)\b/i],
    response: () => "Goodbye! 👋 Have an awesome day! I'll be here when you need me."
  },

  // Time & Date
  {
    patterns: [/\b(what time|current time|time is it|tell me the time)\b/i],
    response: () => `The current time is ${new Date().toLocaleTimeString([], {hour: "2-digit", minute: "2-digit", second: "2-digit"})}. 🕐`
  },
  {
    patterns: [/\b(what day|what date|today'?s date|what'?s today|current date)\b/i],
    response: () => `Today is ${new Date().toLocaleDateString([], {weekday: "long", year: "numeric", month: "long", day: "numeric"})}. 📅`
  },
  {
    patterns: [/\bwhat year\b/i, /\bwhat year is it\b/i],
    response: () => `The current year is ${new Date().getFullYear()}. 📆`
  },

  // Jokes
  {
    patterns: [/\b(joke|make me laugh|funny|humor|something funny)\b/i],
    response: () => jokes[Math.floor(Math.random() * jokes.length)]
  },

  // Fun Facts
  {
    patterns: [/\b(fun fact|tell me a fact|something (interesting|cool|fun)|did you know|random fact)\b/i],
    response: () => funFacts[Math.floor(Math.random() * funFacts.length)]
  },

  // Motivational Quotes
  {
    patterns: [/\b(motivat|inspire|inspirational|quote|motivational quote|pick me up|encourage)\b/i],
    response: () => quotes[Math.floor(Math.random() * quotes.length)]
  },

  // Math
  {
    patterns: [/\b(calculate|compute|what is|what'?s|solve)\s+([\d\s\+\-\*\/\%\.\(\)]+)/i],
    response: (match) => {
      try {
        const expr = match[2].trim().replace(/[^0-9+\-*/%.() ]/g, "");
        if (!expr || /[+\-*/]{2}/.test(expr)) return "Hmm, that doesn't look like a valid math expression. Try something like: calculate 25 * 4 🧮";
        const result = Function(`"use strict"; return (${expr})`)();
        if (typeof result !== "number" || !isFinite(result)) return "I couldn't calculate that. Try a simpler expression! 🤔";
        return `${expr} = **${result}** 🧮`;
      } catch {
        return "Sorry, I couldn't calculate that. Try something like: calculate 15 + 27 🧮";
      }
    }
  },
  {
    patterns: [/\b(\d+)\s*[\+\-\*\/\%]\s*(\d+)/],
    response: (match) => {
      try {
        const expr = match[0].trim();
        const result = Function(`"use strict"; return (${expr})`)();
        return `${expr} = **${result}** 🧮`;
      } catch {
        return "I couldn't calculate that. 🤔";
      }
    }
  },

  // Weather (simulated)
  {
    patterns: [/\b(weather|temperature|forecast|is it (raining|sunny|cold|hot|warm|cloudy))\b/i],
    response: () => "I don't have access to real-time weather data, but I can tell you that it's always sunny inside a computer! ☀️💡 Try a weather app for real forecasts."
  },

  // Programming
  {
    patterns: [/\b(what is (javascript|js|python|html|css|java|c\+\+|react|node|typescript|ts|php|ruby|go|rust|swift|kotlin))\b/i],
    response: (match) => {
      const lang = match[1].toLowerCase();
      const descriptions = {
        "javascript": "JavaScript 🌐 — The language of the web. It runs in browsers and on servers (Node.js). Dynamic, versatile, and the backbone of modern web development!",
        "js": "JavaScript 🌐 — The language of the web. It runs in browsers and on servers (Node.js). Dynamic, versatile, and the backbone of modern web development!",
        "python": "Python 🐍 — A beginner-friendly, readable language used in AI, data science, web dev, and automation. Known for its clean syntax!",
        "html": "HTML 📄 — HyperText Markup Language. Not a programming language — it's a markup language that structures web pages!",
        "css": "CSS 🎨 — Cascading Style Sheets. Controls the visual presentation of HTML elements — colors, layouts, fonts, and animations!",
        "java": "Java ☕ — 'Write once, run anywhere.' Used in Android apps, enterprise systems, and large-scale backend services!",
        "c++": "C++ ⚡ — A powerful, high-performance language used in game engines, operating systems, and competitive programming!",
        "react": "React ⚛️ — A JavaScript library by Meta for building interactive user interfaces with a component-based architecture!",
        "node": "Node.js 🟢 — A JavaScript runtime built on Chrome's V8 engine. Lets you run JS on the server side!",
        "typescript": "TypeScript 🔷 — JavaScript with static types. Adds type safety and catches errors at compile time!",
        "ts": "TypeScript 🔷 — JavaScript with static types. Adds type safety and catches errors at compile time!",
        "php": "PHP 🐘 — A server-side language that powers WordPress and many websites. Easy to learn for web development!",
        "ruby": "Ruby 💎 — A elegant, expressive language known for the Rails framework. Great for rapid web development!",
        "go": "Go (Golang) 🐹 — Created by Google. Known for simplicity, concurrency, and blazing-fast performance!",
        "rust": "Rust 🦀 — A systems language focused on safety and performance. Loved by developers and voted most admired language!",
        "swift": "Swift 🍏 — Apple's modern language for iOS, macOS, watchOS, and tvOS app development!",
        "kotlin": "Kotlin 🟣 — A modern language for Android development. Fully interoperable with Java and officially supported by Google!"
      };
      return descriptions[lang] || `That's a popular programming language! 🖥️`;
    }
  },
  {
    patterns: [/\b(what should i learn|best language|which programming|easiest language|learning to code|start coding)\b/i],
    response: () => "Great question! 🤔\n\n• **For beginners**: Python 🐍 (easy syntax, huge community)\n• **For web dev**: JavaScript 🌐 (runs everywhere)\n• **For mobile**: Swift 🍏 or Kotlin 🟣\n• **For performance**: Rust 🦀 or Go 🐹\n\nThe best language is the one that excites you to build something! Start with a project you care about."
  },
  {
    patterns: [/\b(programming|coding|developer|engineer)\b/i],
    response: () => "Programming is an amazing skill! 💻 Whether you're just starting or leveling up, the key is consistent practice and building projects. What are you working on?"
  },
  {
    patterns: [/\b(what is (ai|artificial intelligence|machine learning|ml|deep learning))\b/i],
    response: () => "🤖 **AI (Artificial Intelligence)** — Machines simulating human intelligence.\n\n**Machine Learning** — A subset of AI where systems learn from data.\n\n**Deep Learning** — ML using neural networks with multiple layers.\n\nI'm the simplest form — a rule-based system with no learning. Just pattern matching! 😄"
  },

  // Science & Tech
  {
    patterns: [/\b(what is (the internet|blockchain|cloud computing|quantum computing|cybersecurity|encryption))\b/i],
    response: (match) => {
      const topics = {
        "the internet": "The Internet 🌐 — A global network of connected computers that communicate using standardized protocols (TCP/IP). It started as ARPANET in 1969!",
        "blockchain": "Blockchain 🔗 — A decentralized, distributed ledger technology. Each 'block' contains data, and blocks are linked using cryptography. It's the foundation of cryptocurrencies!",
        "cloud computing": "Cloud Computing ☁️ — Delivering computing services (servers, storage, databases) over the internet. AWS, Azure, and GCP are major providers!",
        "quantum computing": "Quantum Computing ⚛️ — Uses quantum bits (qubits) that can exist in multiple states simultaneously. Potentially revolutionary for cryptography and optimization!",
        "cybersecurity": "Cybersecurity 🛡️ — The practice of protecting systems, networks, and data from digital attacks. A critical field in our connected world!",
        "encryption": "Encryption 🔐 — Converting data into a coded format to prevent unauthorized access. Only someone with the correct key can decrypt and read it!"
      };
      return topics[match[1].toLowerCase()] || "Great topic! Technology is fascinating! 🚀";
    }
  },

  // History
  {
    patterns: [/\b(history|historical|who (invented|discovered|created)|when was)\b/i],
    response: () => {
      const facts = [
        "The World Wide Web was invented by Tim Berners-Lee in 1989! 🌐",
        "The first computer mouse was made of wood! 🪵",
        "JavaScript was created in just 10 days by Brendan Eich in 1995! ⚡",
        "The first email was sent in 1971 by Ray Tomlinson! 📧",
        "Python was named after Monty Python, not the snake! 🐍",
        "The first website ever created is still online at info.cern.ch! 🌍",
        "Ada Lovelace wrote the first computer algorithm in 1843! 👩‍💻"
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }
  },

  // Space
  {
    patterns: [/\b(space|planet|moon|sun|star|galaxy|universe|nasa|astronaut|mars|earth)\b/i],
    response: () => {
      const facts = [
        "Space is completely silent because there's no medium for sound waves to travel through! 🤫",
        "One million Earths could fit inside the Sun! ☀️",
        "A day on Venus is longer than its year! 🪐",
        "There are more stars in the universe than grains of sand on Earth! ⭐",
        "Neutron stars can spin at up to 600 rotations per second! 🌀",
        "Light from the Sun takes about 8 minutes and 20 seconds to reach Earth! 💡",
        "Mars has the tallest volcano in the solar system — Olympus Mons at 72,000 feet! 🌋"
      ];
      return facts[Math.floor(Math.random() * facts.length)];
    }
  },

  // Health
  {
    patterns: [/\b(exercise|workout|healthy|sleep|water|nutrition|diet|mental health)\b/i],
    response: () => "Great topic! 💪 Here are some quick tips:\n\n💧 Drink 8 glasses of water daily\n😴 Aim for 7-9 hours of sleep\n🏃 Exercise 30 minutes a day\n🧘 Take breaks to rest your mind\n🍎 Eat more fruits and vegetables\n\nRemember: Small consistent habits lead to big changes!"
  },

  // Music
  {
    patterns: [/\b(music|song|band|album|playlist|listen|spotify|concert)\b/i],
    response: () => "Music is amazing for focus and mood! 🎵\n\nFun fact: Listening to music can reduce anxiety by up to 65%! Some popular coding playlists include lo-fi hip hop, classical, and ambient music.\n\nWhat kind of music do you enjoy?"
  },

  // Game
  {
    patterns: [/\b(game|gaming|play|chess|puzzle|minecraft|fortnite|video game)\b/i],
    response: () => "I love talking about games! 🎮\n\nFun fact: The gaming industry generates more revenue than movies and music combined! Some classic brain teasers:\n\n♟️ Chess has more possible games than atoms in the observable universe!\n🧩 The Game of Life (Conway's) is a fascinating cellular automaton.\n\nWant to hear a gaming joke?"
  },

  // Food
  {
    patterns: [/\b(food|eat|hungry|lunch|dinner|breakfast|recipe|cook|restaurant)\b/i],
    response: () => "I can't eat, but I know food facts! 🍕\n\nFun fact: Pizza was invented in Naples, Italy in the 18th century. And the world's most expensive pizza costs $12,000 — it's topped with 3 types of caviar and lobster! 🦞\n\nWhat's your favorite food?"
  },

  // Sports
  {
    patterns: [/\b(sport|football|soccer|basketball|cricket|tennis|baseball|hockey|athlete)\b/i],
    response: () => "Sports are fantastic! ⚽\n\nFun fact: The first Olympic Games in 776 BC had only one event — the stadion footrace (about 192 meters)! Today's Olympics feature 339 events across 33 sports.\n\nWhat sport do you follow?"
  },

  // Language
  {
    patterns: [/\b(translate|hello in|how do you say|what does .+ mean)\b/i],
    response: () => "I know a few languages! 🌍\n\n• Hello — Hola 🇪🇸, Bonjour 🇫🇷, Namaste 🇮🇳, Konnichiwa 🇯🇵, Ciao 🇮🇹\n• Thank you — Gracias, Merci, Arigatou, Dhanyavaad\n• Goodbye — Adios, Au revoir, Sayonara, Auf Wiedersehen\n\nI'm best at English though! 😄"
  },

  // Philosophy & Existential
  {
    patterns: [/\b(meaning of life|purpose of life|why are we here|are you sentient|are you alive|do you have feelings|are you real)\b/i],
    response: () => "Deep questions! 🤔\n\nAccording to Douglas Adams, the meaning of life is **42**. But seriously — I'm a JavaScript program running in your browser. I don't have feelings or consciousness, just pattern matching rules. But I try my best to be helpful! 😊\n\nWhat does the meaning of life mean to you?"
  },

  // Rule-based engine explanation
  {
    patterns: [/\b(rule[- ]?based|how do you work|how are you built|how do you (think|understand|process))\b/i],
    response: () => "I work through predefined rules! Here's my process:\n\n1. 📥 You type a message\n2. 🔍 I normalize it (lowercase, trim)\n3. 🧪 I check it against 40+ regex patterns\n4. ✅ First matching rule provides a response\n5. 🤔 If nothing matches, I give a helpful fallback\n\nIt's pattern matching, not AI! Simple but effective."
  },

  // NLP
  {
    patterns: [/\b(nlp|natural language processing)\b/i],
    response: () => "NLP (Natural Language Processing) is a field of AI that helps computers understand human language. 🗣️\n\nThis chatbot demonstrates basic NLP concepts:\n• Text normalization\n• Pattern matching\n• Intent detection (via regex)\n• Response generation\n\nFor real NLP, you'd use libraries like spaCy, NLTK, or transformer models!"
  },

  // Project
  {
    patterns: [/\b(project|portfolio|resume|github|linkedin)\b/i],
    response: () => "This Jarvas Assist project is great for your portfolio! 🎯\n\nIt demonstrates:\n✅ Frontend development (HTML/CSS/JS)\n✅ Regular expressions\n✅ DOM manipulation\n✅ Event handling\n✅ Responsive design\n✅ Problem-solving skills\n\nYou can deploy it for free on GitHub Pages, Netlify, or Vercel!"
  }
];

ruleCount.textContent = rules.length;

function normalize(text) {
  return text.toLowerCase().trim().replace(/\s+/g, " ");
}

function levenshtein(a, b) {
  const m = a.length, n = b.length;
  const dp = Array.from({length: m + 1}, () => Array(n + 1).fill(0));
  for (let i = 0; i <= m; i++) dp[i][0] = i;
  for (let j = 0; j <= n; j++) dp[0][j] = j;
  for (let i = 1; i <= m; i++)
    for (let j = 1; j <= n; j++)
      dp[i][j] = Math.min(
        dp[i-1][j] + 1,
        dp[i][j-1] + 1,
        dp[i-1][j-1] + (a[i-1] !== b[j-1] ? 1 : 0)
      );
  return dp[m][n];
}

function fuzzyMatch(input, keywords) {
  const words = normalize(input).split(/\s+/);
  for (const word of words) {
    for (const kw of keywords) {
      if (levenshtein(word, kw) <= 2 && word.length > 3) {
        return true;
      }
    }
  }
  return false;
}

const fuzzyKeywords = [
  "hello", "goodbye", "joke", "fact", "quote", "math",
  "time", "date", "name", "help", "capabilities", "weather",
  "javascript", "python", "programming", "space", "history", "jarvas"
];

function getResponse(input) {
  const normalized = normalize(input);

  // Check commands first
  if (normalized.startsWith("/")) {
    return handleCommand(normalized);
  }

  // Check exact rules
  for (const rule of rules) {
    for (const pattern of rule.patterns) {
      const match = normalized.match(pattern);
      if (match) {
        const response = typeof rule.response === "function" ? rule.response(match) : rule.response;
        lastTopic = normalized;
        return response;
      }
    }
  }

  // Fuzzy matching for typos
  if (fuzzyMatch(normalized, fuzzyKeywords)) {
    return "Did you mean to ask about one of my features? 🤔 I detected something close to a keyword. Try rephrasing or type /help to see what I can do!";
  }

  lastTopic = normalized;
  return "I'm not sure how to respond to that yet. 🤔 Try:\n\n• Ask a question\n• Request a joke or fun fact\n• Do some math\n• Check the time or date\n• Type /help for a list of commands\n\nI'm always learning — try something else!";
}

function handleCommand(input) {
  const cmd = input.split(" ")[0];

  switch (cmd) {
    case "/help":
      return "📋 **Available Commands:**\n\n/help — Show this help message\n/clear — Clear the conversation\n/export — Download chat as text file\n/theme — Toggle dark/light mode\n/rules — See all available rules\n/about — About Jarvas Assist\n\nYou can also just type naturally and I'll try to match your message!";
    case "/clear":
      totalMessages = 0;
      chatHistory = [];
      updateCount();
      localStorage.removeItem("jarvas-chat");
      showWelcome();
      return "__CLEAR__";
    case "/export":
      exportChat();
      return "📥 Chat exported! Check your downloads folder.";
    case "/theme":
      toggleTheme();
      return `🎨 Theme switched to **${document.documentElement.getAttribute("data-theme")}** mode!`;
    case "/rules":
      let ruleList = "📜 **All Rules (" + rules.length + "):**\n\n";
      const categories = [
        {name: "Greetings", start: 0, end: 5},
        {name: "Well-being", start: 5, end: 8},
        {name: "Identity", start: 8, end: 11},
        {name: "Capabilities", start: 11, end: 13},
        {name: "Thanks & Goodbye", start: 13, end: 15},
        {name: "Time & Date", start: 15, end: 18},
        {name: "Entertainment", start: 18, end: 21},
        {name: "Math", start: 21, end: 23},
        {name: "Tech & Programming", start: 23, end: 31},
        {name: "Science & Space", start: 31, end: 35},
        {name: "Life & Culture", start: 35, end: 42},
        {name: "Meta", start: 42, end: rules.length}
      ];
      for (let i = 0; i < rules.length; i++) {
        const cat = categories.find(c => i >= c.start && i < c.end);
        if (cat) {
          ruleList += `\n**${cat.name}:**\n`;
          categories.splice(categories.indexOf(cat), 1);
        }
        const firstPattern = rules[i].patterns[0].source.substring(0, 40);
        ruleList += `${i + 1}. \`${firstPattern}...\`\n`;
      }
      return ruleList;
    case "/about":
      return "🤖 **Jarvas Assist v2.0**\n\nA professional rule-based chatbot built with:\n• HTML5\n• CSS3 (with themes)\n• Vanilla JavaScript\n\nFeatures: 40+ rules, fuzzy matching, localStorage persistence, chat export, dark/light themes, and more!\n\nNo frameworks. No APIs. No AI. Just smart pattern matching! 💡";
    default:
      return `Unknown command: \`${cmd}\`. Type /help to see available commands.`;
  }
}

function getTime() {
  return new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
}

function updateCount() {
  messageCount.textContent = totalMessages;
}

function addMessage(text, sender) {
  if (text === "__CLEAR__") return;

  const message = document.createElement("div");
  message.className = `message ${sender}`;

  const content = document.createElement("div");
  content.className = "message-content";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.innerHTML = formatText(text);

  const meta = document.createElement("div");
  meta.className = "meta";
  meta.textContent = sender === "bot" ? `Jarvas Assist • ${getTime()}` : `You • ${getTime()}`;

  content.appendChild(bubble);
  content.appendChild(meta);
  message.appendChild(content);
  chatMessages.appendChild(message);

  chatHistory.push({ text, sender, time: sender === "bot" ? `Jarvas Assist • ${getTime()}` : `You • ${getTime()}` });

  totalMessages++;
  updateCount();
  chatMessages.scrollTop = chatMessages.scrollHeight;
  scheduleSave();
}

function addSystemMessage(text) {
  const message = document.createElement("div");
  message.className = "message system-message";

  const content = document.createElement("div");
  content.className = "message-content";

  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = text;

  content.appendChild(bubble);
  message.appendChild(content);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function formatText(text) {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/`(.+?)`/g, "<code>$1</code>")
    .replace(/\n/g, "<br>");
}

function showTyping() {
  const message = document.createElement("div");
  message.className = "message bot";
  message.id = "typingMessage";

  const content = document.createElement("div");
  content.className = "message-content";

  const typing = document.createElement("div");
  typing.className = "typing";
  typing.innerHTML = "<i></i><i></i><i></i>";

  content.appendChild(typing);
  message.appendChild(content);
  chatMessages.appendChild(message);
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

function removeTyping() {
  document.getElementById("typingMessage")?.remove();
}

function showWelcome() {
  chatMessages.innerHTML = `
    <div class="welcome">
      <div class="welcome-inner">
        <div class="welcome-badge">
          <svg width="46" height="46" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="32" cy="32" r="29" stroke="#f5c542" stroke-width="1.5" opacity=".5"/>
            <rect x="14" y="20" width="36" height="30" rx="9" fill="#0d1b31" stroke="#38bdf8" stroke-width="1.6"/>
            <rect x="18" y="27" width="28" height="11" rx="5.5" fill="#070e1c"/>
            <circle cx="26" cy="32.5" r="3" fill="#0ea5e9"/>
            <circle cx="38" cy="32.5" r="3" fill="#0ea5e9"/>
            <circle cx="26" cy="32.5" r="1.1" fill="#e0f2fe"/>
            <circle cx="38" cy="32.5" r="1.1" fill="#e0f2fe"/>
            <rect x="23" y="42.5" width="18" height="2.4" rx="1.2" fill="#38bdf8" opacity=".55"/>
            <circle cx="32" cy="9.5" r="2.4" fill="#38bdf8"/>
            <line x1="32" y1="12" x2="32" y2="19" stroke="#38bdf8" stroke-width="2" stroke-linecap="round"/>
          </svg>
        </div>
        <h3>Arc Reactor <span>Online</span></h3>
        <p>Jarvas Assist is armed with 40+ conversation rules, fuzzy typo matching, and premium themes. Ask me anything.</p>
        <div class="welcome-chips">
          <button data-message="Hello">Say hello</button>
          <button data-message="Tell me a joke">A joke</button>
          <button data-message="Tell me a fun fact">A fun fact</button>
          <button data-message="What can you do?">Capabilities</button>
        </div>
      </div>
    </div>
  `;
}

function sendMessage(text) {
  const message = text.trim();
  if (!message) return;

  if (chatMessages.querySelector(".welcome")) {
    chatMessages.innerHTML = "";
  }

  addMessage(message, "user");
  userInput.value = "";

  showTyping();

  const delay = 300 + Math.random() * 500;
  setTimeout(() => {
    removeTyping();
    const response = getResponse(message);
    if (response !== "__CLEAR__") {
      addMessage(response, "bot");
    }
  }, delay);
}

function toggleTheme() {
  const html = document.documentElement;
  const current = html.getAttribute("data-theme");
  const next = current === "dark" ? "light" : "dark";
  html.setAttribute("data-theme", next);
  themeToggle.textContent = next === "dark" ? "🌙" : "☀️";
  localStorage.setItem("jarvas-theme", next);
}

function loadTheme() {
  const saved = localStorage.getItem("jarvas-theme");
  if (saved) {
    document.documentElement.setAttribute("data-theme", saved);
    themeToggle.textContent = saved === "dark" ? "🌙" : "☀️";
  }
}

function exportChat() {
  const messages = chatMessages.querySelectorAll(".message:not(.system-message)");
  let text = "Jarvas Assist Chat Export\n";
  text += "=".repeat(40) + "\n";
  text += `Date: ${new Date().toLocaleDateString()}\n`;
  text += "=".repeat(40) + "\n\n";

  messages.forEach(msg => {
    const isUser = msg.classList.contains("user");
    const bubble = msg.querySelector(".bubble");
    const meta = msg.querySelector(".meta");
    if (bubble) {
      const prefix = isUser ? "You" : "Jarvas Assist";
      const time = meta ? ` (${meta.textContent})` : "";
      text += `${prefix}${time}:\n${bubble.textContent}\n\n`;
    }
  });

  const blob = new Blob([text], { type: "text/plain" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = `jarvas-chat-${new Date().toISOString().slice(0,10)}.txt`;
  a.click();
  URL.revokeObjectURL(url);
}

function saveChat() {
  try {
    localStorage.setItem("jarvas-chat", JSON.stringify(chatHistory));
  } catch (e) {
    /* storage full or unavailable — ignore */
  }
}

function loadChat() {
  const saved = localStorage.getItem("jarvas-chat");
  if (!saved) return false;
  try {
    const data = JSON.parse(saved);
    if (data.length === 0) return false;
    chatMessages.innerHTML = "";
    chatHistory = [];
    chatMessages.innerHTML = data.map(msg => `
      <div class="message ${msg.sender}">
        <div class="message-content">
          <div class="bubble">${formatText(msg.text)}</div>
          <div class="meta">${msg.time}</div>
        </div>
      </div>
    `).join("");
    chatHistory.push(...data);
    totalMessages = data.length;
    updateCount();
    chatMessages.scrollTop = chatMessages.scrollHeight;
    return true;
  } catch {
    return false;
  }
}

// Event listeners
chatForm.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(userInput.value);
  userInput.focus();
});

document.addEventListener("click", (e) => {
  const btn = e.target.closest("[data-message]");
  if (!btn) return;
  sendMessage(btn.dataset.message);
  userInput.focus();
});

clearBtn.addEventListener("click", () => {
  totalMessages = 0;
  chatHistory = [];
  updateCount();
  localStorage.removeItem("jarvas-chat");
  showWelcome();
  userInput.focus();
  closeSidebar();
});

themeToggle.addEventListener("click", toggleTheme);
exportBtn.addEventListener("click", exportChat);

sidebarToggle.addEventListener("click", () => {
  sidebar.classList.toggle("open");
  let overlay = document.querySelector(".sidebar-overlay");
  if (!overlay) {
    overlay = document.createElement("div");
    overlay.className = "sidebar-overlay";
    overlay.addEventListener("click", closeSidebar);
    document.body.appendChild(overlay);
  }
  overlay.classList.toggle("active");
});

function closeSidebar() {
  sidebar.classList.remove("open");
  const overlay = document.querySelector(".sidebar-overlay");
  if (overlay) overlay.classList.remove("active");
}

// Keyboard shortcuts
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeSidebar();
  if ((e.ctrlKey || e.metaKey) && e.key === "k") {
    e.preventDefault();
    userInput.focus();
  }
});

// Init
loadTheme();
if (!loadChat()) {
  showWelcome();
}
