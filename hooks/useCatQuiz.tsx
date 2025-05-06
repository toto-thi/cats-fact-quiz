import { useState, useEffect } from "react"
import { CatFact, Question } from "@/components/CatQuiz/types"
import { fetchCatFacts } from "@/utils/fetchCatFacts"
import { createQuestions } from "@/utils/createQuestions"

export function useCatQuiz() {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [questions, setQuestions] = useState<Question[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [score, setScore] = useState(0)
  const [showResult, setShowResult] = useState(false)
  const [answered, setAnswered] = useState(false)
  const [round, setRound] = useState(0)

  useEffect(() => {
    setLoading(true)
    setError("")
    fetchCatFacts(30)
      .then((facts: CatFact[]) => {
        const qs = createQuestions(facts)
        setQuestions(qs)
        setCurrentQuestionIndex(0)
        setScore(0)
        setShowResult(false)
        setAnswered(false)
        setSelectedAnswer("")
      })
      .catch(() => {
        setError("Failed to load cat facts. Please try again.")
      })
      .finally(() => {
        setLoading(false)
      })
  }, [round])

  const handleAnswerSelect = (value: string) => {
    setSelectedAnswer(value)
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    if (selectedAnswer === questions[currentQuestionIndex].correctAnswer) {
      setScore((s) => s + 1)
    }
    setAnswered(true)
  }

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((i) => i + 1)
      setSelectedAnswer("")
      setAnswered(false)
    } else {
      setShowResult(true)
    }
  }

  const handleRestart = () => {
    setRound((r) => r + 1)
  }

  const progress = questions.length
    ? ((currentQuestionIndex + 1) / questions.length) * 100
    : 0

  return {
    loading,
    error,
    showResult,
    currentQuestion: questions[currentQuestionIndex],
    currentQuestionIndex,
    questionsLength: questions.length,
    progress,
    score,
    answered,
    selectedAnswer,
    handleAnswerSelect,
    handleSubmit,
    handleNextQuestion,
    handleRestart,
  }
}
