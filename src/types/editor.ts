type EditorActionTypes = 'Trigger' | 'Action'


type EditorCanvasTypes =
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


type EditorNode = {
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

type EditorReducer =
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

type Editor = {
  elements: EditorNode[]
  edges: {
    id: string
    source: string
    target: string
  }[]
  selectedNode: EditorNode
}

type EditorHistoryState = {
  history: Editor[]
  currentIndex: number
}

type EditorState = {
  editor: Editor
  history: EditorHistoryState
}

type EditorContextData = {
  previewMode: boolean
  setPreviewMode: (previewMode: boolean) => void
}
