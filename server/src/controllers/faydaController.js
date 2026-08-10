import crypto from "crypto";
import { URL } from "url";
import axios from "axios";
import { verifyJWT } from "../utils/jwtVerify.js";
import { findOrCreateUser } from "../utils/userService.js";

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

    // Exchange authorization code for access token
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

    console.log("Received access token, verifying JWT...");

    // Verify the JWT signature and claims
    const payload = await verifyJWT(access_token);

    console.log("JWT verified successfully");
    console.log("User subject (fayda_id):", payload.sub);

    // Find or create user in PostgreSQL
    const user = await findOrCreateUser(payload.sub, {
      email: payload.email || null,
      name: payload.name || null
    });

    console.log("User found/created:", user.id);

    // Set up session
    req.session.userId = user.id;
    req.session.faydaId = user.fayda_id;

    // Redirect to React frontend
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback?success=true`);
  } catch (error) {
    console.error(
      "Fayda callback error:",
      error.response?.data || error.message
    );

    // Redirect to frontend with error
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:3000';
    res.redirect(`${frontendUrl}/auth/callback?success=false&error=${encodeURIComponent(error.message)}`);
  }
};