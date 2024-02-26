import { Request, Response, NextFunction } from "express";
import winston from "winston";

const { combine, timestamp, printf, colorize, align, errors } = winston.format;

export function createLogger() {

  const logger = winston.createLogger({
    level: process.env.LOG_LEVEL || 'info',
    format: combine(
      colorize({ all: true }),
      errors({ stack: true }),
      timestamp({
        format: 'YYYY-MM-DD hh:mm:ss.SSS A',
      }),
      align(),
      printf((info) => `[${info.timestamp}] ${info.level}:${info.message}`),
    ),
    transports: [new winston.transports.Console()],
  });

  return logger;

}

export function handleLogs(req: Request, res: Response, next: NextFunction) {

  const logger = createLogger();

  logger.info(`METHOD: [${req.method}]- URL: [${req.url}] -IP : [${req.socket.remoteAddress}]`);

  res.on('finish', () => {
    logger.info(
      `METHOD: [${req.method}]-URL:[${req.url}] -IP: 
        [${req.socket.remoteAddress}], STATUS - [${res.statusCode}]`
    );
  });

  next();

}