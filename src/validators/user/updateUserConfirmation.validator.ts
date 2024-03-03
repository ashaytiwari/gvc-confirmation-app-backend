import { body } from "express-validator";

import messages from "../../constants/messages";

const validateUpdateUserConfirmation = [

  body('confirmationFormId')
    .notEmpty().withMessage(messages.required),

  body('_id')
    .notEmpty().withMessage(messages.required),

  body('fullName')
    .notEmpty().withMessage(messages.required)
    .trim(),

  body('personCount')
    .notEmpty().withMessage(messages.required),

  body('remark').trim()

];

export default validateUpdateUserConfirmation;