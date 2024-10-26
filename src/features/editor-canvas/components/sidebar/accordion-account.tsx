import { useMemo } from 'react'

import ConnectionCard from '@/components/shared/connection-card'
import { MultiSelect } from '@/components/ui/multiple-select'
import { ConnectionsConfig } from '@/config/connections'
import { useNode } from '@/features/editor-canvas/providers/node-provider'

import { useNodeStore } from '../../store/node-store'

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
      <ConnectionCard connected={!!isConnected} desc={desc} img={img} title={title} />
      {slackSpecial && isConnected && (
        <div>
          {slackChannels.length > 0 ? (
            <>
              <div>Seleck the slack channels to send notification and messages:</div>
              <MultiSelect // https://github.com/sersavan/shadcn-multi-select-component
                defaultValue={selectedSlackChannels}
                options={slackChannels}
                placeholder="Select channels"
                onValueChange={setSelectedSlackChannels}
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
