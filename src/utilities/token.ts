import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'path';
import { NextFunction, Request, Response } from 'express';

import { User } from '../models/user.model';

import messages from '../constants/messages';

import { ITokenDataModel } from '../interfaces/authentication';

import { createLogger } from './logger';
import { responseHandlerObject } from './responseHandler';

dotenv.config({ path: path.join(__dirname, `../../.env.${process.env.NODE_ENV}`) });

const tokenSecretKey = process.env.JWT_TOKEN_SECRET_KEY;
const tokenExpiresAt = process.env.JWT_TOKEN_EXPIRES_AT;

const logger = createLogger();

export async function createToken(tokenData: ITokenDataModel, expiresAt?: string | number) {
  try {
    const _expiresAt = expiresAt ? expiresAt : tokenExpiresAt!;

    const token = await jwt.sign(tokenData, tokenSecretKey!, { expiresIn: _expiresAt });

    return {
      tokenId: token,
      expiresAt: String(_expiresAt)
    };

  } catch (error: any) {
    throw new Error(error);
  }
}

export async function verifyToken(req: Request, res: Response, next: NextFunction) {

  const authHeader = req.headers['authorization'];

  if (typeof authHeader === 'undefined') {
    return responseHandlerObject.unauthorized(res, messages.tokenIsNotAvailable);
  }

  const token = authHeader.split(' ')[1];
  const decodedToken: any = await decodeJWTToken(token);

  if (decodedToken === null) {
    return responseHandlerObject.unauthorized(res, messages.invalidToken);
  }

  const tokenExists = await checkTokenInUserCollection(decodedToken);

  if (tokenExists === false) {
    return responseHandlerObject.unauthorized(res, messages.invalidToken);
  }

  req.body.tokenData = decodedToken;

  next();
}

export async function decodeJWTToken(token: string) {

  const decodedToken = await jwt.verify(token, tokenSecretKey!, async (error: any, data: any) => {

    if (error) {
      logger.error(error);
      return null;
    }

    return {
      ...data,
      token
    };

  });

  return decodedToken;
}

export async function checkTokenInUserCollection(decodedToken: ITokenDataModel) {

  return new Promise(async (resolve, reject) => {
    try {

      const { _id, token } = decodedToken;

      const user = await User.findOne({ _id, 'tokenData.tokenId': token });

      if (!user) {
        resolve(false);
        return;
      }

      resolve(true);
    } catch (error) {
      reject(error);
    }
  });

}