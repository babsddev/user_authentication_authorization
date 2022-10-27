import createError, { HttpError } from "http-errors";
import express, { Request, Response, NextFunction } from "express";
import path from "path";
import morgan from "morgan";
import myDatabase from "./dataBase/database";
// import db from './config/database.config'

import indexRouter from "./routes/index";
import usersRouter from "./routes/users";
myDatabase
  .authenticate()
  .then(() => {
    console.log("Connection has been established successfully.");
  })
  .catch((error) => {
    console.error("Unable to connect to the database: ", error);
  });

const app = express();

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(express.json());
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/welcome", (req: Request, res: Response, next: NextFunction) => {
  res.send("You are welcome to placeEvent");
});

app.get("/test", (res: Request, req: Response) => {
  // const sql =  SELECT * FROM
});

app.post("/create", (req: Request, res: Response, next: NextFunction) => {
  const { name, email, password } = req.body;

  res.status(201).json({
    message: "you have successfully given us the following details",
    name,
    email,
    password,
  });
});
app.use("/", indexRouter);
app.use("/users", usersRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (
  err: HttpError,
  req: Request,
  res: Response,
  next: NextFunction
) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
});

export default app;

/*
  
*/
