import { useEditor } from '@/providers/editor-provider'
import { Position, useNodeId } from '@xyflow/react'
import React, { useMemo } from 'react'
import IconHelper from './icon-helper'
import CustomHandle from './custom-handle'
import { Card, CardHeader, CardTitle, CardDescription, Badge } from '@/components/ui'
import clsx from 'clsx'

type Props = {
  data: EditorNode['data']
}

const ActionItem = ({ data }: Props) => {
  const { dispatch, state } = useEditor()
  const nodeId = useNodeId()

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.stopPropagation()
    const val = state.editor.elements.find((n) => n.id === nodeId)
    if (val)
      dispatch({
        type: 'SELECTED_ELEMENT',
        payload: {
          element: val
        }
      })
  }
  return (
    <>
      <CustomHandle type="target" position={Position.Top} style={{ zIndex: 100 }} />
      <Card
        onClick={handleClick}
        className="relative max-w-[400px] dark:border-muted-foreground/70"
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
        <Badge variant="secondary" className="absolute right-2 top-2">
          {data.title}
        </Badge>
        <div
          className={clsx('absolute left-3 top-4 h-2 w-2 rounded-full', {
            'bg-green-500': Math.random() < 0.6,
            'bg-orange-500': Math.random() >= 0.6 && Math.random() < 0.8,
            'bg-red-500': Math.random() >= 0.8
          })}
        ></div>
      </Card>
      <CustomHandle type="source" position={Position.Bottom} id="a" />
    </>
  )
}

export default ActionItem
