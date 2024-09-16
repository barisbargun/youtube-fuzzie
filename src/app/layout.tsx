import type { Metadata } from 'next'
import './globals.css'
import siteConfig from '@/config/site'
import fonts from './fonts'
import { ClerkProvider } from '@clerk/nextjs'
import { Toaster } from '@/components/ui'
import { ThemeProvider } from 'next-themes'

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
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={fonts.join(' ')}>
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            enableSystem
            disableTransitionOnChange
          >
            {children}
            <Toaster />
          </ThemeProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
