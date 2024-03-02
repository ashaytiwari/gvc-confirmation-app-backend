import Router from 'express';

import validateUpdateConfirmationForm from '../validators/admin/updateConfirmationForm.validator';

import { updateConfirmationFormController } from '../controllers/admin.controller';

import { verifyToken } from '../utilities/token';

const router = Router();

/**
 * @swagger
 * /updateConfirmationForm:
 *   post:
 *     summary: Add and Update Confirmation Form Service
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema: 
 *            $ref: '#/components/schemas/UpdateConfirmationForm'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/updateConfirmationForm', verifyToken, validateUpdateConfirmationForm, updateConfirmationFormController);

export default router;