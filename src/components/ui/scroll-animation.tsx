'use client'
import { motion, MotionValue, useScroll, useTransform } from 'framer-motion'
import React, { ReactNode, useRef } from 'react'

type Props = {
  children: ReactNode
}

const ScrollAnimationContainer = ({ children }: Props) => {
  const containerRef = useRef<any>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef
  })
  const [isMobile, setIsMobile] = React.useState(false)

  React.useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth <= 768)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => {
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  const scaleDimensions = () => {
    return isMobile ? [0.7, 0.9] : [1.05, 1]
  }

  const rotate = useTransform(scrollYProgress, [0, 1], [20, 0])
  const scale = useTransform(scrollYProgress, [0, 1], scaleDimensions())
  const translate = useTransform(scrollYProgress, [0, 1], [0, -100])

  return (
    <div
      ref={containerRef}
      className="relative flex h-[60rem] items-center justify-center p-2 md:h-[80rem] md:p-20"
    >
      <div
        className="relative w-full py-10 md:py-40"
        style={{
          perspective: '1000px'
        }}
      >
        {React.Children.map(children, (child) =>
          React.isValidElement(child)
            ? React.cloneElement(child, { translate, scale, rotate } as any)
            : child
        )}
      </div>
    </div>
  )
}

const ScrollAnimationHeader = ({ translate, children }: any) => {
  return (
    <motion.div
      className="div mx-auto max-w-5xl text-center"
      style={{
        translateY: translate
      }}
    >
      {children}
    </motion.div>
  )
}

const ScrollAnimationCard = ({
  rotate,
  scale,
  children
}: {
  rotate?: MotionValue<number>
  scale?: MotionValue<number>
  translate?: MotionValue<number>
  children: React.ReactNode
}) => {
  return (
    <motion.div
      className="mx-auto -mt-12 h-[30rem] w-full max-w-5xl rounded-[1.875rem] border-4 border-[#6C6C6C] bg-[#222222] p-2 shadow-2xl md:h-[40rem] md:p-6"
      style={{
        rotateX: rotate,
        scale,
        boxShadow:
          '0 0 #0000004d, 0 9px 20px #0000004a, 0 37px 37px #00000042, 0 84px 50px #00000026, 0 149px 60px #0000000a, 0 233px 65px #00000003'
      }}
    >
      <div className="relative size-full overflow-hidden rounded-2xl bg-gray-100 dark:bg-zinc-900 md:rounded-2xl md:p-4">
        {children}
      </div>
    </motion.div>
  )
}

export { ScrollAnimationCard, ScrollAnimationContainer, ScrollAnimationHeader }
