export interface HistoryProcess {
  id: string
  businessKey: string
  processDefinitionId: string
  processDefinitionUrl: string
  startTime: string
  endTime: string
  durationInMillis: number
  startUserId: string
  startActivityId: string
  endActivityId: string
  deleteReason: any
  superProcessInstanceId: string
  url: string
  variables: VariableProcess[]
  tenantId: any
}

interface VariableProcess {
  name: string
  variableScope: string
  value: string
}