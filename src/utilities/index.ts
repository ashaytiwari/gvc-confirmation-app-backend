import { Response } from "express";
import bcrypt from "bcryptjs";

import { responseHandlerObject } from "./responseHandler";
import statusMessages from "../constants/statusMessages";

export function handleValidation(res: Response, _validationResult: any) {

  const errorsData = [];

  for (let error of _validationResult.array()) {
    errorsData.push(error);
  }

  return responseHandlerObject.validationError(res, statusMessages.VALIDATION_ERROR, errorsData);

}

export async function hashData(data: any) {

  const salt = await bcrypt.genSalt(10);
  const hashedData = await bcrypt.hash(data, salt);

  return hashedData;

}