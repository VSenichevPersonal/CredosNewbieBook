"use client"

import { useEffect, useMemo, useState } from "react"
import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useEditor } from "../hooks/use-editor"
import { EditableBlock } from "./editable-block"
import { BlockPanel } from "./block-panel"
import { Block } from "../types"

type PageRendererProps = {
  pageId: string
  blocks: Block[]
}

export function PageRenderer({ pageId, blocks }: PageRendererProps) {
  const { isEditing, selectedBlockId, openPanelFor, reorderBlocks, updateBlockContent } = useEditor()
  const [localBlocks, setLocalBlocks] = useState(blocks)
  const [creating, setCreating] = useState(false)

  useEffect(() => {
    setLocalBlocks(blocks)
  }, [blocks])

  const move = async (blockId: string, delta: number) => {
    setLocalBlocks((prev) => {
      const idx = prev.findIndex((b) => b.id === blockId)
      if (idx < 0) return prev
      const target = idx + delta
      if (target < 0 || target >= prev.length) return prev
      const next = [...prev]
      const [item] = next.splice(idx, 1)
      next.splice(target, 0, item)
      const orderedIds = next.map((b) => b.id)
      reorderBlocks(pageId, orderedIds).catch(console.error)
      return next
    })
  }

  const handleContentUpdate = (blockId: string, content: unknown) => {
    setLocalBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, content } : b)))
  }

  const addBlock = async (type: string) => {
    setCreating(true)
    try {
      const res = await fetch("/api/cms/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, type, orderIndex: localBlocks.length, content: {} }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.id) {
        throw new Error("Не удалось создать блок")
      }
      setLocalBlocks((prev) => [...prev, { id: json.id, pageId, type, orderIndex: prev.length, content: {} } as Block])
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-12">
      {localBlocks.map((block) => {
        const body = renderBlock(block, isEditing, (content) => {
          updateBlockContent(block.id, content)
          handleContentUpdate(block.id, content)
        })

        if (!isEditing) {
          return <div key={block.id}>{body}</div>
        }

        return (
          <EditableBlock
            key={block.id}
            blockId={block.id}
            pageId={pageId}
            onMoveUp={() => move(block.id, -1)}
            onMoveDown={() => move(block.id, 1)}
            onSettings={() => openPanelFor(block.id)}
            onDelete={() => setLocalBlocks((prev) => prev.filter((b) => b.id !== block.id))}
          >
            {body}
          </EditableBlock>
        )
      })}

      {isEditing && selectedBlockId && (
        <BlockPanel
          blockId={selectedBlockId}
          initialContent={localBlocks.find((b) => b.id === selectedBlockId)?.content}
          onContentChange={(content) => handleContentUpdate(selectedBlockId, content)}
        />
      )}

      {isEditing && (
        <div className="container mx-auto px-4">
          <div className="border rounded-lg p-4 bg-muted/40 flex items-center justify-between">
            <div>
              <p className="font-semibold">Добавить блок</p>
              <p className="text-sm text-muted-foreground">Пока доступен тип «text» (простой текстовый блок).</p>
            </div>
            <Button onClick={() => addBlock("text")} disabled={creating}>
              {creating ? "Создание..." : "Добавить текстовый блок"}
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}

function renderBlock(
  block: Block,
  isEditing: boolean,
  onChange: (content: any) => void,
): JSX.Element {
  const content = (block.content as Record<string, any>) || {}

  switch (block.type) {
    case "hero": {
      const {
        eyebrow = "Добро пожаловать в Кредо-С",
        title = "Ваш путеводитель по компании",
        description = "Здесь вы найдете всю необходимую информацию о структуре компании, процессах работы, корпоративной культуре и полезных ресурсах для успешного старта",
        primaryCta = { label: "Начать знакомство", href: "/first-day" },
        secondaryCta = { label: "Посмотреть отделы", href: "#departments" },
        image = "https://www.credos.ru/local/templates/credos-new/images/first-img.svg",
      } = content

      return (
        <section className="relative min-h-[70vh] flex items-center justify-center overflow-hidden mesh-gradient noise-texture">
          <div className="container mx-auto px-4 relative z-10 py-16">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium mb-4 shadow-lg">
                  <span className="text-foreground">{eyebrow}</span>
                </div>

                <EditableText
                  isEditing={isEditing}
                  as="h1"
                  className="text-4xl md:text-6xl font-bold leading-tight text-balance"
                  value={title}
                  onChange={(text) => onChange({ ...content, title: text })}
                />

                <EditableText
                  isEditing={isEditing}
                  as="p"
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed"
                  value={description}
                  onChange={(text) => onChange({ ...content, description: text })}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Button asChild className="bg-[#00BFFF] hover:bg-[#00A8E6] text-white">
                    <Link href={primaryCta?.href ?? "#"}>{primaryCta?.label ?? "Начать"}</Link>
                  </Button>
                  <Button variant="outline" className="border-2 border-[#00BFFF] text-[#00BFFF]" asChild>
                    <Link href={secondaryCta?.href ?? "#"}>{secondaryCta?.label ?? "Подробнее"}</Link>
                  </Button>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={image} alt={title} className="object-contain animate-float w-full h-full" />
                </div>
              </div>
            </div>
          </div>
        </section>
      )
    }

    case "about": {
      const { founded, employees, offices = [], description = "" } = content
      return (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10">
              <h2 className="text-4xl font-bold mb-4">О компании</h2>
              <EditableText
                isEditing={isEditing}
                as="p"
                className="text-lg text-muted-foreground"
                value={description}
                onChange={(text) => onChange({ ...content, description: text })}
              />
            </div>
            <div className="grid md:grid-cols-3 gap-6">
              <Card className="p-6 text-center">
                <p className="text-sm text-muted-foreground">Основана</p>
                <p className="text-2xl font-semibold">{founded ?? "—"}</p>
              </Card>
              <Card className="p-6 text-center">
                <p className="text-sm text-muted-foreground">Сотрудников</p>
                <p className="text-2xl font-semibold">{employees ?? "—"}</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground mb-2">Офисы</p>
                <ul className="space-y-1 text-sm text-foreground">
                  {Array.isArray(offices) &&
                    offices.map((o: any, idx: number) => (
                      <li key={idx} className="flex gap-2">
                        <span>•</span>
                        <span>{o.address}</span>
                      </li>
                    ))}
                </ul>
              </Card>
            </div>
          </div>
        </section>
      )
    }

    case "departments": {
      const { departments = [] } = content
      return (
        <section id="departments" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Отделы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {departments.map((dept: any) => (
                <Card key={dept.id} className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{dept.slug}</p>
                  <h3 className="text-lg font-semibold">{dept.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{dept.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
    }

    case "directions": {
      const { directions = [] } = content
      return (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Направления</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {directions.map((dir: any) => (
                <Card key={dir.id} className="p-4 space-y-2">
                  <p className="text-sm text-muted-foreground">{dir.slug}</p>
                  <h3 className="text-lg font-semibold">{dir.name}</h3>
                  <p className="text-sm text-muted-foreground line-clamp-3">{dir.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
    }

    case "mission": {
      const { title = "Наша миссия", description = "", values = [] } = content
      return (
        <section className="py-16 bg-gradient-to-br from-primary/5 to-accent-cyan/5">
          <div className="container mx-auto px-4">
            <div className="text-center mb-10 space-y-4">
              <h2 className="text-3xl font-bold">{title}</h2>
              <p className="text-lg text-muted-foreground">{description}</p>
            </div>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              {values.map((v: any, idx: number) => (
                <Card key={idx} className="p-4 space-y-2 text-center">
                  <div className="w-10 h-10 rounded-full bg-primary/10 text-primary flex items-center justify-center mx-auto font-semibold">
                    {idx + 1}
                  </div>
                  <h3 className="font-semibold">{v.title}</h3>
                  <p className="text-sm text-muted-foreground">{v.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
    }

    case "benefits": {
      const { benefits = [] } = content
      return (
        <section className="py-16 bg-background">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Бонусы и льготы</h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
              {benefits.map((benefit: any, idx: number) => (
                <Card key={idx} className="p-4 space-y-2">
                  <h3 className="font-semibold">{benefit.title}</h3>
                  <p className="text-sm text-muted-foreground">{benefit.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </section>
      )
    }

    case "regulations": {
      const { codeOfConduct = [] } = content
      return (
        <section className="py-16 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-3xl font-bold">Регламенты и этика</h2>
                <p className="text-muted-foreground">Ключевые принципы компании</p>
              </div>
              <Button variant="ghost" asChild>
                <Link href="/mission-ethics" className="inline-flex items-center gap-1">
                  Подробнее <ArrowRight className="w-4 h-4" />
                </Link>
              </Button>
            </div>
            <Card className="p-6 space-y-2">
              {codeOfConduct.map((line: string, idx: number) => (
                <p key={idx} className="text-sm text-muted-foreground">
                  • {line}
                </p>
              ))}
            </Card>
          </div>
        </section>
      )
    }

    case "text": {
      const { text = "Текстовый блок" } = content
      return (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <EditableText
              isEditing={isEditing}
              as="div"
              className="prose dark:prose-invert max-w-none"
              value={text}
              onChange={(value) => onChange({ ...content, text: value })}
            />
          </div>
        </section>
      )
    }

    default:
      return (
        <section className="py-8">
          <div className="container mx-auto px-4">
            <Card className="p-4">
              <p className="text-sm text-muted-foreground">Неизвестный блок: {block.type}</p>
            </Card>
          </div>
        </section>
      )
  }
}

function EditableText({
  value,
  onChange,
  isEditing,
  as = "p",
  className,
}: {
  value: string
  onChange: (text: string) => void
  isEditing: boolean
  as?: keyof JSX.IntrinsicElements
  className?: string
}) {
  const Tag = as as any
  if (!isEditing) return <Tag className={className}>{value}</Tag>

  return (
    <Tag
      className={cn(className, "outline-none ring-1 ring-transparent focus:ring-primary/40 rounded-sm")}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </Tag>
  )
}
