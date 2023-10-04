import Task from '../../model/tasks';
import { deleteDuplicatesByKey } from '../../utils/processUtils';
import { getRequest } from '../fetcher/requests';

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

export function getProcessDefinition(
  key: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  const processLaunchInfo: any[] = [];
  getRequest(`${apiUrl}repository/process-definitions`, accessToken || '', {
    key,
  }).then((response) => {
    deleteDuplicatesByKey(response);
    response.data.forEach((processDefinition: any) => { 
          processLaunchInfo.push({
              key: processDefinition.key,
              name: processDefinition.name
          });   
      });});
    
    
   return Promise.resolve(processLaunchInfo); ;;
}

export function getProcessInstance(
  apiUrl: string,
  accessToken: string,
): Promise<any> {
  return getRequest(`${apiUrl}repository/process-instances`, accessToken || '');
}

export function getProcessInstanceById(
  processDefinitionKey: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return getRequest(`${apiUrl}repository/process-instances`, accessToken || '', {
    processDefinitionKey,
  });
}

export function getAllTasks(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<Task[]> {

  const tasks: Task[] = [];
    
  getRequest(`${apiUrl}runtime/tasks`, accessToken || '', {
    processInstanceId,
  }).then((response) => {
    response.data.forEach((task: any) => {
        tasks.push({
            id: task.id,
            label: task.name,
            description: task.description,
            key: task.taskDefinitionKey
        } as Task);
    })
  });
  return Promise.resolve(tasks);
}

export function getBpmnXml(
  processDefinitionId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  try {
    getRequest(
      `${apiUrl}repository/process-definitions/${processDefinitionId}/ressourcedata`,
      accessToken || ''
    ).then((res) => {
      const responsexml = res.data
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responsexml, 'text/xml');
      const xmlString = new XMLSerializer().serializeToString(xmlDoc);
      return Promise.resolve(xmlString);
    });
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  };
  return Promise.resolve();
}

export function getVariables(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return getRequest(
    `${apiUrl}runtime/process-instances/${processInstanceId}/variables`,
    accessToken || ''
  );
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
  getProcessDefinition,
  getProcessInstance,
  getProcessInstanceById,
  getAllTasks,
  getBpmnXml,
  getVariables,
  getBpmnElements,
};