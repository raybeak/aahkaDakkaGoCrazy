/**
 * fortunes.js - Categorized MOTD Database & Selection Engine
 */

import { getRandomInt } from './utils.js';

export const FORTUNES_DB = {
  wisdom: [
    { text: "The journey of a thousand miles begins with a single step.", author: "Lao Tzu" },
    { text: "Do not dwell in the past, do not dream of the future, concentrate the mind on the present moment.", author: "Buddha" },
    { text: "Turn your wounds into wisdom.", author: "Oprah Winfrey" },
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates" },
    { text: "Silence is a source of great strength.", author: "Lao Tzu" },
    { text: "What we think, we become.", author: "Buddha" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein" },
    { text: "Simplicity is the ultimate sophistication.", author: "Leonardo da Vinci" },
    { text: "Patience is key; great things take time to unfold.", author: "Ancient Proverb" },
    { text: "A quiet mind brings inner strength and self-confidence.", author: "Dalai Lama" },
    { text: "Knowledge speaks, but wisdom listens.", author: "Jimi Hendrix" },
    { text: "The secret of change is to focus all of your energy not on fighting the old, but on building the new.", author: "Socrates" },
    { text: "He who knows others is wise; he who knows himself is enlightened.", author: "Lao Tzu" },
    { text: "Wisdom begins in wonder.", author: "Socrates" },
    { text: "The best way to predict your future is to create it.", author: "Abraham Lincoln" }
  ],
  tech: [
    { text: "There are 10 types of people in the world: those who understand binary, and those who don't.", author: "Dev Proverb" },
    { text: "Your code will compile on the first try today. The universe wills it.", author: "Algorithm Oracle" },
    { text: "A bug in production is just an unexpected feature waiting to be celebrated.", author: "Senior Architect" },
    { text: "Before software can be reusable it first has to be usable.", author: "Ralph Johnson" },
    { text: "It's not a bug – it's an undocumented feature.", author: "Anonymous Developer" },
    { text: "Deleted code is debugged code.", author: "Jeff Sickel" },
    { text: "First, solve the problem. Then, write the code.", author: "John Johnson" },
    { text: "Experience is the name everyone gives to their mistakes in production.", author: "Oscar Wilde (Refactored)" },
    { text: "Simplicity is prerequisite for reliability.", author: "Edsger W. Dijkstra" },
    { text: "Make it work, make it right, make it fast.", author: "Kent Beck" },
    { text: "Today you will find the missing semicolon that has eluded you for hours.", author: "Syntax Sage" },
    { text: "The code you write today will run 10x faster tomorrow.", author: "Compiler Fairy" },
    { text: "Stack Overflow will have the exact solution to your current bug.", author: "Dev Karma" },
    { text: "Clean code always looks like it was written by someone who cares.", author: "Robert C. Martin" },
    { text: "Continuous deployment brings continuous joy.", author: "DevOps Motto" }
  ],
  motivation: [
    { text: "Believe you can and you're halfway there.", author: "Theodore Roosevelt" },
    { text: "Your limitation—it's only your imagination.", author: "Daily Affirmation" },
    { text: "Push yourself, because no one else is going to do it for you.", author: "Inner Voice" },
    { text: "Great things never come from comfort zones.", author: "Growth Mindset" },
    { text: "Dream it. Wish it. Do it.", author: "Action Principle" },
    { text: "Success doesn't just find you. You have to go out and get it.", author: "Mover & Shaker" },
    { text: "The harder you work for something, the greater you'll feel when you achieve it.", author: "Champion's Code" },
    { text: "Dream bigger. Do bigger.", author: "Visionary" },
    { text: "Don't stop when you're tired. Stop when you're done.", author: "Relentless" },
    { text: "Wake up with determination. Go to bed with satisfaction.", author: "Daily Rhythm" },
    { text: "Do something today that your future self will thank you for.", author: "Future Self" },
    { text: "Little things make big days.", author: "Mindful Living" },
    { text: "It's going to be hard, but hard does not mean impossible.", author: "Resilience" },
    { text: "Don't wait for opportunity. Create it.", author: "Catalyst" },
    { text: "Sometimes we're tested not to show our weaknesses, but to discover our strengths.", author: "Strength Within" }
  ],
  cosmic: [
    { text: "The stars align in your favor. A major breakthrough is near.", author: "Celestial Oracle" },
    { text: "An unexpected encounter will open doors to a new realm of possibilities.", author: "Starlight Prophecy" },
    { text: "Trust the timing of your life; every planet moves in its own orbit.", author: "Cosmic Clock" },
    { text: "A wave of creative energy is approaching your constellation.", author: "Galactic Horizon" },
    { text: "Your intuition will guide you through uncharted waters today.", author: "Lunar Compass" },
    { text: "The universe conspires to bring you closer to your true purpose.", author: "Universal Harmony" },
    { text: "Expect a pleasant surprise from an unexpected celestial alignment.", author: "Nebula Whisper" },
    { text: "You radiate positive vibrations that uplift everyone around you.", author: "Stardust Essence" },
    { text: "A long-held dream is quietly gaining momentum in the cosmos.", author: "Solar Spark" },
    { text: "Embrace the void of uncertainty; it is where creation begins.", author: "Void Wisdom" }
  ],
  funny: [
    { text: "Help! I'm being held captive in a fortune cookie factory!", author: "Cookie Insider" },
    { text: "You will read this fortune and think 'That's so true!'", author: "Captain Obvious" },
    { text: "An agreeable surprise is on its way... right after your afternoon nap.", author: "Snooze Master" },
    { text: "Never break a fortune cookie with a hammer when your hands are full.", author: "Kitchen Wisdom" },
    { text: "Your fortune is in another cookie. Please try again.", author: "Cookie 404" },
    { text: "Avoid taking advice from cookies.", author: "Irony Inc." },
    { text: "You will soon be hungry again. Order more dim sum.", author: "Gourmet Prophet" },
    { text: "A bug in your coffee will give you unexpected caffeine immunity.", author: "Barista Physics" },
    { text: "You have a magnetic personality... keep away from unshielded hard drives.", author: "Tech Humor" },
    { text: "Error 200: Fortune retrieved successfully.", author: "HTTP Status" }
  ]
};

export const CHINESE_WORDS = [
  { word: "福", pinyin: "fú", meaning: "Good Fortune / Blessing" },
  { word: "爱", pinyin: "ài", meaning: "Love / Affection" },
  { word: "智", pinyin: "zhì", meaning: "Wisdom / Knowledge" },
  { word: "勇", pinyin: "yǒng", meaning: "Courage / Bravery" },
  { word: "和", pinyin: "hé", meaning: "Peace / Harmony" },
  { word: "喜", pinyin: "xǐ", meaning: "Joy / Happiness" },
  { word: "财", pinyin: "cái", meaning: "Wealth / Prosperity" },
  { word: "健", pinyin: "jiàn", meaning: "Health / Strength" },
  { word: "梦", pinyin: "mèng", meaning: "Dream / Vision" },
  { word: "光", pinyin: "guāng", meaning: "Light / Glory" },
  { word: "运", pinyin: "yùn", meaning: "Luck / Destiny" },
  { word: "笑", pinyin: "xiào", meaning: "Smile / Laughter" }
];

export const LUCKY_COLORS = [
  { name: "Cosmic Gold", hex: "#F59E0B" },
  { name: "Emerald Green", hex: "#10B981" },
  { name: "Celestial Indigo", hex: "#6366F1" },
  { name: "Ruby Red", hex: "#EF4444" },
  { name: "Mystic Amber", hex: "#D97706" },
  { name: "Cyber Teal", hex: "#14B8A6" },
  { name: "Orchid Purple", hex: "#A855F7" },
  { name: "Rose Quartz", hex: "#EC4899" }
];

export function generateLuckyNumbers() {
  const numbers = new Set();
  while (numbers.size < 6) {
    numbers.add(getRandomInt(1, 49));
  }
  return Array.from(numbers).sort((a, b) => a - b);
}

export function getDailyMOTD() {
  const today = new Date();
  const dateStr = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  
  let hash = 0;
  for (let i = 0; i < dateStr.length; i++) {
    hash = (hash << 5) - hash + dateStr.charCodeAt(i);
    hash |= 0;
  }
  
  const allFortunes = [];
  Object.keys(FORTUNES_DB).forEach(cat => {
    FORTUNES_DB[cat].forEach(item => {
      allFortunes.push({ ...item, category: cat });
    });
  });

  const index = Math.abs(hash) % allFortunes.length;
  const chineseIndex = Math.abs(hash) % CHINESE_WORDS.length;
  const colorIndex = Math.abs(hash) % LUCKY_COLORS.length;

  return {
    ...allFortunes[index],
    isDailyMOTD: true,
    dateString: today.toLocaleDateString(undefined, { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' }),
    luckyNumbers: generateLuckyNumbers(),
    luckyColor: LUCKY_COLORS[colorIndex],
    chineseWord: CHINESE_WORDS[chineseIndex]
  };
}

export function getRandomFortune(selectedCategory = 'all') {
  let pool = [];
  if (selectedCategory === 'all') {
    Object.keys(FORTUNES_DB).forEach(cat => {
      FORTUNES_DB[cat].forEach(item => {
        pool.push({ ...item, category: cat });
      });
    });
  } else if (FORTUNES_DB[selectedCategory]) {
    pool = FORTUNES_DB[selectedCategory].map(item => ({ ...item, category: selectedCategory }));
  } else {
    return getDailyMOTD();
  }

  const item = pool[Math.floor(Math.random() * pool.length)];
  const chineseWord = CHINESE_WORDS[Math.floor(Math.random() * CHINESE_WORDS.length)];
  const luckyColor = LUCKY_COLORS[Math.floor(Math.random() * LUCKY_COLORS.length)];

  return {
    ...item,
    isDailyMOTD: false,
    luckyNumbers: generateLuckyNumbers(),
    luckyColor: luckyColor,
    chineseWord: chineseWord
  };
}
