"use client"

import { useState } from "react"
import { ImageIcon, Maximize2, X, PenTool } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface DiagramsTabProps {
  diagrams: {
    id: string
    title: string
    image_url: string
  }[]
}

interface AnnotationPin {
  x: number
  y: number
  label: string
}

export function DiagramsTab({ diagrams }: DiagramsTabProps) {
  const [fullscreenDiagram, setFullscreenDiagram] = useState<string | null>(null)
  const [annotating, setAnnotating] = useState(false)
  const [annotations, setAnnotations] = useState<Record<string, AnnotationPin[]>>({})

  const activeDiagram = diagrams.find((d) => d.id === fullscreenDiagram)

  const handleImageClick = (diagramId: string, e: React.MouseEvent<HTMLDivElement>) => {
    if (!annotating) return
    const rect = e.currentTarget.getBoundingClientRect()
    const x = ((e.clientX - rect.left) / rect.width) * 100
    const y = ((e.clientY - rect.top) / rect.height) * 100

    const label = prompt("Enter annotation label:")
    if (!label) return

    const existing = annotations[diagramId] || []
    setAnnotations({
      ...annotations,
      [diagramId]: [...existing, { x, y, label }],
    })
  }

  const removeAnnotation = (diagramId: string, index: number) => {
    const existing = [...(annotations[diagramId] || [])]
    existing.splice(index, 1)
    setAnnotations({ ...annotations, [diagramId]: existing })
  }

  if (diagrams.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <ImageIcon className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No diagrams for this lecture yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {diagrams.map((diagram) => (
          <Card key={diagram.id} className="group overflow-hidden">
            <div className="relative">
              <div
                className="relative cursor-pointer"
                onClick={(e) => handleImageClick(diagram.id, e)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={diagram.image_url}
                  alt={diagram.title}
                  className="aspect-[4/3] w-full object-contain bg-muted/30"
                />
                {/* Annotation pins */}
                {(annotations[diagram.id] || []).map((pin, i) => (
                  <button
                    key={i}
                    className="absolute flex h-6 w-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-[10px] font-bold text-primary-foreground shadow-md"
                    style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                    onClick={(e) => {
                      e.stopPropagation()
                      removeAnnotation(diagram.id, i)
                    }}
                    title={`${pin.label} (click to remove)`}
                  >
                    {i + 1}
                  </button>
                ))}
              </div>
              <Button
                variant="secondary"
                size="icon"
                className="absolute right-2 top-2 h-8 w-8 opacity-0 shadow-sm transition-opacity group-hover:opacity-100"
                onClick={() => setFullscreenDiagram(diagram.id)}
              >
                <Maximize2 className="h-4 w-4" />
                <span className="sr-only">View fullscreen</span>
              </Button>
            </div>
            <CardContent className="flex items-center justify-between gap-2 py-3">
              <p className="text-sm font-medium">{diagram.title}</p>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setAnnotating(!annotating)}
                className={cn("gap-1.5 text-xs", annotating && "text-primary")}
              >
                <PenTool className="h-3.5 w-3.5" />
                {annotating ? "Done" : "Annotate"}
              </Button>
            </CardContent>
            {/* Annotation labels list */}
            {(annotations[diagram.id] || []).length > 0 && (
              <div className="border-t px-4 py-2">
                <div className="flex flex-wrap gap-1.5">
                  {annotations[diagram.id].map((pin, i) => (
                    <span
                      key={i}
                      className="inline-flex items-center gap-1 rounded-md bg-primary/10 px-2 py-0.5 text-[11px] font-medium text-primary"
                    >
                      <span className="flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[9px] text-primary-foreground">
                        {i + 1}
                      </span>
                      {pin.label}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        ))}
      </div>

      {/* Fullscreen modal */}
      {activeDiagram && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-background/90 backdrop-blur-sm"
          onClick={() => setFullscreenDiagram(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`Fullscreen view of ${activeDiagram.title}`}
        >
          <div
            className="relative max-h-[90vh] max-w-[90vw]"
            onClick={(e) => e.stopPropagation()}
          >
            <Button
              variant="secondary"
              size="icon"
              className="absolute -right-2 -top-2 z-10 h-8 w-8 rounded-full shadow-md"
              onClick={() => setFullscreenDiagram(null)}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Close fullscreen</span>
            </Button>
            <div
              className="relative"
              onClick={(e) => handleImageClick(activeDiagram.id, e)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={activeDiagram.image_url}
                alt={activeDiagram.title}
                className="max-h-[85vh] max-w-full rounded-lg object-contain shadow-lg"
              />
              {/* Annotation pins in fullscreen */}
              {(annotations[activeDiagram.id] || []).map((pin, i) => (
                <button
                  key={i}
                  className="absolute flex h-7 w-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-primary text-xs font-bold text-primary-foreground shadow-md"
                  style={{ left: `${pin.x}%`, top: `${pin.y}%` }}
                  onClick={(e) => {
                    e.stopPropagation()
                    removeAnnotation(activeDiagram.id, i)
                  }}
                  title={`${pin.label} (click to remove)`}
                >
                  {i + 1}
                </button>
              ))}
            </div>
            <p className="mt-3 text-center text-sm font-medium">
              {activeDiagram.title}
            </p>
          </div>
        </div>
      )}
    </>
  )
}
