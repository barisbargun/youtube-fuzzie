'use client'
import { ModeToggle } from '@/components/global'
import {
  Separator,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from '@/components/ui'
import { docsConfig } from '@/config/docs'
import siteConfig from '@/config/site'
import { cn } from '@/lib/utils'
import { SidebarNavItem } from '@/types/nav'
import { Database, GitBranch, LucideMousePointerClick } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import React, { useCallback, useMemo } from 'react'

type Props = {}

const Sidebar = (props: Props) => {
  const pathName = usePathname()

  const isActive = useCallback(
    (v: SidebarNavItem) => v.href && pathName.includes(v.href),
    [pathName]
  )

  return (
    <nav className="flex flex-col items-center bg-background px-3 pb-5 pt-3">
      <div>
        <Link href="/dashboard" className="mb-6 block font-bold">
          {siteConfig.name}.
        </Link>
        <TooltipProvider>
          <ul className="flex flex-col items-center gap-6">
            {docsConfig.sidebarNav.map((v) => (
              <Tooltip key={v.title}>
                <TooltipTrigger asChild>
                  <li>
                    <Link
                      href={v.href || ''}
                      className={cn(
                        'group flex size-8 scale-125 items-center justify-center rounded-lg',
                        isActive(v) && 'bg-[#EEE0FF] dark:bg-[#2F006B]'
                      )}
                    >
                      <v.icon selected={isActive(v)} />
                    </Link>
                  </li>
                </TooltipTrigger>
                <TooltipContent>{v.title}</TooltipContent>
              </Tooltip>
            ))}
          </ul>
        </TooltipProvider>
      </div>
      <Separator className="my-4" />
      <div className="flex h-44 w-[90%] flex-col items-center overflow-scroll rounded-full border border-border/60 bg-gray-200/60 py-3 shadow-sm dark:bg-secondary/40">
        <div className="flex-center size-7 cursor-pointer rounded-full bg-primary/15 p-[0.4rem] shadow-lg transition-all duration-100 hover:scale-125 hover:bg-neutral-700/40">
          <LucideMousePointerClick className="size-full" />
        </div>
        <Separator orientation="vertical" className="my-2 h-4 w-0.5" />
        <div className="flex-center size-7 cursor-pointer rounded-full bg-primary/15 p-[0.4rem] shadow-lg transition-all duration-100 hover:scale-125 hover:bg-neutral-700/40">
          <GitBranch className="size-full" />
        </div>
        <Separator orientation="vertical" className="my-2 h-4 w-0.5" />
        <div className="flex-center size-7 cursor-pointer rounded-full bg-primary/15 p-[0.4rem] shadow-lg transition-all duration-100 hover:scale-125 hover:bg-neutral-700/40">
          <Database className="size-full" />
        </div>
        <Separator orientation="vertical" className="my-2 h-4 w-0.5" />
        <div className="flex-center size-7 cursor-pointer rounded-full bg-primary/15 p-[0.4rem] shadow-lg transition-all duration-100 hover:scale-125 hover:bg-neutral-700/40">
          <GitBranch className="size-full" />
        </div>
      </div>
      <div className="mt-auto" />
      <ModeToggle />
    </nav>
  )
}

export default Sidebar
