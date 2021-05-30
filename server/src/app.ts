import express, { NextFunction } from "express";
import compression from "compression"; // compresses requests
import session from "express-session";
import bodyParser from "body-parser";
import lusca from "lusca";
import MongoStore from "connect-mongo";
import mongoose from "mongoose";
import passport from "passport";
import morgan from "morgan";
import cors from "cors";
import bluebird from "bluebird";
import { MONGODB_URI, SESSION_SECRET } from "./util/secrets";

import auctionsRouter from "./routes/auctions.route";
import authRouter from "./routes/auth.route";
import usersRouter from "./routes/users.route";
import bidsRouter from "./routes/bids.route";

import logger from "./util/logger";

import cookieParser from "cookie-parser";
import { createUploadDir } from "./config/createUploadDir";
import { CONFIG } from "./config/constants";

logger.info(`NODE_ENV ${process.env.NODE_ENV}`);

// create the upload directory
createUploadDir((err: any) => {
  if (err) {
    console.error(err);
    console.error(`create upload directory err`);
  }
});

// Create Express server
const app = express();

// Connect to MongoDB
const mongoUrl = MONGODB_URI;
mongoose.Promise = bluebird;
mongoose.set("useFindAndModify", false);

mongoose
  .connect(mongoUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    /** ready to use. The `mongoose.connect()` promise resolves to undefined. */
  })
  .catch((err) => {
    console.log(
      `MongoDB connection error. Please make sure MongoDB is running. ${err}`
    );
    // process.exit();
  });

// Express configuration
app.set("port", process.env.PORT || 3000);

app.use(morgan("combined"));
app.use(compression());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: SESSION_SECRET,
    store: new MongoStore({
      mongoUrl,
      mongoOptions: {
        autoReconnect: true,
      },
    }),
  })
);
var whitelist = [CONFIG.backendAddress, CONFIG.frontendAddress];
var corsOptions = {
  origin: function (origin: string, callback: any) {
    callback(null, true);
  },
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));
app.use((req, res, next) => {
  res.set({
    "Access-Control-Allow-Origin": CONFIG.frontendAddress,
    "Access-Control-Allow-Headers":
      "Origin, X-Requested-With, Content-Type, Accept, Authorization, authentication, Set-Cookie",
    "Access-Control-Allow-Methods": "GET, PUT, PATCH, POST, DELETE, OPTIONS",
    "Access-Control-Allow-Credentials": true,
    "Access-Control-Expose-Headers": "*",
  });
  next();
});

app.use(passport.initialize());
app.use(passport.session());
app.use("/static", express.static(__dirname + "/public"));

/**
 * Primary app routes.
 */
app.use("/auctions", auctionsRouter);
app.use("/auth", authRouter);
app.use("/users", usersRouter);
app.use("/bids", bidsRouter);

export default app;
