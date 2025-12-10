"use client"

import { Settings, Trash2, MoveUp, MoveDown, Eye, EyeOff } from "lucide-react"
import { Button } from "@/components/ui/button"

export function BlockControls({
  isHidden,
  onMoveUp,
  onMoveDown,
  onSettings,
  onDelete,
  onToggleVisibility,
}: {
  isHidden?: boolean
  onMoveUp?: () => void
  onMoveDown?: () => void
  onSettings?: () => void
  onDelete?: () => void
  onToggleVisibility?: () => void
}) {
  return (
    <div className="flex items-center gap-1 bg-background/95 backdrop-blur-sm border rounded-full px-2 py-1 shadow-lg">
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onMoveUp} title="Вверх">
        <MoveUp className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onMoveDown} title="Вниз">
        <MoveDown className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onToggleVisibility} title={isHidden ? "Показать" : "Скрыть"}>
        {isHidden ? <EyeOff className="w-4 h-4 text-muted-foreground" /> : <Eye className="w-4 h-4" />}
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onSettings} title="Настройки">
        <Settings className="w-4 h-4" />
      </Button>
      <Button size="icon" variant="ghost" className="h-8 w-8" onClick={onDelete} title="Удалить">
        <Trash2 className="w-4 h-4 text-destructive" />
      </Button>
    </div>
  )
}
