import moment from "moment";
import HistoricActivity from "../api/historicActivity";


class HistoryActivitiesGrouped {
    constructor(
        public id: string,
        public date: string,
        public label: string,
        public type: string,
        public count: number,
        public avgDuration: number,
        public lastExecution: string,
    ) { }

    static convertToGrouped = (histActivities: HistoricActivity[]): HistoryActivitiesGrouped[] => {
        const grouped = histActivities.reduce((acc, curr) => {
            if (!acc[curr.activityId]) {
                acc[curr.activityId] = [];
            }
            acc[curr.activityId].push(curr);
            return acc;
        }, {} as Record<string, HistoricActivity[]>);
        const typeMap: { [key: string]: string } = {
            serviceTask: 'Tâche de service',
            userTask: 'Tâche manuelle',
            subProcess: 'Sous-processus',
        };


        return Object.entries(grouped).map(([id, activities]) => {
            const date = moment(activities[0].startTime).format('DD/MM/YYYY');
            const label = activities[0].activityName;
            const type = typeMap[activities[0].activityType] || activities[0].activityType;
            const avgDuration = parseFloat((activities.reduce((sum, act) => {
                const endTime = new Date(act.endTime);
                const startTime = new Date(act.startTime);
                return sum + ((endTime.getTime() - startTime.getTime()) / 1000);
            }, 0) / activities.length).toFixed(2));
            const lastExecution = moment(activities[activities.length - 1].endTime).format('HH[h]mm'); const count = activities.length;
            return new HistoryActivitiesGrouped(id, date, label, type, count, avgDuration, lastExecution);
        });
    }
}

export default HistoryActivitiesGrouped;