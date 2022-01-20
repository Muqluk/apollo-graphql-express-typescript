import express from 'express';
import setConfig from './setConfig';
import setMiddleware from './setMiddleware';
import setLogging from './setLogging';

function createApp(config = {}) {
  const app = express();
  setConfig(app, config);
  setMiddleware(app);
  setLogging(app.get('log'));
  return app;
}

export default createApp();
