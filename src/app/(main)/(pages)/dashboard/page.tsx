import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
  PageSeparate
} from '@/components/shared/page-header'

const DashboardPage = () => {
  return (
    <>
      <PageHeader>
        <PageHeaderHeading>Connections</PageHeaderHeading>
        <PageHeaderDescription>
          Connect all your apps directly from here. You may need to connect these apps regularly to
          refresh verification
        </PageHeaderDescription>
      </PageHeader>
      <PageSeparate />
    </>
  )
}

export default DashboardPage
