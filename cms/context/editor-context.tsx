/* eslint-disable @next/next/no-img-element */
"use client"

import React, { createContext, useCallback, useContext, useMemo, useState } from "react"

type EditorContextValue = {
  isEditing: boolean
  selectedBlockId: string | null
  openPanelFor: (blockId: string | null) => void
  selectBlock: (blockId: string | null) => void
  updateBlockContent: (blockId: string, content: unknown) => Promise<void>
  reorderBlocks: (pageId: string, orderedIds: string[]) => Promise<void>
  deleteBlock: (blockId: string) => Promise<void>
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

  const updateBlockContent = useCallback(async (blockId: string, content: unknown) => {
    await fetch(`/api/cms/blocks/${blockId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    })
  }, [])

  const reorderBlocks = useCallback(async (pageId: string, orderedIds: string[]) => {
    await fetch(`/api/cms/blocks/reorder`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ pageId, orderedIds }),
    })
  }, [])

  const deleteBlock = useCallback(async (blockId: string) => {
    await fetch(`/api/cms/blocks/${blockId}`, { method: "DELETE" })
  }, [])

  const value = useMemo<EditorContextValue>(
    () => ({
      isEditing,
      selectedBlockId,
      openPanelFor,
      selectBlock,
      updateBlockContent,
      reorderBlocks,
      deleteBlock,
    }),
    [deleteBlock, isEditing, openPanelFor, reorderBlocks, selectedBlockId, selectBlock, updateBlockContent],
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
