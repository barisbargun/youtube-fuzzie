import React from 'react'

import { Button } from '../ui/button'
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle
} from '../ui/drawer'

type Props = {
  title: string
  desc: string
  children: React.ReactNode
  open?: boolean
  onOpenChange: (open: boolean) => void
}

const CustomDrawer = ({ title, desc, children, open, onOpenChange }: Props) => {
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <div className="m-auto w-[95%] sm:w-[clamp(25rem,80%,40rem)]">
          <DrawerHeader>
            <DrawerTitle className="text-center">{title}</DrawerTitle>
            <DrawerDescription className="text-center">{desc}</DrawerDescription>
            {children}
          </DrawerHeader>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button className="w-full" variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

export default CustomDrawer
