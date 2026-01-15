/**
 * Email Service Module
 * 
 * Handles sending emails for:
 * - Registration verification codes
 * - Password reset codes
 * - Password change confirmation codes
 * - Subscription expiry reminders
 * 
 * SMTP Configuration (from user requirements):
 * - Server: smtp.gmail.com
 * - Port: 465 (SSL)
 * - Username: siuminghe@gmail.com
 * - Password: xznm dngy flap ollu
 */

import nodemailer from 'nodemailer';

// SMTP Configuration
const SMTP_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '465'),
  secure: true, // Use SSL
  auth: {
    user: process.env.SMTP_USER || 'siuminghe@gmail.com',
    pass: process.env.SMTP_PASS || 'xznm dngy flap ollu',
  },
};

// Create transporter
let transporter: nodemailer.Transporter | null = null;

function getTransporter() {
  if (!transporter) {
    transporter = nodemailer.createTransport(SMTP_CONFIG);
  }
  return transporter;
}

/**
 * Send verification code email
 */
export async function sendVerificationCode(
  to: string,
  code: string,
  type: 'password_reset' | 'change_password' | 'register'
): Promise<boolean> {
  const subjects = {
    password_reset: 'Log VPN - 密码重置验证码',
    change_password: 'Log VPN - 更改密码验证码',
    register: 'Log VPN - 注册验证码',
  };

  const messages = {
    password_reset: '您正在重置密码',
    change_password: '您正在更改密码',
    register: '您正在注册 Log VPN 账户',
  };

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0f; color: #ffffff; padding: 40px; }
        .container { max-width: 500px; margin: 0 auto; background: #12121a; border-radius: 16px; padding: 40px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
        .content { text-align: center; }
        .code { font-size: 36px; font-weight: bold; color: #8b5cf6; letter-spacing: 8px; margin: 30px 0; padding: 20px; background: #1a1a25; border-radius: 12px; }
        .message { color: #a0a0b0; line-height: 1.6; }
        .warning { color: #eab308; font-size: 14px; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #6b6b7b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1>🛡️ Log VPN</h1>
        </div>
        <div class="content">
          <p class="message">${messages[type]}，请使用以下验证码：</p>
          <div class="code">${code}</div>
          <p class="message">验证码有效期为 <strong>10 分钟</strong>，请尽快使用。</p>
          <p class="warning">⚠️ 如果这不是您的操作，请忽略此邮件。</p>
        </div>
        <div class="footer">
          <p>© 2024 Log VPN. 安全、快速、全球。</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"Log VPN" <${SMTP_CONFIG.auth.user}>`,
      to,
      subject: subjects[type],
      html: htmlContent,
    });
    console.log(`[Email] Verification code sent to ${to} for ${type}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send verification code:', error);
    return false;
  }
}

/**
 * Send subscription expiry reminder
 */
export async function sendExpiryReminder(
  to: string,
  userName: string,
  expiryDate: Date,
  daysLeft: number
): Promise<boolean> {
  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0f; color: #ffffff; padding: 40px; }
        .container { max-width: 500px; margin: 0 auto; background: #12121a; border-radius: 16px; padding: 40px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
        .content { text-align: center; }
        .days { font-size: 48px; font-weight: bold; color: #ef4444; margin: 20px 0; }
        .message { color: #a0a0b0; line-height: 1.6; }
        .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
        .footer { text-align: center; margin-top: 30px; color: #6b6b7b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1>🛡️ Log VPN</h1>
        </div>
        <div class="content">
          <p class="message">亲爱的 ${userName}，</p>
          <p class="message">您的 Log VPN 订阅即将到期：</p>
          <div class="days">${daysLeft} 天</div>
          <p class="message">到期时间：${expiryDate.toLocaleDateString('zh-CN')}</p>
          <a href="https://dj.siumingho.dpdns.org/recharge" class="button">立即续费</a>
        </div>
        <div class="footer">
          <p>© 2024 Log VPN. 安全、快速、全球。</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"Log VPN" <${SMTP_CONFIG.auth.user}>`,
      to,
      subject: `Log VPN - 您的订阅将在 ${daysLeft} 天后到期`,
      html: htmlContent,
    });
    console.log(`[Email] Expiry reminder sent to ${to}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send expiry reminder:', error);
    return false;
  }
}

/**
 * Generate a 6-digit verification code
 */
export function generateVerificationCode(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}


/**
 * Send subscription activated confirmation email
 */
export async function sendSubscriptionActivatedEmail(
  to: string,
  planName: string,
  days: number
): Promise<boolean> {
  const expiryDate = new Date();
  expiryDate.setDate(expiryDate.getDate() + days);

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; background: #0a0a0f; color: #ffffff; padding: 40px; }
        .container { max-width: 500px; margin: 0 auto; background: #12121a; border-radius: 16px; padding: 40px; }
        .logo { text-align: center; margin-bottom: 30px; }
        .logo h1 { color: #8b5cf6; margin: 0; font-size: 28px; }
        .content { text-align: center; }
        .success { font-size: 48px; margin: 20px 0; }
        .plan { font-size: 24px; font-weight: bold; color: #8b5cf6; margin: 20px 0; }
        .message { color: #a0a0b0; line-height: 1.6; }
        .info-box { background: #1a1a25; border-radius: 12px; padding: 20px; margin: 20px 0; text-align: left; }
        .info-row { display: flex; justify-content: space-between; margin: 10px 0; }
        .info-label { color: #6b6b7b; }
        .info-value { color: #ffffff; font-weight: 600; }
        .button { display: inline-block; background: linear-gradient(135deg, #8b5cf6, #a855f7); color: white; padding: 14px 28px; border-radius: 8px; text-decoration: none; font-weight: 600; margin-top: 20px; }
        .telegram { margin-top: 20px; padding: 15px; background: #1a1a25; border-radius: 8px; }
        .telegram a { color: #8b5cf6; text-decoration: none; }
        .footer { text-align: center; margin-top: 30px; color: #6b6b7b; font-size: 12px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="logo">
          <h1>🛡️ Log VPN</h1>
        </div>
        <div class="content">
          <div class="success">🎉</div>
          <p class="message">恭喜！您的订阅已成功激活</p>
          <div class="plan">${planName}</div>
          <div class="info-box">
            <div class="info-row">
              <span class="info-label">套餐名称</span>
              <span class="info-value">${planName}</span>
            </div>
            <div class="info-row">
              <span class="info-label">有效期</span>
              <span class="info-value">${days} 天</span>
            </div>
            <div class="info-row">
              <span class="info-label">到期时间</span>
              <span class="info-value">${expiryDate.toLocaleDateString('zh-CN')}</span>
            </div>
          </div>
          <a href="https://dj.siumingho.dpdns.org/dashboard" class="button">进入控制台</a>
          <div class="telegram">
            <p class="message">📱 添加客服 Telegram 获取最新动态：<a href="https://t.me/siumingh">@siumingh</a></p>
          </div>
        </div>
        <div class="footer">
          <p>© 2024 Log VPN. 安全、快速、全球。</p>
        </div>
      </div>
    </body>
    </html>
  `;

  try {
    const transport = getTransporter();
    await transport.sendMail({
      from: `"Log VPN" <${SMTP_CONFIG.auth.user}>`,
      to,
      subject: `Log VPN - 您的 ${planName} 订阅已激活`,
      html: htmlContent,
    });
    console.log(`[Email] Subscription activated email sent to ${to}`);
    return true;
  } catch (error) {
    console.error('[Email] Failed to send subscription activated email:', error);
    return false;
  }
}
