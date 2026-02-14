import { createClient } from "@/lib/supabase/server"
import Link from "next/link"
import { BookOpen, ChevronRight } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

export default async function ModulesPage() {
  const supabase = await createClient()
  const { data: modules } = await supabase
    .from("modules")
    .select("*, subjects(id, name, lectures(id))")
    .order("order_index")

  return (
    <div className="flex flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Modules</h1>
        <p className="text-muted-foreground">
          Browse all medical modules in your curriculum.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        {(modules ?? []).map((mod) => {
          const lectureCount = mod.subjects?.reduce(
            (a: number, s: { lectures: { id: string }[] }) => a + s.lectures.length,
            0
          ) ?? 0
          return (
            <Link key={mod.id} href={`/modules/${mod.id}`}>
              <Card className="group h-full transition-colors hover:border-primary/30 hover:bg-accent/50">
                <CardContent className="flex flex-col gap-3 p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                      <BookOpen className="h-5 w-5 text-primary" />
                    </div>
                    <Badge variant="outline" className="font-mono">
                      {mod.code}
                    </Badge>
                  </div>
                  <div>
                    <h3 className="font-semibold">{mod.name}</h3>
                    <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                      {mod.description}
                    </p>
                  </div>
                  <div className="flex items-center justify-between pt-2">
                    <span className="text-sm text-muted-foreground">
                      {mod.subjects?.length ?? 0} subjects, {lectureCount} lectures
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground transition-transform group-hover:translate-x-1" />
                  </div>
                </CardContent>
              </Card>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
