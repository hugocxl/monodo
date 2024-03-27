import { app } from "../src";
import * as functions from "firebase-functions";

const runTime: functions.RuntimeOptions = {
	// timeoutSeconds: firebaseSDK.getFunctionTimeoutSeconds(),
	// memory: firebaseSDK.getFunctionMemory()
};

export const api = functions
	.runWith(runTime)
	.region("europe-west1")
	.https.onRequest(app);
