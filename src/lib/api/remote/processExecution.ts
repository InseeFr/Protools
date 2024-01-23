import { postRequest } from "../fetcher/requests";

export function startProcess(
  processDefinitionKey: string,
  businessKey: string,
  variables: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  if (variables) { 
    let context = [{ "name": "context","value": JSON.stringify(variables) }]
    return postRequest(`${apiUrl}runtime/process-instances`, accessToken || '', {
      processDefinitionKey,
      businessKey,
      variables: context,
      returnVariables: false,
    });
  }
  return postRequest(`${apiUrl}runtime/process-instances`, accessToken || '', {
    processDefinitionKey,
    businessKey,
    //variables,
    returnVariables: false,
  });
}

export function uploadContext(
  taskId: string,
  file: File,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  const formData = new FormData();
  formData.append('file', file);
  return postRequest(
    `${apiUrl}protools-process/upload-context/?taskID=${taskId}`,
    accessToken || '',
    formData
  );
}

export function executeTask(
  taskId: string,
  variables: any[],
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return postRequest(`${apiUrl}runtime/tasks/${taskId}`, accessToken || '', {
    action: 'complete',
    variables,
  });
}

export function stopProcess(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return postRequest(`${apiUrl}runtime/process-instances/${processInstanceId}`, accessToken || '', {
    action: 'delete',
  });

}

export const processExecutionApi = {
  startProcess,
  uploadContext,
  executeTask,
  stopProcess,
};