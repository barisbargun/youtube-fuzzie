import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import assets from '@/assets'

const HomeNavbar = async () => {
  const user = await currentUser()

  return (
    <header className="fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between border-b border-neutral-900 bg-black/40 p-4 backdrop-blur-lg">
      <aside className="flex items-center gap-0.5 text-3xl font-bold">
        <p>Fu</p>
        <Image
          alt="logo"
          className="size-auto shadow-sm"
          height={15}
          src={assets.logo}
          width={15}
        />
        <p>zie</p>
      </aside>
      <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
        <ul className="flex list-none items-center gap-4">
          <li>
            <Link href="#">Products</Link>
          </li>
          <li>
            <Link href="#">Pricing</Link>
          </li>
          <li>
            <Link href="#">Clients</Link>
          </li>
          <li>
            <Link href="#">Resources</Link>
          </li>
          <li>
            <Link href="#">Documentation</Link>
          </li>
          <li>
            <Link href="#">Enterprise</Link>
          </li>
        </ul>
      </nav>
      <aside className="flex items-center gap-4">
        <Link
          className="relative inline-flex h-12 overflow-hidden rounded-full p-px focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
          href="/dashboard"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex size-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-medium text-white backdrop-blur-3xl">
            {user ? 'Dashboard' : 'Get Started'}
          </span>
        </Link>
        {user && <UserButton />}
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  )
}

export default HomeNavbar
