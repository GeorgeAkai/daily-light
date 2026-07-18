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
  // ----- Easy (additions) -----
  {
    question: "Who was the first woman God created?",
    options: ["Sarah", "Eve", "Mary", "Ruth"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who killed his brother Abel?",
    options: ["Cain", "Seth", "Esau", "Joseph"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "What did God create on the first day?",
    options: ["Animals", "The sea", "Light", "People"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "Who was Jesus' earthly father, the carpenter?",
    options: ["Joseph", "John", "James", "Joachim"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "In which river was Jesus baptized?",
    options: ["The Nile", "The Euphrates", "The Tigris", "The Jordan"],
    answerIndex: 3,
    difficulty: "easy",
  },
  {
    question: "How many commandments did God give Moses?",
    options: ["Seven", "Ten", "Twelve", "Forty"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who wrote most of the Psalms?",
    options: ["Solomon", "Moses", "David", "Isaiah"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What animal did Jesus ride into Jerusalem?",
    options: ["A horse", "A donkey", "A camel", "He walked"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "On which day did Jesus rise from the dead?",
    options: ["The same day", "The second day", "The third day", "The seventh day"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question:
      "Who visited baby Jesus with gifts of gold, frankincense, and myrrh?",
    options: ["The shepherds", "The wise men", "The priests", "The innkeepers"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "What prayer did Jesus teach his disciples?",
    options: [
      "The Shepherd's Prayer",
      "The Temple Prayer",
      "The Lord's Prayer",
      "The Morning Prayer",
    ],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "Who was the brother of Moses?",
    options: ["Aaron", "Joshua", "Caleb", "Eli"],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "Who was Abraham's promised son?",
    options: ["Ishmael", "Esau", "Jacob", "Isaac"],
    answerIndex: 3,
    difficulty: "easy",
  },
  {
    question: "Where did Adam and Eve hide from God?",
    options: [
      "In a cave",
      "Among the trees of the garden",
      "Behind a rock",
      "In the river",
    ],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "What did the serpent convince Eve to do?",
    options: [
      "Leave the garden",
      "Hide from Adam",
      "Eat the forbidden fruit",
      "Build an altar",
    ],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What did Jacob dream of at Bethel?",
    options: [
      "A great flood",
      "A stairway to heaven",
      "A burning bush",
      "Seven fat cows",
    ],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who were the first two sons of Adam and Eve?",
    options: [
      "Jacob and Esau",
      "Cain and Abel",
      "Isaac and Ishmael",
      "Seth and Enosh",
    ],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "What bird returned to Noah with an olive leaf?",
    options: ["A raven", "An eagle", "A dove", "A sparrow"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "In which town did Jesus grow up?",
    options: ["Bethlehem", "Jerusalem", "Capernaum", "Nazareth"],
    answerIndex: 3,
    difficulty: "easy",
  },
  {
    question: "Which angel announced Jesus' birth to Mary?",
    options: ["Michael", "Gabriel", "Raphael", "Uriel"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question:
      "What was the job of Peter, Andrew, James, and John before following Jesus?",
    options: ["Carpenters", "Shepherds", "Fishermen", "Tax collectors"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "Who is called the father of many nations?",
    options: ["Noah", "Abraham", "Adam", "David"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "What sea did Jesus calm with the words \"Peace! Be still!\"?",
    options: [
      "The Dead Sea",
      "The Red Sea",
      "The Sea of Galilee",
      "The Mediterranean Sea",
    ],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What do we call the first four books of the New Testament?",
    options: ["The Epistles", "The Gospels", "The Law", "The Prophets"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "What is the last word in the Bible?",
    options: ["Peace", "Glory", "Amen", "Come"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What tower did people build trying to reach the heavens?",
    options: [
      "The Tower of Babel",
      "The Tower of David",
      "The Tower of Siloam",
      "The Watchtower",
    ],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "How does Genesis say God created the world?",
    options: [
      "By speaking it into being",
      "Out of the sea",
      "With the angels' help",
      "Over a thousand years",
    ],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "What is the Golden Rule Jesus taught?",
    options: [
      "Pray three times a day",
      "Do to others as you would have them do to you",
      "Give a tenth of all you earn",
      "Honor the Sabbath",
    ],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "Who slept through a storm on a boat before calming it?",
    options: ["Peter", "Paul", "Jonah", "Jesus"],
    answerIndex: 3,
    difficulty: "easy",
  },
  {
    question: "Who found baby Moses floating in a basket?",
    options: [
      "Pharaoh's daughter",
      "Miriam",
      "Pharaoh's wife",
      "A shepherd girl",
    ],
    answerIndex: 0,
    difficulty: "easy",
  },
  {
    question: "What instrument did David play for King Saul?",
    options: ["A trumpet", "A harp", "A drum", "A flute"],
    answerIndex: 1,
    difficulty: "easy",
  },
  {
    question: "How many books are in the whole Bible?",
    options: ["27", "39", "66", "72"],
    answerIndex: 2,
    difficulty: "easy",
  },
  {
    question: "What was the name of Jesus' mother?",
    options: ["Martha", "Elizabeth", "Ruth", "Mary"],
    answerIndex: 3,
    difficulty: "easy",
  },
  // ----- Medium (additions) -----
  {
    question: "Who was Isaac's wife?",
    options: ["Rachel", "Leah", "Rebekah", "Sarah"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "What was Jacob's new name after wrestling with God?",
    options: ["Abraham", "Israel", "Jeshurun", "Immanuel"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "How many sons did Jacob have?",
    options: ["Seven", "Ten", "Twelve", "Fourteen"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "What did Esau sell to Jacob for a bowl of stew?",
    options: ["His flock", "His birthright", "His tent", "His sword"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question:
      "Which prophet challenged the prophets of Baal on Mount Carmel?",
    options: ["Elisha", "Isaiah", "Elijah", "Jeremiah"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Who succeeded Elijah as prophet?",
    options: ["Elisha", "Samuel", "Nathan", "Amos"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What happened to Lot's wife when she looked back?",
    options: [
      "She was struck blind",
      "She turned into a pillar of salt",
      "She turned to stone",
      "She vanished",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Which book comes right after the four Gospels?",
    options: ["Romans", "Hebrews", "Acts", "Revelation"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Who wrote the book of Revelation?",
    options: ["Paul", "Peter", "James", "John"],
    answerIndex: 3,
    difficulty: "medium",
  },
  {
    question: "Who was the Roman governor at Jesus' trial?",
    options: ["Herod", "Pontius Pilate", "Caesar Augustus", "Felix"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Jesus healed ten lepers. How many returned to thank him?",
    options: ["All ten", "Five", "Three", "One"],
    answerIndex: 3,
    difficulty: "medium",
  },
  {
    question: "Who helped Jesus carry his cross?",
    options: [
      "Simon of Cyrene",
      "Joseph of Arimathea",
      "Simon Peter",
      "Nicodemus",
    ],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question:
      "Which disciple doubted the resurrection until he saw Jesus himself?",
    options: ["Philip", "Thomas", "Andrew", "Bartholomew"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What rested on the disciples at Pentecost?",
    options: [
      "A bright cloud",
      "Tongues like fire",
      "A mighty wind only",
      "Doves",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who was the first Christian martyr, stoned for his faith?",
    options: ["James", "Stephen", "Barnabas", "Timothy"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who were Lazarus' two sisters?",
    options: [
      "Mary and Martha",
      "Ruth and Naomi",
      "Rachel and Leah",
      "Elizabeth and Anna",
    ],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What was Matthew's job before following Jesus?",
    options: ["Fisherman", "Carpenter", "Tax collector", "Doctor"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question:
      "Which parable tells of a son who wasted his inheritance and came home?",
    options: [
      "The Lost Sheep",
      "The Prodigal Son",
      "The Talents",
      "The Sower",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "In Jesus' parable, who stopped to help the beaten traveler?",
    options: ["A priest", "A Levite", "A Good Samaritan", "A Roman soldier"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Jesus compared the Kingdom of God to which tiny seed?",
    options: ["A wheat seed", "A mustard seed", "A fig seed", "An olive pit"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question:
      "How many baskets of leftovers were gathered after feeding the five thousand?",
    options: ["Five", "Seven", "Ten", "Twelve"],
    answerIndex: 3,
    difficulty: "medium",
  },
  {
    question: "Who built the first temple in Jerusalem?",
    options: ["David", "Solomon", "Hezekiah", "Nehemiah"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Which king danced before the ark of the covenant?",
    options: ["Saul", "Solomon", "David", "Josiah"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Which prophet saw a valley of dry bones come to life?",
    options: ["Isaiah", "Ezekiel", "Daniel", "Joel"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question:
      "Which prophet went to heaven in a whirlwind with chariots of fire?",
    options: ["Enoch", "Moses", "Elijah", "Elisha"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Who was Abraham's nephew?",
    options: ["Lot", "Laban", "Eliezer", "Terah"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "What was the last plague on Egypt?",
    options: ["Darkness", "Locusts", "Death of the firstborn", "Hail"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "How many years did Israel wander in the wilderness?",
    options: ["Seven", "Twelve", "Forty", "Seventy"],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Who was David's closest friend, son of King Saul?",
    options: ["Jonathan", "Absalom", "Joab", "Ish-bosheth"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "Which judge of Israel was a woman and a prophetess?",
    options: ["Miriam", "Deborah", "Huldah", "Esther"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Which two spies brought back a good report about Canaan?",
    options: [
      "Moses and Aaron",
      "Joshua and Caleb",
      "Eldad and Medad",
      "Gershon and Kohath",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What does the name \"Immanuel\" mean?",
    options: [
      "Prince of Peace",
      "God with us",
      "The Anointed One",
      "Light of the World",
    ],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who was Esther's cousin and guardian?",
    options: ["Haman", "Mordecai", "Boaz", "Nehemiah"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who visited Jesus at night to ask about being born again?",
    options: [
      "Joseph of Arimathea",
      "Gamaliel",
      "Nicodemus",
      "Simon the Pharisee",
    ],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "In which garden did Jesus pray before his arrest?",
    options: ["Eden", "Gethsemane", "The King's Garden", "Bethany"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Who was the first person to see the risen Jesus?",
    options: ["Peter", "Mary Magdalene", "John", "Thomas"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "What happened to the temple curtain when Jesus died?",
    options: [
      "It caught fire",
      "It was stolen",
      "It was torn in two from top to bottom",
      "Nothing happened",
    ],
    answerIndex: 2,
    difficulty: "medium",
  },
  {
    question: "Which prisoner was released instead of Jesus?",
    options: ["Barabbas", "Silas", "The thief", "Malchus"],
    answerIndex: 0,
    difficulty: "medium",
  },
  {
    question: "Who interpreted the writing on the wall for Belshazzar?",
    options: ["Joseph", "Daniel", "Nehemiah", "Ezra"],
    answerIndex: 1,
    difficulty: "medium",
  },
  {
    question: "Which chapter of the Bible is known as the \"love chapter\"?",
    options: ["Romans 8", "1 Corinthians 13", "John 3", "Psalm 23"],
    answerIndex: 1,
    difficulty: "medium",
  },
  // ----- Hard (additions) -----
  {
    question: "Who was the priest-king of Salem who blessed Abraham?",
    options: ["Melchizedek", "Jethro", "Balaam", "Abimelech"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "Which couple in Acts died after lying about their offering?",
    options: [
      "Aquila and Priscilla",
      "Ananias and Sapphira",
      "Philemon and Apphia",
      "Andronicus and Junia",
    ],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "In which city were believers first called Christians?",
    options: ["Jerusalem", "Rome", "Antioch", "Ephesus"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Who was the blind beggar Jesus healed near Jericho?",
    options: ["Bartimaeus", "Malchus", "Lazarus", "Aeneas"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "Who was Bathsheba's first husband?",
    options: ["Joab", "Uriah the Hittite", "Nabal", "Ahithophel"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which left-handed judge defeated King Eglon of Moab?",
    options: ["Othniel", "Shamgar", "Ehud", "Tola"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "What is the longest chapter in the Bible?",
    options: ["Psalm 23", "Psalm 90", "Psalm 119", "Isaiah 53"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "What is the shortest book of the Old Testament?",
    options: ["Haggai", "Obadiah", "Nahum", "Malachi"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Who was Ruth's great-grandson?",
    options: ["Saul", "Samuel", "David", "Solomon"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Under which rabbi did Paul study as a Pharisee?",
    options: ["Hillel", "Gamaliel", "Shammai", "Annas"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question:
      "Which Roman centurion's household did Peter baptize in Caesarea?",
    options: ["Julius", "Cornelius", "Longinus", "Claudius"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which church did Jesus call \"lukewarm\" in Revelation?",
    options: ["Sardis", "Thyatira", "Laodicea", "Pergamum"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "How many churches receive letters in Revelation?",
    options: ["Three", "Five", "Seven", "Twelve"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Who was the father of Methuselah?",
    options: ["Enoch", "Lamech", "Jared", "Seth"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "What name did Naomi ask to be called, meaning \"bitter\"?",
    options: ["Mara", "Peninnah", "Keziah", "Zillah"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "Which prophet confronted David about Bathsheba?",
    options: ["Gad", "Samuel", "Nathan", "Ahijah"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Which queen traveled far to test Solomon's wisdom?",
    options: [
      "Queen Vashti",
      "The Queen of Sheba",
      "Queen Athaliah",
      "Candace of Ethiopia",
    ],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question:
      "In what language was most of the Old Testament originally written?",
    options: ["Greek", "Latin", "Aramaic", "Hebrew"],
    answerIndex: 3,
    difficulty: "hard",
  },
  {
    question:
      "What were the names of the two bronze pillars of Solomon's temple?",
    options: [
      "Jachin and Boaz",
      "Urim and Thummim",
      "Gog and Magog",
      "Mahlon and Chilion",
    ],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "Who was Timothy's mother, known for her sincere faith?",
    options: ["Lois", "Eunice", "Phoebe", "Priscilla"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which sorcerer did Paul strike blind on the island of Cyprus?",
    options: ["Simon Magus", "Elymas", "Sceva", "Apollonius"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question:
      "Which king was struck with leprosy for burning incense in the temple?",
    options: ["Ahaz", "Uzziah", "Manasseh", "Jehoram"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Who stole her father Laban's household idols?",
    options: ["Leah", "Rachel", "Dinah", "Zilpah"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which book of the Bible never mentions God by name?",
    options: ["Ruth", "Esther", "Ecclesiastes", "Song of Solomon"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Under which high priest did young Samuel serve?",
    options: ["Eli", "Phinehas", "Abiathar", "Zadok"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "What was Paul's trade?",
    options: ["Fisherman", "Stonemason", "Tentmaker", "Scribe"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question:
      "At which pool did Jesus heal the man who had been sick for 38 years?",
    options: ["Siloam", "Bethesda", "Gihon", "En-rogel"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which prophet was a herdsman from Tekoa?",
    options: ["Hosea", "Micah", "Amos", "Joel"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question: "Which Persian king decreed that the temple be rebuilt?",
    options: ["Xerxes", "Darius", "Artaxerxes", "Cyrus"],
    answerIndex: 3,
    difficulty: "hard",
  },
  {
    question: "Who was the first judge of Israel?",
    options: ["Ehud", "Othniel", "Gideon", "Samson"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Which disciple was known as \"the Zealot\"?",
    options: ["Simon", "Thaddaeus", "James the Less", "Matthias"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question:
      "Who fell from a window during Paul's long sermon and was revived?",
    options: ["Trophimus", "Eutychus", "Tychicus", "Erastus"],
    answerIndex: 1,
    difficulty: "hard",
  },
  {
    question: "Who was King Ahab's wicked queen?",
    options: ["Athaliah", "Herodias", "Jezebel", "Maacah"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question:
      "Which seller of purple cloth believed Paul's message in Philippi?",
    options: ["Lydia", "Dorcas", "Damaris", "Chloe"],
    answerIndex: 0,
    difficulty: "hard",
  },
  {
    question: "On which island was Paul shipwrecked on his way to Rome?",
    options: ["Crete", "Cyprus", "Malta", "Rhodes"],
    answerIndex: 2,
    difficulty: "hard",
  },
  {
    question:
      "Which Ethiopian official did Philip baptize on the desert road?",
    options: [
      "The queen's treasurer (a eunuch)",
      "A royal soldier",
      "The king's scribe",
      "A merchant prince",
    ],
    answerIndex: 0,
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

export const TOTAL_LEVELS = 50;
export const QUESTIONS_PER_LEVEL = 10;
/** Correct answers needed to pass a level and unlock the next one. */
export const PASS_SCORE = 7;

/** Deterministic shuffle (LCG) so every level is a stable, fixed set. */
function seededShuffle<T>(arr: T[], seed: number): T[] {
  const copy = [...arr];
  let state = seed || 1;
  const next = () => {
    state = (Math.imul(state, 1664525) + 1013904223) >>> 0;
    return state / 2 ** 32;
  };
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Difficulty mix for a level. Level 1 is all easy; the mix shifts
 * steadily until level 50 is all hard.
 */
export function levelMix(level: number): {
  easy: number;
  medium: number;
  hard: number;
} {
  const p = (level - 1) / (TOTAL_LEVELS - 1);
  let easy = Math.max(
    0,
    Math.min(QUESTIONS_PER_LEVEL, Math.round(10 * (1 - p * 1.7)))
  );
  let hard = Math.max(
    0,
    Math.min(QUESTIONS_PER_LEVEL, Math.round(10 * (p - 0.32) * 1.5))
  );
  if (easy + hard > QUESTIONS_PER_LEVEL) {
    hard = QUESTIONS_PER_LEVEL - easy;
  }
  return { easy, hard, medium: QUESTIONS_PER_LEVEL - easy - hard };
}

/**
 * The fixed 10-question set for a level, drawn from the difficulty
 * pools with a per-level seed, so replays face the same questions.
 */
export function buildLevelRound(level: number): QuizQuestion[] {
  const mix = levelMix(level);
  const pick = (difficulty: Difficulty, count: number, salt: number) =>
    seededShuffle(
      quizQuestions.filter((q) => q.difficulty === difficulty),
      level * 7919 + salt
    ).slice(0, count);
  return seededShuffle(
    [
      ...pick("easy", mix.easy, 11),
      ...pick("medium", mix.medium, 23),
      ...pick("hard", mix.hard, 37),
    ],
    level * 104729
  );
}
