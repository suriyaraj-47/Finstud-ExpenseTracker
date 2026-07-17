// ─────────────────────────────────────────
//  FinStud — Nodemailer Config
// ─────────────────────────────────────────
const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
  host:   process.env.EMAIL_HOST || 'smtp.gmail.com',
  port:   parseInt(process.env.EMAIL_PORT) || 587,
  secure: false, // TLS
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ── Send verification email ──
async function sendVerificationEmail(email, name, token) {
  const link = `${process.env.FRONTEND_URL}/pages/verify.html?token=${token}`;
  await transporter.sendMail({
    from:    process.env.EMAIL_FROM || 'FinStud <noreply@finstud.app>',
    to:      email,
    subject: 'Verify your FinStud email',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#F5F5F0;border-radius:12px;">
        <h2 style="font-family:Georgia,serif;color:#111;">Welcome to FinStud, ${name}!</h2>
        <p style="color:#555;line-height:1.6;">Click the button below to verify your email address and unlock all features.</p>
        <a href="${link}" style="display:inline-block;margin:24px 0;background:#2D6A4F;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;">Verify Email</a>
        <p style="color:#999;font-size:12px;">This link expires in 24 hours. If you didn't sign up, ignore this email.</p>
        <p style="color:#ccc;font-size:11px;">Or copy this link: ${link}</p>
      </div>`,
  });
}

// ── Send password reset email ──
async function sendPasswordResetEmail(email, name, token) {
  const link = `${process.env.FRONTEND_URL}/pages/reset-password.html?token=${token}`;
  await transporter.sendMail({
    from:    process.env.EMAIL_FROM || 'FinStud <noreply@finstud.app>',
    to:      email,
    subject: 'Reset your FinStud password',
    html: `
      <div style="font-family:sans-serif;max-width:480px;margin:auto;padding:32px;background:#F5F5F0;border-radius:12px;">
        <h2 style="font-family:Georgia,serif;color:#111;">Password Reset</h2>
        <p style="color:#555;line-height:1.6;">Hi ${name}, we received a request to reset your FinStud password.</p>
        <a href="${link}" style="display:inline-block;margin:24px 0;background:#2D6A4F;color:#fff;text-decoration:none;padding:12px 28px;border-radius:8px;font-weight:600;">Reset Password</a>
        <p style="color:#999;font-size:12px;">This link expires in 1 hour. If you didn't request this, ignore this email.</p>
      </div>`,
  });
}

module.exports = { sendVerificationEmail, sendPasswordResetEmail };
