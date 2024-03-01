import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { User } from "../models/user.model";

import messages from "../constants/messages";
import { IAddUpdateUserParamsModel } from "../interfaces/authentication";

import { responseHandlerObject } from "../utilities/responseHandler";
import { handleValidation, hashData } from "../utilities";

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