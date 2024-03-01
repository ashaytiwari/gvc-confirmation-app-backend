import { body } from "express-validator";

import messages from "../../constants/messages";

const validateChangePassword = [

  body('oldPassword')
    .notEmpty().withMessage(messages.required)
    .trim(),

  body('newPassword')
    .notEmpty().withMessage(messages.required)
    .custom(async (value) => {
      if (value.length < 6) {
        throw new Error(messages.passwordMustBeAtleast6Char);
      }
    })
    .trim(),

];

export default validateChangePassword;