'use client'
import Image, { StaticImageData } from 'next/image'
import React, { useEffect, useState } from 'react'

import { cn } from '@/lib/utils'

const InfiniteMovingCards = ({
  items,
  direction = 'left',
  speed = 'fast',
  pauseOnHover = true,
  className
}: {
  items: StaticImageData[]
  direction?: 'left' | 'right'
  speed?: 'fast' | 'normal' | 'slow'
  pauseOnHover?: boolean
  className?: string
}) => {
  const containerRef = React.useRef<HTMLDivElement>(null)
  const scrollerRef = React.useRef<HTMLUListElement>(null)

  useEffect(() => {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = [...scrollerRef.current.children]

      for (const item of scrollerContent) {
        const duplicatedItem = item.cloneNode(true)
        if (scrollerRef.current) {
          scrollerRef.current.append(duplicatedItem)
        }
      }

      if (containerRef.current) {
        if (direction === 'left') {
          containerRef.current.style.setProperty('--animation-direction', 'forwards')
        } else {
          containerRef.current.style.setProperty('--animation-direction', 'reverse')
        }
      }
      if (containerRef.current) {
        if (speed === 'fast') {
          containerRef.current.style.setProperty('--animation-duration', '20s')
        } else if (speed === 'normal') {
          containerRef.current.style.setProperty('--animation-duration', '40s')
        } else {
          containerRef.current.style.setProperty('--animation-duration', '80s')
        }
      }
      setStart(true)
    }
  }, [direction, speed])

  const [start, setStart] = useState(false)

  return (
    <div
      ref={containerRef}
      className={cn(
        'scroller relative z-20 max-w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,white_20%,white_80%,transparent)]',
        className
      )}
    >
      <ul
        ref={scrollerRef}
        className={cn(
          'flex w-max min-w-full shrink-0 flex-nowrap gap-20 py-4',
          start && 'animate-scroll',
          pauseOnHover && 'hover:[animation-play-state:paused]'
        )}
      >
        {items.map((item, index) => (
          <Image
            key={index}
            alt="brand"
            className="relative w-[170px] rounded-2xl object-contain opacity-50"
            height={0}
            sizes="100vw"
            src={item}
            width={0}
          />
        ))}
      </ul>
    </div>
  )
}

export default InfiniteMovingCards
