"use client"

import { useState } from "react"
import { FileText, Sparkles, Loader2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

interface NotesTabProps {
  notes: { id: string; title: string; content: Record<string, unknown> }[]
  lectureId: string
  userId: string
}

export function NotesTab({ notes, lectureId, userId }: NotesTabProps) {
  const [userNote, setUserNote] = useState("")
  const [aiOutput, setAiOutput] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiAction, setAiAction] = useState<string | null>(null)

  const handleAiAction = async (action: string) => {
    if (!userNote.trim()) return
    setAiLoading(true)
    setAiAction(action)
    try {
      const res = await fetch("/api/ai/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: userNote, action }),
      })
      const data = await res.json()
      setAiOutput(data.result || "No response from AI.")
    } catch {
      setAiOutput("Error processing your request.")
    } finally {
      setAiLoading(false)
      setAiAction(null)
    }
  }

  return (
    <div className="flex flex-col gap-6">
      {/* Existing lecture notes */}
      {notes.length > 0 ? (
        notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" />
                {note.title}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="prose prose-sm dark:prose-invert max-w-none">
                <p className="text-sm leading-relaxed text-muted-foreground">
                  {typeof note.content === "string"
                    ? note.content
                    : JSON.stringify(note.content, null, 2)}
                </p>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <Card>
          <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
            <FileText className="h-8 w-8 text-muted-foreground" />
            <p className="text-sm text-muted-foreground">
              No lecture notes have been added yet.
            </p>
          </CardContent>
        </Card>
      )}

      {/* Personal notes with AI */}
      <Card>
        <CardHeader className="pb-2">
          <CardTitle className="flex items-center gap-2 text-base">
            <Sparkles className="h-4 w-4 text-primary" />
            Your Notes + AI Assistant
          </CardTitle>
        </CardHeader>
        <CardContent className="flex flex-col gap-4">
          <Textarea
            placeholder="Write your notes here... then use AI to summarize, simplify, or explain."
            value={userNote}
            onChange={(e) => setUserNote(e.target.value)}
            className="min-h-[120px] resize-y"
          />
          <div className="flex flex-wrap gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("summarize")}
              disabled={aiLoading || !userNote.trim()}
            >
              {aiLoading && aiAction === "summarize" && (
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              )}
              Summarize
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("simplify")}
              disabled={aiLoading || !userNote.trim()}
            >
              {aiLoading && aiAction === "simplify" && (
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              )}
              Simplify
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("explain")}
              disabled={aiLoading || !userNote.trim()}
            >
              {aiLoading && aiAction === "explain" && (
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              )}
              Explain
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("quiz")}
              disabled={aiLoading || !userNote.trim()}
            >
              {aiLoading && aiAction === "quiz" && (
                <Loader2 className="mr-1 h-3.5 w-3.5 animate-spin" />
              )}
              Generate Quiz
            </Button>
          </div>

          {aiOutput && (
            <div className="rounded-lg border bg-muted/50 p-4">
              <p className="mb-2 text-xs font-medium text-primary">AI Response</p>
              <p className="whitespace-pre-wrap text-sm leading-relaxed">{aiOutput}</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
