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

router.get('/getUserConfirmations', validateGetUserConfirmations, getUserConfirmationsController);

export default router;