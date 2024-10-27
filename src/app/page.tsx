import { UserButton } from '@clerk/nextjs'
import { currentUser } from '@clerk/nextjs/server'
import { MenuIcon } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

import assets from '@/assets'
import Lamp from '@/components/others/lamp'
import PricingCard from '@/components/others/pricing-card'
import { Button } from '@/components/ui/button'
import {
  ScrollAnimationCard,
  ScrollAnimationContainer,
  ScrollAnimationHeader
} from '@/components/ui/scroll-animation'
import HeroParallax from '@/components/ui/hero-parallax'
import InfiniteMovingCards from '@/components/ui/infinite-moving-cards'
import { productsConfig } from '@/config/companies'
import { homeNavConfig } from '@/config/docs'
import { plansConfig } from '@/config/plans'

export default async function Home() {
  const user = await currentUser()

  return (
    <main className="flex w-full flex-col items-center overflow-hidden">
      {/** Navbar */}
      <header className="fixed inset-x-0 top-0 z-50 flex w-full items-center justify-between border-b border-neutral-900 bg-black/40 p-4 backdrop-blur-lg">
        <div className="flex items-center gap-0.5 text-3xl font-bold">
          <p>Fu</p>
          <Image
            alt="logo"
            className="size-auto shadow-sm"
            height={15}
            src={assets.logo}
            width={15}
          />
          <p>zie</p>
        </div>
        <nav className="absolute left-1/2 top-1/2 hidden -translate-x-1/2 -translate-y-1/2 md:block">
          <ul className="flex list-none items-center gap-4">
            {homeNavConfig.map((v) => (
              <li key={v.title}>
                <Link href={v.href}>{v.title}</Link>
              </li>
            ))}
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

      {/** Scroll animation */}
      <section className="relative flex min-h-screen w-full flex-col items-center !overflow-visible rounded-md bg-neutral-950">
        <div className="absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="-mt-4 flex flex-col md:mt-[-3.125rem]">
          <ScrollAnimationContainer>
            <ScrollAnimationHeader>
              <div className="-m-5 flex flex-col items-center">
                <Button
                  className="group mb-8 flex w-fit items-center justify-center rounded-full border-t-2 border-[#4D4D4D] bg-[#1F1F1F] p-6 text-xl transition-all duration-500 hover:bg-white hover:shadow-xl hover:shadow-neutral-500 sm:p-8 sm:text-2xl lg:mb-4"
                  size="lg"
                >
                  <span className="bg-gradient-to-r from-neutral-500 to-neutral-600 bg-clip-text font-sans text-transparent group-hover:from-black group-hover:to-black md:text-center">
                    Start For Free Today
                  </span>
                </Button>
                <h1 className="mb-4 bg-gradient-to-b from-white to-neutral-600 bg-clip-text font-sans text-5xl font-bold text-transparent md:text-8xl">
                  Automate Your Work With Fuzzie
                </h1>
              </div>
            </ScrollAnimationHeader>
            <ScrollAnimationCard>
              <Image
                fill
                alt="bannerImage"
                className="h-full rounded-2xl border-[1rem] border-neutral-900 object-left-top max-xl:object-cover"
                draggable={false}
                src={assets.screenshots.banner}
              />
            </ScrollAnimationCard>
          </ScrollAnimationContainer>
        </div>
        <InfiniteMovingCards direction="right" items={assets.brands.showcase} speed="slow" />
      </section>

      {/** Parallax */}
      <section>
        <HeroParallax products={productsConfig} />
      </section>

      {/** Pricing */}
      <section className="w-full bg-gray-950 px-8 pb-10">
        <Lamp>
          Plans that <br /> fit you best
        </Lamp>
        <div className="-mt-56 flex flex-wrap justify-center gap-10 max-lg:flex-col lg:-mt-48">
          {plansConfig.map((v) => (
            <PricingCard {...v} key={v.price} />
          ))}
        </div>
      </section>
    </main>
  )
}
