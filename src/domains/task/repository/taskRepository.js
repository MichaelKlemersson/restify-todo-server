import BaseRepository from 'support/baseRepository'
import Task from 'domains/task/task'

class TaskRepository extends BaseRepository {
    constructor() {
        super(Task);
    }
}

export default TaskRepository
