

import getProcessDefinition from "../../../assets/mockData/getProcessDefinition.json"
import getTasks from "../../../assets/mockData/getTasks.json"
import Task from "../../model/tasks";
import { deleteDuplicatesByKey } from "../../utils/processUtils";
// import diagramBpmn from "../../../assets/mockData/diagram.bpmn"


export function getMockProcessDefinitions(): Promise<any[]> {
    const processLaunchInfo: any[] = [];
    deleteDuplicatesByKey(getProcessDefinition);
    getProcessDefinition.data.forEach((processDefinition: any) => { 
        processLaunchInfo.push({
            key: processDefinition.key,
            name: processDefinition.name
        });   
    });
    return Promise.resolve(processLaunchInfo);
}


// export function getProcessInstance(businessKey: string): Promise<any> {
//     const requestOptions = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ businessKey }),
//   };
//   return fetch(`${import.meta.env.VITE_API_BASE_URL}repository/process-instances`, requestOptions)
//     .then(response => response.json());
// }

// export function getProcessInstanceById(processDefinitionKey: string): Promise<any> {
//     const requestOptions = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ processDefinitionKey }),
//   };
//   return fetch(`${import.meta.env.VITE_API_BASE_URL}repository/process-instances`, requestOptions)
//     .then(response => response.json());
// }

export function getAllTasks(processInstanceId: string): Promise<Task[]> {
    console.log('Fetch tasks for ', processInstanceId);
    const tasks: Task[] = [];
    getTasks.data.forEach((task: any) => {
        tasks.push({
            id: task.id,
            label: task.name,
            description: task.description,
            key: task.taskDefinitionKey
        } as Task);
    });
    return Promise.resolve(tasks);
}

export const getBpmnXml = async (processDefinitionId: string) => {
    console.log('Fetch BPMN for ', processDefinitionId);
    try {
    const response = await fetch('../diagram.xml').then((res) => res.text());
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(response, 'text/xml');
    const xmlString = new XMLSerializer().serializeToString(xmlDoc);
    return xmlString;
  } catch (error) {
    console.error('Error fetching or parsing XML:', error);
    throw error;
  }
}

// export function getVariables(processInstanceId: string): Promise<any> {
//     return getRequest(
//         `${import.meta.env.VITE_API_BASE_URL}runtime/process-instances/${processInstanceId}/variables`,
//     );
// }

// export function getBpmnElements(processInstanceId: string): Promise<any> {
//     return getRequest(
//         `${import.meta.env.VITE_API_BASE_URL}repository/process-instances/${processInstanceId}`,
//     );
// }