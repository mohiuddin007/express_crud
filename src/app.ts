import express, { Application, Request, Response } from 'express';
import cors from 'cors';
import { UserRoutes } from './modules/user/user.route';

const app: Application = express();

app.use(express.json());
app.use(cors());

// routes
app.use('/api/users', UserRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("express crud app");
});

export default app;


