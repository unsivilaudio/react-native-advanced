// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import admin, {ServiceAccount} from "firebase-admin";
import serviceAccount from "../service_account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
  databaseURL: "https://one-time-pwd-3fa50-default-rtdb.firebaseio.com/",
});

export * from "./create-user";
export * from "./request_otp";
export * from "./verify_otp";
