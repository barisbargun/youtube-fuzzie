import { Dispatch } from "react";
import { getDiscordConnectionUrl, getNotionConnection, getNotionDatabase, getSlackConnection, listBotSlackChannels } from "./db";

export const onDragStart = (
  event: any,
  nodeType: EditorCanvasTypes
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

export const onContentChange = (
  connection: NodeProviderProps,
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
  connection: NodeProviderProps,
  template: string,
  title: EditorCanvasTypes,
) => {
  const setNode: Partial<Record<EditorCanvasTypes, Dispatch<any>>> = {
    Slack: connection.setSlackNode,
    Discord: connection.setDiscordNode,
  };

  setNode[title]?.((prev: any) => ({ ...prev, content: `${prev.content} ${template}` }));
}

export const onConnections = async (
  connection: NodeProviderProps,
  editorState: EditorState,
  googleFile: any
) => {
  switch (editorState.editor.selectedNode.data.title) {
    case 'Discord':
      const dc = await getDiscordConnectionUrl();
      if (dc) connection.setDiscordNode(() => ({ webhookURL: dc.name, guildName: dc.guildName, webhookName: dc.name, content: '' }));
      break;

    case 'Notion':
      const nc = await getNotionConnection();
      if (nc) {
        connection.setNotionNode(() => (
          {
            ...nc,
            content: {
              kind: googleFile.kind,
              type: googleFile.mimeType,
              name: googleFile.name
            }
          }
        ));
        const node = connection.notionNode;
        if (node.databaseId.length) {
          await getNotionDatabase(node.databaseId, node.accessToken);
        }
      }
      break;

    case 'Slack':
      const sc = await getSlackConnection();
      if (sc) connection.setSlackNode(() => ({ ...sc, content: '' }));
      break;

    default:
      break;
  }
}

export const fetchBotSlackChannels = async (token: string, setChannels: (channels: Option[]) => void) => {
  await listBotSlackChannels(token)?.then((channels) => setChannels(channels));
}