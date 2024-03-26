import { Request, Response } from "express";
import { validationResult } from "express-validator";

import { ConfirmationForm } from "../models/confirmationForm.model";

import messages from "../constants/messages";
import userRoles from "../constants/userRoles";

import { IUpdateUserConfirmationParamsModel, IUserConfirmationsModel } from "../interfaces/user";

import { responseHandlerObject } from "../utilities/responseHandler";
import { convertStringifiedIdIntoObjectId, handleValidation, isPastDate } from "../utilities";

export async function updateUserConfirmationController(req: Request, res: Response) {
  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const body: IUpdateUserConfirmationParamsModel = req.body;

    const confirmationForm = await ConfirmationForm.findOne({ _id: body.confirmationFormId });

    if (!confirmationForm) {
      return responseHandlerObject.forbidden(res, messages.confirmationFormDoesNotExist);
    }

    if (isPastDate(confirmationForm.date) === true) {
      return responseHandlerObject.forbidden(res, messages.confirmationFormNotAcceptingSubmissions);
    }

    if (+body._id === 0) {
      await addUserConfirmation(body, confirmationForm);
    } else {

      const confirmationUpdated = await editUserConfirmation(body, confirmationForm);

      if (confirmationUpdated === false) {
        return responseHandlerObject.forbidden(res, messages.confirmationUpdateFailed);
      }
    }

    return responseHandlerObject.success(res, messages.confirmationSubmittedSuccessfully, null);

  } catch (error) {
    return responseHandlerObject.serverError(res, error);
  }
}

async function addUserConfirmation(body: IUpdateUserConfirmationParamsModel, confirmationForm: any) {
  return new Promise(async (resolve, reject) => {
    try {

      const confirmations: Array<IUserConfirmationsModel> = confirmationForm.confirmations;
      const confirmation = {
        fullName: body.fullName,
        personCount: body.personCount,
        remark: body.remark,
        addedBy: userRoles.USER
      };

      confirmations.push(confirmation);
      await confirmationForm.save();

      resolve(true);

    } catch (error) {
      reject(error);
    }
  });
}

async function editUserConfirmation(body: IUpdateUserConfirmationParamsModel, confirmationForm: any) {
  return new Promise(async (resolve, reject) => {
    try {

      const confirmations = confirmationForm.confirmations;
      const confirmationId = convertStringifiedIdIntoObjectId(body._id);

      const selectedIndex = confirmations.findIndex((confirmationItem: any) => confirmationItem._id.equals(confirmationId));

      if (selectedIndex === -1) {
        resolve(false);
      }

      confirmations[selectedIndex] = {
        fullName: body.fullName,
        personCount: body.personCount,
        remark: body.remark,
        addedBy: userRoles.USER
      };

      await confirmationForm.save();
      resolve(true);

    } catch (error) {
      reject(error);
    }
  });
}

export async function getUserConfirmationsController(req: Request, res: Response) {
  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const formId = req.query.formId;

    const confirmationForm = await ConfirmationForm.findOne({ _id: formId });

    if (!confirmationForm) {
      return responseHandlerObject.forbidden(res, messages.confirmationFormDoesNotExist);
    }

    return responseHandlerObject.success(res, messages.success, confirmationForm);

  } catch (error) {
    return responseHandlerObject.serverError(res, error);
  }
}

export async function getConfirmationFormDetailsController(req: Request, res: Response) {
  try {

    const _validationResult = validationResult(req);

    if (_validationResult.isEmpty() === false) {
      return handleValidation(res, _validationResult);
    }

    const formId = req.query.formId;

    const confirmationForm = await ConfirmationForm.findOne({ _id: formId }, { confirmations: 0 });

    if (!confirmationForm) {
      return responseHandlerObject.forbidden(res, messages.confirmationFormDoesNotExist);
    }

    return responseHandlerObject.success(res, messages.success, confirmationForm);

  } catch (error) {
    return responseHandlerObject.serverError(res, error);
  }
}