import { body } from "express-validator";
import bcrypt from 'bcryptjs';

import messages from "../../constants/messages";
import { User } from "../../models/user.model";

const validateAdminLogin = [

  body('username')
    .notEmpty().withMessage(messages.required),

  body('password')
    .notEmpty().withMessage(messages.required)
    .custom(async (value, { req }) => {

      const username = req.body.username;
      const user = await User.findOne({ username });

      if (!user) {
        throw new Error(messages.userWithThisUsernameDoesNotExists);
      }

      const validatePassword = await bcrypt.compare(value, user.password);

      if (!validatePassword) {
        throw new Error(messages.invalidPassword);
      }

    })

];

export default validateAdminLogin;