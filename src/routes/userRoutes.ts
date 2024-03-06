import Router from 'express';

import validateUpdateUserConfirmation from '../validators/user/updateUserConfirmation.validator';

import { getUserConfirmationsController, updateUserConfirmationController } from '../controllers/user.controller';
import validateGetUserConfirmations from '../validators/user/getUserConfirmations.validator';

const router = Router();

/**
 * @swagger
 * /updateUserConfirmation:
 *   post:
 *     summary: User Confirmation Service
 *     tags: [User]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema: 
 *            $ref: '#/components/schemas/UpdateUserConfirmation'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/updateUserConfirmation', validateUpdateUserConfirmation, updateUserConfirmationController);

/**
 * @swagger
 * /getUserConfirmations:
 *   get:
 *     summary: Get user confirmations by form id
 *     tags: [User]
 *     parameters:
 *      - name: formId
 *        in: query
 *        required: true
 *        schema: 
 *          type: string
 *     responses:
 *       200:
 *         description: Success
 */
router.get('/getUserConfirmations', validateGetUserConfirmations, getUserConfirmationsController);

export default router;