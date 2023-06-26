import ProcessDefinitionDataApi from "./processDefinitionData";

class ProcessDefinitionApi {
    constructor(
        public data: ProcessDefinitionDataApi[],
        public total: number,
        public start: number,
        public sort: string,
        public order: string,
        public size : number,
    ) {}
}

export default ProcessDefinitionApi;