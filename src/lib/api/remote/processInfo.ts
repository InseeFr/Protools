import ProcessDefinitionDataApi from '../../model/api/processDefinitionData';
import RunningTaskApi from '../../model/api/runningTaskApi';
import Task from '../../model/tasks';
import { deleteDuplicatesByKey } from '../../utils/processUtils';
import { getRequest } from '../fetcher/requests';
import { fetcher, fetcherXml } from '../fetcher/fetcher';
import Variable from '../../model/api/variable';
import FlowElements from '../../model/flowElements';
import { HistoricActivity } from '../../model/api/historicActivity';

export function getProcessDefinitions(
  apiUrl: string,
  accessToken: string
): Promise<any[]> {

  const processLaunchInfo: any[] = [];
  getRequest(`${apiUrl}repository/process-definitions`, accessToken || '').then((response) => {
    
    deleteDuplicatesByKey(response.data);
    response.data.data.forEach((processDefinition: any) => {
      
          processLaunchInfo.push({
              key: processDefinition.key,
              name: processDefinition.name
          }); 
      
    });
  });
    
   return Promise.resolve(processLaunchInfo); 
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
): Promise<any> {
  return getRequest(`${apiUrl}runtime/process-instances`, accessToken || '');
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
    //console.log('response tasks', response);
    (response.data && response.data.length > 0) ? 
      response.data.forEach((task: any) => {
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
    if (res.data.length > 0) {
      return res.data.find((variable: any) => variable.name === "context");
    }
    return Promise.resolve({});
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
      const flowElementsData = process.flowElements;
      flowElementsData.forEach((flowElement: any) => {
        flowElements.push({
          id: flowElement.id.length > 30 ? flowElement.id.substring(0, 30) + ' [...]' : flowElement.id,
          name: flowElement.name,
          documentation: flowElement.documentation ? flowElement.documentation : '',
          asynchronous: flowElement.asynchronous ? flowElement.asynchronous : false,
          eventDefinitions: flowElement.eventDefinitions ? flowElement.eventDefinitions : [],
        } as FlowElements);
      }
      );
    //console.log('flowElements: ', flowElements)
    return Promise.resolve(flowElements);
  });

  //return Promise.resolve(flowElements);
}

const getHistoricActivity = (
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<HistoricActivity[]> => {
  const historicActivities: HistoricActivity[] = [];
  return getRequest(
    `${apiUrl}history/historic-activity-instances?processInstanceId=${processInstanceId}`,
    accessToken || ''
  ).then((res) => {
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

export const processInfoApi = {
  getProcessDefinitions,
  getProcessDefinitionById,
  getProcessInstance,
  getProcessInstanceById,
  getAllTasks,
  getBpmnXml,
  getVariables,
  getBpmnElements,
  getHistoricActivity
};