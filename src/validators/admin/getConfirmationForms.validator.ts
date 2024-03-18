import { query } from "express-validator";

import messages from "../../constants/messages";

const validateGetConfirmationForms = [

  query('page')
    .notEmpty().withMessage(messages.required),

  query('limit')
    .notEmpty().withMessage(messages.required),

];

export default validateGetConfirmationForms;