import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User } from "../models/user.model";

import messages from "../constants/messages";
import { IAddUpdateUserParamsModel, IAdminLoginParamsModel } from "../interfaces/authentication";

import { responseHandlerObject } from "../utilities/responseHandler";
import { handleValidation, hashData } from "../utilities";
import { createToken } from "../utilities/token";

export async function addUpdateUserController(req: Request, res: Response) {
  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const body: IAddUpdateUserParamsModel = req.body;

    // hashing password
    const hashedPassword = await hashData(body.password);

    const newUser = new User({
      ...body,
      password: hashedPassword
    });

    await newUser.save();

    return responseHandlerObject.success(res, messages.userCreatedSuccessfully, null);

  } catch (error) {
    return responseHandlerObject.serverError(res, error);
  }
}

export async function adminLoginController(req: Request, res: Response) {
  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const body: IAdminLoginParamsModel = req.body;

    const user = await User.findOne(
      { username: body.username },
      { password: 0 }
    );

    if (!user) {
      return responseHandlerObject.validationError(res, messages.userWithThisUsernameDoesNotExists);
    }

    const tokenData = {
      _id: user._id,
      username: user.username,
      email: user.email
    };

    const token = await createToken(tokenData);
    user.tokenData = token;
    await user.save();

    const responseData = {
      _id: user._id,
      username: user.username,
      email: user.email,
      role: user.role,
      tokenData: user.tokenData
    };

    return responseHandlerObject.success(res, messages.successfullyLoggedIn, responseData);

  } catch (error) {
    return responseHandlerObject.serverError(res, error);
  }
}