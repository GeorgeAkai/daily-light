export type Difficulty = "easy" | "medium" | "hard";

export interface QuizQuestion {
  question: string;
  options: string[];
  answerIndex: number;
  difficulty: Difficulty;
}

export const quizQuestions: QuizQuestion[] = [
  // ----- Easy -----
  {
    question: "Who was the first man God created?",
    options: ["Noah", "Adam", "Abraham", "Moses"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "How many days did God take to create the world before resting?",
    options: ["Three", "Seven", "Six", "Ten"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "Who built the ark that saved his family from the flood?",
    options: ["Noah", "Abraham", "Jacob", "Elijah"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "What did David use to defeat Goliath?",
    options: ["A sword", "A spear", "A bow and arrow", "A sling and a stone"],
    answerIndex: 3,
    difficulty: "easy",
  },
  {
    question: "In which town was Jesus born?",
    options: ["Nazareth", "Bethlehem", "Jerusalem", "Capernaum"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "How many disciples did Jesus choose?",
    options: ["Ten", "Seven", "Twelve", "Forty"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What is the first book of the Bible?",
    options: ["Genesis", "Exodus", "Matthew", "Psalms"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "Who led the Israelites out of Egypt?",
    options: ["Joshua", "Aaron", "Moses", "David"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question:
      "What sign did God give Noah as a promise never to flood the earth again?",
    options: ["A dove", "A rainbow", "A star", "An olive branch"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who was swallowed by a great fish?",
    options: ["Jonah", "Peter", "Paul", "Elisha"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "What was the name of the garden where Adam and Eve lived?",
    options: ["Gethsemane", "Babylon", "Canaan", "Eden"],
    answerIndex: 3,
    difficulty: "easy",
  },
  {
    question: "Who betrayed Jesus for thirty pieces of silver?",
    options: ["Peter", "Thomas", "Judas Iscariot", "John"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What did Jesus use to feed five thousand people?",
    options: [
      "Five loaves and two fish",
      "Two loaves and five fish",
      "Manna from heaven",
      "Bread and wine",
    ],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "Whose strength was in his hair?",
    options: ["Saul", "Samson", "Solomon", "Samuel"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who was thrown into the lions' den for praying to God?",
    options: ["Daniel", "Joseph", "Jeremiah", "Shadrach"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "Which sea did Moses part so the Israelites could cross?",
    options: ["The Dead Sea", "The Sea of Galilee", "The Red Sea", "The Jordan River"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What is the last book of the Bible?",
    options: ["Jude", "Revelation", "Malachi", "Acts"],
    answerIndex: 1,
    difficulty: "easy",
  },
  // ----- Medium -----
  {
    question: "Who was the first king of Israel?",
    options: ["David", "Solomon", "Saul", "Samuel"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Which king asked God for wisdom instead of riches?",
    options: ["Solomon", "David", "Hezekiah", "Josiah"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question:
      "Around which city did the Israelites march seven times before its walls fell?",
    options: ["Nineveh", "Jericho", "Babylon", "Ai"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Which disciple walked on water toward Jesus?",
    options: ["John", "James", "Andrew", "Peter"],
    answerIndex: 3,
    difficulty: "medium",
  },
  {
    question:
      "Who was sold into slavery by his brothers and later became a ruler in Egypt?",
    options: ["Benjamin", "Joseph", "Judah", "Reuben"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "How many days and nights did it rain during the great flood?",
    options: ["Seven", "Twelve", "Forty", "One hundred"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Which two people in the Bible never died?",
    options: [
      "Moses and Elijah",
      "Enoch and Elijah",
      "Enoch and Moses",
      "Elijah and Elisha",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who denied Jesus three times before the rooster crowed?",
    options: ["Peter", "Judas", "Thomas", "Mark"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What was Jesus' first miracle?",
    options: [
      "Healing a blind man",
      "Walking on water",
      "Feeding the five thousand",
      "Turning water into wine",
    ],
    answerIndex: 3,
    difficulty: "medium",
  },
  {
    question: "Which book of the Bible has the most chapters?",
    options: ["Genesis", "Psalms", "Isaiah", "Jeremiah"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What is the shortest verse in the Bible?",
    options: [
      "\"God is love.\"",
      "\"Jesus wept.\"",
      "\"Pray without ceasing.\"",
      "\"Rejoice always.\"",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "On which mountain did Moses receive the Ten Commandments?",
    options: ["Mount Ararat", "Mount Carmel", "Mount Sinai", "Mount Nebo"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Which tax collector climbed a sycamore tree to see Jesus?",
    options: ["Matthew", "Zacchaeus", "Levi", "Simon"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who was Ruth's mother-in-law, whom she refused to leave?",
    options: ["Naomi", "Orpah", "Rachel", "Hannah"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "How many plagues did God send on Egypt?",
    options: ["Seven", "Twelve", "Three", "Ten"],
    answerIndex: 3,
    difficulty: "medium",
  },
  {
    question: "Which queen risked her life to save the Jewish people?",
    options: ["Jezebel", "Esther", "Bathsheba", "The Queen of Sheba"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What food did God provide daily in the wilderness?",
    options: ["Manna", "Figs", "Bread and fish", "Honey"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "Who baptized Jesus?",
    options: ["Peter", "Andrew", "John the Baptist", "Nicodemus"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "How many books are in the New Testament?",
    options: ["27", "39", "24", "31"],
    answerIndex: 0,
    difficulty: "medium",
  },
  // ----- Hard -----
  {
    question: "Who was the oldest man recorded in the Bible?",
    options: ["Adam", "Noah", "Methuselah", "Abraham"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "On which island was John when he wrote Revelation?",
    options: ["Crete", "Patmos", "Cyprus", "Malta"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Who was the father of John the Baptist?",
    options: ["Zechariah", "Zebedee", "Joachim", "Simeon"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "What was the Apostle Paul's name before his conversion?",
    options: ["Silas", "Stephen", "Barnabas", "Saul"],
    answerIndex: 3,
    difficulty: "hard",
  },
  {
    question: "Who replaced Judas as the twelfth apostle?",
    options: ["Matthias", "Barnabas", "Timothy", "Apollos"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question:
      "To which city was Paul traveling when he saw a blinding light from heaven?",
    options: ["Jerusalem", "Antioch", "Damascus", "Tarsus"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Which king reigned when Daniel was thrown into the lions' den?",
    options: ["Nebuchadnezzar", "Darius", "Cyrus", "Belshazzar"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which prophet was told by God to marry Gomer?",
    options: ["Amos", "Joel", "Micah", "Hosea"],
    answerIndex: 3,
    difficulty: "hard",
  },
  {
    question: "What was the name of Timothy's grandmother, known for her faith?",
    options: ["Lois", "Eunice", "Priscilla", "Phoebe"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "From which tribe of Israel was the Apostle Paul?",
    options: ["Judah", "Levi", "Benjamin", "Dan"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Which king saw the mysterious writing on the wall?",
    options: ["Belshazzar", "Nebuchadnezzar", "Ahab", "Xerxes"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question:
      "What was the name of the runaway slave Paul wrote about to Philemon?",
    options: ["Tychicus", "Onesimus", "Epaphras", "Demas"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which judge defeated the Midianites with only 300 men?",
    options: ["Samson", "Ehud", "Deborah", "Gideon"],
    answerIndex: 3,
    difficulty: "hard",
  },
  {
    question: "Who was the high priest when Jesus was arrested?",
    options: ["Annas", "Caiaphas", "Eli", "Ananias"],
    answerIndex: 1,
    difficulty: "hard",
  },
];

/** Encouragement shown with the score so nobody walks away feeling bad. */
export function encouragementFor(score: number, total: number) {
  const ratio = score / total;
  if (ratio >= 0.9) {
    return {
      title: "Outstanding! 🌟",
      message:
        "You know your Bible well. Keep shining and sharing what you know with others.",
      verse:
        "\"Let the word of Christ dwell in you richly.\" (Colossians 3:16)",
    };
  }
  if (ratio >= 0.6) {
    return {
      title: "Well done! 🎉",
      message:
        "A strong showing. Every question you explore plants the Word a little deeper.",
      verse:
        "\"Your word is a lamp to my feet, and a light for my path.\" (Psalm 119:105)",
    };
  }
  if (ratio >= 0.3) {
    return {
      title: "Good effort! 🌱",
      message:
        "You're growing, and that is what matters. Nobody is born knowing these answers; every reading teaches you something new.",
      verse:
        "\"Grow in the grace and knowledge of our Lord and Savior Jesus Christ.\" (2 Peter 3:18)",
    };
  }
  return {
    title: "Every journey starts somewhere 💜",
    message:
      "This score says nothing about your worth. God delights in a willing heart, and each question you just saw is a seed. Try again and watch yourself grow!",
    verse:
      "\"Do not despise these small beginnings, for Yahweh rejoices to see the work begin.\" (Zechariah 4:10)",
  };
}

/**
 * Ten random questions per round: 4 easy, 3 medium, 3 hard.
 */
export function buildQuizRound(): QuizQuestion[] {
  const byDifficulty = (d: Difficulty) =>
    quizQuestions.filter((q) => q.difficulty === d);
  const pickRandom = <T,>(arr: T[], count: number): T[] => {
    const copy = [...arr];
    for (let i = copy.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy.slice(0, count);
  };
  return [
    ...pickRandom(byDifficulty("easy"), 4),
    ...pickRandom(byDifficulty("medium"), 3),
    ...pickRandom(byDifficulty("hard"), 3),
  ];
}
