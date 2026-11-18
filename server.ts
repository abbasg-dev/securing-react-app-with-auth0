import express, {
  type Request,
  type Response,
  type NextFunction,
} from 'express';
import { auth, requiredScopes } from 'express-oauth2-jwt-bearer';
import 'dotenv/config';

const PORT = Number(process.env.API_PORT) || 3000;
const AUTH0_DOMAIN = process.env.AUTH0_DOMAIN;
const AUTH0_AUDIENCE = process.env.AUTH0_AUDIENCE;

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

apiRouter.get(
  '/course',
  checkJwt,
  requiredScopes('read:courses'),
  (_req: Request, res: Response): void => {
    res.json({
      courses: [
        { id: 1, title: 'Securing React Apps with Auth0' },
        { id: 2, title: 'React Security: Best Practices' },
      ],
    });
  },
);

function checkRole(role: string) {
  return (req: Request, res: Response, next: NextFunction): void => {
    const assignedRoles = req.auth?.payload['http://localhost:3000/roles'];

    if (Array.isArray(assignedRoles) && assignedRoles.includes(role)) {
      next();
      return;
    }

    res.status(403).json({
      message: 'Insufficient role',
    });
  };
}

apiRouter.get(
  '/admin',
  checkJwt,
  checkRole('admin'),
  (_req: Request, res: Response): void => {
    res.json({
      message: 'Hello from an admin API!',
    });
  },
);

app.use('/api', apiRouter);

app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
});
