import crypto from "crypto";
import { URL } from "url";
import axios from "axios";
export const startFaydaAuth = (req, res, next) => {
  try {
    const state = crypto.randomBytes(16).toString("hex");

    const url = new URL(
      `${process.env.G2G_AUTH_URL}/api/auth/authorize`
    );

    url.searchParams.set(
      "client_id",
      process.env.G2G_CLIENT_ID
    );

    url.searchParams.set(
      "redirect_uri",
      process.env.G2G_REDIRECT_URI
    );

    url.searchParams.set("state", state);

    res.redirect(url.toString());
  } catch (error) {
    next(error);
  }
};

export const faydaCallback = async (req, res, next) => {
  try {
    const { code } = req.query;

    if (!code) {
      return res.status(400).json({
        error: "Authorization code is missing",
      });
    }

    console.log("Received authorization code");
    console.log("Authorization code:", code);

    const response = await axios.post(
      "https://auth.g2gitsolutions.com/api/auth/token",
      {
        code,
        client_id: process.env.G2G_CLIENT_ID,
        client_secret: process.env.G2G_CLIENT_SECRET,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const { access_token } = response.data;

    console.log("Received access token");

    // Next step: verify JWT and get user information

    return res.json({
      message: "Fayda authentication successful",
      access_token,
    });
  } catch (error) {
    console.error(
      "Fayda callback error:",
      error.response?.data || error.message
    );

    next(error);
  }
};