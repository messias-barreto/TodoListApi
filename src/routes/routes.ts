import { Router } from 'express';
import { TaskController } from '../controllers/TaskController';
import { UserController } from '../controllers/UserController';
import { WorkController } from '../controllers/WorksController';

const routes = Router()

routes.post('/users', new UserController().create)
routes.put('/users/:id', new UserController().update)
routes.get('/users/:id', new UserController().findOneUser)

routes.get('/all-works/:user_id', new WorkController().getAll)
routes.post('/works', new WorkController().create)

routes.get('/tasks/:work_id', new TaskController().getAll)
routes.post('/tasks/:work_id', new TaskController().create)
routes.patch('/tasks/:id', new TaskController().update_status)
routes.delete('/tasks/:id', new TaskController().remove)

export { routes }