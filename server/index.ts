import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import createError from "http-errors";
import router from "./router/router";
import { errorMiddleware } from "./middlewares/errors";

// handle uncaught exceptions
process.on("uncaughtException", (err: any) => {
  console.log(err.name, err.message);
  console.log("☄️ UNCAUGHT EXCEPTION ☄️ - SHUTTING DOWN");
  process.exit(1);
});

const app: Express = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(cors());
app.use(helmet());

app.use("/", router);

// catch 404 and forward to error handler
app.use((req, res, next) => {
  next(createError(404));
});

app.use(errorMiddleware);

const server = app.listen(port, () => {
  console.log(`[server]: App listening on port ${port}! 🚀`);
});

// handle promise rejections - v tomto případě logujeme a končíme
process.on("unhandledRejection", (err: any) => {
  console.log(err.name, err.message);
  console.log("☄️ UNHANDLED REJECTION ☄️ - SHUTTING DOWN");
  // první necháme server ať dokončí requesty, které má rozdělané, pak zavíráme server i aplikaci
  server.close(() => {
    process.exit(1);
  });
  // TODO: na prod přidat automatický restart po crashi
});
