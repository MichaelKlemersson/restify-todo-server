import { Router } from 'restify-router'
import Errors from 'restify-errors'
import TaskRepository from 'domains/task/repository/taskRepository'

const TaskController = new Router();
const taskRepository = new TaskRepository();

TaskController.get('/tasks', (req, res, next) => {
    taskRepository.findAll().then(tasks => {
        return res.json({
            status: true,
            code: 200,
            data: tasks
        });
    }).catch(error => {
        return next(new Errors.InternalServerError({ code: 500, message: 'error on query task' }));
    });
});

TaskController.post('/tasks', (req, res, next) => {
    taskRepository.create(req.body).then(task => {
        return res.send(201, {
            status: true,
            code: 201,
            data: task
        });
    }).catch(error => {
        console.log(error);
        return next(new Errors.InternalServerError({ code: 500, message: 'error on create task' }));
    });
});

TaskController.put('/tasks/:id', (req, res, next) => {
    taskRepository.update(req.params.id, req.body).then((task) => {
        return res.send(200, {
            status: true,
            code: 200,
            data: task
        });
    }).catch(error => {
        console.log(error);
        if (error.body.code === 'NotFound') {
            return next(new Errors.NotFoundError({ code: 404, message: error.body.message }));
        }
        else {
            return next(new Errors.InternalServerError({ code: 500, message: error.body.message }));
        }
    });
});

TaskController.del('/tasks/:id', (req, res, next) => {
    taskRepository.delete(req.params.id).then(isTaskRemoved => {
        res.send(204, '');
    }).catch(error => {
        console.log(error);
        if (error.body.code === 'NotFound') {
            return next(new Errors.NotFoundError({ code: 404, message: error.body.message }));
        }
        else {
            return next(new Errors.InternalServerError({ code: 500, message: error.body.message }));
        }
    });
});

export default TaskController
