export interface QuizCard {
  question: string;
  answer: string;
  difficulty: "easy" | "medium";
}

export const quizCards: QuizCard[] = [
  {
    question: "How many days did God take to create the world before resting?",
    answer: "Six days. He rested on the seventh. (Genesis 2:2)",
    difficulty: "easy",
  },
  {
    question: "Who built the ark that saved his family from the flood?",
    answer: "Noah. (Genesis 6)",
    difficulty: "easy",
  },
  {
    question: "What did David use to defeat Goliath?",
    answer: "A sling and a stone. (1 Samuel 17:49)",
    difficulty: "easy",
  },
  {
    question: "Who was swallowed by a great fish?",
    answer: "Jonah. (Jonah 1:17)",
    difficulty: "easy",
  },
  {
    question: "In which town was Jesus born?",
    answer: "Bethlehem. (Matthew 2:1)",
    difficulty: "easy",
  },
  {
    question: "How many disciples did Jesus choose?",
    answer: "Twelve. (Luke 6:13)",
    difficulty: "easy",
  },
  {
    question: "What is the first book of the Bible?",
    answer: "Genesis.",
    difficulty: "easy",
  },
  {
    question: "Who led the Israelites out of Egypt?",
    answer: "Moses. (Exodus 3-14)",
    difficulty: "easy",
  },
  {
    question: "What sign did God give Noah as a promise never to flood the earth again?",
    answer: "The rainbow. (Genesis 9:13)",
    difficulty: "easy",
  },
  {
    question: "Who betrayed Jesus for thirty pieces of silver?",
    answer: "Judas Iscariot. (Matthew 26:14-15)",
    difficulty: "easy",
  },
  {
    question: "What did Jesus feed to five thousand people?",
    answer: "Five loaves of bread and two fish. (Matthew 14:17-21)",
    difficulty: "easy",
  },
  {
    question: "Who was the strongest man in the Bible, whose strength was in his hair?",
    answer: "Samson. (Judges 16:17)",
    difficulty: "easy",
  },
  {
    question: "How many books are in the whole Bible?",
    answer: "66 books: 39 in the Old Testament and 27 in the New Testament.",
    difficulty: "medium",
  },
  {
    question: "Who was thrown into the lions' den for praying to God?",
    answer: "Daniel. (Daniel 6)",
    difficulty: "easy",
  },
  {
    question: "What was the name of the garden where Adam and Eve lived?",
    answer: "The Garden of Eden. (Genesis 2:8)",
    difficulty: "easy",
  },
  {
    question: "Which sea did Moses part so the Israelites could cross on dry ground?",
    answer: "The Red Sea. (Exodus 14:21-22)",
    difficulty: "easy",
  },
  {
    question: "Who was the first king of Israel?",
    answer: "Saul. (1 Samuel 10:1)",
    difficulty: "medium",
  },
  {
    question: "What are the first three words of the Bible?",
    answer: "\"In the beginning...\" (Genesis 1:1)",
    difficulty: "easy",
  },
  {
    question: "Which disciple walked on water toward Jesus before he began to sink?",
    answer: "Peter. (Matthew 14:29-30)",
    difficulty: "medium",
  },
  {
    question: "Who was the wisest king of Israel, famous for asking God for wisdom?",
    answer: "Solomon. (1 Kings 3:9-12)",
    difficulty: "easy",
  },
  {
    question: "What city's walls fell down after the Israelites marched around it seven times?",
    answer: "Jericho. (Joshua 6)",
    difficulty: "medium",
  },
  {
    question: "Who was sold into slavery by his brothers and later became a ruler in Egypt?",
    answer: "Joseph. (Genesis 37, 41)",
    difficulty: "easy",
  },
  {
    question: "How many days and nights did it rain during the great flood?",
    answer: "Forty days and forty nights. (Genesis 7:12)",
    difficulty: "easy",
  },
  {
    question: "Which two people in the Bible never died?",
    answer: "Enoch and Elijah. (Genesis 5:24, 2 Kings 2:11)",
    difficulty: "medium",
  },
  {
    question: "Who denied Jesus three times before the rooster crowed?",
    answer: "Peter. (Luke 22:61)",
    difficulty: "medium",
  },
  {
    question: "What was Jesus' first miracle?",
    answer: "Turning water into wine at the wedding in Cana. (John 2:1-11)",
    difficulty: "medium",
  },
  {
    question: "Which book of the Bible has the most chapters?",
    answer: "Psalms, with 150 chapters.",
    difficulty: "medium",
  },
  {
    question: "Who wrote most of the letters (epistles) in the New Testament?",
    answer: "The Apostle Paul.",
    difficulty: "medium",
  },
  {
    question: "What is the shortest verse in the Bible?",
    answer: "\"Jesus wept.\" (John 11:35)",
    difficulty: "medium",
  },
  {
    question: "On what mountain did Moses receive the Ten Commandments?",
    answer: "Mount Sinai. (Exodus 19-20)",
    difficulty: "medium",
  },
  {
    question: "Who was the tax collector that climbed a sycamore tree to see Jesus?",
    answer: "Zacchaeus. (Luke 19:1-4)",
    difficulty: "medium",
  },
  {
    question: "What fruit of the Spirit list appears in Galatians 5?",
    answer: "Love, joy, peace, patience, kindness, goodness, faithfulness, gentleness, and self-control.",
    difficulty: "medium",
  },
  {
    question: "Who was Ruth's mother-in-law, whom she refused to leave?",
    answer: "Naomi. (Ruth 1:16)",
    difficulty: "medium",
  },
  {
    question: "How many plagues did God send on Egypt?",
    answer: "Ten. (Exodus 7-12)",
    difficulty: "medium",
  },
  {
    question: "Which queen risked her life to save the Jewish people from Haman's plot?",
    answer: "Queen Esther. (Esther 4-7)",
    difficulty: "medium",
  },
  {
    question: "What did God provide daily to feed the Israelites in the wilderness?",
    answer: "Manna (and quail). (Exodus 16)",
    difficulty: "medium",
  },
];

export function shuffleCards<T>(cards: T[], seed?: number): T[] {
  const arr = [...cards];
  let random = seed ?? Math.floor(Math.random() * 2 ** 31);
  const next = () => {
    // Simple LCG for reproducible shuffles when a seed is provided
    random = (random * 1664525 + 1013904223) % 2 ** 32;
    return random / 2 ** 32;
  };
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
