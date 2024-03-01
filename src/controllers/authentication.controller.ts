import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from 'bcryptjs';

import { User } from "../models/user.model";

import messages from "../constants/messages";
import { IAddUpdateUserParamsModel, IAdminLoginParamsModel, IChangePasswordParamsModel } from "../interfaces/authentication";

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

export async function changePasswordController(req: Request, res: Response) {

  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const body: IChangePasswordParamsModel = req.body;
    const userId = body.tokenData?._id;

    const user = await User.findOne({ _id: userId });

    if (!user) {
      return responseHandlerObject.forbidden(res, messages.userNotFound);
    }

    const passwordValidated = await bcrypt.compare(body.oldPassword, user.password);

    if (!passwordValidated) {
      return responseHandlerObject.forbidden(res, messages.invalidPassword, null);
    }

    const hashedPassword = await hashData(body.newPassword);

    user.password = hashedPassword;
    user.save();

    return responseHandlerObject.success(res, messages.passwordChangedSuccessfully, null);

  } catch (error: any) {
    return responseHandlerObject.serverError(res, error);
  }
}

export async function logoutController(req: Request, res: Response) {
  try {

    const body = req.body;

    const user = await User.findOne({ _id: body.tokenData._id });

    if (!user) {
      return responseHandlerObject.forbidden(res, messages.unableToLogout);
    }

    user.tokenData = undefined;
    await user.save();

    return responseHandlerObject.success(res, messages.logoutSuccessfully, null);

  } catch (error: any) {
    return responseHandlerObject.serverError(res, error);
  }
}