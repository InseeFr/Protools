import ProcessDefinitionDataApi from '../../model/api/processDefinitionData';
import RunningTaskApi from '../../model/api/runningTaskApi';
import Task from '../../model/tasks';
import { deleteDuplicatesByKey } from '../../utils/processUtils';
import { getRequest } from '../fetcher/requests';
import { fetcher, fetcherXml } from '../fetcher/fetcher';
import Variable from '../../model/api/variable';

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
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return getRequest(
    `${apiUrl}repository/process-instances/${processInstanceId}`,
    accessToken || ''
  );
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
};