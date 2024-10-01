import ConnectionCard from '@/app/(main)/(pages)/_components/connection-card'
import { MultiSelect } from '@/components/ui/multiple-select'
import { ConnectionsConfig } from '@/config/connections'
import { useConnections } from '@/providers/connections-provider'
import { useConnectionStore } from '@/store/connections'
import React, { useMemo } from 'react'

type Props = ConnectionsConfig & {}

const CanvasSidebarSettingCard = ({
  connectionKey,
  desc,
  img,
  title,
  accessTokenKey,
  alwaysTrue,
  slackSpecial
}: Props) => {
  const { slackChannels, selectedSlackChannels, setSelectedSlackChannels } = useConnectionStore()
  const connection = useConnections()
  const connectionData = connection[connectionKey]

  const isConnected = useMemo(
    () =>
      alwaysTrue ||
      (accessTokenKey && connectionData[accessTokenKey as keyof typeof connectionData]),
    [alwaysTrue, accessTokenKey, connectionData]
  )

  return (
    <div>
      <ConnectionCard title={title} img={img} desc={desc} connected={{ [title]: isConnected }} />
      {slackSpecial && isConnected && (
        <div>
          {slackChannels.length ? (
            <>
              <div>Seleck the slack channels to send notification and messages:</div>
              <MultiSelect
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

export default CanvasSidebarSettingCard
