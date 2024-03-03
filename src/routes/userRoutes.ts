import Router from 'express';

import validateUpdateUserConfirmation from '../validators/user/updateUserConfirmation.validator';

import { updateUserConfirmationController } from '../controllers/user.controller';

const router = Router();

router.post('/updateUserConfirmation', validateUpdateUserConfirmation, updateUserConfirmationController);

export default router;