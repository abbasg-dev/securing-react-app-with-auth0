import express, { type Request, type Response } from 'express';
import { auth } from 'express-oauth2-jwt-bearer';
import 'dotenv/config';

const PORT = Number(process.env.API_PORT) || 3000;
const AUTH0_DOMAIN = process.env.VITE_AUTH0_DOMAIN;
const AUTH0_AUDIENCE = process.env.VITE_AUTH0_AUDIENCE;

const app = express();

app.use(express.json());

const checkJwt = auth({
  audience: AUTH0_AUDIENCE,
  issuerBaseURL: `https://${AUTH0_DOMAIN}`,
  tokenSigningAlg: 'RS256',
});

const apiRouter = express.Router();

apiRouter.get('/public', (_req: Request, res: Response) => {
  res.json({
    message: 'Hello from a public API!',
  });
});

apiRouter.get('/private', checkJwt, (_req: Request, res: Response) => {
  res.json({
    message: 'Hello from a private API!',
  });
});

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
