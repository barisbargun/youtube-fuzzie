import Image, { StaticImageData } from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import { toast } from 'sonner'

import assets from '@/assets'
import { Card, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Switch } from '@/components/ui/switch'
import { workflowPublish } from '@/lib/db/workflows'

type Props = {
  id: string
  title: string
  desc: string
  publish: boolean
}

const WorkflowCard = ({ id, desc, title, publish }: Props) => {
  const _publishFlow = async (check: boolean) => {
    const resp = await workflowPublish(id, check)
    toast[resp?.publish ? 'success' : 'error']('Flow Automation', {
      description: resp?.publish ? 'Workflow published successfully' : 'Failed to publish workflow'
    })
  }

  const Images = useMemo(() => {
    const brands = assets.brands
    return [
      {
        alt: 'google-drive',
        src: brands.googleDrive
      },
      {
        alt: 'notion',
        src: brands.notion
      },
      {
        alt: 'discord',
        src: brands.discord
      }
    ] as { alt: string; src: StaticImageData }[]
  }, [])

  return (
    <Card className="flex h-fit w-full items-center justify-between">
      <CardHeader className="flex flex-col">
        <Link href={`/workflows/editor/${id}`}>
          <div className="flex gap-2">
            {Images.map((provider) => (
              <Image
                key={provider.alt}
                alt={provider.alt}
                height={30}
                src={provider.src}
                width={30}
              />
            ))}
          </div>
          <CardTitle className="mt-3 capitalize">{title}</CardTitle>
          <CardDescription>{desc}</CardDescription>
        </Link>
      </CardHeader>
      <div className="mr-6 flex flex-col items-center">
        <label className="text-sm text-muted-foreground" htmlFor="airplane-mode">
          {publish ? 'On' : 'Off'} {/* WIP: Not changing. */}
        </label>
        <Switch
          defaultChecked={publish}
          id="airplane-mode"
          // onCheckedChange={(v) => publishFlow(v)}
        />
      </div>
    </Card>
  )
}

export default WorkflowCard
