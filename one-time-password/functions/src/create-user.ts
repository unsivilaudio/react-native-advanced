import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
import admin from "firebase-admin";

import {isEmail} from "./util/validation";
import AppError from "./models/app-error";

export const createUser = onRequest(async (req, res) => {
  try {
    // Verify the user provided a phone
    if (!req.body.phone || !req.body.email) {
      throw new AppError("Bad input!", 422);
    }

    if (!isEmail(req.body.email)) {
      throw new AppError("Malformed E-mail", 422);
    }

    // Format the phone number to remove dashes and parens
    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    // Normalize the email
    const email = req.body.email.trim().toLowerCase();

    // Create a new user account using that phone number
    const user = await admin.auth().createUser({uid: phone, email});
    // Response to the user request, saying the account was made
    res.status(201).json(user);
  } catch (err: unknown) {
    logger.error((err as Error).message);
    if (err instanceof AppError) {
      res.status(err.code).json({message: err.message});
      return;
    }
    res.status(500).json({message: "Oops! Something went wrong."});
  }
});
