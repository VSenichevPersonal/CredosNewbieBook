"use client"

import { ReactNode, useMemo } from "react"
import { cn } from "@/lib/utils"

import { useEditor } from "../hooks/use-editor"
import { BlockControls } from "./block-controls"

export function EditableBlock({
  blockId,
  pageId,
  children,
  className,
  onSettings,
  onDelete,
  onMoveUp,
  onMoveDown,
}: {
  blockId: string
  pageId: string
  children: ReactNode
  className?: string
  onSettings?: () => void
  onDelete?: () => void
  onMoveUp?: () => void
  onMoveDown?: () => void
}) {
  const { isEditing, selectBlock, selectedBlockId, openPanelFor, deleteBlock } = useEditor()

  const isSelected = useMemo(() => selectedBlockId === blockId, [selectedBlockId, blockId])

  const handleDelete = async () => {
    await deleteBlock(blockId)
    onDelete?.()
  }

  return (
    <div
      className={cn("relative group", className, isSelected && "ring-2 ring-primary/60 rounded-xl")}
      onClick={() => selectBlock(blockId)}
    >
      {isEditing && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-opacity z-20">
          <BlockControls
            onMoveUp={onMoveUp}
            onMoveDown={onMoveDown}
            onSettings={() => openPanelFor(blockId) || onSettings?.()}
            onDelete={handleDelete}
          />
        </div>
      )}
      {children}
    </div>
  )
}
