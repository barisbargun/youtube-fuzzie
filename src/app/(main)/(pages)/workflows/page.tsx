import { PageHeader, PageHeaderHeading, PageSeparate } from '@/components/shared/page-header'
import WorkflowCard from '@/features/workflows/components/card'
import WorkflowForm from '@/features/workflows/components/create-workflow'
import OpenForm from '@/features/workflows/components/open-form'

const Workflows = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <PageHeader>
          <PageHeaderHeading>Workflows</PageHeaderHeading>
        </PageHeader>
        <OpenForm workflowForm={<WorkflowForm />} />
      </div>
      <PageSeparate />

      <section>
        <WorkflowCard
          desc="creating a test workflow"
          id="asdasd"
          publish={false}
          title="automation workflow"
        />
      </section>
    </>
  )
}

export default Workflows
