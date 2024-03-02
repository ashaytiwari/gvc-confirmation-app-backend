import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { ConfirmationForm } from "../models/confirmationForm.model";

import messages from "../constants/messages";

import { IUpdateConfirmationFormParamsModel } from "../interfaces/admin";

import { responseHandlerObject } from "../utilities/responseHandler";
import { handleValidation } from "../utilities";

export async function updateConfirmationFormController(req: Request, res: Response) {
  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const body: IUpdateConfirmationFormParamsModel = req.body;

    if (+body._id === 0) {
      await addConfirmationForm(body);
    } else {
      const edited = await editConfirmationForm(body);

      if (edited === false) {
        return responseHandlerObject.forbidden(res, messages.confirmationFormDoesNotExist);
      }
    }

    return responseHandlerObject.success(res, messages.dataSavedSuccessfully, null);

  } catch (error) {
    return responseHandlerObject.serverError(res, error);
  }
}

async function addConfirmationForm(body: IUpdateConfirmationFormParamsModel) {
  return new Promise(async (resolve, reject) => {
    try {

      const confirmationForm = new ConfirmationForm({
        title: body.title,
        date: body.date
      });

      await confirmationForm.save();
      resolve(true);

    } catch (error) {
      reject(error);
    }
  });
}

async function editConfirmationForm(body: IUpdateConfirmationFormParamsModel) {
  return new Promise(async (resolve, reject) => {
    try {

      const confirmationForm = await ConfirmationForm.findOne({ _id: body._id });

      if (!confirmationForm) {
        resolve(null);
        return;
      }

      confirmationForm.title = body.title;
      confirmationForm.date = body.date;
      confirmationForm.save();

      resolve(true);

    } catch (error) {
      reject(error);
    }
  });
}