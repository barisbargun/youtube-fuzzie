import Image from 'next/image'

import HomeNavbar from '@/components/others/home-navbar'
import Lamp from '@/components/others/lamp'
import PricingCard from '@/components/others/pricing-card'
import { Button } from '@/components/ui/button'
import ContainerScroll from '@/components/ui/container-scroll-animation'
import HeroParallax from '@/components/ui/hero-parallax'
import InfiniteMovingCards from '@/components/ui/infinite-moving-cards'
import { productsConfig } from '@/config/companies'
import { plansConfig } from '@/config/plans'

export default function Home() {
  const TitleComponent = () => (
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
  )

  return (
    <main className="flex w-full flex-col items-center overflow-hidden pb-10">
      <HomeNavbar />
      <section className="relative flex min-h-screen w-full flex-col items-center !overflow-visible rounded-md bg-neutral-950">
        <div className="absolute inset-0 size-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="-mt-4 flex flex-col md:mt-[-3.125rem]">
          <ContainerScroll titleComponent={<TitleComponent />}>
            <Image
              fill
              alt="bannerImage"
              className="h-full rounded-2xl border-[1rem] border-neutral-900 object-left-top max-xl:object-cover"
              draggable={false}
              src="/temp-banner.png"
            />
          </ContainerScroll>
        </div>
        <InfiniteMovingCards
          direction="right"
          items={[...Array.from({ length: 10 }).keys()].map((v) => `/${v + 1}.png`)}
          speed="slow"
        />
      </section>
      <section>
        <HeroParallax products={productsConfig} />
      </section>
      <section className="w-full px-8">
        <Lamp />
        <div className="-mt-56 flex flex-wrap justify-center gap-10 max-lg:flex-col lg:-mt-48">
          {plansConfig.map((v) => (
            <PricingCard {...v} key={v.price} />
          ))}
        </div>
      </section>
    </main>
  )
}
