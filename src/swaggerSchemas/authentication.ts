/**
 * @swagger
 * components: 
 *  schemas:
 *    AddUpdateUser:
 *      type: object
 *      required:
 *        - email
 *        - username
 *        - password
 *        - role
 *      properties:
 *        email:    
 *          type: string
 *          example: admin@gvc.com
 *        username:
 *          type: string
 *          example: admin@gvc
 *        password:
 *          type: string
 *          example: 123456
 *        role:
 *          type: string
 *          example: ADMIN
 */

/**
 * @swagger
 * components: 
 *  schemas:
 *    AdminLogin:
 *      type: object
 *      required:
 *        - username
 *        - password
 *      properties:
 *        username:
 *          type: string
 *          example: admin@gvc
 *        password:
 *          type: string
 *          example: 123456
 */

/**
 * @swagger
 * components: 
 *  schemas:
 *    ChangePassword:
 *      type: object
 *      required:
 *        - oldPassword
 *        - newPassword
 *      properties:
 *        oldPassword:    
 *          type: string
 *          example: test123
 *        newPassword: 
 *          type: string
 *          example: test456
 */