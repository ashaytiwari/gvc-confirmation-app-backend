import Router from 'express';

import validateUpdateUserConfirmation from '../validators/user/updateUserConfirmation.validator';
import validateGetUserConfirmations from '../validators/user/getUserConfirmations.validator';

import {
  getConfirmationFormDetailsController,
  getUserConfirmationsController,
  updateUserConfirmationController
} from '../controllers/user.controller';

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

/**
 * @swagger
 * /getConfirmationFormDetails:
 *   get:
 *     summary: Get confirmation form details by form id
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
router.get('/getConfirmationFormDetails', validateGetUserConfirmations, getConfirmationFormDetailsController);

export default router;