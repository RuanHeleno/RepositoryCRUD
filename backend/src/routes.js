import {
    Router
} from "express";
import UsersController from "./controllers/UsersController";
import SessionsController from "./controllers/SessionsController";
import RepositoriesController from "./controllers/RepositoriesController";

import auth from "./middlewares/auth";

// RESTFULL
const routes = new Router();

routes.post('/sessions', SessionsController.create);

// PRIVATE
routes.use(auth);

routes.post('/users', UsersController.create);
routes.get('/users', UsersController.list);
routes.get('/users/:id', UsersController.getOne);
routes.put('/users/:id', UsersController.update);
routes.delete('/users/:id', UsersController.delete);

routes.post('/users/:user_id/repositories', RepositoriesController.create);
routes.get('/users/:user_id/repositories', RepositoriesController.list);
routes.delete('/users/:user_id/repositories/:id', RepositoriesController.delete);

export default routes;