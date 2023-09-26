import { useContext } from "react";
import { AuthContext } from "../utils/provider/authProvider";
import { ConfigContext } from "../utils/provider/configProvider";
import { useConstCallback } from "./useConstCallback";
import { processExecutionApi } from "../api/remote/processExecution";
import { processInfoApi } from "../api/remote/processInfo";

export const useApi = () => { 
    const oidcClient = useContext(AuthContext);
    const { apiUrl } = useContext(ConfigContext);
    
    const executeTask: Function = useConstCallback((taskID, variables) => processExecutionApi.executeTask(
        taskID,
        variables,
        apiUrl,
        oidcClient ? oidcClient.accessToken : ''
    ));
    
    const startProcess: Function = useConstCallback((processDefinitionKey, variables, businessKey) => processExecutionApi.startProcess(
        processDefinitionKey,
        variables,
        businessKey,
        apiUrl,
        oidcClient ? oidcClient.accessToken : ''
    ));

    const uploadContext: Function = useConstCallback((taskID, file) => processExecutionApi.uploadContext(
        taskID,
        file,
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));

    const getBpmnXml: Function = useConstCallback((processDefinitionId) => processInfoApi.getBpmnXml(
        processDefinitionId,
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));
    
    const getProcessInstanceById: Function = useConstCallback((processInstanceId) => processInfoApi.getProcessInstanceById(
        processInstanceId,
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));


    const getProcessDefinitions: Function = useConstCallback(() => processInfoApi.getProcessDefinitions(
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));

    const getAllTasks: Function = useConstCallback((processInstanceId) => processInfoApi.getAllTasks(
        processInstanceId,
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));

    const getVariables: Function = useConstCallback((processInstanceId) => processInfoApi.getVariables(
        processInstanceId,
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));

    const getBpmnElements = useConstCallback((processInstanceId) => processInfoApi.getBpmnElements(
        processInstanceId,
        apiUrl,
         oidcClient ? oidcClient.accessToken : ''
    ));

    return {
        executeTask,
        startProcess,
        uploadContext,
        getBpmnXml,
        getProcessInstanceById,
        getProcessDefinitions,
        getAllTasks,
        getVariables,
        getBpmnElements
    }
};