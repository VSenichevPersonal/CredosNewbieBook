"use client"

import { X } from "lucide-react"
import { useState } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"

import { useEditor } from "../hooks/use-editor"

export function BlockPanel({ blockId, initialContent }: { blockId: string; initialContent: unknown }) {
  const { openPanelFor, updateBlockContent } = useEditor()
  const [value, setValue] = useState(JSON.stringify(initialContent, null, 2))
  const [saving, setSaving] = useState(false)

  const handleSave = async () => {
    setSaving(true)
    try {
      const parsed = JSON.parse(value)
      await updateBlockContent(blockId, parsed)
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed right-0 top-0 h-full w-full max-w-md bg-background border-l shadow-xl z-50 flex flex-col">
      <div className="flex items-center justify-between p-4 border-b">
        <h3 className="font-semibold">Настройки блока</h3>
        <Button variant="ghost" size="icon" onClick={() => openPanelFor(null)}>
          <X className="w-5 h-5" />
        </Button>
      </div>
      <div className="p-4 space-y-3 flex-1 overflow-auto">
        <p className="text-sm text-muted-foreground">Редактируй JSON контент блока</p>
        <Textarea className="min-h-[300px] font-mono" value={value} onChange={(e) => setValue(e.target.value)} />
      </div>
      <div className="p-4 border-t">
        <Button onClick={handleSave} className="w-full" disabled={saving}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </div>
  )
}
