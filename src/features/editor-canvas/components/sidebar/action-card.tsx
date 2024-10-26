import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { onDragStart } from '../../lib/editor'
import { EditorActionTypes, EditorCanvasTypes } from '../../types/editor'
import IconHelper from '../canvas/icon-helper'

type Props = {
  title: EditorCanvasTypes
  desc: string
  type: EditorActionTypes
}

const ActionCard = ({ title, desc, type }: Props) => {
  return (
    <Card
      draggable
      className="mb-4 w-full cursor-grab border-black bg-neutral-100 last:mb-0 dark:border-neutral-700 dark:bg-neutral-900"
      onDragStart={(event) => onDragStart(event, title)}
    >
      <CardHeader className="flex flex-row items-center gap-4 p-4">
        <IconHelper type={title} />
        <CardTitle className="text-md">
          {title}
          <CardDescription>{desc}</CardDescription>
          <CardDescription>{type}</CardDescription>
        </CardTitle>
      </CardHeader>
    </Card>
  )
}

export default ActionCard
