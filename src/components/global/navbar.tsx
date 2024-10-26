import { UserButton } from '@clerk/nextjs'
import { BookIcon, HeadphonesIcon, SearchIcon } from 'lucide-react'

import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from '../ui/tooltip'

const Navbar = () => {
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
      <div className="ml-auto flex w-40 items-center gap-3 rounded-full border border-white/5 bg-secondary px-4 py-2 sm:w-56 lg:w-72">
        <SearchIcon className="size-5" />
        <input
          className="w-full bg-transparent text-sm placeholder-neutral-400 focus:outline-none"
          placeholder="Quick Search"
          type="text"
        />
      </div>
      <TooltipProvider>
        <TriggerIcon content="Contact Support" icon={HeadphonesIcon} />
        <TriggerIcon content="Guide" icon={BookIcon} />
      </TooltipProvider>
      <UserButton />
    </nav>
  )
}

export default Navbar
