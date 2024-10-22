'use client'
import { IPlanConfig } from '@/config/plans'
import { CheckIcon, ArrowRight } from 'lucide-react'
import React from 'react'
import { CardContainer, CardBody, CardItem } from '../ui'
import Link from 'next/link'
import { cn } from '@/lib/utils'

type Props = IPlanConfig & {
  className?: React.ComponentProps<'div'>['className']
}

const PricingCard = ({ desc, features, price, title, className }: Props) => {
  return (
    <CardContainer>
      <CardBody
        className={cn(
          'group/card relative h-auto w-fit rounded-xl border border-black/[0.1] bg-gray-50 p-6 dark:border-white/[0.12] dark:bg-black dark:hover:shadow-2xl dark:hover:shadow-neutral-500/[0.1]',
          className
        )}
      >
        <CardItem
          as="h3"
          translateZ="50"
          className="text-lg font-bold text-neutral-600 dark:text-neutral-200"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-1 max-w-sm text-6xl font-bold text-neutral-500 dark:text-neutral-50"
        >
          ${price}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="mt-4 max-w-sm text-sm text-neutral-600 dark:text-neutral-300/90"
        >
          {desc}
        </CardItem>
        <ul className="mt-3">
          {features.map((f) => (
            <CardItem
              key={f}
              as="li"
              translateZ="60"
              className="mt-2 max-w-sm text-sm text-neutral-500 dark:text-neutral-300/90"
            >
              <CheckIcon className="mr-2 inline size-4" />
              {f}
            </CardItem>
          ))}
        </ul>
        <div className="mt-10 flex items-center justify-between">
          <CardItem
            translateZ={20}
            as={Link}
            href=""
            target="__blank"
            className="rounded-xl px-4 py-2 text-xs font-normal dark:text-white"
          >
            Try now <ArrowRight className="ml-2 inline size-4" />
          </CardItem>
          <CardItem
            translateZ={20}
            as="button"
            className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white dark:bg-white dark:text-black"
          >
            Get Started Now
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  )
}

export default PricingCard
