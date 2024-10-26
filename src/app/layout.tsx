import '@/styles/globals.css'

import { ClerkProvider } from '@clerk/nextjs'
import type { Metadata } from 'next'
import { ThemeProvider } from 'next-themes'

import { Toaster } from '@/components/ui/sonner'
import siteConfig from '@/config/site'
import { cn } from '@/lib/utils'

import { fontDmSans, fontPoppins } from './fonts'

export const metadata: Metadata = {
  title: {
    default: siteConfig.name,
    template: `%s - ${siteConfig.name}`
  }
  // metadataBase: new URL(siteConfig.url),
  // description: siteConfig.description,
  // keywords: [
  //   "Next.js",
  //   "React",
  //   "Tailwind CSS",
  //   "Server Components",
  //   "Radix UI",
  // ],
  // authors: [
  //   {
  //     name: "shadcn",
  //     url: "https://shadcn.com",
  //   },
  // ],
  // creator: "shadcn",
  // openGraph: {
  //   type: "website",
  //   locale: "en_US",
  //   // url: siteConfig.url,
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   siteName: siteConfig.name,
  //   images: [
  //     {
  //       url: siteConfig.ogImage,
  //       width: 1200,
  //       height: 630,
  //       alt: siteConfig.name,
  //     },
  //   ],
  // },
  // twitter: {
  //   card: "summary_large_image",
  //   title: siteConfig.name,
  //   description: siteConfig.description,
  //   images: [siteConfig.ogImage],
  //   creator: "@shadcn",
  // },
  // icons: {
  //   icon: "/favicon.ico",
  //   shortcut: "/favicon-16x16.png",
  //   apple: "/apple-touch-icon.png",
  // },
  // manifest: `${siteConfig.url}/site.webmanifest`,
}

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <ClerkProvider afterSignOutUrl="/">
      <html suppressHydrationWarning lang="en">
        <body className={cn(fontDmSans, fontPoppins)}>
          <ThemeProvider
            disableTransitionOnChange
            enableSystem
            attribute="class"
            defaultTheme="dark"
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
