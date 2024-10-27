'use client'
import { motion } from 'framer-motion'
import React from 'react'

import { cn } from '@/lib/utils'

type Props = {
  children: React.ReactNode
}

export default function Lamp({ children }: Props) {
  return (
    <LampContainer>
      <motion.h1
        className="mt-8 bg-gradient-to-br from-neutral-300 to-neutral-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent md:text-7xl"
        initial={{ opacity: 0.5, y: 100 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: 'easeInOut'
        }}
        whileInView={{ opacity: 1, y: 0 }}
      >
        {children}
      </motion.h1>
    </LampContainer>
  )
}

const LampContainer = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div
      className={cn(
        'relative z-0 flex min-h-screen w-full flex-col items-center justify-center overflow-hidden rounded-md bg-gray-950',
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] overflow-visible from-gray-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          initial={{ opacity: 0.5, width: '15rem' }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, width: '30rem' }}
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-gray-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-40 bg-gray-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 w-[30rem] from-transparent via-transparent to-gray-500 text-white [--conic-position:from_290deg_at_center_top]"
          initial={{ opacity: 0.5, width: '15rem' }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, width: '30rem' }}
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-40 bg-gray-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-gray-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-gray-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[28rem] -translate-y-1/2 rounded-full bg-gray-500 opacity-50 blur-3xl"></div>
        <motion.div
          className="absolute inset-auto z-30 h-36 w-64 -translate-y-24 rounded-full bg-gray-400 blur-2xl"
          initial={{ width: '8rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ width: '16rem' }}
        ></motion.div>
        <motion.div
          className="absolute inset-auto z-50 h-0.5 w-[30rem] -translate-y-28 bg-gray-400"
          initial={{ width: '15rem' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ width: '30rem' }}
        ></motion.div>

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-gray-950"></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        {children}
      </div>
    </div>
  )
}
