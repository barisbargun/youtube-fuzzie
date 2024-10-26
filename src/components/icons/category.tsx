import clsx from 'clsx'
import React from 'react'

type Props = { selected: boolean }

function CategoryIcon({ selected }: Props) {
  return (
    <svg fill="none" height="24" viewBox="0 0 24 24" width="24" xmlns="http://www.w3.org/2000/svg">
      <rect
        className={clsx(
          'fill-[#BABABB] transition-all group-hover:fill-[#7540A9] dark:fill-[#353346] dark:group-hover:fill-[#C8C7FF]',
          { 'fill-[#7540A9] dark:!fill-[#C8C7FF]': selected }
        )}
        height="8"
        rx="3"
        width="8"
        x="3"
        y="3"
      />
      <rect
        className={clsx(
          'fill-[#BABABB] transition-all group-hover:fill-[#7540A9] dark:fill-[#353346] dark:group-hover:fill-[#C8C7FF]',
          { 'fill-[#7540A9] dark:!fill-[#C8C7FF]': selected }
        )}
        height="8"
        rx="3"
        width="8"
        x="3"
        y="13"
      />
      <rect
        className={clsx(
          'fill-[#BABABB] transition-all group-hover:fill-[#7540A9] dark:fill-[#353346] dark:group-hover:fill-[#C8C7FF]',
          { 'fill-[#7540A9] dark:!fill-[#C8C7FF]': selected }
        )}
        height="8"
        rx="3"
        width="8"
        x="13"
        y="3"
      />
      <rect
        className={clsx(
          'fill-[#5B5966] transition-all group-hover:fill-[#BD8AFF] dark:fill-[#C0BFC4] dark:group-hover:fill-[#9F54FF]',
          { 'fill-[#BD8AFF] dark:!fill-[#7540A9]': selected }
        )}
        height="8"
        rx="3"
        width="8"
        x="13"
        y="13"
      />
    </svg>
  )
}

export default CategoryIcon
