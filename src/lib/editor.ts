import { Dispatch } from "react";
import { discordGetConnection, notionGetConnection, notionGetDb, slackGetConnection, slackListBotChannels } from "./db";

export const onDragStart = (
  event: any,
  nodeType: EditorCanvasTypes
) => {
  event.dataTransfer.setData('application/reactflow', nodeType)
  event.dataTransfer.effectAllowed = 'move'
}

export const onContentChange = (
  connection: NodeProviderProps,
  node: ConnectionPrimaryTypes,
  content: string,
) => {
  const setNode: Partial<Record<typeof node, Dispatch<any>>> = {
    Slack: connection.setSlackNode,
    Discord: connection.setDiscordNode,
    Notion: connection.setNotionNode,
  };

  setNode[node]?.((prev: any) => ({ ...prev, content }));
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
      const dc = await discordGetConnection();
      if (dc) connection.setDiscordNode(() => ({ webhookURL: dc.name, guildName: dc.guildName, webhookName: dc.name, content: '' }));
      break;

    case 'Notion':
      const nc = await notionGetConnection();
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
          await notionGetDb(node.databaseId, node.accessToken);
        }
      }
      break;

    case 'Slack':
      const sc = await slackGetConnection();
      if (sc) connection.setSlackNode(() => ({ ...sc, content: '' }));
      break;

    default:
      break;
  }
}

export const fetchBotSlackChannels = async (token: string, setChannels: (channels: Option[]) => void) => {
  await slackListBotChannels(token)?.then((channels) => setChannels(channels));
}