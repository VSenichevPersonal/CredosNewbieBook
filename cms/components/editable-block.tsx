"use client"

import { ReactNode, useMemo } from "react"
import { EyeOff } from "lucide-react"
import { cn } from "@/lib/utils"

import { useEditor } from "../hooks/use-editor"
import { BlockControls } from "./block-controls"

export function EditableBlock({
  blockId,
  blockType,
  pageId,
  isHidden,
  children,
  className,
  onSettings,
  onDelete,
  onMoveUp,
  onMoveDown,
  onToggleVisibility,
}: {
  blockId: string
  blockType: string
  pageId: string
  isHidden?: boolean
  children: ReactNode
  className?: string
  onSettings?: () => void
  onDelete?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
  onToggleVisibility?: () => void
}) {
  const { isEditing, selectBlock, selectedBlockId, openPanelFor, deleteBlock } = useEditor()

  const isSelected = useMemo(() => selectedBlockId === blockId, [selectedBlockId, blockId])

  const handleDelete = async () => {
    await deleteBlock(blockId)
    onDelete?.()
  }

  // Если блок скрыт — показываем компактную версию
  if (isHidden) {
    return (
      <div
        className={cn(
          "relative group mx-4 my-2 p-3 rounded-lg border-2 border-dashed border-muted-foreground/30 bg-muted/20 backdrop-blur-sm cursor-pointer transition-all hover:border-muted-foreground/50",
          isSelected && "ring-2 ring-primary/60"
        )}
        onClick={() => selectBlock(blockId)}
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 text-muted-foreground">
            <EyeOff className="w-4 h-4" />
            <span className="text-sm font-medium">Скрытый блок: {blockType}</span>
          </div>
          <div className="opacity-0 group-hover:opacity-100 transition-opacity">
            <BlockControls
              isHidden={isHidden}
              onMoveUp={onMoveUp}
              onMoveDown={onMoveDown}
              onSettings={() => openPanelFor(blockId) || onSettings?.()}
              onDelete={handleDelete}
              onToggleVisibility={onToggleVisibility}
            />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div
      className={cn("relative group", className, isSelected && "ring-2 ring-primary/60 rounded-xl")}
      onClick={() => selectBlock(blockId)}
    >
      {isEditing && (
        <div className="absolute -top-5 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <BlockControls
            isHidden={isHidden}
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onSettings={() => openPanelFor(blockId) || onSettings?.()}
            onDelete={handleDelete}
            onToggleVisibility={onToggleVisibility}
          />
        </div>
      )}
      {children}
    </div>
  )
}
