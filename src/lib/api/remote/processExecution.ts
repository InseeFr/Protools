import { deleteRequest, postRequest } from "../fetcher/requests";

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

export function startProcessWithContext(
  processDefinitionKey: string,
  businessKey: string,
  apiUrl: string,
  context: string,
  accessToken: string
): Promise<any> {
    const contextObject = JSON.parse(context);

  return postRequest(`${apiUrl}protools-process/create_process_instance_with_context?processDefinitionKey=${processDefinitionKey}&businessKey=${businessKey}`, accessToken || '', {
  ...contextObject
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

export function executeTaskContext(
  taskId: string,
  variables: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  let context = [{ "name": "context", "value": JSON.stringify(variables) }]
  console.log('Upload context with variables : ', context)
  return postRequest(`${apiUrl}runtime/tasks/${taskId}`, accessToken || '', {
  action: 'complete',
  variables: context,
  }).then(response => {
    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
   
  });
  
}
export function executeTask(
  taskId: string,
  
  apiUrl: string,
  accessToken: string
): Promise<any> {
  
  return postRequest(`${apiUrl}runtime/tasks/${taskId}`, accessToken || '', {
  action: 'complete',
  
  }).then(response => {
    if (response.status !== 200) {
      throw new Error(`Request failed with status code ${response.status}`);
    }
   
  });
  
}

export function stopProcess(
  processInstanceId: string,
  apiUrl: string,
  accessToken: string
): Promise<any> {
  return deleteRequest(`${apiUrl}runtime/process-instances/${processInstanceId}`, accessToken || '');

}

export const processExecutionApi = {
  startProcess,
  uploadContext,
  executeTaskContext,
  executeTask,
  stopProcess,
};