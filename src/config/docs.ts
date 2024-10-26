import CategoryIcon from '@/components/icons/category'
import ClipboardIcon from '@/components/icons/clipboard'
import CloudDownloadIcon from '@/components/icons/cloud-download'
import HomeIcon from '@/components/icons/home'
import PaymentIcon from '@/components/icons/payment'
import SettingsIcon from '@/components/icons/settings'
import WorkflowsIcon from '@/components/icons/workflows'
import { MainNavItem, SidebarNavItem } from '@/types/nav'

export interface DocsConfig {
  mainNav: MainNavItem[]
  sidebarNav: SidebarNavItem[]
}

export const docsConfig: DocsConfig = {
  mainNav: [
    {
      title: 'Documentation',
      href: '/docs'
    },
    {
      title: 'Components',
      href: '/docs/components/accordion'
    },
    {
      title: 'Blocks',
      href: '/blocks'
    },
    {
      title: 'Charts',
      href: '/charts'
    },
    {
      title: 'Themes',
      href: '/themes'
    },
    {
      title: 'Examples',
      href: '/examples'
    },
    {
      title: 'Colors',
      href: '/colors'
    }
  ],
  sidebarNav: [
    { title: 'Dashboard', href: '/dashboard', icon: HomeIcon },
    { title: 'Workflows', href: '/workflows', icon: WorkflowsIcon },
    { title: 'Settings', href: '/settings', icon: SettingsIcon },
    { title: 'Connections', href: '/connections', icon: CloudDownloadIcon },
    { title: 'Billing', href: '/billing', icon: PaymentIcon },
    { title: 'Templates', href: '/templates', icon: CategoryIcon },
    { title: 'Logs', href: '/logs', icon: ClipboardIcon }
  ]
}
