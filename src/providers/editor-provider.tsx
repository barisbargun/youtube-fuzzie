'use client'

import React, { createContext, Dispatch, useContext, useReducer } from 'react'

const initialEditorState: Editor = {
  elements: [],
  selectedNode: {
    data: {
      completed: false,
      current: false,
      description: '',
      metadata: {},
      title: undefined,
    },
    id: '',
    position: { x: 0, y: 0 },
    type: 'Trigger'
  },
  edges: []
}

const initialHistoryState: EditorHistoryState = {
  history: [initialEditorState],
  currentIndex: 0
}

const initialState: EditorState = {
  editor: initialEditorState,
  history: initialHistoryState
}

const editorReducer = (state: EditorState = initialState, action: EditorReducer): EditorState => {
  switch (action.type) {
    case 'REDO':
      if (state.history.currentIndex < state.history.history.length - 1) {
        const nextIndex = state.history.currentIndex + 1
        const nextEditorState = { ...state.history.history[nextIndex] }
        const redoState = {
          ...state,
          editor: nextEditorState,
          history: {
            ...state.history,
            currentIndex: nextIndex
          }
        }
        return redoState
      }
      return state

    case 'UNDO':
      if (state.history.currentIndex > 0) {
        const prevIndex = state.history.currentIndex - 1
        const prevEditorState = { ...state.history.history[prevIndex] }
        const undoState = {
          ...state,
          editor: prevEditorState,
          history: {
            ...state.history,
            currentIndex: prevIndex
          }
        }
        return undoState
      }
      return state

    case 'LOAD_DATA':
      return {
        ...state,
        editor: {
          ...state.editor,
          elements: action.payload.elements || initialEditorState.elements,
          edges: action.payload.edges
        }
      }
    case 'SELECTED_ELEMENT':
      return {
        ...state,
        editor: {
          ...state.editor,
          selectedNode: action.payload.element
        }
      }
    default:
      return state
  }
}

const Context = createContext<{
  state: EditorState
  dispatch: Dispatch<EditorReducer>
}>({
  state: initialState,
  dispatch: () => undefined
})

const EditorProvider = ({ children }: { children: React.ReactNode }) => {
  const [state, dispatch] = useReducer(editorReducer, initialState)

  return (
    <Context.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </Context.Provider>
  )
}

export const useEditor = () => {
  const context = useContext(Context)
  if (!context) {
    throw new Error('useEditor Hook must be used within the editor Provider')
  }
  return context
}

export default EditorProvider
