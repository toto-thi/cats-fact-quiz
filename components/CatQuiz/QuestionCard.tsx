"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { RadioGroup } from "@/components/ui/radio-group"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { AlertCircle, CheckCircle2 } from "lucide-react"
import { Question } from "./types"
import { OptionItem } from "./OptionItem"

type QuestionCardProps = {
  question: Question
  questionNumber: number
  totalQuestions: number
  progress: number
  score: number
  answered: boolean
  selectedAnswer: string
  onSelect: (value: string) => void
  onSubmit: () => void
  onNext: () => void
}

export function QuestionCard({
  question,
  questionNumber,
  totalQuestions,
  progress,
  score,
  answered,
  selectedAnswer,
  onSelect,
  onSubmit,
  onNext,
}: QuestionCardProps) {
  return (
    <Card className="w-full">
      <CardHeader>
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm text-gray-500">
            Question {questionNumber}/{totalQuestions}
          </span>
          <span className="text-sm text-gray-500">Score: {score}</span>
        </div>
        <Progress value={progress} className="h-2" />
        <CardTitle className="mt-4">{question.question}</CardTitle>
      </CardHeader>
      <CardContent>
        <RadioGroup
          value={selectedAnswer}
          onValueChange={onSelect}
          className="space-y-3"
        >
          {question.options.map((opt, idx) => (
            <OptionItem
              key={idx}
              option={opt}
              index={idx}
              selectedAnswer={selectedAnswer}
              answered={answered}
              correctAnswer={question.correctAnswer}
            />
          ))}
        </RadioGroup>

        {answered && (
          <Alert
            className={`mt-4 ${
              selectedAnswer === question.correctAnswer
                ? "bg-green-50"
                : "bg-amber-50"
            }`}
          >
            <div className="flex items-start gap-2">
              {selectedAnswer === question.correctAnswer ? (
                <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              ) : (
                <AlertCircle className="h-5 w-5 text-amber-600 mt-0.5" />
              )}
              <AlertDescription className="text-sm">
                <span className="font-medium">
                  {selectedAnswer === question.correctAnswer
                    ? "Correct! "
                    : "Not quite. "}
                </span>
                {question.explanation}
              </AlertDescription>
            </div>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        {!answered ? (
          <Button
            onClick={onSubmit}
            disabled={!selectedAnswer}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white"
          >
            Submit Answer
          </Button>
        ) : (
          <Button onClick={onNext} className="w-full bg-purple-600 hover:bg-purple-700">
            {questionNumber < totalQuestions ? "Next Question" : "See Results"}
          </Button>
        )}
      </CardFooter>
    </Card>
  )
}
