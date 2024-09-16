import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '@/components/ui'
import { UserButton } from '@clerk/nextjs'
import { BookIcon, HeadphonesIcon, SearchIcon } from 'lucide-react'
import React from 'react'

type Props = {}

const Infobar = (props: Props) => {
  const TriggerIcon = ({
    icon: Icon,
    content
  }: {
    icon: typeof HeadphonesIcon
    content: string
  }) => (
    <Tooltip>
      <TooltipTrigger asChild>
        <Icon className="size-5 cursor-pointer" />
      </TooltipTrigger>
      <TooltipContent>{content}</TooltipContent>
    </Tooltip>
  )

  return (
    <nav className="flex items-center gap-5 bg-background px-4 py-3">
      <div className="ml-auto flex w-[10rem] items-center gap-3 rounded-full border border-white/5 bg-secondary px-4 py-2 sm:w-[14rem] lg:w-[18rem]">
        <SearchIcon className="size-5" />
        <input
          type="text"
          placeholder="Quick Search"
          className="w-full bg-transparent text-sm placeholder-neutral-400 focus:outline-none"
        />
      </div>
      <TooltipProvider>
        <TriggerIcon icon={HeadphonesIcon} content="Contact Support" />
        <TriggerIcon icon={BookIcon} content="Guide" />
      </TooltipProvider>
      <UserButton />
    </nav>
  )
}

export default Infobar
