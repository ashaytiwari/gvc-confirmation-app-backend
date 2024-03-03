import Router from 'express';

import validateUpdateUserConfirmation from '../validators/user/updateUserConfirmation.validator';

import { updateUserConfirmationController } from '../controllers/user.controller';

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

export default router;