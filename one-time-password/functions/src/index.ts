// import {onRequest} from "firebase-functions/v2/https";
// import * as logger from "firebase-functions/logger";
import admin, {ServiceAccount} from "firebase-admin";
import serviceAccount from "../service_account.json";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount as ServiceAccount),
});

export * from "./create-user";
