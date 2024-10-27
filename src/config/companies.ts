import { StaticImageData } from 'next/image'

import assets from '@/assets'

export interface IProductConfig {
  title: string
  link: string
  thumbnail: StaticImageData
}

export const productsConfig: IProductConfig[] = [
  {
    title: 'Moonbeam',
    link: 'https://gomoonbeam.com',
    thumbnail: assets.screenshots.acme.moonbeam
  },
  {
    title: 'Cursor',
    link: 'https://cursor.so',
    thumbnail: assets.screenshots.acme.cursor
  },
  {
    title: 'Rogue',
    link: 'https://userogue.com',
    thumbnail: assets.screenshots.acme.rogue
  },

  {
    title: 'Editorially',
    link: 'https://editorially.org',
    thumbnail: assets.screenshots.acme.editorially
  },
  {
    title: 'Editrix AI',
    link: 'https://editrix.ai',
    thumbnail: assets.screenshots.acme.editrix
  },
  {
    title: 'Pixel Perfect',
    link: 'https://app.pixelperfect.quest',
    thumbnail: assets.screenshots.acme.pixelPerfect
  },

  {
    title: 'Algochurn',
    link: 'https://algochurn.com',
    thumbnail: assets.screenshots.acme.moonbeam
  },
  {
    title: 'Aceternity UI',
    link: 'https://ui.aceternity.com',
    thumbnail: assets.screenshots.acme.cursor
  },
  {
    title: 'Tailwind Master Kit',
    link: 'https://tailwindmasterkit.com',
    thumbnail: assets.screenshots.acme.rogue
  },
  {
    title: 'SmartBridge',
    link: 'https://smartbridgetech.com',
    thumbnail: assets.screenshots.acme.editorially
  },
  {
    title: 'Renderwork Studio',
    link: 'https://renderwork.studio',
    thumbnail: assets.screenshots.acme.editrix
  },

  {
    title: 'Creme Digital',
    link: 'https://cremedigital.com',
    thumbnail: assets.screenshots.acme.pixelPerfect
  },
  {
    title: 'Golden Bells Academy',
    link: 'https://goldenbellsacademy.com',
    thumbnail: assets.screenshots.acme.moonbeam
  },
  {
    title: 'Invoker Labs',
    link: 'https://invoker.lol',
    thumbnail: assets.screenshots.acme.cursor
  },
  {
    title: 'E Free Invoice',
    link: 'https://efreeinvoice.com',
    thumbnail: assets.screenshots.acme.rogue
  }
]
