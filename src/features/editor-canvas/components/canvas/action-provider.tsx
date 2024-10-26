import { Position, useNodeId } from '@xyflow/react'
import clsx from 'clsx'
import React from 'react'

import { Badge } from '@/components/ui/badge'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'

import { useEditor } from '../../providers/editor-provider'
import { EditorNode } from '../../types/editor'
import CustomHandle from './custom-handle'
import IconHelper from './icon-helper'

type Props = {
  data: EditorNode['data']
}

const ActionProvider = ({ data }: Props) => {
  const { dispatch, state } = useEditor()
  const nodeId = useNodeId()

  const handleClick = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    event.stopPropagation()
    const value = state.editor.elements.find((n) => n.id === nodeId)
    if (value)
      dispatch({
        type: 'SELECTED_ELEMENT',
        payload: {
          element: value
        }
      })
  }

  return (
    <>
      <Card
        className="relative max-w-[400px] dark:border-muted-foreground/70"
        onClick={handleClick}
      >
        <CardHeader className="flex flex-row items-center gap-4">
          <IconHelper type={data.title} />
          <div>
            <CardTitle className="text-md">{data.title}</CardTitle>
            <div className="-mb-1 -mt-0.5">
              <b className="inline text-xs text-muted-foreground/80">ID: </b>
              <p className="inline text-xs text-muted-foreground/50">{nodeId}</p>
            </div>
            <CardDescription>{data.description}</CardDescription>
          </div>
        </CardHeader>
        <Badge className="absolute right-2 top-2" variant="secondary">
          {data.title}
        </Badge>
        <div
          className={clsx('absolute left-3 top-4 size-2 rounded-full', {
            'bg-green-500': Math.random() < 0.6,
            'bg-orange-500': Math.random() >= 0.6 && Math.random() < 0.8,
            'bg-red-500': Math.random() >= 0.8
          })}
        ></div>
      </Card>
      <CustomHandle id="a" position={Position.Bottom} type="source" />
    </>
  )
}

export default ActionProvider
