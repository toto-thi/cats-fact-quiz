"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Cat } from "lucide-react"

export function LoadingState() {
  return (
    <Card className="w-full">
      <CardContent className="pt-6 flex flex-col items-center justify-center min-h-[300px]">
        <Cat className="h-12 w-12 text-purple-600 animate-pulse mb-4" />
        <p className="text-gray-600">Loading cat facts…</p>
      </CardContent>
    </Card>
  )
}
