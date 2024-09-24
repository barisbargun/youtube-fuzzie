export const onDragStart = (
  event: any,
  nodeType: EditorActionTypes
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}
