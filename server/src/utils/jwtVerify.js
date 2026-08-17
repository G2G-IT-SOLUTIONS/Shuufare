import jose from 'node-jose';
import jwt from 'jsonwebtoken';
import axios from 'axios';

const JWKS_URL = 'https://auth.g2gitsolutions.com/.well-known/jwks.json';
const EXPECTED_ISSUER = 'auth.g2gitsolutions.com';
const EXPECTED_AUDIENCE = 'app1';

let keystore = null;
let lastFetch = 0;
const CACHE_DURATION = 50 * 60 * 1000; // 50 minutes

async function getKeystore() {
  const now = Date.now();
  
  if (keystore && (now - lastFetch) < CACHE_DURATION) {
    return keystore;
  }

  try {
    const response = await axios.get(JWKS_URL);
    const keys = response.data.keys;
    
    // Create keystore using the correct node-jose API
    keystore = jose.JWK.createKeyStore();
    
    for (const key of keys) {
      await keystore.add(key);
    }
    
    lastFetch = now;
    return keystore;
  } catch (error) {
    console.error('Error fetching JWKS:', error.message);
    throw new Error('Failed to fetch JWKS');
  }
}

export async function verifyJWT(token) {
  try {
    // Decode the JWT header to get the kid
    const decoded = jwt.decode(token, { complete: true });
    
    if (!decoded || !decoded.header) {
      throw new Error('Invalid token format');
    }

    const { kid, alg } = decoded.header;
    
    if (alg !== 'RS256') {
      throw new Error(`Unsupported algorithm: ${alg}`);
    }

    // Get the keystore
    const ks = await getKeystore();
    
    // Find the matching key
    const key = ks.get(kid);
    
    if (!key) {
      throw new Error(`Key with kid ${kid} not found in JWKS`);
    }

    // Verify the signature using node-jose
    const verifier = jose.JWS.createVerify(ks);
    const result = await verifier.verify(token);
    
    if (!result) {
      throw new Error('Invalid signature');
    }

    // Extract and validate the payload
    const payload = JSON.parse(result.payload);
    
    // Validate issuer
    if (payload.iss !== EXPECTED_ISSUER) {
      throw new Error(`Invalid issuer: ${payload.iss}`);
    }

    // Validate audience
    if (payload.aud !== EXPECTED_AUDIENCE) {
      throw new Error(`Invalid audience: ${payload.aud}`);
    }

    // Validate expiration
    const now = Math.floor(Date.now() / 1000);
    if (payload.exp && payload.exp < now) {
      throw new Error('Token has expired');
    }

    // Validate issued at (optional, prevents tokens issued in the future)
    if (payload.iat && payload.iat > now + 60) {
      throw new Error('Token issued in the future');
    }

    return payload;
  } catch (error) {
    console.error('JWT verification error:', error.message);
    throw error;
  }
}
