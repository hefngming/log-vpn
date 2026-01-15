/**
 * Payment Service Module
 * 
 * 抽象支付类设计，支持多种支付方式：
 * 1. 手动支付（收款码）- 当前默认模式
 * 2. 易支付 API - 预留接口，待配置 PID 和 KEY 后启用
 * 3. 其他支付方式 - 可扩展
 * 
 * ============================================================
 * 【重要】如何切换到易支付自动支付模式：
 * ============================================================
 * 
 * 1. 在环境变量或数据库 systemSettings 表中配置以下参数：
 *    - EPAY_PID: 易支付商户ID
 *    - EPAY_KEY: 易支付商户密钥
 *    - EPAY_API_URL: 易支付API地址 (如 https://pay.example.com)
 * 
 * 2. 在数据库 paymentConfigs 表中添加易支付配置：
 *    INSERT INTO paymentConfigs (name, provider, config, isActive) VALUES 
 *    ('易支付', 'epay', '{"pid":"YOUR_PID","key":"YOUR_KEY","apiUrl":"https://pay.example.com"}', true);
 * 
 * 3. 将手动支付配置设为不活跃：
 *    UPDATE paymentConfigs SET isActive = false WHERE provider = 'manual';
 * 
 * 4. 重启服务即可自动切换到易支付模式
 * 
 * ============================================================
 */

import { nanoid } from 'nanoid';
import * as db from './db';

// ==================== 支付接口定义 ====================

export interface PaymentProvider {
  name: string;
  type: 'manual' | 'epay' | 'alipay' | 'wechat';
  
  /**
   * 创建支付订单
   * @param orderNo 订单号
   * @param amount 金额
   * @param description 描述
   * @returns 支付信息（收款码URL或支付链接）
   */
  createPayment(orderNo: string, amount: number, description: string): Promise<PaymentResult>;
  
  /**
   * 查询支付状态
   * @param orderNo 订单号
   * @returns 支付状态
   */
  queryPayment(orderNo: string): Promise<PaymentStatus>;
  
  /**
   * 处理回调通知
   * @param data 回调数据
   * @returns 处理结果
   */
  handleCallback(data: Record<string, unknown>): Promise<CallbackResult>;
}

export interface PaymentResult {
  success: boolean;
  type: 'qrcode' | 'redirect' | 'manual';
  // 收款码图片URL（手动模式）
  qrcodeUrl?: string;
  // 支付跳转链接（自动模式）
  payUrl?: string;
  // 额外信息
  message?: string;
}

export interface PaymentStatus {
  paid: boolean;
  orderNo: string;
  amount?: number;
  paymentTime?: Date;
}

export interface CallbackResult {
  success: boolean;
  orderNo?: string;
  message?: string;
}

// ==================== 手动支付实现（收款码模式）====================

export class ManualPaymentProvider implements PaymentProvider {
  name = '手动支付';
  type: 'manual' = 'manual';
  
  private wechatQrcode = '/images/wechat-pay.jpg';
  private alipayQrcode = '/images/alipay.jpg';
  
  async createPayment(orderNo: string, amount: number, description: string): Promise<PaymentResult> {
    return {
      success: true,
      type: 'manual',
      qrcodeUrl: this.wechatQrcode,
      message: `请扫码支付 ¥${amount}，支付完成后请保留截图并联系客服激活账户`,
    };
  }
  
  async queryPayment(orderNo: string): Promise<PaymentStatus> {
    // 手动模式需要管理员确认
    const order = await db.getOrderByNo(orderNo);
    return {
      paid: order?.status === 'paid',
      orderNo,
      amount: order ? parseFloat(String(order.amount)) : undefined,
      paymentTime: order?.paymentTime || undefined,
    };
  }
  
  async handleCallback(_data: Record<string, unknown>): Promise<CallbackResult> {
    // 手动模式不处理回调
    return { success: false, message: '手动模式不支持回调' };
  }
  
  getQrcodes() {
    return {
      wechat: this.wechatQrcode,
      alipay: this.alipayQrcode,
    };
  }
}

// ==================== 易支付实现（预留接口）====================

export interface EpayConfig {
  pid: string;      // 商户ID
  key: string;      // 商户密钥
  apiUrl: string;   // API地址
  notifyUrl?: string; // 回调地址
  returnUrl?: string; // 返回地址
}

export class EpayProvider implements PaymentProvider {
  name = '易支付';
  type: 'epay' = 'epay';
  
  private config: EpayConfig;
  
  constructor(config: EpayConfig) {
    this.config = config;
  }
  
  /**
   * 创建易支付订单
   * 
   * 【待实现】当您获得易支付 PID 和 KEY 后，需要：
   * 1. 调用易支付 API 创建订单
   * 2. 返回支付链接供用户跳转
   * 
   * 易支付 API 文档参考：
   * - 接口地址: {apiUrl}/submit.php
   * - 请求参数: pid, type, out_trade_no, notify_url, return_url, name, money, sign
   * - 签名方式: MD5(参数按字母排序拼接 + key)
   */
  async createPayment(orderNo: string, amount: number, description: string): Promise<PaymentResult> {
    // TODO: 实现易支付订单创建
    // 示例代码（需要根据实际易支付文档调整）：
    /*
    const params = {
      pid: this.config.pid,
      type: 'alipay', // 或 'wxpay'
      out_trade_no: orderNo,
      notify_url: this.config.notifyUrl,
      return_url: this.config.returnUrl,
      name: description,
      money: amount.toFixed(2),
    };
    
    // 生成签名
    const sign = this.generateSign(params);
    params.sign = sign;
    
    // 构建支付URL
    const payUrl = `${this.config.apiUrl}/submit.php?${new URLSearchParams(params).toString()}`;
    
    return {
      success: true,
      type: 'redirect',
      payUrl,
    };
    */
    
    return {
      success: false,
      type: 'redirect',
      message: '易支付接口尚未配置，请联系管理员',
    };
  }
  
  async queryPayment(orderNo: string): Promise<PaymentStatus> {
    // TODO: 实现易支付订单查询
    // 调用易支付查询接口: {apiUrl}/api.php?act=order&pid=xxx&key=xxx&out_trade_no=xxx
    
    const order = await db.getOrderByNo(orderNo);
    return {
      paid: order?.status === 'paid',
      orderNo,
    };
  }
  
  async handleCallback(data: Record<string, unknown>): Promise<CallbackResult> {
    // TODO: 实现易支付回调处理
    // 1. 验证签名
    // 2. 更新订单状态
    // 3. 激活用户订阅
    
    /*
    const { out_trade_no, trade_no, trade_status, sign } = data;
    
    // 验证签名
    if (!this.verifySign(data, sign as string)) {
      return { success: false, message: '签名验证失败' };
    }
    
    // 检查支付状态
    if (trade_status === 'TRADE_SUCCESS') {
      await db.updateOrderStatus(out_trade_no as string, 'paid', 'epay');
      // 激活订阅...
      return { success: true, orderNo: out_trade_no as string };
    }
    */
    
    return { success: false, message: '易支付回调处理尚未实现' };
  }
  
  /**
   * 生成签名
   * MD5(参数按字母排序拼接 + key)
   */
  private generateSign(params: Record<string, string>): string {
    // TODO: 实现签名生成
    const sortedKeys = Object.keys(params).sort();
    const signStr = sortedKeys.map(k => `${k}=${params[k]}`).join('&') + this.config.key;
    // return md5(signStr);
    return '';
  }
  
  /**
   * 验证签名
   */
  private verifySign(data: Record<string, unknown>, sign: string): boolean {
    // TODO: 实现签名验证
    return false;
  }
}

// ==================== 支付服务管理器 ====================

class PaymentService {
  private providers: Map<string, PaymentProvider> = new Map();
  private activeProvider: PaymentProvider;
  
  constructor() {
    // 默认使用手动支付
    this.activeProvider = new ManualPaymentProvider();
    this.providers.set('manual', this.activeProvider);
  }
  
  /**
   * 初始化支付服务
   * 从数据库加载支付配置
   */
  async initialize() {
    // TODO: 从数据库加载活跃的支付配置
    // const configs = await db.getActivePaymentConfigs();
    // for (const config of configs) {
    //   if (config.provider === 'epay' && config.isActive) {
    //     const epayConfig = JSON.parse(config.config);
    //     this.activeProvider = new EpayProvider(epayConfig);
    //     this.providers.set('epay', this.activeProvider);
    //   }
    // }
    
    console.log('[Payment] Initialized with provider:', this.activeProvider.name);
  }
  
  /**
   * 获取当前活跃的支付提供商
   */
  getActiveProvider(): PaymentProvider {
    return this.activeProvider;
  }
  
  /**
   * 获取支付模式信息
   */
  getPaymentMode(): { mode: 'manual' | 'auto'; provider: string } {
    return {
      mode: this.activeProvider.type === 'manual' ? 'manual' : 'auto',
      provider: this.activeProvider.name,
    };
  }
  
  /**
   * 创建支付
   */
  async createPayment(orderNo: string, amount: number, description: string): Promise<PaymentResult> {
    return this.activeProvider.createPayment(orderNo, amount, description);
  }
  
  /**
   * 查询支付状态
   */
  async queryPayment(orderNo: string): Promise<PaymentStatus> {
    return this.activeProvider.queryPayment(orderNo);
  }
  
  /**
   * 处理支付回调
   */
  async handleCallback(data: Record<string, unknown>): Promise<CallbackResult> {
    return this.activeProvider.handleCallback(data);
  }
  
  /**
   * 获取收款码（仅手动模式）
   */
  getQrcodes(): { wechat: string; alipay: string } | null {
    if (this.activeProvider instanceof ManualPaymentProvider) {
      return this.activeProvider.getQrcodes();
    }
    return null;
  }
}

// 导出单例
export const paymentService = new PaymentService();
