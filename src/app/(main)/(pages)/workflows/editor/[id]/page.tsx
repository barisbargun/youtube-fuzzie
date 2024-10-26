
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable'
import { editorActionItems } from '@/config/editor'
import EditorCanvasView from '@/features/editor-canvas/components/canvas/canvas-view'
import EditorSidebarView from '@/features/editor-canvas/components/sidebar/sidebar-view'

const EditorPage = () => {
  return (
    <ResizablePanelGroup className="absolute left-0 top-0" direction="horizontal">
      <ResizablePanel defaultSize={70}>
        <div className="flex h-full items-center justify-center">
          <div className="relative size-full pb-16">
            <EditorCanvasView editorActionItems={editorActionItems} />
          </div>
        </div>
      </ResizablePanel>
      <ResizableHandle />
      <ResizablePanel className="relative max-h-screen bg-background sm:block" defaultSize={30}>
        <aside className="h-full px-4">
          <EditorSidebarView />
        </aside>
      </ResizablePanel>
    </ResizablePanelGroup>
  )
}

export default EditorPage
