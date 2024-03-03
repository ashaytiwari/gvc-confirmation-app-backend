import mongoose from "mongoose";

export interface IUpdateUserConfirmationParamsModel {
  confirmationFormId: mongoose.Types.ObjectId,
  _id: mongoose.Types.ObjectId | number,
  fullName: string,
  personCount: number,
  remark: string
}

export interface IUserConfirmationsModel {
  _id?: mongoose.Types.ObjectId,
  fullName: string,
  personCount: number,
  remark: string,
  addedBy?: string
}