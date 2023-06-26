
import { getRequest } from "../fetcher/requests";
import getProcessDefinition from "../../../assets/mockData/getProcessDefinition.json"
import getVariables from "../../../assets/mockData/getVariables.json"
// import diagramBpmn from "../../../assets/mockData/diagram.bpmn"


export function getMockProcessDefinitions(): any[] {
    const processLaunchInfo: any[] = [];
    getProcessDefinition.data.forEach((processDefinition: any) => { 
        processLaunchInfo.push({
            key: processDefinition.key,
            name: processDefinition.name
        });   
    });
    return processLaunchInfo;
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

// export function getAllTasks(processInstanceId: string): Promise<any> {
//     const requestOptions = {
//     method: 'GET',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify({ processInstanceId }),
//   };
//   return fetch(`${import.meta.env.VITE_API_BASE_URL}runtime/tasks`, requestOptions)
//     .then(response => response.json());
// }

export function getBpmnXml(processDefinitionId: string): Promise<any> {
    return getRequest(
        `${import.meta.env.VITE_API_BASE_URL}repository/process-definitions/${processDefinitionId}/ressourcedata`,
    );
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