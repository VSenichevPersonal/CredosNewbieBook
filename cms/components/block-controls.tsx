"use client"

import { Settings, Trash2, MoveUp, MoveDown } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlockControls({
  onMoveUp,
  onMoveDown,
  onSettings,
  onDelete,
}: {
  onMoveUp?: () => void
  onMoveDown?: () => void
  onSettings?: () => void
  onDelete?: () => void
}) {
  return (
    <div className="flex items-center gap-2 bg-background/80 backdrop-blur-sm border rounded-full px-2 py-1 shadow-sm">
      <Button size="icon" variant="ghost" onClick={onMoveUp} title="Вверх">
        <MoveUp className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onMoveDown} title="Вниз">
        <MoveDown className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onSettings} title="Настройки">
        <Settings className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" onClick={onDelete} title="Удалить">
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  )
}
