import { Router } from "express";
import bodyParser from "body-parser";

import authenticationRoutes from './authenticationRoutes';
import adminRoutes from './adminRoutes';
import userRoutes from './userRoutes';

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const routes = [
  {
    path: '/',
    route: authenticationRoutes
  },
  {
    path: '/',
    route: adminRoutes
  },
  {
    path: '/',
    route: userRoutes
  },
];

routes.forEach((routeItem) => {
  router.use(routeItem.path, routeItem.route);
})

export default router;