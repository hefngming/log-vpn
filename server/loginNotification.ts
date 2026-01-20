/**
 * Login Notification Service
 * Sends email notifications when a new device logs in
 */

import nodemailer from 'nodemailer';

const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true,
  auth: {
    user: process.env.SMTP_USER || 'siuminghe@gmail.com',
    pass: process.env.SMTP_PASS || 'xznm dngy flap ollu',
  },
};

const transporter = nodemailer.createTransport(SMTP_CONFIG);

export interface LoginNotificationData {
  userEmail: string;
  userName: string;
  deviceName: string;
  deviceType: string;
  os: string;
  osVersion: string;
  ipAddress: string;
  loginTime: Date;
  location?: string;
}

/**
 * Send login notification email
 */
export async function sendLoginNotification(data: LoginNotificationData): Promise<boolean> {
  const {
    userEmail,
    userName,
    deviceName,
    deviceType,
    os,
    osVersion,
    ipAddress,
    loginTime,
    location,
  } = data;

  const subject = '🔐 New Device Login Alert - LogVPN';

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <style>
    body {
      font-family: Arial, sans-serif;
      line-height: 1.6;
      color: #333;
      max-width: 600px;
      margin: 0 auto;
      padding: 20px;
    }
    .header {
      background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      color: white;
      padding: 30px;
      text-align: center;
      border-radius: 10px 10px 0 0;
    }
    .content {
      background: #f9f9f9;
      padding: 30px;
      border-radius: 0 0 10px 10px;
    }
    .info-box {
      background: white;
      padding: 20px;
      border-radius: 8px;
      margin: 20px 0;
      border-left: 4px solid #667eea;
    }
    .info-row {
      display: flex;
      justify-content: space-between;
      padding: 10px 0;
      border-bottom: 1px solid #eee;
    }
    .info-row:last-child {
      border-bottom: none;
    }
    .label {
      font-weight: bold;
      color: #666;
    }
    .value {
      color: #333;
    }
    .warning {
      background: #fff3cd;
      border: 1px solid #ffc107;
      padding: 15px;
      border-radius: 8px;
      margin: 20px 0;
    }
    .footer {
      text-align: center;
      color: #999;
      font-size: 12px;
      margin-top: 30px;
    }
  </style>
</head>
<body>
  <div class="header">
    <h1>🔐 New Device Login Detected</h1>
  </div>
  
  <div class="content">
    <p>Hello <strong>${userName}</strong>,</p>
    
    <p>We detected a new login to your LogVPN account from a device we don't recognize.</p>
    
    <div class="info-box">
      <h3>Login Details</h3>
      
      <div class="info-row">
        <span class="label">Device Name:</span>
        <span class="value">${deviceName}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Device Type:</span>
        <span class="value">${deviceType}</span>
      </div>
      
      <div class="info-row">
        <span class="label">Operating System:</span>
        <span class="value">${os} ${osVersion}</span>
      </div>
      
      <div class="info-row">
        <span class="label">IP Address:</span>
        <span class="value">${ipAddress}</span>
      </div>
      
      ${location ? `
      <div class="info-row">
        <span class="label">Location:</span>
        <span class="value">${location}</span>
      </div>
      ` : ''}
      
      <div class="info-row">
        <span class="label">Login Time:</span>
        <span class="value">${loginTime.toLocaleString()}</span>
      </div>
    </div>
    
    <div class="warning">
      <strong>⚠️ Was this you?</strong>
      <p>If you don't recognize this login, please change your password immediately and contact our support team.</p>
    </div>
    
    <p>If this was you, you can safely ignore this email. Your previous device has been automatically logged out due to our one-account-one-device policy.</p>
    
    <p>Best regards,<br>
    <strong>LogVPN Security Team</strong></p>
  </div>
  
  <div class="footer">
    <p>This is an automated security notification from LogVPN.</p>
    <p>© 2026 LogVPN. All rights reserved.</p>
  </div>
</body>
</html>
  `;

  const textContent = `
New Device Login Alert - LogVPN

Hello ${userName},

We detected a new login to your LogVPN account from a device we don't recognize.

Login Details:
- Device Name: ${deviceName}
- Device Type: ${deviceType}
- Operating System: ${os} ${osVersion}
- IP Address: ${ipAddress}
${location ? `- Location: ${location}\n` : ''}
- Login Time: ${loginTime.toLocaleString()}

⚠️ Was this you?
If you don't recognize this login, please change your password immediately and contact our support team.

If this was you, you can safely ignore this email. Your previous device has been automatically logged out due to our one-account-one-device policy.

Best regards,
LogVPN Security Team

---
This is an automated security notification from LogVPN.
© 2026 LogVPN. All rights reserved.
  `;

  try {
    await transporter.sendMail({
      from: `"LogVPN Security" <${SMTP_CONFIG.auth.user}>`,
      to: userEmail,
      subject,
      text: textContent,
      html: htmlContent,
    });
    
    console.log(`Login notification sent to ${userEmail}`);
    return true;
  } catch (error) {
    console.error('Failed to send login notification:', error);
    return false;
  }
}
