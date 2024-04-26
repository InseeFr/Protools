import HistoricActivity from "../../model/api/historicActivity";
import { HistoryProcess } from "../../model/api/historyProcess";
import Variable from "../../model/api/variable";
import UserCredentials from "../../model/userCredentials";
import { getRequest } from "../fetcher/requests";

const getHistoricActivity = async (
    processInstanceId: string,
    apiUrl: string,
    accessToken: string
): Promise<HistoricActivity[]> => {
    const historicActivities: HistoricActivity[] = [];
    const historyResponseExec = await getRequest(
        `${apiUrl}history/historic-activity-instances?processInstanceId=${processInstanceId}&size=10000`,
        accessToken || ""
    );
    historyResponseExec.data &&
        historyResponseExec.data.data.forEach((historicActivity: any) => {
            if (historicActivity.activityType !== "sequenceFlow") {
                historicActivities.push({
                    activityId:
                        historicActivity.activityId.length > 30
                            ? historicActivity.activityId.substring(0, 30) + " [...]"
                            : historicActivity.activityId,
                    activityName: historicActivity.activityName,
                    activityType: historicActivity.activityType,
                    executionId: historicActivity.executionId,
                    endTime: historicActivity.endTime,
                    durationInMillis: historicActivity.durationInMillis / 1000,
                } as HistoricActivity);
            }
        });

    //console.log('historicActivities', historicActivities)
    return historicActivities;
}

const getAllHistoricActivity = (
    apiUrl: string,
    accessToken: string
): Promise<HistoricActivity[]> => {
    const historicActivities: HistoricActivity[] = [];
    return getRequest(
        `${apiUrl}history/historic-activity-instances?size=10000`,
        accessToken || ''
    ).then((res) => {

        res.data && res.data.data.forEach((historicActivity: any) => {
            if (historicActivity.activityType !== "sequenceFlow") {
                historicActivities.push({
                    activityId: historicActivity.activityId.length > 30 ? historicActivity.activityId.substring(0, 30) + ' [...]' : historicActivity.activityId,
                    activityName: historicActivity.activityName,
                    activityType: historicActivity.activityType,
                    executionId: historicActivity.executionId,
                    endTime: historicActivity.endTime,
                    durationInMillis: historicActivity.durationInMillis / 1000
                } as HistoricActivity);
            }
        });
        return Promise.resolve(historicActivities);
    });
}

const getAllHistoryProcessInstance = (
    apiUrl: string,
    accessToken: string
): Promise<HistoryProcess[]> => {
    return getRequest(
        `${apiUrl}history/historic-process-instances?size=10000`,
        accessToken || ''
    ).then((res) => {
        const historyProcess: HistoryProcess[] = [];

        res.data && res.data.data.forEach((historicProcess: any) => {
            if (historicProcess.endTime) { // Check if process has ended
                historyProcess.push({
                    id: historicProcess.id,
                    businessKey: historicProcess.businessKey,
                    processDefinitionId: historicProcess.processDefinitionId,
                    processDefinitionUrl: historicProcess.processDefinitionUrl,
                    processDefinitionName: historicProcess.processDefinitionName,
                    startDate: historicProcess.startTime,
                    endTime: historicProcess.endTime,
                    durationInMillis: historicProcess.durationInMillis,
                    startUserId: historicProcess.startUserId,
                    startActivityId: historicProcess.startActivityId,
                    endActivityId: historicProcess.endActivityId,
                    deleteReason: historicProcess.deleteReason,
                    superProcessInstanceId: historicProcess.superProcessInstanceId,
                    url: historicProcess.url,
                    variables: historicProcess.variables,
                    tenantId: historicProcess.tenantId
                } as HistoryProcess);
            }
        });

        return Promise.resolve(historyProcess);
    });
}

const getHistoryProcessInstance = (
    processInstanceId: string,
    apiUrl: string,
    accessToken: string

): Promise<HistoryProcess> => {
    return getRequest(
        `${apiUrl}history/historic-process-instances/${processInstanceId}`,
        accessToken || ''
    ).then((res) => {
        console.log('res', res);
        return Promise.resolve({
            id: res.data.id,
            businessKey: res.data.businessKey,
            processDefinitionId: res.data.processDefinitionId,
            processDefinitionUrl: res.data.processDefinitionUrl,
            processDefinitionName: res.data.processDefinitionName,
            startDate: res.data.startTime,
            endTime: res.data.endTime,
            durationInMillis: res.data.durationInMillis,
            startUserId: res.data.startUserId,
            startActivityId: res.data.startActivityId,
            endActivityId: res.data.endActivityId,
            deleteReason: res.data.deleteReason,
            superProcessInstanceId: res.data.superProcessInstanceId,
            url: res.data.url,
            variables: res.data.variables,
            tenantId: res.data.tenantId
        } as HistoryProcess);
    });
}

const getHistoricVariablesInstances = (
    processInstanceId: string,
    apiUrl: string,
    accessToken: string
): Promise<Variable[]> => {
    const variables: Variable[] = [];
    return getRequest(
        `${apiUrl}history/historic-variable-instances?processInstanceId=${processInstanceId}&size=10000`,
        accessToken || ''
    ).then((res) => {
        //console.log('res getHistoricVariablesInstances', res);
        res.data && res.data.data.forEach((element: any) => {
            variables.push({
                name: element.variable.name,
                type: element.variable.type,
                value: (() => {
                    try {
                        const parsedValue = typeof element.variable.value === 'string' ? JSON.parse(element.variable.value) : element.variable.value;
                        return JSON.stringify(parsedValue);
                    } catch (e) {
                        return String(element.variable.value);
                    }
                })(),
                scope: element.variable.scope
            } as Variable);
        });
        return Promise.resolve(variables);
    });
}
export const getHistoryUserActions = (
    variables: Variable[]
): UserCredentials[] => {
    let userCredentials: UserCredentials[] = [];
    if (variables.some((variable) => variable.name === 'directory_access_pwd_contact')) {
        const userCredentialsMap: { [key: string]: UserCredentials } = {};

        variables.forEach((variable) => {
            if (!userCredentialsMap[variable.scope]) {
                userCredentialsMap[variable.scope] = {
                    id: '',
                    idLogin: '',
                    password: ''
                };
            }

            if (variable.name === 'directory_access_id_contact') {
                userCredentialsMap[variable.scope]['idLogin'] = variable.value;
            } else if (variable.name === 'directory_access_pwd_contact') {
                userCredentialsMap[variable.scope]['password'] = variable.value;
            } else if (variable.name === 'rem_survey_unit') {
                userCredentialsMap[variable.scope]['id'] = JSON.parse(variable.value).repositoryId;
            }
        });

        userCredentials = Object.values(userCredentialsMap);
        userCredentials = userCredentials.filter(userCredential => userCredential.id !== "");
    }
    return userCredentials;
}

export const processHistoryApi = {
    getHistoricActivity,
    getAllHistoricActivity,
    getAllHistoryProcessInstance,
    getHistoricVariablesInstances,
    getHistoryProcessInstance,
}