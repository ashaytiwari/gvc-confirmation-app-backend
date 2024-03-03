/**
 * @swagger
 * components: 
 *  schemas:
 *    UpdateUserConfirmation:
 *      type: object
 *      required:
 *        - confirmationFormId
 *        - _id
 *        - fullName
 *        - personCount
 *        - remark
 *      properties:
 *        confirmationFormId:    
 *          type: string
 *          example: 65e37f3892afb355e3383b69
 *        _id:    
 *          type: string
 *          example: 0
 *        fullName: 
 *          type: string
 *          example: John Doe
 *        personCount:
 *          type: number
 *          example: 5
 *        remark:   
 *          type: string
 *          example: One guest may join (30% probability)
 */