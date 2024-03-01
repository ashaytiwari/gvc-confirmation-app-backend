import Router from 'express';

import {
  addUpdateUserController,
  adminLoginController,
  changePasswordController,
  logoutController
} from '../controllers/authentication.controller';

import validateAddUpdateUser from '../validators/authentication/addUpdateUser.validator';
import validateAdminLogin from '../validators/authentication/adminLogin.validator';
import validateChangePassword from '../validators/authentication/changePassword.validator';

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

/**
 * @swagger
 * /changePassword:
 *   post:
 *     summary: Change Password Service
 *     tags: [Authentication]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *          schema: 
 *            $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/changePassword', verifyToken, validateChangePassword, changePasswordController);

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Logout Service
 *     tags: [Authentication]
 *     responses:
 *       200:
 *         description: Success
 */
router.post('/logout', verifyToken, logoutController);

export default router;