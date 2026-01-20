#!/bin/bash

# LogVPN 支付流程测试脚本

echo "==================================="
echo "LogVPN 支付流程测试"
echo "==================================="
echo ""

# 测试邮箱
TEST_EMAIL="test_payment_$(date +%s)@example.com"
echo "📧 测试邮箱: $TEST_EMAIL"
echo ""

# 步骤 1: 发送验证码
echo "步骤 1: 发送验证码到测试邮箱..."
SEND_CODE_RESPONSE=$(curl -s -X POST 'https://3000-ifu926scff5n7uobsqhki-a2d24f4a.us2.manus.computer/api/trpc/auth.sendVerificationCode?batch=1' \
  -H "Content-Type: application/json" \
  -d "{\"0\":{\"json\":{\"email\":\"siuminghe@gmail.com\",\"type\":\"register\"}}}")

echo "发送验证码响应: $SEND_CODE_RESPONSE"
echo ""

# 提示用户查看邮箱
echo "⏳ 请查看邮箱 siuminghe@gmail.com 获取验证码..."
echo "验证码有效期: 10 分钟"
echo ""

# 步骤 2: 查询数据库获取验证码
echo "步骤 2: 从数据库查询验证码..."
echo "（需要手动查询数据库或从邮件中获取验证码）"
echo ""

# 步骤 3: 模拟支付凭证上传
echo "步骤 3: 模拟支付凭证上传..."
echo "（需要先注册并登录账号后才能上传支付凭证）"
echo ""

echo "==================================="
echo "测试脚本完成"
echo "==================================="
echo ""
echo "后续步骤："
echo "1. 使用邮箱验证码完成注册"
echo "2. 登录账号"
echo "3. 访问 /recharge 页面"
echo "4. 点击'立即购买'按钮"
echo "5. 上传支付凭证截图"
echo "6. 检查 Telegram 是否收到付费通知"
echo ""
