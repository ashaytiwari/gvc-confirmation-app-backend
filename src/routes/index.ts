import { Router } from "express";
import bodyParser from "body-parser";

import adminRoutes from './adminRoutes';

const router = Router();

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

const routes = [
  {
    path: '/',
    route: adminRoutes
  }
];

routes.forEach((routeItem) => {
  router.use(routeItem.path, routeItem.route);
})

export default router;