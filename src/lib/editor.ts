import { Dispatch } from "react";

export const onDragStart = (
  event: any,
  nodeType: EditorCanvasTypes
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

export const onContentChange = (
  connection: ConnectionProviderProps,
  value: string,
  title: EditorCanvasTypes,
) => {
  const setNode: Partial<Record<EditorCanvasTypes, Dispatch<any>>> = {
    Slack: connection.setSlackNode,
    Discord: connection.setDiscordNode,
    Notion: connection.setNotionNode,
  };

  setNode[title]?.((prev: any) => ({ ...prev, content: value }));
}

export const onAddTemplate = (
  connection: ConnectionProviderProps,
  template: string,
  title: EditorCanvasTypes,
) => {
  const setNode: Partial<Record<EditorCanvasTypes, Dispatch<any>>> = {
    Slack: connection.setSlackNode,
    Discord: connection.setDiscordNode,
  };

  setNode[title]?.((prev: any) => ({ ...prev, content: `${prev.content} ${template}` }));
} 