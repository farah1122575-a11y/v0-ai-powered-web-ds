import { createClient } from "@/lib/supabase/server"
import { notFound } from "next/navigation"
import Link from "next/link"
import { ArrowLeft, BookOpen, ChevronRight, FileText } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"

export default async function ModuleDetailPage({
  params,
}: {
  params: Promise<{ moduleId: string }>
}) {
  const { moduleId } = await params
  const supabase = await createClient()

  const { data: mod } = await supabase
    .from("modules")
    .select("*, subjects(*, lectures(*))")
    .eq("id", moduleId)
    .single()

  if (!mod) notFound()

  return (
    <div className="flex flex-col gap-6 p-6">
      <div className="flex items-center gap-3">
        <Button variant="ghost" size="icon" asChild>
          <Link href="/modules">
            <ArrowLeft className="h-4 w-4" />
          </Link>
        </Button>
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="font-mono">
              {mod.code}
            </Badge>
            <h1 className="text-2xl font-bold tracking-tight">{mod.name}</h1>
          </div>
          <p className="text-muted-foreground">{mod.description}</p>
        </div>
      </div>

      <div className="flex flex-col gap-6">
        {mod.subjects
          ?.sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)
          .map((subject: {
            id: string
            name: string
            description: string
            lectures: { id: string; title: string; description: string; order_index: number }[]
          }) => (
          <Card key={subject.id}>
            <CardHeader className="pb-3">
              <CardTitle className="flex items-center gap-2 text-lg">
                <BookOpen className="h-5 w-5 text-primary" />
                {subject.name}
              </CardTitle>
              <p className="text-sm text-muted-foreground">{subject.description}</p>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2">
                {subject.lectures
                  ?.sort((a: { order_index: number }, b: { order_index: number }) => a.order_index - b.order_index)
                  .map((lecture: { id: string; title: string; description: string }) => (
                  <Link
                    key={lecture.id}
                    href={`/modules/${moduleId}/lectures/${lecture.id}`}
                    className="group flex items-center justify-between rounded-lg border p-4 transition-colors hover:bg-accent"
                  >
                    <div className="flex items-center gap-3">
                      <div className="flex h-8 w-8 items-center justify-center rounded bg-muted">
                        <FileText className="h-4 w-4 text-muted-foreground" />
                      </div>
                      <div>
                        <p className="font-medium">{lecture.title}</p>
                        <p className="text-sm text-muted-foreground">
                          {lecture.description}
                        </p>
                      </div>
                    </div>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </Link>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
