import crypto from "node:crypto";
import { getDb, ensureSchema } from "@/lib/db";
import { isValidEmail, rateLimit, readJson, getBaseUrl } from "@/lib/http";
import { sendEmail, resetPasswordEmailHtml } from "@/lib/email";

/**
 * Step 1 of password reset: request a reset link by email.
 * Sends a single-use token link (valid 1 hour). The response is always
 * generic so it never reveals whether an account exists.
 */
export async function POST(request) {
  try {
    const { email } = await readJson(request);
    if (!isValidEmail(email)) {
      return Response.json({ success: false, message: "A valid email is required" }, { status: 400 });
    }

    if (!rateLimit(`forgot:${request.headers.get("x-forwarded-for") || "local"}`, 5, 3600_000)) {
      return Response.json(
        { success: false, message: "Too many reset attempts. Try again later." },
        { status: 429 }
      );
    }

    await ensureSchema();
    const normalized = String(email).toLowerCase().trim();
    const rows = await getDb()`SELECT id, name FROM users WHERE email = ${normalized}`;

    if (rows.length > 0) {
      const token = crypto.randomBytes(32).toString("hex");
      const expires = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
      await getDb()`
        UPDATE users
        SET password_reset_token = ${token}, password_reset_expires = ${expires}
        WHERE id = ${rows[0].id}`;

      const resetUrl = `${getBaseUrl(request)}/reset-password?token=${token}`;
      const sent = await sendEmail({
        to: normalized,
        subject: "Reset your Four AI password",
        html: resetPasswordEmailHtml({ name: rows[0].name, url: resetUrl }),
      });
      if (!sent && !process.env.RESEND_API_KEY) {
        console.warn(`📧 Password reset link for ${normalized}: ${resetUrl}`);
      }
    }

    // Never reveal whether the account exists
    return Response.json({
      success: true,
      message: "If that email exists, a password reset link has been sent.",
    });
  } catch (error) {
    console.error("❌ Forgot password error:", error);
    return Response.json(
      { success: false, message: "Could not process your request. Please try again." },
      { status: 500 }
    );
  }
}
