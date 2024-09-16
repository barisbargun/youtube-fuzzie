import { Infobar, Sidebar } from '@/components/pages/main'
import React from 'react'

type Props = {
  children: React.ReactNode
}

const PagesLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full overflow-hidden bg-neutral-900/10 dark:bg-neutral-900/20">
        <Infobar />
        {children}
      </div>
    </div>
  )
}

export default PagesLayout
