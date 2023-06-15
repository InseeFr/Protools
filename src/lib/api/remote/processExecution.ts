import { postRequest } from "../fetcher/requests";


export function startProcess(
    processDefinitionKey: string,
    variables: any[],
    businessKey: string,
): Promise<any> {
    return postRequest(
       `${import.meta.env.VITE_API_BASE_URL}runtime/process-instances`,
        {
            processDefinitionKey,
            variables,
            businessKey,
            returnVariables: false,
        },
    );
}

// TODO : Check this function with context file
export function uploadContext(
    taskId: string,
    file: File,
): Promise<any> {
    const formData = new FormData();
    formData.append('file', file);
    return postRequest(
        `${import.meta.env.VITE_API_BASE_URL}protools-process/upload-context/?taskID=${taskId}`,
        formData,
    );
}