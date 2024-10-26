import React from 'react'

import Navbar from '@/components/global/navbar'
import Sidebar from '@/components/global/sidebar'

type Props = {
  children: React.ReactNode
}

const PagesLayout = ({ children }: Props) => {
  return (
    <div className="flex h-screen overflow-hidden">
      <Sidebar />
      <div className="w-full overflow-hidden bg-neutral-900/10 dark:bg-neutral-900/20">
        <Navbar />
        {children}
      </div>
    </div>
  )
}

export default PagesLayout
