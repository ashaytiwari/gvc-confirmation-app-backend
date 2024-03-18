import Router from 'express';

import validateUpdateConfirmationForm from '../validators/admin/updateConfirmationForm.validator';
import validateGetConfirmationForms from '../validators/admin/getConfirmationForms.validator';

import { getConfirmationFormsController, updateConfirmationFormController } from '../controllers/admin.controller';

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

/**
 * @swagger
 * /getConfirmationForms:
 *   get:
 *     summary: Get Confirmation Forms
 *     tags: [Admin]
 *     parameters:
 *      - name: title
 *        in: query
 *        schema: 
 *          type: string
 *      - name: page
 *        in: query
 *        required: true
 *        schema: 
 *          type: number
 *      - name: limit
 *        in: query
 *        required: true
 *        schema: 
 *          type: number
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getConfirmationForms', verifyToken, validateGetConfirmationForms, getConfirmationFormsController);

export default router;