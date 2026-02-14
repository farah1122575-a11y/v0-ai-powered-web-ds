"use client"

import { useState } from "react"
import { CheckCircle2, Circle, Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { createClient } from "@/lib/supabase/client"

interface Task {
  id: string
  title: string
  completed: boolean
  due_date: string | null
  created_at: string
}

export function TaskList({
  initialTasks,
  userId,
}: {
  initialTasks: Task[]
  userId: string
}) {
  const [tasks, setTasks] = useState<Task[]>(initialTasks)
  const [newTask, setNewTask] = useState("")
  const supabase = createClient()

  const addTask = async () => {
    if (!newTask.trim()) return
    const { data, error } = await supabase
      .from("tasks")
      .insert({ user_id: userId, title: newTask.trim() })
      .select()
      .single()
    if (data && !error) {
      setTasks([data, ...tasks])
      setNewTask("")
    }
  }

  const toggleTask = async (taskId: string, completed: boolean) => {
    await supabase.from("tasks").update({ completed: !completed }).eq("id", taskId)
    setTasks(tasks.map((t) => (t.id === taskId ? { ...t, completed: !completed } : t)))
  }

  const deleteTask = async (taskId: string) => {
    await supabase.from("tasks").delete().eq("id", taskId)
    setTasks(tasks.filter((t) => t.id !== taskId))
  }

  return (
    <Card>
      <CardHeader className="pb-2">
        <CardTitle className="text-base font-semibold">Study Tasks</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-3">
        <div className="flex gap-2">
          <Input
            placeholder="Add a task..."
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && addTask()}
            className="h-8 text-sm"
          />
          <Button size="icon" variant="outline" className="h-8 w-8 shrink-0" onClick={addTask}>
            <Plus className="h-3.5 w-3.5" />
          </Button>
        </div>
        <div className="flex flex-col gap-1">
          {tasks.map((task) => (
            <div
              key={task.id}
              className="group flex items-center gap-2 rounded-md px-2 py-1.5 hover:bg-muted"
            >
              <button
                onClick={() => toggleTask(task.id, task.completed)}
                className="shrink-0"
              >
                {task.completed ? (
                  <CheckCircle2 className="h-4 w-4 text-primary" />
                ) : (
                  <Circle className="h-4 w-4 text-muted-foreground" />
                )}
              </button>
              <span
                className={`flex-1 text-sm ${
                  task.completed ? "text-muted-foreground line-through" : ""
                }`}
              >
                {task.title}
              </span>
              <button
                onClick={() => deleteTask(task.id)}
                className="opacity-0 transition-opacity group-hover:opacity-100"
              >
                <Trash2 className="h-3.5 w-3.5 text-muted-foreground hover:text-destructive" />
              </button>
            </div>
          ))}
          {tasks.length === 0 && (
            <p className="py-4 text-center text-sm text-muted-foreground">
              No tasks yet. Add one above!
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}
