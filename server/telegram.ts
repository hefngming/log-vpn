/**
 * Telegram Bot Notification Service
 * 
 * 用于向管理员发送即时通知
 * Bot Token: 8292869671:AAES2qE5-r5O0eHZ30IE0AQ2GC4ArcxXyqk
 * Chat ID: 7293658714
 */

const TELEGRAM_BOT_TOKEN = "8292869671:AAES2qE5-r5O0eHZ30IE0AQ2GC4ArcxXyqk";
const TELEGRAM_CHAT_ID = "7293658714";

interface TelegramMessage {
  text: string;
  parse_mode?: "HTML" | "Markdown" | "MarkdownV2";
}

/**
 * 发送 Telegram 消息
 */
export async function sendTelegramMessage(message: TelegramMessage): Promise<boolean> {
  try {
    const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;
    
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chat_id: TELEGRAM_CHAT_ID,
        text: message.text,
        parse_mode: message.parse_mode || "HTML",
      }),
    });

    const result = await response.json();
    
    if (!result.ok) {
      console.error("[Telegram] Failed to send message:", result);
      return false;
    }

    console.log("[Telegram] Message sent successfully");
    return true;
  } catch (error) {
    console.error("[Telegram] Error sending message:", error);
    return false;
  }
}

/**
 * 发送新订单通知
 */
export async function notifyNewPaymentProof(
  userEmail: string,
  planName: string,
  amount: string
): Promise<boolean> {
  const message = `🔔 <b>新订单提醒</b>

用户 <code>${userEmail}</code> 已提交支付凭证

📦 套餐：${planName}
💰 金额：¥${amount}

请登录后台审核：
<a href="https://dj.siumingho.dpdns.org/admin/review">点击进入审核中心</a>`;

  return sendTelegramMessage({ text: message, parse_mode: "HTML" });
}

/**
 * 发送订阅激活通知
 */
export async function notifySubscriptionActivated(
  userEmail: string,
  planName: string,
  days: number
): Promise<boolean> {
  const message = `✅ <b>订阅已激活</b>

用户 <code>${userEmail}</code> 的订阅已激活

📦 套餐：${planName}
⏱ 时长：${days} 天`;

  return sendTelegramMessage({ text: message, parse_mode: "HTML" });
}
