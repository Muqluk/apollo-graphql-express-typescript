import { Application } from 'express';
import dotenv from 'dotenv';
import path from 'path';

const merge = (app: Application, config: object) => {
  Object.keys(config).forEach((key) => app.set(key, config[key]));
  return app;
};

const setConfig = (app: Application, config: object) => {
  const env = path.resolve(process.cwd(), '.env');
  dotenv.config({
    path: env,
  });
  merge(app, process.env);
  merge(app, config);
};

export default setConfig;
