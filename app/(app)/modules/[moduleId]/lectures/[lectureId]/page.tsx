import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import { LectureContent } from "@/components/lecture/lecture-content"

export default async function LecturePage({
  params,
}: {
  params: Promise<{ moduleId: string; lectureId: string }>
}) {
  const { moduleId, lectureId } = await params
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [
    { data: lecture },
    { data: flashcards },
    { data: mcqs },
    { data: writtenQuestions },
    { data: notes },
    { data: diagrams },
    { data: youtubeVideos },
    { data: slides },
  ] = await Promise.all([
    supabase
      .from("lectures")
      .select("*, subjects(*, modules(*))")
      .eq("id", lectureId)
      .single(),
    supabase
      .from("flashcards")
      .select("*")
      .eq("lecture_id", lectureId)
      .order("order_index"),
    supabase.from("mcqs").select("*").eq("lecture_id", lectureId),
    supabase.from("written_questions").select("*").eq("lecture_id", lectureId),
    supabase.from("notes").select("*").eq("lecture_id", lectureId),
    supabase.from("diagrams").select("*").eq("lecture_id", lectureId),
    supabase.from("youtube_videos").select("*").eq("lecture_id", lectureId),
    supabase.from("slides").select("*").eq("lecture_id", lectureId),
  ])

  if (!lecture) notFound()

  // Fetch user flashcard progress if user is logged in
  let flashcardProgress: Record<string, { ease_factor: number; interval_days: number; repetitions: number; next_review_at: string }> = {}
  if (user && flashcards && flashcards.length > 0) {
    const { data: progress } = await supabase
      .from("flashcard_progress")
      .select("*")
      .eq("user_id", user.id)
      .in(
        "flashcard_id",
        flashcards.map((f) => f.id)
      )
    if (progress) {
      flashcardProgress = Object.fromEntries(
        progress.map((p) => [p.flashcard_id, p])
      )
    }
  }

  return (
    <LectureContent
      lecture={lecture}
      moduleId={moduleId}
      flashcards={flashcards ?? []}
      mcqs={mcqs ?? []}
      writtenQuestions={writtenQuestions ?? []}
      notes={notes ?? []}
      diagrams={diagrams ?? []}
      youtubeVideos={youtubeVideos ?? []}
      slides={slides ?? []}
      flashcardProgress={flashcardProgress}
      userId={user?.id ?? ""}
    />
  )
}
