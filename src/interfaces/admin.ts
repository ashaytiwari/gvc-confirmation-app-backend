import mongoose from "mongoose";

import { ITokenDataModel } from "./authentication";

export interface IUpdateConfirmationFormParamsModel {
  _id: mongoose.Types.ObjectId | number,
  title: string,
  date: Date,
  tokenData?: ITokenDataModel
}