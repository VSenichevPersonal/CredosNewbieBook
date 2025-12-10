"use client"

import { useEffect, useState, useCallback, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import {
  ArrowRight,
  ChevronDown,
  Sparkles,
  TrendingUp,
  Megaphone,
  Settings,
  Code,
  Users,
  Calculator,
  Package,
  Scale,
  Building,
  Shield,
  FileText,
  Server,
  Workflow,
  Boxes,
  Target,
  GraduationCap,
  Dumbbell,
  Heart,
  PartyPopper,
  DollarSign,
  Calendar,
  Award,
  Coffee,
  Plane,
  Clock,
  AlertCircle,
  ExternalLink,
} from "lucide-react"

import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

import { useEditor } from "../hooks/use-editor"
import { EditableBlock } from "./editable-block"
import { BlockPanel } from "./block-panel"
import { Block } from "../types"
import { companyInfo, codeOfConduct as codeOfConductData } from "@/lib/data"

const deptIconMap: Record<string, any> = {
  TrendingUp, Megaphone, Settings, Code, Users, Calculator, Package, Scale, Building,
}
const dirIconMap: Record<string, any> = { Shield, FileText, Server, Workflow, Boxes }
const benefitIconMap: Record<string, any> = {
  GraduationCap, Dumbbell, Heart, PartyPopper, DollarSign, Calendar, Award, Coffee, Plane, Clock,
}

const gradientMap = [
  "from-accent-cyan/40 to-accent-purple/40",
  "from-accent-purple/40 to-accent-pink/40",
  "from-accent-pink/40 to-accent-orange/40",
  "from-accent-orange/40 to-accent-cyan/40",
  "from-accent-cyan/40 to-accent-pink/40",
  "from-accent-purple/40 to-accent-orange/40",
  "from-accent-pink/40 to-accent-cyan/40",
  "from-accent-orange/40 to-accent-purple/40",
  "from-accent-cyan/40 to-accent-orange/40",
]

type PageRendererProps = {
  pageId: string
  blocks: Block[]
}

export function PageRenderer({ pageId, blocks }: PageRendererProps) {
  const { isEditing, selectedBlockId, openPanelFor, reorderBlocks, updateBlockContent, updateBlockSettings } = useEditor()
  const [localBlocks, setLocalBlocks] = useState(blocks)
  const [creating, setCreating] = useState(false)
  const [newBlockType, setNewBlockType] = useState<string>("text")
  const saveTimeoutRef = useRef<NodeJS.Timeout | null>(null)

  const toggleBlockVisibility = useCallback(
    async (blockId: string) => {
      setLocalBlocks((prev) =>
        prev.map((b) => {
          if (b.id !== blockId) return b
          const currentSettings = (b.settings as Record<string, unknown>) || {}
          const newHidden = !currentSettings.hidden
          const newSettings = { ...currentSettings, hidden: newHidden }
          updateBlockSettings(blockId, newSettings)
          return { ...b, settings: newSettings }
        }),
      )
    },
    [updateBlockSettings],
  )


  const presets: Record<string, { content: any }> = {
    text: { content: { text: "Текстовый блок" } },
    hero: {
      content: {
        eyebrow: "Добро пожаловать в Кредо-С",
        title: "Ваш путеводитель по компании",
        description: "Здесь вы найдете информацию о структуре компании",
        primaryCta: { label: "Начать знакомство", href: "/first-day" },
        secondaryCta: { label: "Посмотреть отделы", href: "#departments" },
        image: "https://www.credos.ru/local/templates/credos-new/images/first-img.svg",
      },
    },
    about: { content: { description: "О компании", founded: 1993, employees: 65, offices: [] } },
    departments: { content: { departments: [] } },
    directions: { content: { directions: [] } },
    mission: { content: { title: "Наша миссия", description: "Описание", values: [] } },
    benefits: { content: { benefits: [] } },
    regulations: { content: { codeOfConduct: [] } },
  }

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
      reorderBlocks(pageId, next.map((b) => b.id)).catch(console.error)
      return next
    })
  }

  // Автосохранение с debounce
  const saveBlock = useCallback(
    async (blockId: string, content: unknown) => {
      await updateBlockContent(blockId, content)
    },
    [updateBlockContent],
  )

  const handleContentUpdate = useCallback(
    (blockId: string, content: unknown) => {
      setLocalBlocks((prev) => prev.map((b) => (b.id === blockId ? { ...b, content } : b)))

      // Debounced save
      if (saveTimeoutRef.current) clearTimeout(saveTimeoutRef.current)
      saveTimeoutRef.current = setTimeout(() => {
        saveBlock(blockId, content)
      }, 800)
    },
    [saveBlock],
  )

  const addBlock = async (type: string) => {
    setCreating(true)
    try {
      const preset = presets[type] ?? { content: {} }
      const res = await fetch("/api/cms/blocks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageId, type, orderIndex: localBlocks.length, content: preset.content }),
      })
      const json = await res.json().catch(() => null)
      if (!res.ok || !json?.id) throw new Error("Не удалось создать блок")
      setLocalBlocks((prev) => [...prev, { id: json.id, pageId, type, orderIndex: prev.length, content: preset.content } as Block])
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-0">
      {localBlocks.map((block) => {
        const body = renderBlock(block, isEditing, (content) => handleContentUpdate(block.id, content))

        const blockSettings = (block.settings as Record<string, unknown>) || {}
        const isBlockHidden = !!blockSettings.hidden

        // В режиме просмотра пропускаем скрытые блоки
        if (!isEditing) {
          if (isBlockHidden) return null
          return <div key={block.id}>{body}</div>
        }

        return (
          <EditableBlock
            key={block.id}
            blockId={block.id}
            blockType={block.type}
            pageId={pageId}
            isHidden={isBlockHidden}
            onMoveUp={() => move(block.id, -1)}
            onMoveDown={() => move(block.id, 1)}
            onSettings={() => openPanelFor(block.id)}
            onDelete={() => setLocalBlocks((prev) => prev.filter((b) => b.id !== block.id))}
            onToggleVisibility={() => toggleBlockVisibility(block.id)}
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
        <div className="container mx-auto px-4 py-8">
          <form
            className="border rounded-lg p-4 bg-muted/40 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between"
            onSubmit={(e) => { e.preventDefault(); addBlock(newBlockType) }}
          >
            <div>
              <p className="font-semibold">Добавить блок</p>
              <p className="text-sm text-muted-foreground">Выберите тип блока</p>
            </div>
            <div className="flex gap-2 items-center">
              <select
                className="border rounded-md px-2 py-1 bg-background"
                value={newBlockType}
                onChange={(e) => setNewBlockType(e.target.value)}
              >
                {Object.keys(presets).map((key) => (
                  <option key={key} value={key}>{key}</option>
                ))}
              </select>
              <Button type="submit" disabled={creating}>
                {creating ? "Создание..." : "Добавить"}
              </Button>
            </div>
          </form>
        </div>
      )}
    </div>
  )
}

function renderBlock(block: Block, isEditing: boolean, onChange: (content: any) => void): JSX.Element {
  const content = (block.content as Record<string, any>) || {}

  switch (block.type) {
    case "hero": {
      const {
        eyebrow = "Добро пожаловать в Кредо-С",
        title = "Ваш путеводитель по компании",
        description = "Здесь вы найдете всю необходимую информацию",
        primaryCta = { label: "Начать знакомство", href: "/first-day" },
        secondaryCta = { label: "Посмотреть отделы", href: "#departments" },
        image = "https://www.credos.ru/local/templates/credos-new/images/first-img.svg",
      } = content

      return (
        <section className="relative min-h-screen flex items-center justify-center overflow-hidden mesh-gradient noise-texture">
          {/* Floating shapes */}
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 blur-3xl animate-float" />
          <div className="absolute top-40 right-20 w-72 h-72 rounded-full bg-gradient-to-br from-accent-pink/20 to-accent-orange/20 blur-3xl animate-float-delayed" />
          <div className="absolute bottom-20 left-1/4 w-80 h-80 rounded-full bg-gradient-to-br from-accent-purple/15 to-accent-cyan/15 blur-3xl animate-float" style={{ animationDelay: "2s" }} />
          <div className="absolute top-1/4 right-1/3 w-32 h-32 border-2 border-accent-cyan/20 rounded-2xl rotate-12 animate-float" />
          <div className="absolute bottom-1/3 left-1/4 w-24 h-24 border-2 border-accent-purple/20 rounded-full animate-float-delayed" />

          <div className="container mx-auto px-4 relative z-10 pt-20">
            <div className="grid lg:grid-cols-2 gap-12 items-center max-w-7xl mx-auto">
              <div className="space-y-8">
                <div className="inline-flex items-center gap-2 px-5 py-2.5 glass rounded-full text-sm font-medium mb-4 shadow-lg">
                  <Sparkles className="w-4 h-4 text-accent-cyan" />
                  <EditableText isEditing={isEditing} value={eyebrow} onChange={(v) => onChange({ ...content, eyebrow: v })} className="text-foreground" />
                </div>

                <h1 className="text-4xl md:text-6xl font-bold leading-tight text-balance">
                  <EditableText isEditing={isEditing} value={title} onChange={(v) => onChange({ ...content, title: v })} />
                </h1>

                <EditableText
                  isEditing={isEditing}
                  as="p"
                  className="text-lg md:text-xl text-muted-foreground max-w-2xl text-pretty leading-relaxed"
                  value={description}
                  onChange={(v) => onChange({ ...content, description: v })}
                />

                <div className="flex flex-col sm:flex-row gap-4 pt-6">
                  <Link
                    href={primaryCta?.href ?? "#"}
                    className="bg-[#00BFFF] hover:bg-[#00A8E6] text-white font-semibold text-base px-8 h-12 shadow-xl shadow-[#00BFFF]/40 transition-all duration-300 hover:shadow-2xl hover:shadow-[#00BFFF]/60 hover:scale-105 inline-flex items-center justify-center rounded-md"
                  >
                    {primaryCta?.label ?? "Начать"}
                  </Link>
                  <Button size="lg" variant="outline" className="border-2 border-[#00BFFF] text-[#00BFFF] hover:bg-[#00BFFF] hover:text-white font-semibold text-base px-8 h-12 transition-all duration-300 hover:scale-105 bg-white/90" asChild>
                    <a href={secondaryCta?.href ?? "#"}>{secondaryCta?.label ?? "Подробнее"}</a>
                  </Button>
                </div>
              </div>

              <div className="relative flex items-center justify-center lg:justify-end">
                <div className="relative w-full max-w-[500px] aspect-square">
                  <Image src={image} alt={title} fill className="object-contain animate-float" priority />
                </div>
              </div>
            </div>

            <div className="pt-16 animate-bounce text-center">
              <ChevronDown className="w-6 h-6 mx-auto text-muted-foreground" />
            </div>
          </div>
        </section>
      )
    }

    case "about": {
      const { founded, employees, offices = [], description = "", title = "О компании", subtitle = "" } = content
      const yearsInBusiness = new Date().getFullYear() - (companyInfo.founded || 1993)
      const history = (companyInfo as any).history || []
      
      return (
        <section id="about" className="py-24 relative overflow-hidden bg-background">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  <EditableText isEditing={isEditing} value={title} onChange={(v) => onChange({ ...content, title: v })} />
                </h2>
                <EditableText
                  isEditing={isEditing}
                  as="p"
                  className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
                  value={subtitle || description || "Более " + yearsInBusiness + " лет защищаем бизнес наших клиентов"}
                  onChange={(v) => onChange({ ...content, subtitle: v })}
                />
              </div>

              <div className="grid md:grid-cols-2 gap-8 mb-12">
                 <Card className="glass border-white/10 p-8 hover:border-accent-cyan/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center flex-shrink-0">
                      <Calendar className="w-6 h-6 text-accent-cyan" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">История</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        Компания основана в {companyInfo.founded || 1993} году.
                      </p>
                    </div>
                  </div>
                </Card>
                <Card className="glass border-white/10 p-8 hover:border-accent-cyan/30 transition-all duration-300">
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center flex-shrink-0">
                      <Users className="w-6 h-6 text-accent-purple" />
                    </div>
                    <div>
                      <h3 className="text-xl font-semibold mb-2">Команда</h3>
                      <p className="text-muted-foreground leading-relaxed">
                        В компании работает {companyInfo.employees || 65} специалистов.
                      </p>
                    </div>
                  </div>
                </Card>
              </div>

              {history.length > 0 && (
                 <div className="mt-16 relative">
                    <div className="absolute left-1/2 transform -translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-accent-cyan to-accent-purple opacity-30 hidden md:block" />
                    <div className="space-y-12">
                      {history.map((item: any, idx: number) => (
                        <div key={idx} className={`flex items-center gap-8 ${idx % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} flex-col`}>
                          <div className="flex-1 text-right md:text-right" style={{ textAlign: idx % 2 === 0 ? 'right' : 'left' } as any}>
                             {idx % 2 !== 0 && <div className="hidden md:block" />}
                             <div className={`hidden md:block ${idx % 2 === 0 ? "mr-auto" : "ml-auto"}`}></div>
                             <div className={idx % 2 === 0 ? "md:text-right" : "md:text-left"}>
                               <span className="text-3xl font-bold gradient-text-cyan-purple">{item.year}</span>
                             </div>
                          </div>
                          <div className="relative z-10 w-4 h-4 rounded-full bg-accent-cyan ring-4 ring-background hidden md:block" />
                          <div className="flex-1">
                             <Card className="p-6 glass border-white/10">
                               <p className="text-muted-foreground">{item.text}</p>
                             </Card>
                          </div>
                        </div>
                      ))}
                    </div>
                 </div>
              )}
            </div>
          </div>
        </section>
      )
    }

    case "departments": {
      const { departments = [], title = "Структура и отделы", subtitle = "Познакомьтесь с командами, которые делают компанию успешной" } = content
      return (
        <section id="departments" className="py-24 bg-gradient-to-b from-background via-muted/30 to-background relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-accent-purple/5 to-transparent rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-accent-cyan/5 to-transparent rounded-full blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  <EditableText isEditing={isEditing} value={title} onChange={(v) => onChange({ ...content, title: v })} />
                </h2>
                <EditableText
                  isEditing={isEditing}
                  as="p"
                  className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
                  value={subtitle}
                  onChange={(v) => onChange({ ...content, subtitle: v })}
                />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {departments.map((dept: any, index: number) => {
                  const Icon = deptIconMap[dept.icon] || Building
                  const gradient = gradientMap[index % gradientMap.length]
                  return (
                    <Link key={dept.id || index} href={"/departments/" + dept.slug}>
                      <Card className={"p-6 h-full card-hover group cursor-pointer bg-white bg-gradient-to-br " + gradient + " border-2 border-border backdrop-blur-sm shadow-lg hover:shadow-2xl transition-all duration-300"}>
                        <div className="flex flex-col h-full">
                          <div className="w-14 h-14 rounded-xl bg-accent-cyan flex items-center justify-center mb-4 shadow-lg shadow-accent-cyan/50 group-hover:shadow-xl group-hover:shadow-accent-cyan/70 transition-all duration-300 group-hover:scale-110">
                            <Icon className="w-7 h-7 text-brand-navy" />
                          </div>
                          <h3 className="text-xl font-semibold mb-2 text-brand-navy group-hover:text-accent-cyan transition-colors">{dept.name}</h3>
                          <p className="text-sm text-foreground/80 mb-4 flex-grow leading-relaxed line-clamp-3">{dept.description}</p>
                          <div className="flex items-center text-sm font-medium group-hover:gap-2 transition-all gradient-text-cyan-purple">
                            Подробнее <ArrowRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform" />
                          </div>
                        </div>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    case "directions": {
      const { directions = [], title = "Направления деятельности", subtitle = "Комплексные решения для защиты вашего бизнеса" } = content
      return (
        <section id="directions" className="py-24 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  <EditableText isEditing={isEditing} value={title} onChange={(v) => onChange({ ...content, title: v })} />
                </h2>
                <EditableText
                  isEditing={isEditing}
                  as="p"
                  className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
                  value={subtitle}
                  onChange={(v) => onChange({ ...content, subtitle: v })}
                />
              </div>
              <div className="space-y-6">
                {directions.map((dir: any, index: number) => {
                  const Icon = dirIconMap[dir.icon] || Shield
                  return (
                    <Link key={dir.id || index} href={"/directions/" + dir.slug}>
                      <Card className="p-8 hover:shadow-xl transition-all duration-300 hover:-translate-y-1 group cursor-pointer overflow-hidden relative">
                        <div className={"absolute inset-0 bg-gradient-to-r " + (dir.color || "from-red-500 to-orange-500") + " opacity-0 group-hover:opacity-5 transition-opacity"} />
                        <div className="relative flex flex-col md:flex-row gap-6 items-start">
                          <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary/10 to-accent-cyan/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform">
                            <Icon className="w-8 h-8 text-primary group-hover:text-accent-cyan transition-colors" />
                          </div>
                          <div className="flex-grow">
                            <h3 className="text-2xl font-semibold mb-3 group-hover:text-accent-cyan transition-colors">{dir.name}</h3>
                            <p className="text-muted-foreground mb-4 leading-relaxed">{dir.description}</p>
                            <div className="flex flex-wrap gap-2">
                              {(dir.services || []).slice(0, 3).map((svc: string, idx: number) => (
                                <span key={idx} className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">{svc}</span>
                              ))}
                              {(dir.services || []).length > 3 && <span className="text-xs px-3 py-1 bg-muted rounded-full text-muted-foreground">+{dir.services.length - 3} еще</span>}
                            </div>
                          </div>
                        </div>
                      </Card>
                    </Link>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      )
    }

    case "mission": {
      const { title = "Наша миссия", description = "", values = [], badge = "Наши ценности" } = content
      return (
        <section id="mission" className="py-24 bg-gradient-to-br from-primary/5 to-accent-cyan/5">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full mb-4">
                  <Target className="w-4 h-4 text-primary" />
                  <EditableText isEditing={isEditing} className="text-sm font-medium text-primary" value={badge} onChange={(v) => onChange({ ...content, badge: v })} />
                </div>
                <h2 className="text-4xl md:text-5xl font-bold mb-6 text-balance">
                  <EditableText isEditing={isEditing} value={title} onChange={(v) => onChange({ ...content, title: v })} />
                </h2>
                <EditableText isEditing={isEditing} as="p" className="text-xl text-muted-foreground max-w-3xl mx-auto text-pretty leading-relaxed" value={description} onChange={(v) => onChange({ ...content, description: v })} />
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                {values.map((val: any, index: number) => (
                  <Card key={index} className="p-6 text-center hover:shadow-lg transition-shadow">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-accent-cyan mx-auto mb-4 flex items-center justify-center text-white font-bold text-xl">{index + 1}</div>
                    <h3 className="text-lg font-semibold mb-2">{val.title}</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed">{val.description}</p>
                  </Card>
                ))}
              </div>
              <div className="text-center">
                <Link href="/mission-ethics">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 group">
                    Узнать больше о миссии и этике <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      )
    }

    case "benefits": {
      // Use placeholder content if no benefits (since user requested just a link)
      // or check if benefits are empty and show the link logic
      const { benefits = [], title = "Бонусы и льготы", subtitle = "Мы ценим вклад каждого сотрудника", linkTitle = "Всё о бонусах", linkUrl = "https://docs.credos.ru", linkSubtitle = "docs.credos.ru" } = content
      
      return (
        <section id="benefits" className="py-24 relative overflow-hidden bg-background">
          <div className="absolute top-20 left-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-purple/10 to-accent-pink/10 blur-3xl" />
          <div className="absolute bottom-20 right-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-orange/10 blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  <EditableText isEditing={isEditing} value={title} onChange={(v) => onChange({ ...content, title: v })} />
                </h2>
                <EditableText
                  isEditing={isEditing}
                  as="p"
                  className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed"
                  value={subtitle}
                  onChange={(v) => onChange({ ...content, subtitle: v })}
                />
              </div>
              
              <div className="flex justify-center">
                  <Link href="https://docs.credos.ru" target="_blank" className="inline-block">
                    <Card className="glass border-white/10 p-8 hover:border-accent-cyan/30 transition-all duration-300 group flex items-center gap-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-cyan/20 to-accent-purple/20 flex items-center justify-center group-hover:scale-110 transition-transform">
                             <Award className="w-6 h-6 text-accent-cyan" />
                        </div>
                        <div>
                             <h3 className="text-xl font-semibold group-hover:text-accent-cyan transition-colors">Всё о бонусах</h3>
                             <p className="text-sm text-muted-foreground">docs.credos.ru</p>
                        </div>
                        <ExternalLink className="w-5 h-5 ml-2 text-muted-foreground group-hover:text-accent-cyan" />
                    </Card>
                  </Link>
              </div>
            </div>
          </div>
        </section>
      )
    }

    case "regulations": {
      const { codeOfConduct = codeOfConductData } = content
      const displayCode = codeOfConduct.length > 0 ? codeOfConduct : codeOfConductData

      return (
        <section id="regulations" className="py-24 relative overflow-hidden bg-muted/30">
          <div className="absolute top-20 right-10 w-96 h-96 rounded-full bg-gradient-to-br from-accent-cyan/10 to-accent-purple/10 blur-3xl" />
          <div className="absolute bottom-20 left-10 w-80 h-80 rounded-full bg-gradient-to-br from-accent-orange/10 to-accent-pink/10 blur-3xl" />
          <div className="container mx-auto px-4 relative z-10">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4 text-balance">
                  Корпоративная <span className="gradient-text-multi">этика</span>
                </h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto text-pretty leading-relaxed">
                  Наши принципы и правила
                </p>
              </div>
              <Card className="glass border-white/10 p-8">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-accent-purple/20 to-accent-pink/20 flex items-center justify-center">
                    <AlertCircle className="w-6 h-6 text-accent-purple" />
                  </div>
                  <h3 className="text-2xl font-bold">Кодекс этики</h3>
                </div>
                <div className="space-y-3">
                  {displayCode.map((line: string, idx: number) => (
                    <p key={idx} className="text-muted-foreground leading-relaxed flex items-start gap-2">
                      <span className="text-accent-cyan mt-1">•</span>
                      <span>{line}</span>
                    </p>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>
      )
    }

    case "text": {
      const { text = "Текстовый блок" } = content
      return (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <EditableText isEditing={isEditing} as="div" className="prose dark:prose-invert max-w-none" value={text} onChange={(v) => onChange({ ...content, text: v })} />
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
  as = "span",
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
      className={cn(className, "outline-none ring-2 ring-transparent focus:ring-accent-cyan/50 rounded-sm cursor-text")}
      contentEditable
      suppressContentEditableWarning
      onBlur={(e: any) => onChange(e.currentTarget.innerText)}
    >
      {value}
    </Tag>
  )
}
