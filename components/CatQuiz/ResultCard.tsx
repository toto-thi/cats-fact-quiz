"use client"

import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Trophy, RefreshCw } from "lucide-react"

type ResultCardProps = {
  score: number
  total: number
  onPlayAgain: () => void
}

export function ResultCard({ score, total, onPlayAgain }: ResultCardProps) {
  const message =
    score === total
      ? "Purr-fect! You're a cat expert!"
      : score >= total / 2
      ? "Great job! You know your cat facts!"
      : "Keep learning about our feline friends!"

  return (
    <Card className="w-full">
      <CardHeader>
        <CardTitle className="text-center">Quiz Complete!</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <Trophy className="h-16 w-16 text-yellow-500 mb-4" />
        <h2 className="text-2xl font-bold text-center mb-2">
          Your Score: {score}/{total}
        </h2>
        <p className="text-gray-600 text-center mb-6">{message}</p>
      </CardContent>
      <CardFooter>
        <Button onClick={onPlayAgain} className="w-full bg-gray-300 hover:bg-auto">
          <RefreshCw className="mr-2 h-4 w-4" /> Play Again
        </Button>
      </CardFooter>
    </Card>
  )
}
