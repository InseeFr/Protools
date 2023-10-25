import { postRequest } from "../fetcher/requests";
export function startProcess(
  processDefinitionKey: string,
  variables: any[],
  businessKey: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return postRequest(
    `${apiUrl}runtime/process-instances`,
    accessToken || '',
    {
      processDefinitionKey,
      variables,
      businessKey,
      returnVariables: false,
    }
  );
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
  return postRequest(
    `${apiUrl}runtime/tasks/${taskId}`,
    accessToken || '',
    {
      action: 'complete',
      variables,
    }
  );
}
