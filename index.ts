import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

import { createLogger } from './src/utilities/logger';

dotenv.config({ path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`) });

const app = express();

const API_PREFIX = '/api';

const logger = createLogger();
const port = process.env.PORT;

app.use(cors());

app.listen(port, async () => {
  logger.info(`Server is running on port: ${port}`);
});