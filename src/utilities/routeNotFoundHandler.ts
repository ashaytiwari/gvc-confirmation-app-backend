import { Request, Response } from "express";

import messages from "../constants/messages";

export function routeNotFoundController(req: Request, res: Response) {

  res.status(404).json({
    message: messages.apiEndpointNotAvailable
  });

}