import {onRequest} from "firebase-functions/v2/https";
import {logger} from "firebase-functions";
import admin from "firebase-admin";

/** SENDGRID -- EMAIL OTP */
import nodemailer from "nodemailer";
import sendgridTransport from "nodemailer-sendgrid";
import config from "../sendgrid.json";
/** ===================== */

import AppError from "./models/app-error";
import {generateOTPCode} from "./util/code";

/** CREATE THE TRANSPORTER */
const transporter = nodemailer.createTransport(
  sendgridTransport({
    apiKey: config.sendgrid_api_key,
  })
);

export const requestOTP = onRequest(async (req, res) => {
  try {
    if (!req.body.phone) {
      throw new AppError("You must provide a phone number.", 422);
    }

    const phone = String(req.body.phone).replace(/[^\d]/g, "");
    const userRecord = await admin.auth().getUser(phone);
    if (!userRecord) {
      throw new AppError("No user found!", 404);
    }

    const code = generateOTPCode();
    /** MUST MATCH VERIFIED SENDER
     *  ============================
     *  see "Sender Authentication" in
     *  Sendgrid dashboard
     */
    await transporter.sendMail({
      to: userRecord.email,
      from: config.sendgrid_sender,
      subject: "OTP App",
      html: `
            <html>
                <head>
                    <title>Welcome back!</title>
                </head>
                <body>
                    <h1>Your one-time-use code</h1>
                    <code>${code}</code>
                </body>
            </html>
            `,
    });

    await admin
      .database()
      .ref("users/" + phone)
      .update({code, codeValid: true});

    res.status(201).json({message: "Check your email!"});
  } catch (err: unknown) {
    logger.error((err as Error).message);
    if (err instanceof AppError) {
      res.status(err.code).json({message: err.message});
      return;
    }
    res.status(500).json({message: "Oops! Something went wrong."});
  }
});
