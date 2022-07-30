import { Router } from 'express';
import { UserController } from '../controllers/UserController';
import { WorkController } from '../controllers/WorksController';

const routes = Router();

routes.post('/users', new UserController().create);
routes.get('/users/:id', new UserController().findOneUser)

routes.post('/works', new WorkController().create);

export { routes }