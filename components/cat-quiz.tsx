"use client"

import { useState, useEffect } from "react"
import { Button } from "./ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Cat, Trophy, RefreshCw } from "lucide-react"

type CatFact = {
    fact: string
    length: number
}

type Question = {
    question: string
    options: string[]
    correctAnswer: string
    explanation: string
}

export function CatQuiz() {
    const [loading, setLoading] = useState(true)
    const [catFacts, setCatFacts] = useState<CatFact[]>([])
    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
    const [selectedAnswer, setSelectedAnswer] = useState("")
    const [score, setScore] = useState(0)
    const [showResult, setShowResult] = useState(false)
    const [answered, setAnswered] = useState(false)
    const [error, setError] = useState("")
    const [quizRound, setQuizRound] = useState(0) // Track quiz rounds to force different facts

    useEffect(() => {
        fetchCatFacts()
    }, [quizRound])

    const fetchCatFacts = async () => {
        setLoading(true)
        setError("")
        try {
            // Request more facts and add a random parameter to avoid caching
            // The API doesn't support pagination, but requesting more facts gives us more variety
            const randomParam = Math.floor(Math.random() * 10000)
            const response = await fetch(`https://catfact.ninja/facts?limit=30&random=${randomParam}`)
            const data = await response.json()

            if (!response.ok) {
                throw new Error("Failed to fetch cat facts")
            }

            // Shuffle the facts to get different ones each time
            const shuffledFacts = data.data.sort(() => Math.random() - 0.5)
            setCatFacts(shuffledFacts)

            // Create questions with the facts as context
            const generatedQuestions = createQuestions(shuffledFacts)
            setQuestions(generatedQuestions)
            setCurrentQuestionIndex(0)
            setScore(0)
            setShowResult(false)
            setAnswered(false)
            setSelectedAnswer("")
        } catch (err) {
            setError("Failed to load cat facts. Please try again.")
            console.error(err)
        } finally {
            setLoading(false)
        }
    }

    const createQuestions = (facts: CatFact[]): Question[] => {
        // Create predefined questions based on common cat knowledge
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
    
        // Create more varied question types from the facts
        const factBasedQuestions: Question[] = []
    
        // Process each fact to create different question types
        facts.forEach((fact, index) => {
          // Skip duplicate facts
          if (facts.findIndex((f) => f.fact === fact.fact) !== index) {
            return
          }
    
          const factText = fact.fact.toLowerCase()
          let question: Question | null = null
    
          // Create different question types based on the content of the fact
          if (factText.includes("whiskers") || factText.includes("vibrissae")) {
            question = {
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
          } else if (factText.includes("purr") || factText.includes("purring")) {
            question = {
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
            factText.includes("night") ||
            factText.includes("dark") ||
            factText.includes("vision") ||
            factText.includes("see")
          ) {
            question = {
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
          } else if (factText.includes("water") || factText.includes("swim")) {
            question = {
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
          } else if (factText.includes("tail")) {
            question = {
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
          } else if (factText.includes("meow") || factText.includes("vocalization")) {
            question = {
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
            // For facts that don't match specific patterns, create different question formats
            // Alternate between different question formats based on the index
            const questionType = index % 3
    
            if (questionType === 0) {
              // True/False question
              question = {
                question: `True or False: ${fact.fact}`,
                options: ["True", "False"],
                correctAnswer: "True",
                explanation: `This is a true fact about cats: ${fact.fact}`,
              }
            } else if (questionType === 1) {
              // Fill in the blank question
              const words = fact.fact.split(" ")
              const randomIndex = Math.floor(Math.random() * (words.length - 2)) + 1
              const missingWord = words[randomIndex]
    
              // Don't use very short or common words
              if (
                missingWord.length > 3 &&
                !["the", "and", "that", "with", "for", "are", "can"].includes(missingWord.toLowerCase())
              ) {
                const blankFact = [...words.slice(0, randomIndex), "________", ...words.slice(randomIndex + 1)].join(" ")
    
                // Generate plausible wrong answers
                const wrongAnswers = generatePlausibleWords(missingWord)
    
                question = {
                  question: `Fill in the blank: ${blankFact}`,
                  options: [missingWord, ...wrongAnswers].sort(() => Math.random() - 0.5),
                  correctAnswer: missingWord,
                  explanation: `The complete fact is: ${fact.fact}`,
                }
              }
            } else {
              // Which statement is true question
              question = {
                question: "Which of these statements about cats is true?",
                options: [fact.fact, generateFalseCatFact(), generateFalseCatFact(), generateFalseCatFact()].sort(
                  () => Math.random() - 0.5,
                ),
                correctAnswer: fact.fact,
                explanation: `This is a true fact about cats: ${fact.fact}`,
              }
            }
          }
    
          // Add the question if it was successfully created
          if (question) {
            factBasedQuestions.push(question)
          }
        })
    
        // Ensure we have enough fact-based questions
        if (factBasedQuestions.length < 3) {
          console.warn("Not enough fact-based questions generated, adding more predefined questions")
        }
    
        // Shuffle both question sets
        const shuffledPredefined = [...predefinedQuestions].sort(() => Math.random() - 0.5)
        const shuffledFactBased = [...factBasedQuestions].sort(() => Math.random() - 0.5)
    
        // Determine how many of each type to include (always ensuring at least 2 fact-based if available)
        const numFactBased = Math.max(2, Math.min(3, shuffledFactBased.length))
        const numPredefined = 5 - numFactBased
    
        // Combine the selected questions and shuffle again
        return [...shuffledPredefined.slice(0, numPredefined), ...shuffledFactBased.slice(0, numFactBased)].sort(
          () => Math.random() - 0.5,
        )
    }

    const generatePlausibleWords = (word: string): string[] => {
        // Generate plausible but incorrect words for fill-in-the-blank questions
        const catRelatedWords = [
          "whiskers",
          "paws",
          "claws",
          "tail",
          "fur",
          "meow",
          "purr",
          "kitten",
          "feline",
          "domestic",
          "wild",
          "predator",
          "nocturnal",
          "agile",
          "independent",
          "territorial",
          "sensitive",
          "flexible",
          "retractable",
          "carnivore",
          "hunter",
          "grooming",
          "scratching",
          "climbing",
          "jumping",
        ]
    
        // Filter out the correct word and words too similar to it
        const filteredWords = catRelatedWords.filter(
          (w) => w !== word.toLowerCase() && !w.includes(word.toLowerCase()) && !word.toLowerCase().includes(w),
        )
    
        // Return 3 random words
        return filteredWords.sort(() => Math.random() - 0.5).slice(0, 3)
    }

    const generateFalseCatFact = (): string => {
        const falseFacts = [
          "Cats have exactly nine lives due to their exceptional reflexes and survival instincts.",
          "Cats cannot taste sweetness because they lack the necessary taste receptors.",
          "All cats are born with blue eyes that change color as they age.",
          "Cats purr only when they are happy or content.",
          "A cat's heart beats twice as fast as a human heart, at 240 beats per minute.",
          "Cats cannot see color, they only see in black and white.",
          "Cats have five toes on their front paws but only four on their back paws.",
          "Cats lose their ability to land on their feet if they fall from heights greater than 7 stories.",
          "The average house cat can run faster than Usain Bolt at top speed.",
          "Cats have a third eyelid that glows in the dark to help with night vision.",
          "Cats can predict earthquakes up to 10 minutes before they occur.",
          "A cat's brain is more similar to a human's brain than a dog's brain.",
          "Cats were domesticated only 500 years ago, making them one of the most recently domesticated animals.",
          "Cats cannot feel pain in their tails, which is why they don't mind having them pulled.",
          "All calico cats are female without exception.",
          "Cats have perfect memory recall and can remember every human they've ever met.",
          "Cats can see perfectly in complete darkness with no light source.",
          "A cat's whiskers will grow back if trimmed, but they will be a different color.",
          "Cats cannot contract or transmit any human diseases.",
          "Cats only meow when they are hungry or in pain.",
        ]
    
        return falseFacts[Math.floor(Math.random() * falseFacts.length)]
    }

}