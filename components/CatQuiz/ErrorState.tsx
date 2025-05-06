"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertCircle } from "lucide-react"

type ErrorStateProps = {
  message: string
  onRetry: () => void
}

export function ErrorState({ message, onRetry }: ErrorStateProps) {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
        <AlertCircle className="h-6 w-6 text-red-500 mb-2" />
        <p className="text-red-500 mb-4">{message}</p>
        <Button onClick={onRetry}>Try Again</Button>
      </CardContent>
    </Card>
  )
}
