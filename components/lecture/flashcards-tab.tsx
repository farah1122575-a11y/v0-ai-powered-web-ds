"use client"

import { useState } from "react"
import { RotateCcw, ChevronLeft, ChevronRight, ThumbsDown, Minus, ThumbsUp, Trophy } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Progress } from "@/components/ui/progress"
import { createClient } from "@/lib/supabase/client"

interface FlashcardsTabProps {
  flashcards: { id: string; front: string; back: string; order_index: number }[]
  flashcardProgress: Record<
    string,
    {
      ease_factor: number
      interval_days: number
      repetitions: number
      next_review_at: string
    }
  >
  userId: string
  lectureId: string
}

export function FlashcardsTab({
  flashcards,
  flashcardProgress,
  userId,
  lectureId,
}: FlashcardsTabProps) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isFlipped, setIsFlipped] = useState(false)
  const [completed, setCompleted] = useState<Set<string>>(new Set())

  const card = flashcards[currentIndex]
  const progress = ((completed.size) / flashcards.length) * 100

  const handleConfidence = async (quality: number) => {
    if (!card) return
    const supabase = createClient()

    const existing = flashcardProgress[card.id]
    let newEase = existing?.ease_factor ?? 2.5
    let newInterval = existing?.interval_days ?? 0
    let newReps = existing?.repetitions ?? 0

    // SM-2 simplified
    if (quality >= 3) {
      if (newReps === 0) newInterval = 1
      else if (newReps === 1) newInterval = 6
      else newInterval = Math.round(newInterval * newEase)
      newReps += 1
    } else {
      newReps = 0
      newInterval = 0
    }

    newEase = Math.max(1.3, newEase + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02)))

    const nextReview = new Date()
    nextReview.setDate(nextReview.getDate() + newInterval)

    await supabase.from("flashcard_progress").upsert(
      {
        user_id: userId,
        flashcard_id: card.id,
        ease_factor: newEase,
        interval_days: newInterval,
        repetitions: newReps,
        next_review_at: nextReview.toISOString(),
        last_reviewed_at: new Date().toISOString(),
      },
      { onConflict: "user_id,flashcard_id" }
    )

    setCompleted(new Set([...completed, card.id]))
    setIsFlipped(false)
    if (currentIndex < flashcards.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (flashcards.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <RotateCcw className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No flashcards for this lecture yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  if (completed.size === flashcards.length) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-4 py-16 text-center">
          <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary/10">
            <Trophy className="h-8 w-8 text-primary" />
          </div>
          <h3 className="text-xl font-bold">All cards reviewed!</h3>
          <p className="text-sm text-muted-foreground">
            {"You've completed all"} {flashcards.length} flashcards in this set.
          </p>
          <Button
            onClick={() => {
              setCompleted(new Set())
              setCurrentIndex(0)
              setIsFlipped(false)
            }}
          >
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
          {completed.size}/{flashcards.length}
        </span>
      </div>

      {/* Card */}
      <button
        onClick={() => setIsFlipped(!isFlipped)}
        className="w-full text-left"
      >
        <Card className="min-h-[280px] cursor-pointer transition-all hover:border-primary/30">
          <CardContent className="flex h-full min-h-[280px] flex-col items-center justify-center p-8 text-center">
            <p className="mb-4 text-xs font-medium uppercase tracking-wider text-muted-foreground">
              {isFlipped ? "Answer" : "Question"} - Card {currentIndex + 1} of{" "}
              {flashcards.length}
            </p>
            <p className="text-lg leading-relaxed">
              {isFlipped ? card.back : card.front}
            </p>
            {!isFlipped && (
              <p className="mt-6 text-xs text-muted-foreground">
                Click to reveal answer
              </p>
            )}
          </CardContent>
        </Card>
      </button>

      {/* Confidence buttons */}
      {isFlipped && (
        <div className="flex items-center justify-center gap-3">
          <Button
            variant="outline"
            onClick={() => handleConfidence(1)}
            className="gap-2 border-destructive/30 text-destructive hover:bg-destructive/10 hover:text-destructive"
          >
            <ThumbsDown className="h-4 w-4" />
            Hard
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConfidence(3)}
            className="gap-2"
          >
            <Minus className="h-4 w-4" />
            Okay
          </Button>
          <Button
            variant="outline"
            onClick={() => handleConfidence(5)}
            className="gap-2 border-primary/30 text-primary hover:bg-primary/10 hover:text-primary"
          >
            <ThumbsUp className="h-4 w-4" />
            Easy
          </Button>
        </div>
      )}

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setCurrentIndex(Math.max(0, currentIndex - 1))
            setIsFlipped(false)
          }}
          disabled={currentIndex === 0}
        >
          <ChevronLeft className="mr-1 h-4 w-4" />
          Previous
        </Button>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => {
            setCurrentIndex(Math.min(flashcards.length - 1, currentIndex + 1))
            setIsFlipped(false)
          }}
          disabled={currentIndex === flashcards.length - 1}
        >
          Next
          <ChevronRight className="ml-1 h-4 w-4" />
        </Button>
      </div>
    </div>
  )
}
