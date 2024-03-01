import { body } from "express-validator";

import messages from "../../constants/messages";

import { User } from "../../models/user.model";

const validateAddUpdateUser = [

  body('email')
    .notEmpty().withMessage(messages.required)
    .isEmail().withMessage(messages.invalidEmail)
    .custom(async (value) => {
      const user = await User.findOne({ email: value });
      if (user) {
        throw new Error(messages.userWithThisEmailAlreadyExists);
      }
    })
    .trim(),

  body('username')
    .notEmpty().withMessage(messages.required)
    .custom(async (value) => {
      const user = await User.findOne({ username: value });
      if (user) {
        throw new Error(messages.userWithThisUserNameAlreadyExists);
      }
    }),

  body('password')
    .notEmpty().withMessage(messages.required)
    .custom(async (value) => {
      if (value.length < 6) {
        throw new Error(messages.passwordMustBeAtleast6Char);
      }
    })
    .trim(),

  body('role')
    .notEmpty().withMessage(messages.required),

];

export default validateAddUpdateUser;