import Router from 'express';

import { addUpdateUserController } from '../controllers/user.controller';

import validateAddUpdateUser from '../validators/addUpdateUser.validator';

const router = Router();

router.post('/addUpdateUser', validateAddUpdateUser, addUpdateUserController);

export default router;