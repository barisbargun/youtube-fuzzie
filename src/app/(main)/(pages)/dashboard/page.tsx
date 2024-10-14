import {
  PageHeader,
  PageHeaderHeading,
  PageHeaderDescription
} from '@/components/shared/page-header'
import React from 'react'

const DashboardPage = () => {
  return (
    <>
      <PageHeader separate>
        <PageHeaderHeading>Connections</PageHeaderHeading>
        <PageHeaderDescription>
          Connect all your apps directly from here. You may need to connect these apps regularly to
          refresh verification
        </PageHeaderDescription>
      </PageHeader>
    </>
  )
}

export default DashboardPage
