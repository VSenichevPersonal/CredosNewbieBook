"use client"

import React, { createContext, useCallback, useContext, useMemo, useState } from "react"

type EditorContextValue = {
  isEditing: boolean
  selectedBlockId: string | null
  openPanelFor: (blockId: string | null) => void
  selectBlock: (blockId: string | null) => void
  updateBlockContent: (blockId: string, content: unknown) => Promise<boolean>
  updateBlockSettings: (blockId: string, settings: unknown) => Promise<boolean>
  reorderBlocks: (pageId: string, orderedIds: string[]) => Promise<boolean>
  deleteBlock: (blockId: string) => Promise<boolean>
}

const EditorContext = createContext<EditorContextValue | null>(null)

export function EditorProvider({ children, isEditing = false }: { children: React.ReactNode; isEditing?: boolean }) {
  const [selectedBlockId, setSelectedBlockId] = useState<string | null>(null)

  const openPanelFor = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId)
  }, [])

  const selectBlock = useCallback((blockId: string | null) => {
    setSelectedBlockId(blockId)
  }, [])

  const updateBlockContent = useCallback(async (blockId: string, content: unknown): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms/blocks/" + blockId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ content }),
      })
      if (!res.ok) {
        console.error("Failed to update block:", await res.text())
        return false
      }
      console.log("Block content saved:", blockId)
      return true
    } catch (err) {
      console.error("Error updating block:", err)
      return false
    }
  }, [])

  const updateBlockSettings = useCallback(async (blockId: string, settings: unknown): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms/blocks/" + blockId, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ settings }),
      })
      if (!res.ok) {
        console.error("Failed to update block settings:", await res.text())
        return false
      }
      console.log("Block settings saved:", blockId)
      return true
    } catch (err) {
      console.error("Error updating block settings:", err)
      return false
    }
  }, [])

  const reorderBlocks = useCallback(async (pageId: string, orderedIds: string[]): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms/blocks/reorder", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, orderedIds }),
      })
      if (!res.ok) {
        console.error("Failed to reorder blocks:", await res.text())
        return false
      }
      return true
    } catch (err) {
      console.error("Error reordering blocks:", err)
      return false
    }
  }, [])

  const deleteBlock = useCallback(async (blockId: string): Promise<boolean> => {
    try {
      const res = await fetch("/api/cms/blocks/" + blockId, { method: "DELETE" })
      if (!res.ok) {
        console.error("Failed to delete block:", await res.text())
        return false
      }
      return true
    } catch (err) {
      console.error("Error deleting block:", err)
      return false
    }
  }, [])

  const value = useMemo<EditorContextValue>(
    () => ({
      isEditing,
      selectedBlockId,
      openPanelFor,
      selectBlock,
      updateBlockContent,
      updateBlockSettings,
      reorderBlocks,
      deleteBlock,
    }),
    [deleteBlock, isEditing, openPanelFor, reorderBlocks, selectedBlockId, selectBlock, updateBlockContent, updateBlockSettings],
  )

  return <EditorContext.Provider value={value}>{children}</EditorContext.Provider>
}

export function useEditorContext() {
  const ctx = useContext(EditorContext)
  if (!ctx) {
    throw new Error("useEditorContext must be used within EditorProvider")
  }
  return ctx
}
