"use client"

import { X, FileText, Code2 } from "lucide-react"
import { useEffect, useState, useCallback } from "react"

import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { cn } from "@/lib/utils"

import { useEditor } from "../hooks/use-editor"

export function BlockPanel({
  blockId,
  initialContent,
  onContentChange,
}: {
  blockId: string
  initialContent: unknown
  onContentChange?: (content: unknown) => void
}) {
  const { openPanelFor, updateBlockContent } = useEditor()
  const [jsonValue, setJsonValue] = useState(JSON.stringify(initialContent, null, 2))
  const [formData, setFormData] = useState<Record<string, unknown>>({})
  const [saving, setSaving] = useState(false)
  const [jsonError, setJsonError] = useState<string | null>(null)
  const [activeTab, setActiveTab] = useState("text")

  // Синхронизация при смене блока
  useEffect(() => {
    const contentObj = (typeof initialContent === "object" && initialContent !== null) 
      ? initialContent as Record<string, unknown>
      : {}
    setFormData(contentObj)
    setJsonValue(JSON.stringify(initialContent, null, 2))
    setJsonError(null)
  }, [blockId, initialContent])

  // Синхронизация formData -> jsonValue при переключении на JSON вкладку
  useEffect(() => {
    if (activeTab === "json") {
      setJsonValue(JSON.stringify(formData, null, 2))
    }
  }, [activeTab, formData])

  const handleFieldChange = useCallback((key: string, value: unknown) => {
    setFormData((prev) => ({ ...prev, [key]: value }))
  }, [])

  const handleNestedFieldChange = useCallback((parentKey: string, childKey: string, value: unknown) => {
    setFormData((prev) => ({
      ...prev,
      [parentKey]: {
        ...(typeof prev[parentKey] === "object" && prev[parentKey] !== null ? prev[parentKey] as Record<string, unknown> : {}),
        [childKey]: value,
      },
    }))
  }, [])

  const handleJsonChange = (newJson: string) => {
    setJsonValue(newJson)
    try {
      const parsed = JSON.parse(newJson)
      setFormData(parsed)
      setJsonError(null)
    } catch {
      setJsonError("Невалидный JSON")
    }
  }

  const handleSave = async () => {
    setSaving(true)
    try {
      const dataToSave = activeTab === "json" ? JSON.parse(jsonValue) : formData
      await updateBlockContent(blockId, dataToSave)
      onContentChange?.(dataToSave)
    } catch {
      // JSON parse error
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

      <Tabs value={activeTab} onValueChange={setActiveTab} className="flex-1 flex flex-col">
        <div className="px-4 pt-4">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="text" className="flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Текст
            </TabsTrigger>
            <TabsTrigger value="json" className="flex items-center gap-2">
              <Code2 className="w-4 h-4" />
              JSON
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="text" className="flex-1 overflow-auto p-4 space-y-4 mt-0">
          <p className="text-sm text-muted-foreground">
            Редактируйте поля блока (ID: {blockId.slice(0, 8)}...)
          </p>
          <div className="space-y-4">
            {Object.entries(formData).map(([key, val]) => (
              <FieldEditor
                key={key}
                fieldKey={key}
                value={val}
                onChange={(v) => handleFieldChange(key, v)}
                onNestedChange={(childKey, v) => handleNestedFieldChange(key, childKey, v)}
              />
            ))}
            {Object.keys(formData).length === 0 && (
              <p className="text-sm text-muted-foreground italic">Нет полей для редактирования</p>
            )}
          </div>
        </TabsContent>

        <TabsContent value="json" className="flex-1 overflow-auto p-4 space-y-3 mt-0">
          <p className="text-sm text-muted-foreground">
            Редактируйте JSON напрямую (ID: {blockId.slice(0, 8)}...)
          </p>
          <Textarea
            className={cn(
              "min-h-[400px] font-mono text-sm",
              jsonError && "border-destructive focus-visible:ring-destructive"
            )}
            value={jsonValue}
            onChange={(e) => handleJsonChange(e.target.value)}
          />
          {jsonError && <p className="text-sm text-destructive">{jsonError}</p>}
        </TabsContent>
      </Tabs>

      <div className="p-4 border-t">
        <Button onClick={handleSave} className="w-full" disabled={saving || (activeTab === "json" && !!jsonError)}>
          {saving ? "Сохранение..." : "Сохранить"}
        </Button>
      </div>
    </div>
  )
}

// Компонент для редактирования одного поля
function FieldEditor({
  fieldKey,
  value,
  onChange,
  onNestedChange,
}: {
  fieldKey: string
  value: unknown
  onChange: (value: unknown) => void
  onNestedChange: (childKey: string, value: unknown) => void
}) {
  const labelMap: Record<string, string> = {
    title: "Заголовок",
    subtitle: "Подзаголовок",
    description: "Описание",
    text: "Текст",
    eyebrow: "Надзаголовок",
    label: "Кнопка",
    href: "Ссылка",
    image: "Изображение",
    name: "Название",
    primaryCta: "Основная кнопка",
    secondaryCta: "Вторичная кнопка",
  }

  const label = labelMap[fieldKey] || fieldKey

  // Строка
  if (typeof value === "string") {
    const isLongText = value.length > 100
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        {isLongText ? (
          <Textarea
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="min-h-[100px]"
          />
        ) : (
          <Input value={value} onChange={(e) => onChange(e.target.value)} />
        )}
      </div>
    )
  }

  // Число
  if (typeof value === "number") {
    return (
      <div className="space-y-2">
        <Label className="text-sm font-medium">{label}</Label>
        <Input
          type="number"
          value={value}
          onChange={(e) => onChange(Number(e.target.value))}
        />
      </div>
    )
  }

  // Boolean
  if (typeof value === "boolean") {
    return (
      <div className="flex items-center gap-3">
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onChange(e.target.checked)}
          className="w-4 h-4"
        />
        <Label className="text-sm font-medium">{label}</Label>
      </div>
    )
  }

  // Вложенный объект (например, CTA кнопки)
  if (typeof value === "object" && value !== null && !Array.isArray(value)) {
    const obj = value as Record<string, unknown>
    return (
      <div className="space-y-3 p-3 border rounded-lg bg-muted/30">
        <Label className="text-sm font-semibold text-foreground">{label}</Label>
        <div className="space-y-3 pl-2 border-l-2 border-muted">
          {Object.entries(obj).map(([childKey, childVal]) => {
            if (typeof childVal === "string") {
              const childLabel = labelMap[childKey] || childKey
              return (
                <div key={childKey} className="space-y-1">
                  <Label className="text-xs text-muted-foreground">{childLabel}</Label>
                  <Input
                    value={childVal}
                    onChange={(e) => onNestedChange(childKey, e.target.value)}
                    className="h-8 text-sm"
                  />
                </div>
              )
            }
            return null
          })}
        </div>
      </div>
    )
  }

  // Массив — показываем как список
  if (Array.isArray(value)) {
    return (
      <div className="space-y-2 p-3 border rounded-lg bg-muted/30">
        <Label className="text-sm font-semibold">{label} ({value.length} элементов)</Label>
        <p className="text-xs text-muted-foreground">
          Редактируйте массивы во вкладке JSON
        </p>
      </div>
    )
  }

  // Fallback
  return (
    <div className="space-y-2">
      <Label className="text-sm font-medium">{label}</Label>
      <p className="text-xs text-muted-foreground italic">Тип не поддерживается</p>
    </div>
  )
}
