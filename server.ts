import express, { type Request, type Response } from 'express';

import 'dotenv/config';

const PORT = Number(process.env.API_PORT) || 3000;
const AUTH0_AUDIENCE = process.env.VITE_AUTH0_AUDIENCE;

const app = express();

// Middleware
app.use(express.json());

// Routes
const apiRouter = express.Router();

apiRouter.get('/public', (_req: Request, res: Response): void => {
  res.status(200).json({
    message: 'Hello from a public API!',
  });
});

// Register API routes
app.use('/api', apiRouter);

// Start server
app.listen(PORT, () => {
  console.log(`API server listening on port ${PORT}`);
  console.log(`Auth0 audience: ${AUTH0_AUDIENCE ?? 'Not configured'}`);
});

export default app;
