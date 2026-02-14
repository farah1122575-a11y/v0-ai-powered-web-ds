"use client"

import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { NotesTab } from "@/components/lecture/notes-tab"
import { FlashcardsTab } from "@/components/lecture/flashcards-tab"
import { McqTab } from "@/components/lecture/mcq-tab"
import { WrittenTab } from "@/components/lecture/written-tab"
import { DiagramsTab } from "@/components/lecture/diagrams-tab"
import { VideosTab } from "@/components/lecture/videos-tab"
import { SlidesTab } from "@/components/lecture/slides-tab"

interface LectureContentProps {
  lecture: {
    id: string
    title: string
    description: string
    subjects: {
      name: string
      modules: { name: string; code: string }
    }
  }
  moduleId: string
  flashcards: {
    id: string
    front: string
    back: string
    order_index: number
  }[]
  mcqs: {
    id: string
    question: string
    options: string[]
    correct_answer: number
    explanation: string
  }[]
  writtenQuestions: {
    id: string
    question: string
    model_answer: string
  }[]
  notes: {
    id: string
    title: string
    content: Record<string, unknown>
  }[]
  diagrams: {
    id: string
    title: string
    image_url: string
  }[]
  youtubeVideos: {
    id: string
    title: string
    youtube_url: string
    topic: string | null
  }[]
  slides: {
    id: string
    title: string
    file_url: string
  }[]
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
}

export function LectureContent({
  lecture,
  moduleId,
  flashcards,
  mcqs,
  writtenQuestions,
  notes,
  diagrams,
  youtubeVideos,
  slides,
  flashcardProgress,
  userId,
}: LectureContentProps) {
  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-start gap-3">
        <Button variant="ghost" size="icon" asChild className="mt-0.5">
          <Link href={`/modules/${moduleId}`}>
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{lecture.subjects?.modules?.name}</span>
            <span>{"/"}</span>
            <span>{lecture.subjects?.name}</span>
          </div>
          <h1 className="text-2xl font-bold tracking-tight">{lecture.title}</h1>
          <p className="text-muted-foreground">{lecture.description}</p>
        </div>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="notes" className="w-full">
        <TabsList className="flex w-full flex-wrap justify-start gap-1 bg-transparent p-0">
          <TabsTrigger value="notes" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Notes {notes.length > 0 && <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{notes.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="flashcards" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Flashcards {flashcards.length > 0 && <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{flashcards.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="mcqs" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            MCQs {mcqs.length > 0 && <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{mcqs.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="written" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Written {writtenQuestions.length > 0 && <Badge variant="secondary" className="ml-1.5 h-5 px-1.5 text-[10px]">{writtenQuestions.length}</Badge>}
          </TabsTrigger>
          <TabsTrigger value="diagrams" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Diagrams
          </TabsTrigger>
          <TabsTrigger value="videos" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Videos
          </TabsTrigger>
          <TabsTrigger value="slides" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
            Slides
          </TabsTrigger>
        </TabsList>

        <div className="mt-6">
          <TabsContent value="notes">
            <NotesTab notes={notes} lectureId={lecture.id} userId={userId} />
          </TabsContent>
          <TabsContent value="flashcards">
            <FlashcardsTab
              flashcards={flashcards}
              flashcardProgress={flashcardProgress}
              userId={userId}
              lectureId={lecture.id}
            />
          </TabsContent>
          <TabsContent value="mcqs">
            <McqTab mcqs={mcqs} userId={userId} />
          </TabsContent>
          <TabsContent value="written">
            <WrittenTab writtenQuestions={writtenQuestions} userId={userId} />
          </TabsContent>
          <TabsContent value="diagrams">
            <DiagramsTab diagrams={diagrams} />
          </TabsContent>
          <TabsContent value="videos">
            <VideosTab videos={youtubeVideos} />
          </TabsContent>
          <TabsContent value="slides">
            <SlidesTab slides={slides} />
          </TabsContent>
        </div>
      </Tabs>
    </div>
  )
}
