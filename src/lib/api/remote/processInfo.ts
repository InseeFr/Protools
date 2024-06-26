import ProcessDefinitionDataApi from '../../model/api/processDefinitionData';
import Task from '../../model/tasks';
import { deleteDuplicatesByKey } from '../../utils/processUtils';
import { getRequest } from '../fetcher/requests';
import { fetcherXml } from '../fetcher/fetcher';
import Variable from '../../model/api/variable';
import FlowElements from '../../model/flowElements';
import HistoricActivity from '../../model/api/historicActivity';
import { HistoryProcess } from '../../model/api/historyProcess';
import ProcessInfo from '../../model/processInfo';

export function getProcessDefinitions(
  apiUrl: string,
  accessToken: string
): Promise<any[]> {


  return getRequest(`${apiUrl}repository/process-definitions?latest=true&size=1000`, accessToken || '').then((response) => {
    //console.log('response', response);
    deleteDuplicatesByKey(response.data);
    const processLaunchInfo: any[] = [];
    response.data.data.forEach((processDefinition: any) => {
      processLaunchInfo.push({
        key: processDefinition.key,
        name: processDefinition.name,
      });
    });
    processLaunchInfo.sort((a, b) => a.name.localeCompare(b.name));

    return Promise.resolve(processLaunchInfo);
  });
    
  
}

export function getProcessDefinitionById(
  processDefinitionId: string,
  apiUrl: string,
  accessToken: string
): Promise<ProcessDefinitionDataApi> {
  return getRequest(`${apiUrl}repository/process-definitions/${processDefinitionId}`, accessToken || '').then((response) => {

    return Promise.resolve(response.data);
  });}

export function getProcessInstance(
  apiUrl: string,
  accessToken: string,
): Promise<ProcessInfo[]> {
  const res = getRequest(`${apiUrl}runtime/process-instances`, accessToken || '').then((res) => {
    const response = res.data.data.map((process: any) => {
      //console.log(' process', process)
      const processInfo: ProcessInfo = {
        id: process.id,
        businessKey: process.businessKey,
        processKey: process.processDefinitionName,
        documentation: process.processDefinitionDescription,
        startDate: new Date(process.startTime),
        state: true,
        group: "",
        ids: {
          id: process.id,
          processDefinitionId: process.processDefinitionId,
        },
      };
      return processInfo;
    });
    //console.log('DataTable', response);
    return response;
  })
  return Promise.resolve(res);
}

export function getProcessInstanceById(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return getRequest(`${apiUrl}runtime/process-instances/${processInstanceId}`, accessToken || '').then((res) => {
    
    return Promise.resolve(res.data);
   });
}

export function getAllTasks(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<Task[]> {

  const tasks: Task[] = [];
  getRequest(`${apiUrl}runtime/tasks?processInstanceId=${processInstanceId}`, accessToken || '').then((response) => {
    //console.log('All tasks:', response);
    (response.data && response.data.data.length > 0) ? 
      response.data.data.forEach((task: any) => {
          tasks.push({
              id: task.id,
              label: task.name,
              description: task.description,
              key: task.taskDefinitionKey
          } as Task);
      }): null
  });
  return Promise.resolve(tasks);
}

export function getBpmnXml(
  processDefinitionId: string,
  apiUrl: string,
  accessToken: string
): Promise<String> {
  return fetcherXml(
      `${apiUrl}repository/process-definitions/${processDefinitionId}/resourcedata`,
      'GET',
      accessToken || '',
      null
    ).then((response) => {
      return Promise.resolve(response.data!);
     });
}

export function getVariables(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<Variable> {
  return getRequest(
    `${apiUrl}runtime/process-instances/${processInstanceId}/variables`,
    accessToken || ''
  ).then((res) => {
    //console.log('res variables', res)
    if (res.data.length > 0) {
      console.log('res.data', res.data)
      if (res.data.find((variable: any) => variable.name === "context")) {
        return res.data.find((variable: any) => variable.name === "context")
      };
    }
    return Promise.resolve({
    name: "Nom de la variable",
    type: "Type de la variable",
    value: '{"Value": "Aucune variable de contexte n\'a été renseignée"}',
  } as Variable);
  });
}

export function getBpmnElements(
  processDefinitionId: string,
  apiUrl: string,
  accessToken: string
): Promise<FlowElements[]> {
  const flowElements: FlowElements[] = [];
  return getRequest(
    `${apiUrl}repository/process-definitions/${processDefinitionId}/model`,
    accessToken || ''
  ).then((res) => {
    const process = res.data.processes[0];
   //console.log('process', process);
    const flowElementsData = process.flowElements;
    flowElementsData.forEach((flowElement: any) => {
    if (flowElement.name !== null) {
      flowElements.push({
        id: flowElement.id.length > 30 ? flowElement.id.substring(0, 30) + ' [...]' : flowElement.id,
        name: flowElement.name,
        documentation: flowElement.documentation ? flowElement.documentation : '',
        asynchronous: flowElement.asynchronous ? flowElement.asynchronous : false,
        eventDefinitions: flowElement.eventDefinitions ? flowElement.eventDefinitions : [],
      } as FlowElements);
    }
    });
    //console.log('flowElements: ', flowElements)
    return Promise.resolve(flowElements);
  });

  //return Promise.resolve(flowElements);
}

const getExecutionActivities = async (
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<String[]> => {
  const executionActivities: String[] = [];
  const executionResponse = await getRequest(
    `${apiUrl}runtime/executions`,
    accessToken || ""
  );
  //console.log("ProcessInstanceId", processInstanceId);
  executionResponse.data.data.forEach((execution: any) => {
    //console.log("execution.processInstanceId", execution);
    if (
      execution.processInstanceId === processInstanceId &&
      execution.activityId !== null
    ) {
      //console.log("execution.activityId", execution.activityId);
      executionActivities.push(execution.activityId);
    }
  });
  return executionActivities;
};

const getHistoricActivity = async (
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<HistoricActivity[]> => {
  const historicActivities: HistoricActivity[] = [];

  const executionResponse = await getRequest(
    `${apiUrl}runtime/executions`,
    accessToken || ''
  );
  console.log('Execution result', executionResponse);
  const executionId = executionResponse.data.data.find((execution: any) => execution.processInstanceId === processInstanceId).id;

  const historyResponseExec = await getRequest(
    `${apiUrl}history/historic-activity-instances?executionId=${executionId}`,
    accessToken || ""
  );
  //console.log('History result', historyResponseExec);

  historyResponseExec.data &&
    historyResponseExec.data.data.forEach((historicActivity: any) => {
      if (historicActivity.activityType !== "sequenceFlow") {
        historicActivities.push({
          activityId:
            historicActivity.activityId.length > 30
              ? historicActivity.activityId.substring(0, 30) + " [...]"
              : historicActivity.activityId,
          activityName: historicActivity.activityName,
          activityType: historicActivity.activityType,
          executionId: historicActivity.executionId,
          endTime: historicActivity.endTime,
          durationInMillis: historicActivity.durationInMillis / 1000,
        } as HistoricActivity);
      }
    });
  const historyResponseProc = await getRequest(
    `${apiUrl}history/historic-activity-instances?processInstanceId=${processInstanceId}?size=1000`,
    accessToken || ""
  );

  historyResponseProc.data && historyResponseProc.data.data.forEach((historicActivity: any) => {

    if (historicActivity.activityType !== "sequenceFlow") {
      historicActivities.push({
        activityId: historicActivity.activityId.length > 30 ? historicActivity.activityId.substring(0, 30) + ' [...]' : historicActivity.activityId,
        activityName: historicActivity.activityName,
        activityType: historicActivity.activityType,
        executionId: historicActivity.executionId,
        endTime: historicActivity.endTime,
        durationInMillis: historicActivity.durationInMillis / 1000
      } as HistoricActivity);
    }
  });
  //console.log('historicActivities', historicActivities)
  return historicActivities;
}

const getAllHistoricActivity = (
  apiUrl: string,
  accessToken: string
): Promise<HistoricActivity[]>  => { 
  const historicActivities: HistoricActivity[] = [];
  return getRequest(
    `${apiUrl}history/historic-activity-instances?size=1000`,
    accessToken || ''
  ).then((res) => {
    console.log('res', res);
    res.data && res.data.data.forEach((historicActivity: any) => {
  if (historicActivity.activityType !== "sequenceFlow") {
    historicActivities.push({
      activityId: historicActivity.activityId.length > 30 ? historicActivity.activityId.substring(0, 30) + ' [...]' : historicActivity.activityId,
      activityName: historicActivity.activityName,
      activityType: historicActivity.activityType,
      executionId: historicActivity.executionId,
      endTime: historicActivity.endTime,
      durationInMillis: historicActivity.durationInMillis / 1000
    } as HistoricActivity);
  }
});
    return Promise.resolve(historicActivities);
   });
}

const getHistoryProcessInstance = (
  apiUrl: string,
  accessToken: string

): Promise<HistoryProcess[]> => {
  const historyProcess: HistoryProcess[] = [];
  return getRequest(
    `${apiUrl}history/historic-process-instances?size=1000`,
    accessToken || ''
  ).then((res) => {
    
    res.data && res.data.data.forEach((historicProcess: any) => {
      
      historyProcess.push({
        id: historicProcess.id,
        businessKey: historicProcess.businessKey,
        processDefinitionId: historicProcess.processDefinitionId,
        processDefinitionUrl: historicProcess.processDefinitionUrl,
        startTime: historicProcess.startTime,
        endTime: historicProcess.endTime,
        durationInMillis: historicProcess.durationInMillis,
        startUserId: historicProcess.startUserId,
        startActivityId: historicProcess.startActivityId,
        endActivityId: historicProcess.endActivityId,
        deleteReason: historicProcess.deleteReason,
        superProcessInstanceId: historicProcess.superProcessInstanceId,
        url: historicProcess.url,
        variables: historicProcess.variables,
        tenantId: historicProcess.tenantId
      } as HistoryProcess);
    });
    //console.log('historyProcess', historyProcess)
    return Promise.resolve(historyProcess);
   });
 }


export const processInfoApi = {
  getProcessDefinitions,
  getProcessDefinitionById,
  getProcessInstance,
  getProcessInstanceById,
  getAllTasks,
  getBpmnXml,
  getVariables,
  getBpmnElements,
  getHistoricActivity,
  getAllHistoricActivity,
  getHistoryProcessInstance,
  getExecutionActivities
};