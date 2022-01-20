import {
  Application,
  Request,
  Response,
  NextFunction,
  // RequestHandler,
} from 'express';
import bodyParser from 'body-parser';
import compression from 'compression';
import cookieParser from 'cookie-parser';
import cors from 'cors';
// import helmet from 'helmet';
//import morgan from 'morgan';
//import responseTime from 'response-time';
import slashes from 'connect-slashes';
import timeout from 'connect-timeout';

const haltOnTimedout = (req: Request, res: Response, next: NextFunction) => {
  req.on('timeout', () => {
    res.status(503).send('Request Timeout Error.');
  });
  next();
};

const setMiddleware = (app: Application) => {
  const appTimeout = app.get('timeout') || '60s';
  app.disable('x-powered-by');
  // app.use(helmet()); // something with Helmet is breaking the server.
  app.use(compression());
  app.use(cors());
  app.use(bodyParser.urlencoded({ extended: true }));
  app.use(bodyParser.json());
  app.use(cookieParser());
  app.use(slashes(false));
  app.use(timeout(appTimeout));
  app.get('/healthcheck', (req, res) => res.send('ok'));
  app.use(haltOnTimedout);
  return app;
};

export default setMiddleware;
