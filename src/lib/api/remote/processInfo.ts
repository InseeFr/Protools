
import { getRequest, postRequest } from "../fetcher/requests";
import { AuthContext } from "../../utils/provider/authProvider";
import { useContext } from "react";
import { ConfigContext } from "../../utils/provider/configProvider";


const { apiUrl } = useContext(ConfigContext);
const oidcClient = useContext(AuthContext);

export function getProcessDefinitions(): Promise<any> {
    return getRequest(
        `${apiUrl}repository/process-definitions`,
        oidcClient?.accessToken || '',
    );
}

export function getProcessDefinition(key: string): Promise<any> {
  
  return postRequest(`${apiUrl}repository/process-definitions`,  oidcClient?.accessToken || '',JSON.stringify({ key }));
}

export function getProcessInstance(businessKey: string): Promise<any> {
    
  return getRequest(`${apiUrl}repository/process-instances`, oidcClient?.accessToken || '', JSON.stringify({ businessKey }));
}

export function getProcessInstanceById(processDefinitionKey: string): Promise<any> {
    
  return getRequest(`${apiUrl}repository/process-instances`, oidcClient?.accessToken || '', JSON.stringify({ processDefinitionKey }));
}

export function getAllTasks(processInstanceId: string): Promise<any> {
    
  return getRequest(`${apiUrl}runtime/tasks`, oidcClient?.accessToken || '',JSON.stringify({ processInstanceId }));
}

export function getBpmnXml(processDefinitionId: string): Promise<any> {
    return getRequest(
        `${apiUrl}repository/process-definitions/${processDefinitionId}/ressourcedata`,
        oidcClient?.accessToken || '',
    );
}

export function getVariables(processInstanceId: string): Promise<any> {
    return getRequest(
        `${apiUrl}runtime/process-instances/${processInstanceId}/variables`,
        oidcClient?.accessToken || '',
    );
}

export function getBpmnElements(processInstanceId: string): Promise<any> {
    return getRequest(
        `${apiUrl}repository/process-instances/${processInstanceId}`,
        oidcClient?.accessToken || '',
    );
}