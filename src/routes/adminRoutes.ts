import Router from 'express';

import validateUpdateConfirmationForm from '../validators/admin/updateConfirmationForm.validator';

import { updateConfirmationFormController } from '../controllers/admin.controller';

import { verifyToken } from '../utilities/token';

const router = Router();

router.post('/updateConfirmationForm', verifyToken, validateUpdateConfirmationForm, updateConfirmationFormController);

export default router;