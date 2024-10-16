// WIP: Move ConnectionCard to the components folder
import ConnectionCard from '@/app/(main)/(pages)/_components/connection-card'
import { MultiSelect } from '@/components/ui/multiple-select'
import { ConnectionsConfig } from '@/config/connections'
import { useNode } from '@/providers/node-provider'
import { useNodeStore } from '@/store/node-store'
import React, { useMemo } from 'react'

type Props = ConnectionsConfig & {}

const AccordionAccount = ({
  connectionKey,
  desc,
  img,
  title,
  accessTokenKey,
  alwaysTrue,
  slackSpecial
}: Props) => {
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } = useNodeStore()
  const connection = useNode()
  const connectionData = connection[connectionKey]

  const isConnected = useMemo(
    () =>
      alwaysTrue ||
      (accessTokenKey && connectionData[accessTokenKey as keyof typeof connectionData]),
    [alwaysTrue, accessTokenKey, connectionData]
  )

  return (
    <div>
      <ConnectionCard title={title} img={img} desc={desc} connected={!!isConnected} />
      {slackSpecial && isConnected && (
        <div>
          {slackChannels.length ? (
            <>
              <div>Seleck the slack channels to send notification and messages:</div>
              <MultiSelect // https://github.com/sersavan/shadcn-multi-select-component
                options={slackChannels}
                defaultValue={selectedSlackChannels}
                onValueChange={setSelectedSlackChannels}
                placeholder="Select channels"
              />
            </>
          ) : (
            <h2>No results found.</h2>
          )}
        </div>
      )}
    </div>
  )
}

export default AccordionAccount
