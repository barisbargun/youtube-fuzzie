export const onDragStart = (
  event: any,
  nodeType: EditorCanvasTypes
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}
