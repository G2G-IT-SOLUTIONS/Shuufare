import crypto from "crypto";
import { URL } from "url";
import axios from "axios";
import fs from "fs/promises";
import path from "path";
import { fileURLToPath } from "url";
import { verifyJWT } from "../utils/jwtVerify.js";
import { findOrCreateUser } from "../utils/userService.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const UPLOADS_DIR = path.join(__dirname, "../../uploads");

async function ensureUploadsDir() {
  try {
    await fs.access(UPLOADS_DIR);
  } catch {
    await fs.mkdir(UPLOADS_DIR, { recursive: true });
  }
}

function getExtensionFromMime(mime) {
  const map = {
    "image/jpeg": "jpg",
    "image/jpg": "jpg",
    "image/png": "png",
    "image/gif": "gif",
    "image/webp": "webp",
  };
  return map[mime] || "jpg";
}

async function downloadAndSavePhoto(faydaId, photoUrl) {
  if (!photoUrl) return null;

  await ensureUploadsDir();

  let buffer;
  let ext;

  if (photoUrl.startsWith("data:image/")) {
    const matches = photoUrl.match(/^data:image\/([a-zA-Z0-9.+]+);base64,(.+)$/);
    if (!matches) return null;
    ext = getExtensionFromMime(`image/${matches[1]}`);
    buffer = Buffer.from(matches[2], "base64");
  } else if (
    photoUrl.startsWith("http://") ||
    photoUrl.startsWith("https://")
  ) {
    const response = await axios.get(photoUrl, { responseType: "arraybuffer" });
    const contentType = response.headers["content-type"] || "image/jpeg";
    ext = getExtensionFromMime(contentType.split(";")[0]);
    buffer = Buffer.from(response.data);
  } else {
    return null;
  }

  const filename = `fayda-${faydaId}.${ext}`;
  const filePath = path.join(UPLOADS_DIR, filename);
  await fs.writeFile(filePath, buffer);

  return `/uploads/${filename}`;
}

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

    //console.log("Received authorization code");

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

   // console.log("Received access token, verifying JWT...");

    // Verify the JWT signature and claims
    const payload = await verifyJWT(access_token);

    // console.log("JWT verified successfully");
    //console.log("User subject (fayda_id):", payload.sub);
   // console.log("========== FAYDA JWT PAYLOAD ==========");
    //console.log(JSON.stringify(payload, null, 2));
    //console.log("=======================================");

    const rawPhotoUrl =
      payload.picture ||
      payload.picture_url ||
      payload.photo ||
      null;

    const localPhotoPath = await downloadAndSavePhoto(payload.sub, rawPhotoUrl);

    // Find or create user in PostgreSQL
    const user = await findOrCreateUser(payload.sub, {
      email: payload.email || null,
      name: payload.name || null,

      phone_number:
        payload.phone_number ||
        payload.phone ||
        payload.phone_no ||
        null,

      gender: payload.gender || null,
      nationality: payload.nationality || null,
      birthdate: payload.birthdate || payload.date_of_birth || null,

      address:
        payload.address ||
        payload.address_json ||
        null,

      photo_url: localPhotoPath,
    });
   // console.log("User found/created:", user.id);

    // Set up session
    req.session.userId = user.id;
    req.session.faydaId = user.fayda_id;

    // Redirect to React frontend
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?success=true`);
  } catch (error) {
    console.error(
      "Fayda callback error:",
      
      error.response?.data || error.message
    );

    // Redirect to frontend with error
    const frontendUrl = process.env.CLIENT_URL || 'http://localhost:5173';
    res.redirect(`${frontendUrl}/auth/callback?success=false&error=${encodeURIComponent(error.message)}`);
  }
};
