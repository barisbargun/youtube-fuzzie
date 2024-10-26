import clsx from 'clsx'
import React from 'react'

type Props = {
  selected: boolean
}

const PaymentIcon = ({ selected }: Props) => {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <rect
        className={clsx(
          'fill-[#BABABB] transition-all group-hover:fill-[#7540A9] dark:fill-[#353346] dark:group-hover:fill-[#C8C7FF]',
          { 'fill-[#7540A9] dark:!fill-[#C8C7FF]': selected }
        )}
        height="16"
        rx="3"
        width="20"
        x="2"
        y="4"
      />
      <path
        className={clsx(
          'fill-[#5B5966] transition-all group-hover:fill-[#BD8AFF] dark:fill-[#C0BFC4] dark:group-hover:fill-[#9F54FF]',
          { 'fill-[#BD8AFF] dark:!fill-[#7540A9]': selected }
        )}
        clipRule="evenodd"
        d="M22 10H2V8H22V10Z"
        fillRule="evenodd"
      />
      <path
        className={clsx(
          'fill-[#5B5966] transition-all group-hover:fill-[#BD8AFF] dark:fill-[#C0BFC4] dark:group-hover:fill-[#9F54FF]',
          { 'fill-[#BD8AFF] dark:!fill-[#7540A9]': selected }
        )}
        clipRule="evenodd"
        d="M4 15C4 14.4477 4.44772 14 5 14H11C11.5523 14 12 14.4477 12 15C12 15.5523 11.5523 16 11 16H5C4.44772 16 4 15.5523 4 15Z"
        fillRule="evenodd"
      />
    </svg>
  )
}

export default PaymentIcon
