import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="relative h-screen overflow-scroll rounded-l-xl border-l-[1px] border-t-[1px] border-muted-foreground/20 p-5 pb-20">
      {children}
    </main>
  )
}

export default Layout
