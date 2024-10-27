'use client'
import { motion, MotionValue, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'

import { IProductConfig } from '@/config/companies'

export const Header = () => {
  return (
    <div className="relative left-0 top-0 mx-auto w-full max-w-7xl px-4 py-20 md:py-40">
      <h1 className="text-2xl font-bold dark:text-white md:text-7xl">
        The Ultimate <br /> development studio
      </h1>
      <p className="mt-8 max-w-2xl text-base dark:text-neutral-200 md:text-xl">
        We build beautiful products with the latest technologies and frameworks. We are a team of
        passionate developers and designers that love to build amazing products.
      </p>
    </div>
  )
}

export const ProductCard = ({
  product,
  translate
}: {
  product: IProductConfig
  translate: MotionValue<number>
}) => {
  return (
    <motion.div
      key={product.title}
      className="group/product relative aspect-[10/9] w-screen flex-shrink-0 sm:aspect-[14/9] lg:w-[48vw]"
      style={{
        x: translate
      }}
      whileHover={{
        y: -20
      }}
    >
      <Link className="block group-hover/product:shadow-2xl" href={product.link}>
        <Image
          alt={product.title}
          className="absolute inset-0 size-full object-cover object-left-top"
          height="600"
          src={product.thumbnail}
          width="600"
        />
      </Link>
      <div className="pointer-events-none absolute inset-0 size-full bg-black opacity-0 group-hover/product:opacity-70"></div>
      <h2 className="absolute bottom-4 left-4 text-white opacity-0 group-hover/product:opacity-100">
        {product.title}
      </h2>
    </motion.div>
  )
}

const HeroParallax = ({
  products
}: {
  products: IProductConfig[]
}) => {
  const firstRow = products.slice(0, 5)
  const secondRow = products.slice(5, 10)
  const thirdRow = products.slice(10, 15)
  const ref = React.useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start']
  })

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 }

  const translateX = useSpring(useTransform(scrollYProgress, [0, 1], [0, 1000]), springConfig)
  const translateXReverse = useSpring(
    useTransform(scrollYProgress, [0, 1], [0, -1000]),
    springConfig
  )
  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [15, 0]), springConfig)
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig)
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [20, 0]), springConfig)
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-700, 0]), springConfig)
  return (
    <div
      ref={ref}
      className="relative flex max-w-[100vw] flex-col self-auto overflow-hidden py-40 antialiased [perspective:1000px] [transform-style:preserve-3d]"
    >
      <Header />
      <motion.div
        className=""
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity
        }}
      >
        <motion.div className="mb-20 flex flex-row-reverse space-x-20 space-x-reverse">
          {firstRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
        <motion.div className="mb-20 flex flex-row space-x-20">
          {secondRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateXReverse} />
          ))}
        </motion.div>
        <motion.div className="flex flex-row-reverse space-x-20 space-x-reverse">
          {thirdRow.map((product) => (
            <ProductCard key={product.title} product={product} translate={translateX} />
          ))}
        </motion.div>
      </motion.div>
    </div>
  )
}

export default HeroParallax
