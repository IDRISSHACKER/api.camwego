import * as dotenv from 'dotenv';
import * as process from 'process';
dotenv.config();

const env = {
  APP_NAME: process.env.APP_NAME,
  PROD: parseInt(process.env.PROD),
  PORT: process.env.PORT,
  DB: process.env.DB,
  DB_TEST: process.env.DB_TEST,
  STORAGE_DIR: process.env.STORAGE_DIR,
  KEY: process.env.KEY,
  DRIVER_PATH: process.env.DRIVER_PATH,
};

export default env;
