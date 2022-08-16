import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { UserController } from '../controllers/UserController';
import { WorkController } from '../controllers/WorksController';
import middleware from '../middlewares/AuthMiddlewares';
const routes = Router()

routes.post('/auth', new UserController().findAuthUser)
routes.get('/users', middleware, new UserController().AllUsers)
routes.post('/users', middleware, new UserController().create)
routes.put('/users/:id', middleware, new UserController().update)
routes.get('/users/:id', middleware, new UserController().findOneUser)

routes.get('/works/:user_id', middleware, new WorkController().getAll)
routes.get('/get-work/:id', middleware, new WorkController().getOne)
routes.post('/works', middleware, new WorkController().create)

routes.get('/tasks/:work_id', middleware, new TaskController().getAll)
routes.post('/tasks', middleware, new TaskController().create)
routes.patch('/tasks/:id', middleware, new TaskController().update_status)
routes.delete('/tasks/:id', middleware, new TaskController().remove)
 
export { routes }