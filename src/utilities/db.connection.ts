import mongoose from "mongoose";

import { createLogger } from "./logger";

function handleTermination(): boolean {
  const logger = createLogger();

  logger.info('Mongoose default connection is disconnected due to application termination');
  process.exit(0);

}

export default function connectDB() {

  const logger = createLogger();

  const connectionString = process.env.MONGODB_CONNECTION_STRING;

  mongoose.connect(connectionString!)
    .then(() => {
      logger.info('Successfully connected to the database');
    })
    .catch((err) => {
      logger.error('Could not connect to a database', err.stack);
    });

  mongoose.connection.on('connected', function () {
    logger.info(`Mongoose default connection is open to ${connectionString}`);
  });

  mongoose.connection.on('error', function (err) {
    logger.info('Mongoose default connection has occurred ' + err + ' error');
  });

  mongoose.connection.on('disconnected', function () {
    logger.info('Mongoose default connection is disconnected');
  });

  process.on('SIGINT', function () {
    mongoose.connection.close(handleTermination());
  });

}