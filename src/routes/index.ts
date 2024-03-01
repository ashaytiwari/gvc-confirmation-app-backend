import { Router } from "express";
import bodyParser from "body-parser";

import authenticationRoutes from './authenticationRoutes';

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const routes = [
  {
    path: '/',
    route: authenticationRoutes
  }
];

routes.forEach((routeItem) => {
  router.use(routeItem.path, routeItem.route);
})

export default router;