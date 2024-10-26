export type EditorActionTypes = 'Trigger' | 'Action'

export type EditorCanvasTypes =
  | 'Email'
  | 'Condition'
  | 'AI'
  | 'Slack'
  | 'Discord'
  | 'GoogleDrive'
  | 'Notion'
  | 'CustomWebhook'
  | 'GoogleCalendar'
  | 'Trigger'
  | 'Action'
  | 'Wait'

export type EditorActionItems = {
  [key in EditorCanvasTypes]: {
    description: string
    type: EditorActionTypes
  }
}

export type EditorNode = {
  id: string
  type?: EditorActionTypes
  position: {
    x: number
    y: number
  }
  data: {
    title?: EditorCanvasTypes
    description: string
    completed: boolean
    current: boolean
    metadata: any
  }
}

export type EditorReducer =
  | {
      type: 'LOAD_DATA'
      payload: {
        elements: EditorNode[]
        edges: {
          id: string
          source: string
          target: string
        }[]
      }
    }
  | {
      type: 'UPDATE_NODE'
      payload: {
        elements: EditorNode[]
      }
    }
  | { type: 'REDO' }
  | { type: 'UNDO' }
  | {
      type: 'SELECTED_ELEMENT'
      payload: {
        element: EditorNode
      }
    }

export type Editor = {
  elements: EditorNode[]
  edges: {
    id: string
    source: string
    target: string
  }[]
  selectedNode: EditorNode
}

export type EditorHistoryState = {
  history: Editor[]
  currentIndex: number
}

export type EditorState = {
  editor: Editor
  history: EditorHistoryState
}

export type EditorContextData = {
  previewMode: boolean
  setPreviewMode: (previewMode: boolean) => void
}
