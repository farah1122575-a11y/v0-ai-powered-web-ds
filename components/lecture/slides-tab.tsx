"use client"

import { FileIcon, Download, ExternalLink, Presentation } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AspectRatio } from "@/components/ui/aspect-ratio"

interface SlidesTabProps {
  slides: {
    id: string
    title: string
    file_url: string
  }[]
}

function getFileExtension(url: string): string {
  const clean = url.split("?")[0]
  const parts = clean.split(".")
  return parts.length > 1 ? parts[parts.length - 1].toLowerCase() : ""
}

function isEmbeddable(url: string): boolean {
  const ext = getFileExtension(url)
  return ["pdf"].includes(ext) || url.includes("docs.google.com") || url.includes("office.com")
}

function getGoogleViewerUrl(url: string): string {
  return `https://docs.google.com/gview?url=${encodeURIComponent(url)}&embedded=true`
}

export function SlidesTab({ slides }: SlidesTabProps) {
  if (slides.length === 0) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center gap-3 py-12 text-center">
          <Presentation className="h-8 w-8 text-muted-foreground" />
          <p className="text-sm text-muted-foreground">
            No slides for this lecture yet.
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="flex flex-col gap-4">
      {slides.map((slide) => {
        const ext = getFileExtension(slide.file_url)
        const embeddable = isEmbeddable(slide.file_url)
        const isPdf = ext === "pdf"

        return (
          <Card key={slide.id} className="overflow-hidden">
            <CardContent className="flex flex-col gap-3 py-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <FileIcon className="h-4 w-4 text-primary" />
                  <p className="text-sm font-medium">{slide.title}</p>
                  {ext && (
                    <span className="rounded bg-muted px-1.5 py-0.5 text-[10px] font-medium uppercase text-muted-foreground">
                      {ext}
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="sm" asChild className="gap-1.5">
                    <a
                      href={slide.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="h-3.5 w-3.5" />
                      Open
                    </a>
                  </Button>
                  <Button variant="outline" size="sm" asChild className="gap-1.5">
                    <a href={slide.file_url} download>
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </a>
                  </Button>
                </div>
              </div>

              {/* Embedded preview */}
              {embeddable && (
                <div className="overflow-hidden rounded-lg border">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={
                        isPdf
                          ? slide.file_url
                          : getGoogleViewerUrl(slide.file_url)
                      }
                      title={slide.title}
                      className="h-full w-full"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </AspectRatio>
                </div>
              )}

              {/* Non-embeddable: show Google Viewer fallback for common file types */}
              {!embeddable && ["ppt", "pptx", "doc", "docx", "xls", "xlsx"].includes(ext) && (
                <div className="overflow-hidden rounded-lg border">
                  <AspectRatio ratio={16 / 9}>
                    <iframe
                      src={getGoogleViewerUrl(slide.file_url)}
                      title={slide.title}
                      className="h-full w-full"
                      sandbox="allow-scripts allow-same-origin allow-popups"
                    />
                  </AspectRatio>
                </div>
              )}
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}
