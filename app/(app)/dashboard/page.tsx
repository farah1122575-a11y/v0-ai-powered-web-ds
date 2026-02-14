import { createClient } from "@/lib/supabase/server"
import { DashboardContent } from "@/components/dashboard/dashboard-content"

export default async function DashboardPage() {
  const supabase = await createClient()
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const [
    { data: modules },
    { data: profile },
    { data: recentSessions },
    { data: tasks },
    { data: weakTopics },
  ] = await Promise.all([
    supabase
      .from("modules")
      .select("*, subjects(*, lectures(*))")
      .order("order_index"),
    supabase.from("profiles").select("*").eq("id", user!.id).single(),
    supabase
      .from("study_sessions")
      .select("*, subjects(name), lectures(title)")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(5),
    supabase
      .from("tasks")
      .select("*")
      .eq("user_id", user!.id)
      .order("created_at", { ascending: false })
      .limit(10),
    supabase
      .from("weak_topics")
      .select("*, subjects(name), lectures(title)")
      .eq("user_id", user!.id)
      .limit(5),
  ])

  return (
    <DashboardContent
      user={user!}
      profile={profile}
      modules={modules ?? []}
      recentSessions={recentSessions ?? []}
      tasks={tasks ?? []}
      weakTopics={weakTopics ?? []}
    />
  )
}
