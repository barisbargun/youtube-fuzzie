import { Navbar } from "@/components/global";
import { Lamp, PricingCard } from "@/components/pages";
import {
  Button,
  ContainerScroll,
  HeroParallax,
  InfiniteMovingCards,
} from "@/components/ui";
import { productsConfig } from "@/config/companies";
import { plansConfig } from "@/config/plans";
import Image from "next/image";

export default function Home() {
  const TitleComponent = () => (
    <div className="flex items-center flex-col">
      <Button
        size="lg"
        className="p-6 sm:p-8 mb-8 lg:mb-4  text-xl sm:text-2xl w-fit border-t-2 rounded-full border-[#4D4D4D] bg-[#1F1F1F] hover:bg-white group transition-all flex items-center justify-center hover:shadow-xl hover:shadow-neutral-500 duration-500"
      >
        <span className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-500 to-neutral-600  md:text-center font-sans group-hover:from-black group-hover:to-black">
          Start For Free Today
        </span>
      </Button>
      <h1 className="text-5xl md:text-8xl bg-clip-text text-transparent bg-gradient-to-b from-white to-neutral-600 font-sans font-bold mb-4">
        Automate Your Work With Fuzzie
      </h1>
    </div>
  );

  return (
    <main className="flex flex-col items-center w-full overflow-hidden pb-10">
      <Navbar />
      <section className="min-h-screen w-full bg-neutral-950 rounded-md !overflow-visible relative flex flex-col items-center">
        <div className="absolute inset-0 h-full w-full items-center px-5 py-24 [background:radial-gradient(125%_125%_at_50%_10%,#000_35%,#223_100%)]"></div>
        <div className="flex flex-col mt-[-1rem] md:mt-[-3.125rem] ">
          <ContainerScroll titleComponent={<TitleComponent />}>
            <Image
              src="/temp-banner.png"
              alt="bannerImage"
              className="max-xl:object-cover object-left-top rounded-2xl h-full border-[1rem] border-neutral-900"
              fill
              draggable={false}
            />
          </ContainerScroll>
        </div>
        <InfiniteMovingCards
          items={[...Array(10).keys()].map((v) => `/${v + 1}.png`)}
          direction="right"
          speed="slow"
        />
      </section>
      <section>
        <HeroParallax products={productsConfig} />
      </section>
      <section className="w-full px-8 ">
        <Lamp />
        <div className="flex flex-wrap max-lg:flex-col justify-center gap-10 -mt-[14rem] lg:-mt-[12rem]">
          {plansConfig.map((v, i) => (
            <PricingCard {...v} />
          ))}
        </div>
      </section>
    </main>
  );
}
