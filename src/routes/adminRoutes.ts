import Router from 'express';

import { addUpdateUserController } from '../controllers/user.controller';

import validateAddUpdateUser from '../validators/addUpdateUser.validator';

const router = Router();

/**
 * @swagger
 * /addUpdateUser:
 *   post:
 *     summary: Add Update User Service
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema: 
 *            $ref: '#/components/schemas/AddUpdateUser'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/addUpdateUser', validateAddUpdateUser, addUpdateUserController);

export default router;