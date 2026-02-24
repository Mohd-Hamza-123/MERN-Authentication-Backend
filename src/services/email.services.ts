
import env from "../config/env.js";
import transporter from "../lib/mailer.js";
import type { Email } from "../types/email.type.js";

export const sendEmail = async ({to, subject, text, html} : Email) => {
    try {

        const info = await transporter.sendMail({
            from: env.SMTP_USER,
            to,
            subject,
            text,
            html,
        });

        const isSend = Array.isArray(info.accepted) && info.accepted.length > 0

        return {
            success: isSend,
            message: isSend ? "Email sent successfully" : "Email not sent"
        }

    } catch (error: unknown) {

        console.error("Email Error : ", error)
        
        return {
            success: false,
            error: error instanceof Error ? error.message : "Some error occurred while sending email"
        }

    }

}
