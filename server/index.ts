import express, { Express } from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import helmet from "helmet";
import createError from "http-errors";
import router from "./router/router";
import { errorMiddleware } from "./middlewares/errors";
import passport from "passport";
import cookieSession from "cookie-session";
import "./utils/passport";

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

app.use(
  cookieSession({
    name: "session",
    keys: ["vote"],
    maxAge: 24 * 60 * 60 * 1000,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use(cookieParser());
app.use(
  cors({
    // origin: "http://localhost:3000",
    origin: "http://localhost:5173",
    methods: "GET,POST,PUT,DELETE",
    credentials: true,
  })
);
app.use(helmet());

app.use("/", router);

// catch 404 and forward to errorMiddleware
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
