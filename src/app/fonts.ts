import { DM_Sans, Poppins } from 'next/font/google'

export const fontDmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans' })
export const fontPoppins = Poppins({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-poppins'
})
