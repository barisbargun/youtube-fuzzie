import { PageHeader, PageHeaderHeading, PageSeparate } from '@/components/shared/page-header'
import WorkflowForm from '@/features/workflows/components/create-workflow'
import OpenForm from '@/features/workflows/components/open-form'
import WorkflowCard from '@/features/workflows/components/card'


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
