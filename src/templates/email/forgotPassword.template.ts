const forgotPasswordTemplate = (link: string, expiry: number) => `<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8" />
  <title>Password Reset</title>
</head>
<body style="margin:0; padding:0; background-color:#f4f6f9; font-family: Arial, sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#f4f6f9; padding:40px 0;">
    <tr>
      <td align="center">

        <table width="500" cellpadding="0" cellspacing="0" style="background:#ffffff; border-radius:8px; padding:30px;">
          
          <tr>
            <td align="center" style="padding-bottom:20px;">
              <h2 style="margin:0; color:#333;">Reset Your Password</h2>
            </td>
          </tr>

          <tr>
            <td style="color:#555; font-size:14px; line-height:1.6;">
              <p>Hello,</p>

              <p> We received a request to reset your password. Click the button below to set a new password.
              </p>

              <p style="text-align:center; margin:30px 0;">
                <a 
                  href="${link}" 
                  style="background-color:#4f46e5; color:#ffffff; padding:12px 20px; text-decoration:none; border-radius:6px; display:inline-block; font-weight:bold;">
                  Reset Password
                </a>
              </p>

              <p>This link will expire in <strong>${expiry / 60} minutes</strong></p>

              <p> If you did not request a password reset, please ignore this email.</p>

              <p style="margin-top:30px;">
                Thanks,<br/>
                Your Team
              </p>
            </td>
          </tr>

        </table>

        <table width="500" cellpadding="0" cellspacing="0" style="margin-top:20px;">
          <tr>
            <td align="center" style="font-size:12px; color:#999;">
              © 2026 Auth Mern. All rights reserved.
            </td>
          </tr>
        </table>

      </td>
    </tr>
  </table>

</body>
</html>`

export default forgotPasswordTemplate