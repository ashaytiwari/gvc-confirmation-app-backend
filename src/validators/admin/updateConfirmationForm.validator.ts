import { body } from "express-validator";

import messages from "../../constants/messages";
import { isPastDate } from "../../utilities";

const validateUpdateConfirmationForm = [

  body('_id')
    .notEmpty().withMessage(messages.required),

  body('title')
    .notEmpty().withMessage(messages.required)
    .trim(),

  body('date')
    .notEmpty().withMessage(messages.required)
    .custom(async (value) => {

      if (isPastDate(value) === true) {
        throw new Error(messages.confirmationCantBeCreateForPastDate);
      }
    })

];

export default validateUpdateConfirmationForm;