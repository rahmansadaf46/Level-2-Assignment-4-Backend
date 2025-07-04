import express, { Application, Request, Response } from "express";
import { booksRoutes } from "./app/controllers/books.controller";
import { borrowsRoutes } from "./app/controllers/borrows.controller";
import cors from "cors"
const app: Application = express();
app.use(express.json());
app.use(cors({origin: "http://localhost:5173"}))

app.use("/api/books", booksRoutes);
app.use("/api/borrow", borrowsRoutes);

app.get("/", (_: Request, res: Response) => {
  res.send("Welcome to the Library Management App");
});

export default app;