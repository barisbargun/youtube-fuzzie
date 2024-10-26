'use client'
import { motion } from 'framer-motion'

import { cn } from '@/lib/utils'

const Lamp = ({ className }: { className?: string }) => {
  return (
    <div
      className={cn(
        'relative z-0 flex h-[500px] w-full flex-col overflow-hidden rounded-md bg-neutral-950 sm:min-h-[800px]',
        className
      )}
    >
      <div className="relative isolate z-0 flex w-full flex-1 scale-y-125 items-center justify-center">
        <motion.div
          className="bg-gradient-conic absolute inset-auto right-1/2 h-56 w-[30rem] max-w-[45rem] overflow-visible from-neutral-500 via-transparent to-transparent text-white [--conic-position:from_70deg_at_center_top]"
          initial={{ opacity: 0.5, width: '25vw' }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, width: '50vw' }}
        >
          <div className="absolute bottom-0 left-0 z-20 h-40 w-full bg-neutral-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
          <div className="absolute bottom-0 left-0 z-20 h-full w-[16.5vw] max-w-60 bg-neutral-950 [mask-image:linear-gradient(to_right,white,transparent)]" />
        </motion.div>
        <motion.div
          className="bg-gradient-conic absolute inset-auto left-1/2 h-56 max-w-[45rem] from-transparent via-transparent to-neutral-500 text-white [--conic-position:from_290deg_at_center_top]"
          initial={{ opacity: 0.5, width: '25vw' }}
          style={{
            backgroundImage: `conic-gradient(var(--conic-position), var(--tw-gradient-stops))`
          }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, width: '50vw' }}
        >
          <div className="absolute bottom-0 right-0 z-20 h-full w-[16.5vw] max-w-60 bg-neutral-950 [mask-image:linear-gradient(to_left,white,transparent)]" />
          <div className="absolute bottom-0 right-0 z-20 h-40 w-full bg-neutral-950 [mask-image:linear-gradient(to_top,white,transparent)]" />
        </motion.div>
        <div className="absolute top-1/2 h-48 w-full translate-y-12 scale-x-150 bg-neutral-950 blur-2xl"></div>
        <div className="absolute top-1/2 z-50 h-48 w-full bg-transparent opacity-10 backdrop-blur-md"></div>
        <div className="absolute inset-auto z-50 h-36 w-[46vw] max-w-2xl -translate-y-1/2 rounded-full bg-neutral-500 opacity-50 blur-3xl"></div>
        <motion.div
          className="absolute inset-auto z-30 h-36 max-w-96 -translate-y-24 rounded-full bg-neutral-400 blur-2xl"
          initial={{ width: '13.2vw' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ width: '26.4vw' }}
        ></motion.div>
        <motion.div
          className="absolute inset-auto z-50 h-0.5 max-w-[67rem] -translate-y-28 bg-neutral-400"
          initial={{ width: '25vw' }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ width: '50vw' }}
        ></motion.div>
        {/* 
        <div className="w-[66vw] max-w-[55rem] h-40 relative">
          <Sparkles
            background="transparent"
            minSize={0.4}
            maxSize={1}
            particleDensity={1200}
            className="w-full h-full"
            particleColor="#a8a29e"
          />
        </div> */}

        <div className="absolute inset-auto z-40 h-44 w-full -translate-y-[12.5rem] bg-neutral-950"></div>
      </div>

      <div className="relative z-50 flex -translate-y-80 flex-col items-center px-5">
        <motion.h2
          className="mt-8 bg-gradient-to-br from-neutral-300 to-neutral-500 bg-clip-text py-4 text-center text-4xl font-medium tracking-tight text-transparent sm:text-7xl xl:text-8xl"
          initial={{ opacity: 0.5, y: 100 }}
          transition={{
            delay: 0.3,
            duration: 0.8,
            ease: 'easeInOut'
          }}
          whileInView={{ opacity: 1, y: 0 }}
        >
          Plans that <br /> fit you best
        </motion.h2>
      </div>
    </div>
  )
}

export default Lamp
