import { Express } from "express";
import swaggerJsdoc from 'swagger-jsdoc';
import swaggerUI from 'swagger-ui-express';

import { swaggerOptionsConfig } from "../config/swagger.config";

import { createLogger } from "./logger";

const logger = createLogger();

export function swaggerDocs(app: Express, port: string) {

  let url = `http://localhost:${port}`;

  if (process.env.NODE_ENV === 'production') {
    url = process.env.DOMAIN_URL!;
  }

  const swaggerOptions = swaggerOptionsConfig(port, url);

  const swaggerSpec = swaggerJsdoc(swaggerOptions);

  // Swagger page
  app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerSpec));

  logger.info(`Docs available at ${url}/api-docs`);
}