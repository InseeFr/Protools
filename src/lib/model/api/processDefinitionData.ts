class ProcessDefinitionDataApi {
    constructor(
        public id: string,
        public url: string,
        public key: string,
        public name: string,
        public description: string,
        public tenantId: boolean,
        public deploymentId: string,
        public deploymentUrl: string,
        public resource: string,
        public diagramResource: string,
        public category: string,
        public graphicalNotationDefined: boolean,
        public version: number,
        public suspended: boolean,
        public startFormDefined: boolean,
    ) {}
}

export default ProcessDefinitionDataApi;
