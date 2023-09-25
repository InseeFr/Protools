import { postRequest } from "../fetcher/requests";
import { ConfigContext } from "../../../App";
import { useContext } from "react";
import { AuthContext } from "../../utils/provider/authProvider";



const { apiUrl } = useContext(ConfigContext);
const oidcClient = useContext(AuthContext);


export function startProcess(
    processDefinitionKey: string,
    variables: any[],
    businessKey: string,
): Promise<any> {
    return postRequest(
        `${apiUrl}runtime/process-instances`,
        oidcClient?.accessToken || '',
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
        `${apiUrl}protools-process/upload-context/?taskID=${taskId}`,
        oidcClient?.accessToken || '',
        formData,
    );
}

export function executeTask(
    taskId: string,
    variables: any[],
): Promise<any> {
    return postRequest(
        `${apiUrl}runtime/tasks/${taskId}`,
        oidcClient?.accessToken || '',
        {
            action: 'complete',
            variables,
        },
    );
}