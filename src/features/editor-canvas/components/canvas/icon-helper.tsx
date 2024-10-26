import {
  Calendar,
  CircuitBoard,
  Database,
  GitBranch,
  HardDrive,
  Mail,
  MousePointerClickIcon,
  Slack,
  Timer,
  Webhook,
  Zap
} from 'lucide-react'

import { EditorCanvasTypes } from '@/features/editor-canvas/types/editor'

const GetIcon = (type: EditorCanvasTypes) => {
  switch (type) {
    case 'Email': {
      return Mail
    }
    case 'Condition': {
      return GitBranch
    }
    case 'AI': {
      return CircuitBoard
    }
    case 'Slack': {
      return Slack
    }
    case 'GoogleDrive': {
      return HardDrive
    }
    case 'Notion': {
      return Database
    }
    case 'CustomWebhook': {
      return Webhook
    }
    case 'GoogleCalendar': {
      return Calendar
    }
    case 'Trigger': {
      return MousePointerClickIcon
    }
    case 'Action': {
      return Zap
    }
    case 'Wait': {
      return Timer
    }
    default: {
      return Zap
    }
  }
}

const IconHelper = ({ type }: { type?: EditorCanvasTypes }) => {
  if (!type) return
  const Icon = GetIcon(type)
  return <Icon className="flex-shrink-0" size={30} />
}

export default IconHelper
