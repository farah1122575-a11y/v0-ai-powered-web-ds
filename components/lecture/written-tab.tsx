"use client"

import { useState } from "react"
import {
  PenLine,
  Eye,
  EyeOff,
  Send,
  RotateCcw,
  CheckCircle2,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface WrittenTabProps {
  writtenQuestions: {
    id: string
    question: string
    model_answer: string
  }[]
  userId: string
}

const SCORE_LABELS = [
  { value: 1, label: "Poor", color: "border-destructive/50 text-destructive hover:bg-destructive/10" },
  { value: 2, label: "Weak", color: "border-orange-500/50 text-orange-600 hover:bg-orange-500/10" },
  { value: 3, label: "Average", color: "border-muted-foreground/50 text-muted-foreground hover:bg-muted" },
  { value: 4, label: "Good", color: "border-primary/50 text-primary hover:bg-primary/10" },
  { value: 5, label: "Excellent", color: "border-primary text-primary hover:bg-primary/10" },
]

export function WrittenTab({ writtenQuestions, userId }: WrittenTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userAnswer, setUserAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const [showModelAnswer, setShowModelAnswer] = useState(false)
  const [selfScore, setSelfScore] = useState<number | null>(null)
  const [completed, setCompleted] = useState<Set<string>>(new Set())
  const [saving, setSaving] = useState(false)

  const question = writtenQuestions[currentIndex]
  const progress = (completed.size / writtenQuestions.length) * 100

  const handleSubmit = () => {
    if (!userAnswer.trim()) return
    setSubmitted(true)
    setShowModelAnswer(true)
  }

  const handleSelfScore = async (score: number) => {
    if (!question || !userId) return
    setSelfScore(score)
    setSaving(true)

    const supabase = createClient()
    await supabase.from("written_attempts").insert({
      user_id: userId,
      written_question_id: question.id,
      user_answer: userAnswer,
      self_score: score,
    })

    setCompleted(new Set([...completed, question.id]))
    setSaving(false)
  }

  const nextQuestion = () => {
    if (currentIndex < writtenQuestions.length - 1) {
      setCurrentIndex(currentIndex + 1)
      resetState()
    }
  }

  const prevQuestion = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1)
      resetState()
    }
  }

  const resetState = () => {
    setUserAnswer("")
    setSubmitted(false)
    setShowModelAnswer(false)
    setSelfScore(null)
  }

  const restart = () => {
    setCurrentIndex(0)
    setCompleted(new Set())
    resetState()
  }

  if (writtenQuestions.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <PenLine className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No written questions for this lecture yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (completed.size === writtenQuestions.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <CheckCircle2 className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">All questions answered!</h3>
          <p className="text-sm text-muted-foreground">
            {"You've completed all"} {writtenQuestions.length} written questions.
          </p>
          <Button onClick={restart}>
            <RotateCcw className="mr-2 h-4 w-4" />
            Start Over
          </Button>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {/* Progress */}
      <div className="flex items-center gap-3">
        <Progress value={progress} className="h-2 flex-1" />
        <span className="text-sm text-muted-foreground">
          {completed.size}/{writtenQuestions.length}
        </span>
      </div>

      {/* Question */}
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2 text-base">
              <PenLine className="h-4 w-4 text-primary" />
              Question {currentIndex + 1} of {writtenQuestions.length}
            </CardTitle>
            {completed.has(question.id) && (
              <Badge variant="secondary" className="text-xs">
                Completed
              </Badge>
            )}
          </div>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <p className="text-sm font-medium leading-relaxed">{question.question}</p>

          {/* User answer area */}
          <Textarea
            placeholder="Write your answer here..."
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            className="min-h-[150px] resize-y"
            disabled={submitted}
          />

          {!submitted && (
            <Button
              onClick={handleSubmit}
              disabled={!userAnswer.trim()}
              className="self-end gap-2"
            >
              <Send className="h-4 w-4" />
              Submit Answer
            </Button>
          )}

          {/* Model answer toggle */}
          {submitted && (
            <div className="flex flex-col gap-4">
              <Button
                variant="outline"
                onClick={() => setShowModelAnswer(!showModelAnswer)}
                className="gap-2 self-start"
              >
                {showModelAnswer ? (
                  <EyeOff className="h-4 w-4" />
                ) : (
                  <Eye className="h-4 w-4" />
                )}
                {showModelAnswer ? "Hide" : "Show"} Model Answer
              </Button>

              {showModelAnswer && (
                <div className="rounded-lg border bg-muted/50 p-4">
                  <p className="mb-2 text-xs font-medium text-primary">Model Answer</p>
                  <p className="whitespace-pre-wrap text-sm leading-relaxed text-muted-foreground">
                    {question.model_answer}
                  </p>
                </div>
              )}

              {/* Self evaluation */}
              {!selfScore && (
                <div className="flex flex-col gap-3">
                  <p className="text-sm font-medium">
                    Rate your answer (compare with the model answer):
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {SCORE_LABELS.map((s) => (
                      <Button
                        key={s.value}
                        variant="outline"
                        size="sm"
                        onClick={() => handleSelfScore(s.value)}
                        disabled={saving}
                        className={cn("gap-1.5", s.color)}
                      >
                        {s.value} - {s.label}
                      </Button>
                    ))}
                  </div>
                </div>
              )}

              {selfScore && (
                <div className="rounded-lg border bg-primary/5 p-3">
                  <p className="text-sm font-medium text-primary">
                    Self-evaluation: {selfScore}/5 -{" "}
                    {SCORE_LABELS.find((s) => s.value === selfScore)?.label}
                  </p>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={prevQuestion}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={nextQuestion}
          disabled={currentIndex === writtenQuestions.length - 1}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
