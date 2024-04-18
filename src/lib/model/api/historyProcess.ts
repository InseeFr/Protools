export interface HistoryProcess {
  id: string
  businessKey: string
  processDefinitionId: string
  processDefinitionUrl: string
  processDefinitionName: string
  startDate: string
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