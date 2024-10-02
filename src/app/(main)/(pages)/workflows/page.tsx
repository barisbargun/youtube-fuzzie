import React from 'react'
import Header from '../_components/header'
import WorkflowButton from './_components/button'
import WorkflowCard from './_components/card'

type Props = {}

const Workflows = (props: Props) => {
  return (
    <div>
      <Header title="Workflows">
        <WorkflowButton className="" />
      </Header>
      <section>
        <WorkflowCard
          id="asdasd"
          title="automation workflow"
          desc="creating a test workflow"
          publish={false}
        />
      </section>
    </div>
  )
}

export default Workflows
