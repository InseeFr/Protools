class RunningTaskDataApi{
    constructor(
        public id: string,
        public url: string,
        public owner: string,
        public assignee: string,
        public delegationState: string,
        public name: string,
        public description: string,
        public createTime: string,
        public dueDate: string,
        public priority: number,
        public suspended: boolean,
        public taskDefinitionKey: string,
        public tenantId: string,
        public category: string,
        public formKey: string,
        public parentTaskId: string,
        public parentTaskUrl: string,
        public executionId: string,
        public executionUrl: string,
        public processInstanceId: string,
        public processInstanceUrl: string,
        public processDefinitionId: string,
        public processDefinitionUrl: string,
        public variables: any[],
    ) {}
}

export default RunningTaskDataApi;