import { GripVertical } from "lucide-react"
import * as ResizablePrimitive from "react-resizable-panels"

import { cn } from "@/lib/utils"

const ResizablePanelGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelGroup>) => (
  <ResizablePrimitive.PanelGroup
    className={cn(
      "flex h-full w-full data-[panel-group-direction=vertical]:flex-col",
      className
    )}
    {...props}
  />
)

const ResizablePanel = ResizablePrimitive.Panel

const ResizableHandle = ({
  withHandle,
  className,
  ...props
}: React.ComponentProps<typeof ResizablePrimitive.PanelResizeHandle> & {
  withHandle?: boolean
}) => (
<ResizablePrimitive.PanelResizeHandle
  className={cn(
    "relative flex w-0.5 cursor-col-resize items-center justify-center bg-gray-700 hover:bg-gray-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 transition duration-300 ease-in-out",
    className
  )}
  {...props}
>
  {withHandle && (
    <div className="relative z-10 flex h-full w-full items-center justify-center">
      <div className="absolute top-0 animate-looping-ball h-2 w-2 rounded-full bg-indigo-500"></div>
    </div>
  )}
</ResizablePrimitive.PanelResizeHandle>






)

export { ResizablePanelGroup, ResizablePanel, ResizableHandle }
