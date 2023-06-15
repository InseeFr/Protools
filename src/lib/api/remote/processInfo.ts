import { get } from "http";
import { getRequest } from "../fetcher/requests";

export function getProcessDefinitions(): Promise<any> {
    return getRequest(
        `${import.meta.env.VITE_API_BASE_URL}repository/process-definitions`,
    );
}

export function getProcessDefinition(key: string): Promise<any> {
  const requestOptions = {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ key }),
  };
  return fetch(`${import.meta.env.VITE_API_BASE_URL}repository/process-definitions`, requestOptions)
    .then(response => response.json());
}

export function getProcessInstance(businessKey: string): Promise<any> {
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ businessKey }),
  };
  return fetch(`${import.meta.env.VITE_API_BASE_URL}repository/process-instances`, requestOptions)
    .then(response => response.json());
}

export function getProcessInstanceById(processDefinitionKey: string): Promise<any> {
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ processDefinitionKey }),
  };
  return fetch(`${import.meta.env.VITE_API_BASE_URL}repository/process-instances`, requestOptions)
    .then(response => response.json());
}

export function getAllTasks(processInstanceId: string): Promise<any> {
    const requestOptions = {
    method: 'GET',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ processInstanceId }),
  };
  return fetch(`${import.meta.env.VITE_API_BASE_URL}runtime/tasks`, requestOptions)
    .then(response => response.json());
}

export function getBpmnXml(processDefinitionId: string): Promise<any> {
    return getRequest(
        `${import.meta.env.VITE_API_BASE_URL}repository/process-definitions/${processDefinitionId}/ressourcedata`,
    );
}