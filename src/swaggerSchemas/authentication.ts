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