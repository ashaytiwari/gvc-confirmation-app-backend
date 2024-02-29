import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { headerConfig } from './src/config/header.config';

import router from './src/routes';

import { createLogger, handleLogs } from './src/utilities/logger';
import connectDB from './src/utilities/db.connection';
import { swaggerDocs } from './src/utilities/swaggerDocs';
import { routeNotFoundController } from './src/utilities/routeNotFoundHandler';

dotenv.config({ path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`) });

const app = express();

const API_PREFIX = '/api';

const logger = createLogger();
const port = process.env.PORT;

// connect to database
connectDB();

app.use(cors());

app.use(handleLogs);

app.use(headerConfig);

app.listen(port, async () => {
  logger.info(`Server is running on port: ${port}`);

  swaggerDocs(app, port!);

  app.use(API_PREFIX, router);
  app.use(routeNotFoundController);

});