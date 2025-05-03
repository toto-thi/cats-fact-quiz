"use client"

import { useState, useEffect } from "react"

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
    
        } catch (err) {
          setError("Failed to load cat facts. Please try again.")
          console.error(err)
        } finally {
          setLoading(false)
        }
    }
}