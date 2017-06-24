import { default as taskRouter } from './controllers/taskController'

module.exports = (server) => {
    taskRouter.applyRoutes(server, '/' + process.env.API_PREFIX)
}