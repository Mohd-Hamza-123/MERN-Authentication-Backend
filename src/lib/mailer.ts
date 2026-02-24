import nodemailer from "nodemailer"
import env from "../config/env.js";

const transporter = nodemailer.createTransport({
  host: env.SMTP_HOST ,
  port: 465,
  secure: env.SMTP_PORT === 465, // Use true for port 465, false for port 587
  auth: {
    user: env.SMTP_USER,
    pass: env.SMTP_PASS,
  }
});

export default transporter

