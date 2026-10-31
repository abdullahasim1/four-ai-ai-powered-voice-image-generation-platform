import bcrypt from "bcryptjs";
import { getDb, ensureSchema } from "@/lib/db";
import { rateLimit, readJson } from "@/lib/http";

/**
 * Step 2 of password reset: set a new password with a valid reset token.
 * The token is single-use and invalidates every active session.
 */
export async function POST(request) {
  try {
    const { token, newPassword } = await readJson(request);
    if (!token || !newPassword) {
      return Response.json(
        { success: false, message: "Reset token and new password are required" },
        { status: 400 }
      );
    }
    if (String(newPassword).length < 6) {
      return Response.json(
        { success: false, message: "New password must be at least 6 characters" },
        { status: 400 }
      );
    }

    if (!rateLimit(`resetpw:${request.headers.get("x-forwarded-for") || "local"}`, 10, 3600_000)) {
      return Response.json(
        { success: false, message: "Too many attempts. Try again later." },
        { status: 429 }
      );
    }

    await ensureSchema();
    const rows = await getDb()`
      SELECT id FROM users
      WHERE password_reset_token = ${String(token)}
        AND password_reset_expires > now()`;

    if (rows.length === 0) {
      return Response.json(
        { success: false, message: "This reset link is invalid or has expired. Please request a new one." },
        { status: 400 }
      );
    }

    const userId = rows[0].id;
    const hash = await bcrypt.hash(String(newPassword), 12);
    await getDb()`
      UPDATE users
      SET password = ${hash}, password_reset_token = NULL, password_reset_expires = NULL
      WHERE id = ${userId}`;

    // Invalidate every session — the password was potentially compromised
    await getDb()`DELETE FROM sessions WHERE user_id = ${userId}`;

    return Response.json({ success: true, message: "Password updated. You can log in now." });
  } catch (error) {
    console.error("❌ Reset password error:", error);
    return Response.json(
      { success: false, message: "Could not reset password. Please try again." },
      { status: 500 }
    );
  }
}
