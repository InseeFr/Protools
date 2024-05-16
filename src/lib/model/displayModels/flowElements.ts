class FlowElements{
    constructor(
        public id: string,
        public name: string,
        public documentation: string,
        public asynchronous: boolean,
        public eventDefinitions: any[],
    ) {}
}

export default FlowElements;