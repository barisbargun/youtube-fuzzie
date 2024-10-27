import CategoryIcon from '@/components/icons/category'
import ClipboardIcon from '@/components/icons/clipboard'
import CloudDownloadIcon from '@/components/icons/cloud-download'
import HomeIcon from '@/components/icons/home'
import PaymentIcon from '@/components/icons/payment'
import SettingsIcon from '@/components/icons/settings'
import WorkflowsIcon from '@/components/icons/workflows'

export interface NavConfig {
  title: string
  href: string
  disabled?: boolean
  external?: boolean
  icon?: any
  label?: string
}

export const homeNavConfig: NavConfig[] = [
  {
    title: 'Products',
    href: '#'
  },
  {
    title: 'Pricing',
    href: '#'
  },
  {
    title: 'Clients',
    href: '#'
  },
  {
    title: 'Resources',
    href: '#'
  },
  {
    title: 'Documentation',
    href: '#'
  },
  {
    title: 'Enterprise',
    href: '#'
  }
]

export const mainSidebarNavConfig: NavConfig[] = [
  { title: 'Dashboard', href: '/dashboard', icon: HomeIcon },
  { title: 'Workflows', href: '/workflows', icon: WorkflowsIcon },
  { title: 'Settings', href: '/settings', icon: SettingsIcon },
  { title: 'Connections', href: '/connections', icon: CloudDownloadIcon },
  { title: 'Billing', href: '/billing', icon: PaymentIcon },
  { title: 'Templates', href: '/templates', icon: CategoryIcon },
  { title: 'Logs', href: '/logs', icon: ClipboardIcon }
]
