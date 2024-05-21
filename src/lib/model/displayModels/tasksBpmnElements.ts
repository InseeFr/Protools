class TasksBpmnElements {
    constructor(
        public id: string,
        public name: string,
        public documentation: string,
        public type: string,
    ) { }

    static createTableData = (bpmnElements: Record<string, any>): TasksBpmnElements[] => {
        const processes = bpmnElements.processes
        return processes.flatMap((process: any) => {
            const flowElementMap = process.flowElementMap;
            return Object.values(flowElementMap)
                .filter((flowElement: any) => !flowElement.id.startsWith('flow_'))
                .map((flowElement: any) => {
                    return new TasksBpmnElements(
                        flowElement.id,
                        flowElement.name,
                        flowElement.documentation ? flowElement.documentation : "Pas de documentation",
                        "Test",
                    );
                });
        });
    }
}

export default TasksBpmnElements;