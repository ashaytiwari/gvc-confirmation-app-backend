import * as dotenv from 'dotenv';
import express from 'express';
import cors from 'cors';
import path from 'path';

dotenv.config({ path: path.join(__dirname, `./.env.${process.env.NODE_ENV}`) });

const app = express();

const API_PREFIX = '/api';

const port = process.env.PORT;

app.use(cors());

app.listen(port, async () => {
  console.log(`Server is running on port: ${port}`);
});