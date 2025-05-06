import { CatFact, Question } from "@/components/CatQuiz/types"
import { generatePlausibleWords, generateFalseCatFact } from "./factGenerators"

export function createQuestions(facts: CatFact[]): Question[] {
  const predefinedQuestions: Question[] = [
    {
      question: "What is the average lifespan of an indoor cat?",
      options: ["5-8 years", "10-15 years", "15-20 years", "20-25 years"],
      correctAnswer: "15-20 years",
      explanation:
        "Indoor cats typically live between 15-20 years, while outdoor cats often live only 2-5 years due to various hazards.",
    },
    {
      question: "How many hours do cats typically sleep each day?",
      options: ["8-10 hours", "12-16 hours", "16-20 hours", "20-22 hours"],
      correctAnswer: "12-16 hours",
      explanation:
        "Cats sleep an average of 12-16 hours per day, with some cats sleeping up to 20 hours, especially as they get older.",
    },
    {
      question: "What is a group of cats called?",
      options: ["A clowder", "A pack", "A pride", "A colony"],
      correctAnswer: "A clowder",
      explanation: "A group of cats is called a clowder. A group of kittens is called a kindle.",
    },
    {
      question: "How many muscles do cats have in each ear?",
      options: ["12", "20", "32", "40"],
      correctAnswer: "32",
      explanation:
        "Cats have 32 muscles in each ear, allowing them to rotate their ears 180 degrees to locate sounds precisely.",
    },
    {
      question: "What is special about a cat's tongue?",
      options: [
        "It has tiny hooks that act like a brush",
        "It changes color based on mood",
        "It can detect sweetness unlike other cats",
        "It is completely smooth",
      ],
      correctAnswer: "It has tiny hooks that act like a brush",
      explanation:
        "A cat's tongue has tiny backward-facing hooks called papillae that help them groom themselves and strip meat from bones.",
    },
    {
      question: "Which of these is NOT a cat breed?",
      options: ["Maine Coon", "Norwegian Forest Cat", "Alpine Shepherd", "Siberian"],
      correctAnswer: "Alpine Shepherd",
      explanation: "Alpine Shepherd is not a cat breed - it's a made-up name. The others are all real cat breeds.",
    },
    {
      question: "What percentage of a cat's bones are in its tail?",
      options: ["5%", "10%", "15%", "20%"],
      correctAnswer: "10%",
      explanation: "About 10% of a cat's bones are in its tail. Cats have approximately 230 bones in total.",
    },
    {
      question: "What is unique about a cat's collar bone?",
      options: [
        "Cats don't have collar bones",
        "It's not attached to other bones",
        "It's the strongest bone in their body",
        "It grows throughout their life",
      ],
      correctAnswer: "It's not attached to other bones",
      explanation:
        "A cat's collar bone (clavicle) is not attached to other bones, which allows them to squeeze through any space the size of their head.",
    },
    {
      question: "What is special about a cat's hearing?",
      options: [
        "They can hear ultrasonic sounds",
        "They can only hear low frequencies",
        "They lose hearing ability after age 5",
        "They can't hear when sleeping",
      ],
      correctAnswer: "They can hear ultrasonic sounds",
      explanation:
        "Cats can hear ultrasonic sounds that humans and even dogs cannot detect, including the sounds made by small rodents.",
    },
    {
      question: "How fast can the average house cat run?",
      options: ["15 mph", "20 mph", "30 mph", "40 mph"],
      correctAnswer: "30 mph",
      explanation:
        "The average house cat can run at speeds of about 30 mph (48 km/h) for short distances, which is faster than the fastest human sprinters.",
    },
  ]

  const factBasedQuestions: Question[] = []

  facts.forEach((fact, index) => {
    // avoid duplicates
    if (facts.findIndex((f) => f.fact === fact.fact) !== index) return

    const text = fact.fact.toLowerCase()
    let q: Question | null = null

    if (text.includes("whiskers") || text.includes("vibrissae")) {
      q = {
        question: "What is the primary function of a cat's whiskers?",
        options: [
          "To measure if they can fit through openings",
          "To detect air movements",
          "To maintain balance",
          "All of the above",
        ],
        correctAnswer: "All of the above",
        explanation:
          "Cat whiskers (vibrissae) help them measure openings, detect air movements, and maintain balance. They're sensitive sensory organs, not just hairs.",
      }
    } else if (text.includes("purr") || text.includes("purring")) {
      q = {
        question: "Why do cats purr?",
        options: [
          "Only when they're happy",
          "To communicate with other cats",
          "For multiple reasons including self-healing",
          "To mark territory",
        ],
        correctAnswer: "For multiple reasons including self-healing",
        explanation:
          "Cats purr not just when content, but also when injured or stressed. The vibration frequency (25-150Hz) can promote healing and bone growth.",
      }
    } else if (
      text.includes("night") ||
      text.includes("dark") ||
      text.includes("vision") ||
      text.includes("see")
    ) {
      q = {
        question: "How well can cats see in the dark compared to humans?",
        options: [
          "About the same as humans",
          "2-3 times better than humans",
          "6-8 times better than humans",
          "Cats can see perfectly in complete darkness",
        ],
        correctAnswer: "6-8 times better than humans",
        explanation:
          "Cats have 6-8 times better night vision than humans due to a reflective layer (tapetum lucidum) behind their retinas and more rod cells for low-light vision.",
      }
    } else if (text.includes("water") || text.includes("swim")) {
      q = {
        question: "Which statement about cats and water is true?",
        options: [
          "All cats hate water and cannot swim",
          "Cats can swim naturally but many dislike getting wet",
          "Domestic cats enjoy swimming more than wild cats",
          "Cats are physically unable to swim",
        ],
        correctAnswer: "Cats can swim naturally but many dislike getting wet",
        explanation:
          "Most cats can swim if necessary, but many dislike water because wet fur is uncomfortable and heavy. Some breeds like Turkish Vans actually enjoy swimming.",
      }
    } else if (text.includes("tail")) {
      q = {
        question: "What do cats primarily use their tails for?",
        options: [
          "Only for balance",
          "Only for communication",
          "Both balance and communication",
          "Primarily for hunting",
        ],
        correctAnswer: "Both balance and communication",
        explanation:
          "A cat's tail helps with balance during climbing and running, and is also used to communicate mood and intentions to other cats and humans.",
      }
    } else if (text.includes("meow") || text.includes("vocalization")) {
      q = {
        question: "Which statement about cat meows is true?",
        options: [
          "Adult cats meow primarily to communicate with other cats",
          "Cats developed meowing mainly to communicate with humans",
          "All cat breeds meow with the same frequency and tone",
          "Wild cats meow more frequently than domestic cats",
        ],
        correctAnswer: "Cats developed meowing mainly to communicate with humans",
        explanation:
          "Adult cats rarely meow at each other - they developed meowing primarily as a way to communicate with humans. Kittens meow to their mothers, but generally stop cat-to-cat meowing as they grow up.",
      }
    } else {
      const type = index % 3
      if (type === 0) {
        q = {
          question: `True or False: ${fact.fact}`,
          options: ["True", "False"],
          correctAnswer: "True",
          explanation: `This is a true fact about cats: ${fact.fact}`,
        }
      } else if (type === 1) {
        const words = fact.fact.split(" ")
        const randIdx = Math.floor(Math.random() * (words.length - 2)) + 1
        const missing = words[randIdx]

        if (
          missing.length > 3 &&
          !["the", "and", "that", "with", "for", "are", "can"].includes(
            missing.toLowerCase()
          )
        ) {
          const blank = [
            ...words.slice(0, randIdx),
            "________",
            ...words.slice(randIdx + 1),
          ].join(" ")
          const wrongs = generatePlausibleWords(missing)

          q = {
            question: `Fill in the blank: ${blank}`,
            options: [missing, ...wrongs].sort(() => Math.random() - 0.5),
            correctAnswer: missing,
            explanation: `The complete fact is: ${fact.fact}`,
          }
        }
      } else {
        q = {
          question: "Which of these statements about cats is true?",
          options: [
            fact.fact,
            generateFalseCatFact(),
            generateFalseCatFact(),
            generateFalseCatFact(),
          ].sort(() => Math.random() - 0.5),
          correctAnswer: fact.fact,
          explanation: `This is a true fact about cats: ${fact.fact}`,
        }
      }
    }

    if (q) factBasedQuestions.push(q)
  })

  const predefs = [...predefinedQuestions].sort(() => Math.random() - 0.5)
  const factsQ = [...factBasedQuestions].sort(() => Math.random() - 0.5)
  const numFact = Math.max(2, Math.min(3, factsQ.length))
  const numPre = 5 - numFact

  return [...predefs.slice(0, numPre), ...factsQ.slice(0, numFact)].sort(
    () => Math.random() - 0.5
  )
}
