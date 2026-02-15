"use client"

import { useState, useEffect, useCallback } from "react"
import { FileText, Sparkles, Loader2, Highlighter, Save, BookOpen } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/client"
import { cn } from "@/lib/utils"

interface NotesTabProps {
  notes: { id: string; title: string; content: Record<string, unknown> }[]
  lectureId: string
  userId: string
}

interface Highlight {
  noteId: string
  text: string
  color: string
  createdAt: string
}

interface Annotation {
  noteId: string
  text: string
  note: string
  createdAt: string
}

const HIGHLIGHT_COLORS = [
  { name: "Yellow", value: "bg-yellow-200/60 dark:bg-yellow-500/30" },
  { name: "Green", value: "bg-emerald-200/60 dark:bg-emerald-500/30" },
  { name: "Blue", value: "bg-blue-200/60 dark:bg-blue-500/30" },
  { name: "Pink", value: "bg-pink-200/60 dark:bg-pink-500/30" },
]

export function NotesTab({ notes, lectureId, userId }: NotesTabProps) {
  const [userNote, setUserNote] = useState("")
  const [aiOutput, setAiOutput] = useState("")
  const [aiLoading, setAiLoading] = useState(false)
  const [aiAction, setAiAction] = useState<string | null>(null)
  const [selectedText, setSelectedText] = useState("")
  const [highlightColor, setHighlightColor] = useState(HIGHLIGHT_COLORS[0].value)
  const [highlights, setHighlights] = useState<Record<string, Highlight[]>>({})
  const [annotations, setAnnotations] = useState<Record<string, Annotation[]>>({})
  const [annotationInput, setAnnotationInput] = useState<{ noteId: string; text: string } | null>(null)
  const [annotationText, setAnnotationText] = useState("")
  const [saving, setSaving] = useState(false)
  const [activeNoteId, setActiveNoteId] = useState<string | null>(null)

  // Load saved annotations from Supabase
  useEffect(() => {
    if (!userId || notes.length === 0) return
    const supabase = createClient()
    const loadAnnotations = async () => {
      const { data } = await supabase
        .from("user_notes_annotations")
        .select("*")
        .eq("user_id", userId)
        .in("note_id", notes.map((n) => n.id))
      if (data) {
        const hMap: Record<string, Highlight[]> = {}
        const aMap: Record<string, Annotation[]> = {}
        for (const row of data) {
          hMap[row.note_id] = (row.highlights as Highlight[]) || []
          aMap[row.note_id] = (row.annotations as Annotation[]) || []
        }
        setHighlights(hMap)
        setAnnotations(aMap)
      }
    }
    loadAnnotations()
  }, [userId, notes])

  const saveAnnotationsToDb = useCallback(
    async (noteId: string, newHighlights: Highlight[], newAnnotations: Annotation[]) => {
      if (!userId) return
      setSaving(true)
      const supabase = createClient()
      await supabase.from("user_notes_annotations").upsert(
        {
          user_id: userId,
          note_id: noteId,
          highlights: newHighlights,
          annotations: newAnnotations,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "user_id,note_id" }
      )
      setSaving(false)
    },
    [userId]
  )

  const handleTextSelection = (noteId: string) => {
    const selection = window.getSelection()
    const text = selection?.toString().trim()
    if (text && text.length > 0) {
      setSelectedText(text)
      setActiveNoteId(noteId)
    }
  }

  const addHighlight = () => {
    if (!selectedText || !activeNoteId) return
    const newHighlight: Highlight = {
      noteId: activeNoteId,
      text: selectedText,
      color: highlightColor,
      createdAt: new Date().toISOString(),
    }
    const noteHighlights = [...(highlights[activeNoteId] || []), newHighlight]
    const updated = { ...highlights, [activeNoteId]: noteHighlights }
    setHighlights(updated)
    saveAnnotationsToDb(activeNoteId, noteHighlights, annotations[activeNoteId] || [])
    setSelectedText("")
    window.getSelection()?.removeAllRanges()
  }

  const addAnnotation = () => {
    if (!annotationInput || !annotationText.trim()) return
    const newAnnotation: Annotation = {
      noteId: annotationInput.noteId,
      text: annotationInput.text,
      note: annotationText,
      createdAt: new Date().toISOString(),
    }
    const noteAnnotations = [...(annotations[annotationInput.noteId] || []), newAnnotation]
    const updated = { ...annotations, [annotationInput.noteId]: noteAnnotations }
    setAnnotations(updated)
    saveAnnotationsToDb(
      annotationInput.noteId,
      highlights[annotationInput.noteId] || [],
      noteAnnotations
    )
    setAnnotationInput(null)
    setAnnotationText("")
    setSelectedText("")
  }

  const renderNoteContent = (note: { id: string; content: Record<string, unknown> }) => {
    const raw = typeof note.content === "string" ? note.content : JSON.stringify(note.content, null, 2)
    const noteHighlights = highlights[note.id] || []

    if (noteHighlights.length === 0) {
      return <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">{raw}</p>
    }

    let result = raw
    const parts: { text: string; className?: string }[] = []
    let remaining = result

    for (const h of noteHighlights) {
      const idx = remaining.indexOf(h.text)
      if (idx >= 0) {
        if (idx > 0) parts.push({ text: remaining.slice(0, idx) })
        parts.push({ text: h.text, className: h.color })
        remaining = remaining.slice(idx + h.text.length)
      }
    }
    if (remaining) parts.push({ text: remaining })

    return (
      <p className="text-sm leading-relaxed text-muted-foreground whitespace-pre-wrap">
        {parts.map((part, i) =>
          part.className ? (
            <mark key={i} className={cn("rounded px-0.5", part.className)}>
              {part.text}
            </mark>
          ) : (
            <span key={i}>{part.text}</span>
          )
        )}
      </p>
    )
  }

  const handleAiAction = async (action: string, text?: string) => {
    const inputText = text || userNote
    if (!inputText.trim()) return
    setAiLoading(true)
    setAiAction(action)
    try {
      const res = await fetch("/api/ai/notes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: inputText, action }),
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
      {/* Highlight toolbar */}
      {selectedText && (
        <Card className="border-primary/30 bg-primary/5">
          <CardContent className="flex flex-wrap items-center gap-3 py-3">
            <span className="text-xs font-medium text-muted-foreground">Selected:</span>
            <span className="max-w-xs truncate text-sm font-medium">
              {'"'}{selectedText.slice(0, 60)}{selectedText.length > 60 ? "..." : ""}{'"'}
            </span>
            <div className="flex items-center gap-1.5">
              {HIGHLIGHT_COLORS.map((c) => (
                <button
                  key={c.name}
                  onClick={() => setHighlightColor(c.value)}
                  className={cn(
                    "h-5 w-5 rounded-full border-2 transition-transform",
                    c.value.replace("/60", "").replace("/30", ""),
                    highlightColor === c.value ? "scale-125 border-foreground" : "border-transparent"
                  )}
                  aria-label={`Highlight ${c.name}`}
                />
              ))}
            </div>
            <Button size="sm" variant="outline" onClick={addHighlight} className="gap-1.5">
              <Highlighter className="h-3.5 w-3.5" />
              Highlight
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => {
                if (activeNoteId) {
                  setAnnotationInput({ noteId: activeNoteId, text: selectedText })
                }
              }}
              className="gap-1.5"
            >
              <BookOpen className="h-3.5 w-3.5" />
              Annotate
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("summarize", selectedText)}
              disabled={aiLoading}
              className="gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Summarize
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("simplify", selectedText)}
              disabled={aiLoading}
              className="gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Simplify
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleAiAction("explain", selectedText)}
              disabled={aiLoading}
              className="gap-1.5"
            >
              <Sparkles className="h-3.5 w-3.5" />
              AI Explain
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Annotation input */}
      {annotationInput && (
        <Card className="border-primary/30">
          <CardContent className="flex flex-col gap-3 py-4">
            <p className="text-xs text-muted-foreground">
              Add annotation for: <strong>{'"'}{annotationInput.text.slice(0, 80)}{'"'}</strong>
            </p>
            <Textarea
              placeholder="Write your annotation..."
              value={annotationText}
              onChange={(e) => setAnnotationText(e.target.value)}
              className="min-h-[80px]"
            />
            <div className="flex gap-2">
              <Button size="sm" onClick={addAnnotation} disabled={!annotationText.trim()}>
                <Save className="mr-1 h-3.5 w-3.5" />
                Save Annotation
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setAnnotationInput(null)
                  setAnnotationText("")
                }}
              >
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      {/* Existing lecture notes */}
      {notes.length > 0 ? (
        notes.map((note) => (
          <Card key={note.id}>
            <CardHeader className="pb-2">
              <CardTitle className="flex items-center gap-2 text-base">
                <FileText className="h-4 w-4 text-primary" />
                {note.title}
                {(highlights[note.id]?.length ?? 0) > 0 && (
                  <Badge variant="secondary" className="ml-auto text-[10px]">
                    {highlights[note.id].length} highlights
                  </Badge>
                )}
                {saving && activeNoteId === note.id && (
                  <Loader2 className="ml-1 h-3 w-3 animate-spin text-muted-foreground" />
                )}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div
                className="prose prose-sm dark:prose-invert max-w-none cursor-text"
                onMouseUp={() => handleTextSelection(note.id)}
              >
                {renderNoteContent(note)}
              </div>

              {/* Annotations for this note */}
              {(annotations[note.id]?.length ?? 0) > 0 && (
                <div className="mt-4 flex flex-col gap-2">
                  <p className="text-xs font-medium text-primary">Your Annotations</p>
                  {annotations[note.id].map((ann, i) => (
                    <div key={i} className="rounded-lg border bg-muted/50 p-3">
                      <p className="text-xs text-muted-foreground">
                        On: {'"'}{ann.text.slice(0, 60)}{ann.text.length > 60 ? "..." : ""}{'"'}
                      </p>
                      <p className="mt-1 text-sm leading-relaxed">{ann.note}</p>
                    </div>
                  ))}
                </div>
              )}
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
