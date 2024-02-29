import { Response } from "express";

import statusMessages from "../constants/statusMessages";
import statusCodes from "../constants/statusCodes";

import { createLogger } from "./logger";

class ResponseHandler {

  logger = createLogger();

  constructor() { }

  success(res: Response, message?: string, data?: any) {

    this.logger.info(message || statusMessages.SUCCESS);

    return res.status(statusCodes.SUCCESS).json({
      message: message || statusMessages.SUCCESS,
      status: 'success',
      statusCode: statusCodes.SUCCESS,
      data: data || null
    });

  }

  validationError(res: Response, message?: string, data?: any) {

    this.logger.error(message || statusMessages.VALIDATION_ERROR);

    return res.status(statusCodes.UNPROCESSABLE).json({
      message: message || statusMessages.VALIDATION_ERROR,
      status: 'error',
      statusCode: statusCodes.UNPROCESSABLE,
      data: data || null
    });
  }

  serverError(res: Response, data?: any) {

    this.logger.error(statusMessages.INTERNAL_SERVER_ERROR);
    console.log(data);

    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      message: statusMessages.INTERNAL_SERVER_ERROR,
      status: 'error',
      statusCode: statusCodes.INTERNAL_SERVER_ERROR,
      data: data || null
    });
  }

  unauthorized(res: Response, message?: string, data?: any) {

    this.logger.error(message || statusMessages.UNAUTHORIZED);

    return res.status(statusCodes.UNAUTHORIZED).json({
      message: message || statusMessages.UNAUTHORIZED,
      status: 'error',
      statusCode: statusCodes.UNAUTHORIZED,
      data: data || null
    });
  }

  forbidden(res: Response, message?: string, data?: any) {

    this.logger.error(message || statusMessages.FORBIDDEN);

    return res.status(statusCodes.FORBIDDEN).json({
      message: message || statusMessages.FORBIDDEN,
      status: 'error',
      statusCode: statusCodes.FORBIDDEN,
      data: data || null
    });
  }

}

export const responseHandlerObject = new ResponseHandler();