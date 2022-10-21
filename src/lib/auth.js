import { jwtVerify } from "jose";

const secret = process.env.NEXTAUTH_SECRET;

export async function verifyAuth(req) {
  const token = req.cookies.get("next-auth.session-token");
  try {
    const verified = await jwtVerify(token, new TextEncoder().encode(secret));
    return verified.payload;
  } catch (err) {
    console.log("Your token has expired.");
  }
}
