/**
 * Spaced Repetition Logic (SM-2 based)
 *
 * Confidence levels:
 *   Hard → next review in 1 day
 *   Medium → next review in 3 days
 *   Easy → next review in 7 days
 *
 * After the first cycle, intervals multiply by the ease factor.
 */

export type Confidence = "hard" | "medium" | "easy"

interface ProgressInput {
  ease_factor: number
  interval_days: number
  repetitions: number
}

interface ProgressOutput {
  ease_factor: number
  interval_days: number
  repetitions: number
  next_review_at: string
}

const BASE_INTERVALS: Record<Confidence, number> = {
  hard: 1,
  medium: 3,
  easy: 7,
}

const QUALITY_MAP: Record<Confidence, number> = {
  hard: 1,
  medium: 3,
  easy: 5,
}

export function calculateNextReview(
  confidence: Confidence,
  current?: ProgressInput | null
): ProgressOutput {
  const easeFactor = current?.ease_factor ?? 2.5
  const intervalDays = current?.interval_days ?? 0
  const repetitions = current?.repetitions ?? 0
  const quality = QUALITY_MAP[confidence]

  let newInterval: number
  let newReps: number
  let newEase: number

  if (quality >= 3) {
    // Correct response
    if (repetitions === 0) {
      newInterval = BASE_INTERVALS[confidence]
    } else if (repetitions === 1) {
      newInterval = BASE_INTERVALS[confidence] * 2
    } else {
      newInterval = Math.round(intervalDays * easeFactor)
    }
    newReps = repetitions + 1
  } else {
    // Failed — reset
    newReps = 0
    newInterval = BASE_INTERVALS.hard
  }

  // Adjust ease factor using SM-2 formula
  newEase = Math.max(
    1.3,
    easeFactor + (0.1 - (5 - quality) * (0.08 + (5 - quality) * 0.02))
  )

  const nextReview = new Date()
  nextReview.setDate(nextReview.getDate() + newInterval)

  return {
    ease_factor: newEase,
    interval_days: newInterval,
    repetitions: newReps,
    next_review_at: nextReview.toISOString(),
  }
}

/**
 * Check if a flashcard is due for review.
 * A card with no progress is always due.
 */
export function isDueForReview(
  progress?: { next_review_at: string } | null
): boolean {
  if (!progress) return true
  return new Date(progress.next_review_at) <= new Date()
}
