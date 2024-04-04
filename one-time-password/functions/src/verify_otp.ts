import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
import admin from "firebase-admin";

import AppError from "./models/app-error";

export const verifyOTP = onRequest(async (req, res) => {
  if (!req.body.phone || !req.body.code) {
    res.status(422).json({error: "Phone and code must be provided!"});
    return;
  }

  const phone = String(req.body.phone).replace(/[^\d]/g, "");
  const code = req.body.code;

  try {
    const authUser = await admin.auth().getUser(phone);
    if (!authUser) {
      throw new Error("No user found.");
    }
    const ref = admin.database().ref("users/" + phone);
    const snapshot = await ref.get();
    const user = snapshot.val();
    if (!user) {
      const error = new AppError("No user document found.", 400);
      throw error;
    }

    if (user.code !== code || !user.codeValid) {
      const error = new AppError("Code invalid.", 401);
      throw error;
    }

    await ref.update({codeValid: false});
    const token = await admin.auth().createCustomToken(phone);

    res.status(200).json({message: "Welcome back!", token});
  } catch (err: unknown) {
    logger.error((err as Error).message);
    if (err instanceof AppError) {
      res.status(err.code).json({message: err.message});
      return;
    }
    res.status(500).json({message: "Oops! Something went wrong."});
  }
});
