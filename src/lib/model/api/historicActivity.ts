class HistoricActivity {
    constructor(
        //public id: string,
        public activityId: string,
        public activityName: string,
        public activityType: string,
        public executionId: string,
        public startTime: string,
        public endTime: string,
        public durationInMillis: number, 
    ) {}
}

export default HistoricActivity;