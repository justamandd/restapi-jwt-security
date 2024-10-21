// src/index.ts
import dotenv from "dotenv";
dotenv.config();
import express, { Express, Request, Response } from "express";
import { routes } from "@http/routes";


const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(routes);

app.get("/", (req: Request, res: Response) => {
  res.send("Express + TypeScript Server");
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});