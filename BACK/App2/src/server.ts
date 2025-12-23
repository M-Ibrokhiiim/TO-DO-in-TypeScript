import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";

import notesRouter from "./routes/notes.router.js";
import { CentralErrorHandler } from "./middlewares/centralErrorHandler.middleware.js";


dotenv.config();

const PORT = process.env.PORT || 3000;
const app = express();



// Middlewares
app.use(cors());
app.use(express.json());

// ROUTES
app.use("/api", notesRouter);


//Works when client sent request to  incorrect endPoint
app.use((req: Request, res: Response, next: NextFunction) => {
  const error: any = new Error("Route not found");
  error.statusCode = 404;
  next(error);
});

//BONUS 
app.use(CentralErrorHandler);


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
