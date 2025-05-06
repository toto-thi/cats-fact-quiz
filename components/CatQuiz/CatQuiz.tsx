"use client"

import { LoadingState } from "./LoadingState"
import { ErrorState } from "./ErrorState"
import { QuestionCard } from "./QuestionCard"
import { ResultCard } from "./ResultCard"
import { useCatQuiz } from "@/hooks/useCatQuiz"

export function CatQuiz() {
  const {
    loading,
    error,
    showResult,
    currentQuestion,
    currentQuestionIndex,
    questionsLength,
    progress,
    score,
    answered,
    selectedAnswer,
    handleAnswerSelect,
    handleSubmit,
    handleNextQuestion,
    handleRestart,
  } = useCatQuiz()

  if (loading) {
    return <LoadingState />
  }

  if (error) {
    return <ErrorState message={error} onRetry={handleRestart} />
  }

  if (showResult) {
    return (
      <ResultCard
        score={score}
        total={questionsLength}
        onPlayAgain={handleRestart}
      />
    )
  }

  return (
    <QuestionCard
      question={currentQuestion}
      questionNumber={currentQuestionIndex + 1}
      totalQuestions={questionsLength}
      progress={progress}
      score={score}
      answered={answered}
      selectedAnswer={selectedAnswer}
      onSelect={handleAnswerSelect}
      onSubmit={handleSubmit}
      onNext={handleNextQuestion}
    />
  )
}
