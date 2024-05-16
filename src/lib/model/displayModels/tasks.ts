import TaskType from "./taskType";

class Task {
  constructor(
    public id: string,
    public label: string,
    public description: string,
    public key: string,
    public type?: TaskType,
    
  ) {}
}

export default Task;