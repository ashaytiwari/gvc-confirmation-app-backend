import Router from 'express';

import { addUpdateUserController, adminLoginController } from '../controllers/authentication.controller';

import validateAddUpdateUser from '../validators/authentication/addUpdateUser.validator';
import validateAdminLogin from '../validators/authentication/adminLogin.validator';

import { verifyToken } from '../utilities/token';

const router = Router();

/**
 * @swagger
 * /adminLogin:
 *   post:
 *     summary: Admin Login Service
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema: 
 *            $ref: '#/components/schemas/AdminLogin'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/adminLogin', validateAdminLogin, adminLoginController);

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
router.post('/addUpdateUser', verifyToken, validateAddUpdateUser, addUpdateUserController);

export default router;