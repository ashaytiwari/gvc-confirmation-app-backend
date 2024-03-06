import { query } from "express-validator";

import messages from "../../constants/messages";

const validateGetUserConfirmations = [
  query('formId')
    .notEmpty().withMessage(messages.required)
];

export default validateGetUserConfirmations;