import React from 'react'

type Props = {
  children: React.ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <main className="relative h-screen overflow-scroll rounded-l-xl border-l-[1px] border-t-[1px] border-muted-foreground/20 px-5 pb-5 mainC lg:px-8 lg:pb-8 ">
      {children}
    </main>
  )
}

export default Layout
