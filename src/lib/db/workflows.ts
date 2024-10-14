"use server"

import { db } from "./db"

export const onCreateNodesEdges = async (
  flowId: string,
  nodes: string,
  edges: string,
  flowPath: string
) => {
  return await db.workflows.update({
    where: {
      id: flowId
    },
    data: {
      nodes,
      edges,
      flowPath: flowPath
    }
  })
}

export const onFlowPublish = async (workflowId: string, state: boolean) => {
  return await db.workflows.update({
    where: {
      id: workflowId
    },
    data: {
      publish: state
    }
  })
}