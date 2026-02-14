"use client"

import { useState } from "react"
import { CheckCircle2, XCircle, ClipboardCheck, RotateCcw } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface McqTabProps {
  mcqs: {
    id: string
    question: string
    options: string[]
    correct_answer: number
    explanation: string
  }[]
  userId: string
}

export function McqTab({ mcqs, userId }: McqTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [selectedAnswer, setSelectedAnswer] = useState<number | null>(null)
  const [showResult, setShowResult] = useState(false)
  const [score, setScore] = useState({ correct: 0, total: 0 })
  const [finished, setFinished] = useState(false)

  const mcq = mcqs[currentIndex]

  const handleAnswer = async (answerIndex: number) => {
    if (showResult) return
    setSelectedAnswer(answerIndex)
    setShowResult(true)

    const isCorrect = answerIndex === mcq.correct_answer
    setScore((s) => ({
      correct: s.correct + (isCorrect ? 1 : 0),
      total: s.total + 1,
    }))

    const supabase = createClient()
    await supabase.from("mcq_attempts").insert({
      user_id: userId,
      mcq_id: mcq.id,
      selected_answer: answerIndex,
      is_correct: isCorrect,
    })
  }

  const nextQuestion = () => {
    if (currentIndex < mcqs.length - 1) {
      setCurrentIndex(currentIndex + 1)
      setSelectedAnswer(null)
      setShowResult(false)
    } else {
      setFinished(true)
    }
  }

  const restart = () => {
    setCurrentIndex(0)
    setSelectedAnswer(null)
    setShowResult(false)
    setScore({ correct: 0, total: 0 })
    setFinished(false)
  }

  if (mcqs.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <ClipboardCheck className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No MCQs for this lecture yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (finished) {
    const percentage = Math.round((score.correct / score.total) * 100)
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div
            className={cn(
              "flex h-20 w-20 items-center justify-center rounded-full text-2xl font-bold",
              percentage >= 70
                ? "bg-primary/10 text-primary"
                : "bg-destructive/10 text-destructive"
            )}
          >
            {percentage}%
          </div>
          <h3 className="text-xl font-bold">Quiz Complete!</h3>
          <p className="text-muted-foreground">
            You got {score.correct} out of {score.total} correct.
          </p>
          <Button onClick={restart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Try Again
          </Button>
        </CardContent>
      </Card>
    )
  }

  const options: string[] = typeof mcq.options === "string" ? JSON.parse(mcq.options) : mcq.options

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <span className="text-sm text-muted-foreground">
          Question {currentIndex + 1} of {mcqs.length}
        </span>
        <span className="text-sm text-muted-foreground">
          Score: {score.correct}/{score.total}
        </span>
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base font-medium leading-relaxed">
            {mcq.question}
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-2">
          {options.map((option: string, idx: number) => {
            const isSelected = selectedAnswer === idx
            const isCorrect = idx === mcq.correct_answer
            let variant = "outline" as const

            return (
              <button
                key={idx}
                onClick={() => handleAnswer(idx)}
                disabled={showResult}
                className={cn(
                  "flex items-center gap-3 rounded-lg border p-3 text-left text-sm transition-colors",
                  !showResult && "hover:bg-accent",
                  showResult && isCorrect && "border-primary bg-primary/5",
                  showResult && isSelected && !isCorrect && "border-destructive bg-destructive/5"
                )}
              >
                <span
                  className={cn(
                    "flex h-6 w-6 shrink-0 items-center justify-center rounded-full border text-xs font-medium",
                    showResult && isCorrect && "border-primary bg-primary text-primary-foreground",
                    showResult && isSelected && !isCorrect && "border-destructive bg-destructive text-destructive-foreground",
                    !showResult && "border-muted-foreground/30"
                  )}
                >
                  {showResult && isCorrect ? (
                    <CheckCircle2 className="h-3.5 w-3.5" />
                  ) : showResult && isSelected ? (
                    <XCircle className="h-3.5 w-3.5" />
                  ) : (
                    String.fromCharCode(65 + idx)
                  )}
                </span>
                <span>{option}</span>
              </button>
            )
          })}

          {showResult && mcq.explanation && (
            <div className="mt-3 rounded-lg border bg-muted/50 p-3">
              <p className="text-xs font-medium text-primary">Explanation</p>
              <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                {mcq.explanation}
              </p>
            </div>
          )}

          {showResult && (
            <Button onClick={nextQuestion} className="mt-2 self-end">
              {currentIndex < mcqs.length - 1 ? "Next Question" : "See Results"}
            </Button>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
