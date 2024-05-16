class ProcessInfo {
    constructor(
        public id : string,
        public businessKey: string,
        public processKey: string,
        public documentation: string,
        public startDate: Date,
        public state: boolean,
        public group: string,
        public ids: Record<string, string>,
  ) {}
}

export default ProcessInfo