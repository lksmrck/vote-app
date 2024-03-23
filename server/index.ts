import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

const app: Express = express();
const port = process.env.PORT || 3000;

app.get("/", function (req: Request, res: Response) {
  res.send("Hello World!");
});
app.listen(port, function () {
  console.log(`[server]: App listening on port ${port}!`);
});
