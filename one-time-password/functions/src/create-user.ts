import {onRequest} from "firebase-functions/v2/https";
import admin from "firebase-admin";

export const createUser = onRequest(async (req, res) => {
  // Verify the user provided a phone
  if (!req.body.phone) {
    res.status(422).send({error: "Bad Input"});
    return;
  }

  // Format the phone number to remove dashes and parens
  const phone = String(req.body.phone).replace(/[^\d]/g, "");

  try {
    // Create a new user account using that phone number
    await admin
      .auth()
      .createUser({uid: phone})
      // Response to the user request, saying the account was made
      .then((user) => res.status(201).json(user));
  } catch (error) {
    res.status(500).json({error: "Oops! Something went wrong"});
  }
});
