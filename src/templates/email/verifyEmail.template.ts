import siteConfig from "../../config/site.js";

export const verifyHTML = (token: string, name: string, expiry: number) => `<!DOCTYPE html>
  <html>
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
    <title>Email Verification</title>
  </head>
  <body style="margin:0; padding:0; background-color:#f4f6f8; font-family: Arial, sans-serif;">
    <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f8; padding:40px 0;">
      <tr>
        <td align="center">
          <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:10px; overflow:hidden; box-shadow:0 4px 10px rgba(0,0,0,0.05);">
            
            <!-- Header -->
            <tr>
              <td style="background:#2563eb; padding:30px; text-align:center;">
                <h1 style="color:#ffffff; margin:0; font-size:24px;">Verify Your Email</h1>
              </td>
            </tr>

            <!-- Content -->
            <tr>
              <td style="padding:40px 30px; color:#333333;">
                <p style="font-size:16px; margin-bottom:20px;">
                  Hi ${name || "there"},
                </p>

                <p style="font-size:16px; line-height:1.6; margin-bottom:30px;">
                  Thanks for signing up! Please confirm your email address by clicking the button below.
                </p>

                <div style="text-align:center; margin-bottom:30px;">
                  <a href="http://localhost:8000/api/v1/users/verify-email/?token=${token}"
                     style="background:#2563eb; color:#ffffff; padding:14px 28px; text-decoration:none; font-size:16px; border-radius:6px; display:inline-block; font-weight:bold;">
                     Verify Email
                  </a>
                </div>

                <p style="font-size:14px; color:#666; line-height:1.6;">
                  If you did not create an account, you can safely ignore this email.
                </p>

                <p style="font-size:14px; color:#666; margin-top:30px;">
                  This link will expire in ${Math.floor(expiry / 60)} minutes for security reasons.
                </p>
              </td>
            </tr>

            <!-- Footer -->
            <tr>
              <td style="background:#f9fafb; padding:20px; text-align:center; font-size:12px; color:#999;">
                © ${new Date().getFullYear()} ${siteConfig.name}. All rights reserved.
              </td>
            </tr>

          </table>
        </td>
      </tr>
    </table>
  </body>
  </html>
  `
