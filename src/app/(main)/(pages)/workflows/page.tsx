import React from 'react'
import WorkflowButton from './_components/button'
import WorkflowCard from './_components/card'
import { PageHeader, PageHeaderHeading, PageHeaderDescription } from '@/components/shared/page-header'

type Props = {}

const Workflows = (props: Props) => {
  return (
    <>
      <PageHeader separate>
        <PageHeaderHeading>Workflows</PageHeaderHeading>
      </PageHeader>
      <section>
        <WorkflowCard
          id="asdasd"
          title="automation workflow"
          desc="creating a test workflow"
          publish={false}
        />
      </section>
    </>
  )
}

export default Workflows
