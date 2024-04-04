import { useContext } from "react";
import { AuthContext } from "../utils/provider/authProvider";
import { ConfigContext } from "../utils/provider/configProvider";
import { useConstCallback } from "./useConstCallback";
import { processExecutionApi } from "../api/remote/processExecution";
import { processInfoApi } from "../api/remote/processInfo";

export const useApi = () => {
  const oidcClient = useContext(AuthContext);
  const { apiUrl } = useContext(ConfigContext);

  const executeTaskContext: Function = useConstCallback((taskID, variables) =>
    processExecutionApi.executeTaskContext(
      taskID,
      variables,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const startProcess: Function = useConstCallback(
    (processDefinitionKey, businessKey, variables) =>
      processExecutionApi.startProcess(
        processDefinitionKey,
        businessKey,
        variables,
        apiUrl,
        oidcClient ? oidcClient.accessToken : ""
      )
  );

  const startProcessWithContext: Function = useConstCallback(
    (processDefinitionKey, businessKey, context) =>
      processExecutionApi.startProcessWithContext(
        processDefinitionKey,
        businessKey,
        apiUrl,
        context,
        oidcClient ? oidcClient.accessToken : ""
      )
  );

  const uploadContext: Function = useConstCallback((taskID, file) =>
    processExecutionApi.uploadContext(
      taskID,
      file,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getBpmnXml: Function = useConstCallback((processDefinitionId) =>
    processInfoApi.getBpmnXml(
      processDefinitionId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getProcessInstances = useConstCallback(() =>
    processInfoApi.getProcessInstance(
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getProcessInstanceById: Function = useConstCallback(
    (processInstanceId) => {
      const response = processInfoApi.getProcessInstanceById(
        processInstanceId,
        apiUrl,
        oidcClient ? oidcClient.accessToken : ""
      );
      return response;
    }
  );

  const getProcessDefinitions: Function = useConstCallback(() => {
    const response = processInfoApi.getProcessDefinitions(
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    );
    return response;
  });

  const getProcessDefinitionById = useConstCallback((processDefinitionId) => {
    const response = processInfoApi.getProcessDefinitionById(
      processDefinitionId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    );
    return response;
  });

  const getAllTasks: Function = useConstCallback((processInstanceId) =>
    processInfoApi.getAllTasks(
      processInstanceId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getVariables: Function = useConstCallback((processInstanceId) =>
    processInfoApi.getVariables(
      processInstanceId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getBpmnElements: Function = useConstCallback((processDefinitionId) =>
    processInfoApi.getBpmnElements(
      processDefinitionId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getHistoricActivity: Function = useConstCallback((processInstanceId) =>
    processInfoApi.getHistoricActivity(
      processInstanceId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getAllHistoricActivity: Function = useConstCallback(() =>
    processInfoApi.getAllHistoricActivity(
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const getHistoryProcessInstance: Function = useConstCallback(() =>
    processInfoApi.getHistoryProcessInstance(
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const stopProcess: Function = useConstCallback((processInstanceId) =>
    processExecutionApi.stopProcess(
      processInstanceId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  const executeTask: Function = useConstCallback((taskId) =>
    processExecutionApi.executeTask(
      taskId,
      apiUrl,
      oidcClient ? oidcClient.accessToken : ""
    )
  );

  return {
    executeTaskContext,
    startProcess,
    startProcessWithContext,
    uploadContext,
    getBpmnXml,
    getProcessInstances,
    getProcessInstanceById,
    getProcessDefinitions,
    getProcessDefinitionById,
    getAllTasks,
    getVariables,
    getBpmnElements,
    getHistoricActivity,
    getAllHistoricActivity,
    getHistoryProcessInstance,
    stopProcess,
    executeTask,
  };
};
