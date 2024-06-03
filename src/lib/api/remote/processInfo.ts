import ProcessDefinitionDataApi from '../../model/api/processDefinitionData';
import Task from '../../model/displayModels/tasks';
import { deleteDuplicatesByKey } from '../../utils/processUtils';
import { getRequest } from '../fetcher/requests';
import { fetcherXml } from '../fetcher/fetcher';
import Variable from '../../model/api/variable';
import FlowElements from '../../model/displayModels/flowElements';
import ProcessInfo from '../../model/displayModels/processInfo';

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
    //console.log('getProcessDefinitionById: ', response.data);
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

export async function getVariables(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  const variables: Variable[] = [];
  let context: Variable | undefined;

  const res = await getRequest(
    `${apiUrl}runtime/process-instances/${processInstanceId}/variables`,
    accessToken || ''
  );

  if (res.data.length > 0) {
    context = res.data.find((element: Variable) => element.name === "context");

    res.data.forEach((variable: any) => {
      if (variable.name !== "context") {
        variables.push({
          name: variable.name,
          value: variable.value,
          type: variable.type,
          scope: variable.scope,
        } as Variable);
      }
    });
  }

  return [context, variables];
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

export async function getBpmnModel(
  processDefinitionId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return await getRequest(
    `${apiUrl}repository/process-definitions/${processDefinitionId}/model`,
    accessToken || ''
  ).then((res) => {
    return Promise.resolve(res.data);
  });
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



export const processInfoApi = {
  getProcessDefinitions,
  getProcessDefinitionById,
  getProcessInstance,
  getProcessInstanceById,
  getAllTasks,
  getBpmnXml,
  getVariables,
  getBpmnElements,
  getExecutionActivities,
  getBpmnModel
};