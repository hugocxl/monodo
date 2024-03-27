// Dependencies
import { config } from "@/config";
import { logger } from "@/shared/utils";
import compression from "compression";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import mongoStore from "connect-mongo";
import morgan from "morgan";
import session from "express-session";
import { router } from "./api";

// Types
import type { Application } from "express";
import { startDb } from "../database";

const app: Application = express();
const authSessionMiddleware = session({
	store: mongoStore.create({
		mongoUrl: config.mongoose.url,
		dbName: config.mongoose.dbName,
	}),
	secret: "auth",
	resave: false,
	saveUninitialized: true,
	...(config.env === "production" && {
		proxy: true, // Required for Heroku & Digital Ocean (regarding X-Forwarded-For)
		name: "MonodoCookie", // This needs to be unique per-host.
		cookie: {
			secure: true, // required for cookies to work on HTTPS
			httpOnly: true,
			sameSite: "none",
		},
	}),
});
const corsMiddleware = cors({
	credentials: true,
	origin: true,
});

app.use(morgan("combined"));
app.use(helmet());
app.use(corsMiddleware);
app.use(authSessionMiddleware);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(compression());

// Routes
app.use("/", router);

export function startApp() {
	startDb();
	logger.info("App", "Starting server...");

	app.listen(config.port, () => {
		logger.info("App", `Listening to port ${config.port} ✅`);
	});
}

export { app };
