import { UserButton } from '@clerk/nextjs'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
type Props = {}

const Navbar = async (props: Props) => {
  return (
    <header className="fixed left-0 right-0 top-0 z-50 flex w-full items-center justify-between border-b-[1px] border-neutral-900 bg-black/40 px-4 py-4 backdrop-blur-lg">
      <aside className="flex items-center gap-0.5 text-3xl font-bold">
        <p>Fu</p>
        <Image
          src="/fuzzieLogo.png"
          alt="logo"
          className="h-auto w-auto shadow-sm"
          width={15}
          height={15}
        />
        <p>zie</p>
      </aside>
      <nav className="absolute left-[50%] top-[50%] hidden translate-x-[-50%] translate-y-[-50%] transform md:block">
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
          href="/dashboard"
          className="relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50"
        >
          <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#E2CBFF_0%,#393BB2_50%,#E2CBFF_100%)]" />
          <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-5 text-sm font-medium text-white backdrop-blur-3xl">
            {
              //WIP:wire up user
              true ? 'Dashboard' : 'Get Started'
            }
          </span>
        </Link>
        {
          //WIP: wire up user
        }
        <UserButton />
        <MenuIcon className="md:hidden" />
      </aside>
    </header>
  )
}

export default Navbar
