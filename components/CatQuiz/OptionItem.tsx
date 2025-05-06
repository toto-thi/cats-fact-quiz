"use client"

import { RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

type OptionItemProps = {
  option: string
  index: number
  selectedAnswer: string
  answered: boolean
  correctAnswer: string
}

export function OptionItem({
  option,
  index,
  selectedAnswer,
  answered,
  correctAnswer,
}: OptionItemProps) {
  const isSelected = selectedAnswer === option
  const isCorrect = option === correctAnswer

  let borderClasses = "border-gray-200"
  let bgClasses = !answered ? "hover:bg-gray-50" : "border-gray-200"

  if (answered) {
    if (isCorrect) {
      borderClasses = "border-green-500"
      bgClasses = "bg-green-50"
    } else if (isSelected && !isCorrect) {
      borderClasses = "border-red-500"
      bgClasses = "bg-red-50"
    }
  }

  return (
    <div
      className={`flex items-center space-x-2 rounded-lg border p-3 transition-colors ${borderClasses} ${bgClasses}`}
    >
      <RadioGroupItem
        value={option}
        id={`option-${index}`}
        disabled={answered}
        className="text-purple-600"
      />
      <Label
        htmlFor={`option-${index}`}
        className={`flex-grow cursor-pointer ${
          answered && isCorrect ? "font-medium" : ""
        }`}
      >
        {option}
      </Label>
    </div>
  )
}
