import RunningTaskDataApi from "./runningTaskData";

class RunningTaskApi {
    constructor(
        public data: RunningTaskDataApi[],
        public total: number,
        public start: number,
        public sort: string,
        public order: string,
        public size : number,
    ) {}
}

export default RunningTaskApi;