/**
 * 3x-ui API 集成模块
 * 用于从 3x-ui 面板获取节点信息
 */

import axios, { AxiosInstance } from 'axios';
import https from 'https';

interface XuiConfig {
  baseUrl: string;
  username: string;
  password: string;
}

export interface XuiNode {
  id: string;
  name: string;
  protocol: string;
  address: string;
  port: number;
  cipher?: string;
  password?: string;
  config?: any;
}

export interface SyncNodesResponse {
  success: boolean;
  message: string;
  nodes: XuiNode[];
  count: number;
}

interface XuiInbound {
  id: number;
  up: number;
  down: number;
  total: number;
  remark: string;
  enable: boolean;
  expiryTime: number;
  listen: string;
  port: number;
  protocol: string;
  settings: string;
  streamSettings: string;
  tag: string;
  sniffing: string;
}

interface XuiClient {
  id: string;
  alterId: number;
  email: string;
  limitIp: number;
  totalGB: number;
  expiryTime: number;
  enable: boolean;
  tgId: string;
  subId: string;
}

class XuiService {
  private client: AxiosInstance;
  private sessionCookie: string | null = null;
  private config: XuiConfig;
  private httpsAgent: any;

  constructor(config: XuiConfig) {
    this.config = config;
    // 创建 HTTPS Agent，忽略自签名证书
    this.httpsAgent = new https.Agent({
      rejectUnauthorized: false,
    });
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      httpsAgent: this.httpsAgent,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      validateStatus: () => true, // 不自动抛出错误
    });
  }

  /**
   * Login to X-ui panel and get session cookie
   */
  async login(): Promise<boolean> {
    try {
      const response = await this.client.post('/api/login', {
        username: this.config.username,
        password: this.config.password,
      });

      if (response.status === 200 && response.data?.success) {
        // 获取 Cookie
        const setCookie = response.headers['set-cookie'];
        if (setCookie) {
          this.sessionCookie = Array.isArray(setCookie) ? setCookie[0] : setCookie;
          // 提取 JSESSIONID
          const match = this.sessionCookie.match(/JSESSIONID=([^;]+)/);
          if (match) {
            this.sessionCookie = `JSESSIONID=${match[1]}`;
          }
        }
        return true;
      }
      return false;
    } catch (error) {
      console.error('[X-ui] Login failed:', error);
      return false;
    }
  }

  /**
   * Get all inbounds (nodes) from X-ui
   */
  async getInbounds(): Promise<XuiInbound[]> {
    try {
      if (!this.sessionCookie) {
        const loggedIn = await this.login();
        if (!loggedIn) return [];
      }

      const response = await this.client.get('/api/inbounds', {
        headers: {
          Cookie: this.sessionCookie,
        },
      });

      if (response.status === 200 && response.data?.success) {
        return response.data.obj || [];
      }
      return [];
    } catch (error) {
      console.error('[X-ui] Failed to get inbounds:', error);
      return [];
    }
  }

  /**
   * Add a client to an inbound
   */
  async addClient(inboundId: number, client: Partial<XuiClient>): Promise<boolean> {
    try {
      if (!this.sessionCookie) {
        const loggedIn = await this.login();
        if (!loggedIn) return false;
      }

      const response = await this.client.post(`/panel/api/inbounds/addClient`, {
        id: inboundId,
        settings: JSON.stringify({
          clients: [client],
        }),
      }, {
        headers: {
          Cookie: this.sessionCookie,
          'Content-Type': 'application/json',
        },
      });

      return response.data.success;
    } catch (error) {
      console.error('[X-ui] Failed to add client:', error);
      return false;
    }
  }

  /**
   * Get client traffic stats
   */
  async getClientStats(email: string): Promise<{ up: number; down: number } | null> {
    try {
      if (!this.sessionCookie) {
        const loggedIn = await this.login();
        if (!loggedIn) return null;
      }

      const response = await this.client.get(`/panel/api/inbounds/getClientTraffics/${email}`, {
        headers: {
          Cookie: this.sessionCookie,
        },
      });

      if (response.data.success && response.data.obj) {
        return {
          up: response.data.obj.up || 0,
          down: response.data.obj.down || 0,
        };
      }
      return null;
    } catch (error) {
      console.error('[X-ui] Failed to get client stats:', error);
      return null;
    }
  }

  /**
   * Reset client traffic
   */
  async resetClientTraffic(inboundId: number, email: string): Promise<boolean> {
    try {
      if (!this.sessionCookie) {
        const loggedIn = await this.login();
        if (!loggedIn) return false;
      }

      const response = await this.client.post(`/panel/api/inbounds/${inboundId}/resetClientTraffic/${email}`, {}, {
        headers: {
          Cookie: this.sessionCookie,
        },
      });

      return response.data.success;
    } catch (error) {
      console.error('[X-ui] Failed to reset client traffic:', error);
      return false;
    }
  }

  /**
   * Delete a client from inbound
   */
  async deleteClient(inboundId: number, clientId: string): Promise<boolean> {
    try {
      if (!this.sessionCookie) {
        const loggedIn = await this.login();
        if (!loggedIn) return false;
      }

      const response = await this.client.post(`/panel/api/inbounds/${inboundId}/delClient/${clientId}`, {}, {
        headers: {
          Cookie: this.sessionCookie,
        },
      });

      return response.data.success;
    } catch (error) {
      console.error('[X-ui] Failed to delete client:', error);
      return false;
    }
  }

  /**
   * Parse inbound settings to extract node info
   */
  parseInboundToNode(inbound: XuiInbound): {
    name: string;
    protocol: string;
    address: string;
    port: number;
    settings: string;
  } {
    let protocol = inbound.protocol;
    if (protocol === 'vless' || protocol === 'vmess' || protocol === 'trojan') {
      // Keep as is
    } else if (protocol === 'shadowsocks') {
      protocol = 'shadowsocks';
    }

    return {
      name: inbound.remark || `Node-${inbound.id}`,
      protocol: protocol as any,
      address: inbound.listen || '0.0.0.0',
      port: inbound.port,
      settings: JSON.stringify({
        settings: inbound.settings,
        streamSettings: inbound.streamSettings,
      }),
    };
  }
}

// Default X-ui configuration (can be overridden via environment or settings)
const defaultConfig: XuiConfig = {
  baseUrl: process.env.XUI_BASE_URL || 'https://dj.siumingho.dpdns.org:54321',
  username: process.env.XUI_USERNAME || 'admin',
  password: process.env.XUI_PASSWORD || 'admin123',
};

export const xuiService = new XuiService(defaultConfig);

/**
 * Sync nodes from X-ui to local database
 */
export async function syncNodesFromXui(): Promise<SyncNodesResponse> {
  try {
    const inbounds = await xuiService.getInbounds();
    const nodes: XuiNode[] = [];

    // 解析每个入站中的客户端
    for (const inbound of inbounds) {
      const protocol = inbound.protocol || 'unknown';
      const port = inbound.port || 0;
      const listen = inbound.listen || 'localhost';

      // 解析不同协议的客户端
      let clients: any[] = [];
      try {
        const settings = typeof inbound.settings === 'string' ? JSON.parse(inbound.settings) : inbound.settings;
        if (protocol === 'vless' || protocol === 'trojan') {
          clients = settings?.clients || [];
        } else if (protocol === 'shadowsocks') {
          clients = settings?.clients || [];
        } else if (protocol === 'vmess') {
          clients = settings?.clients || [];
        }
      } catch (e) {
        console.warn(`Failed to parse settings for inbound ${inbound.id}:`, e);
      }

      // 为每个客户端创建节点
      clients.forEach((client: any, index: number) => {
        const nodeName = client.email || client.id || `${protocol}-${index}`;
        
        nodes.push({
          id: `${inbound.id}-${index}`,
          name: nodeName,
          protocol: protocol,
          address: listen,
          port: port,
          cipher: client.cipher,
          password: client.password,
          config: {
            inbound: {
              id: inbound.id,
              protocol: inbound.protocol,
              port: inbound.port,
              listen: inbound.listen,
            },
            client: {
              id: client.id,
              email: client.email,
              alterId: client.alterId,
              cipher: client.cipher,
            },
          },
        });
      });
    }

    return {
      success: true,
      message: `成功从 3x-ui 获取 ${nodes.length} 个节点`,
      nodes,
      count: nodes.length,
    };
  } catch (error: any) {
    console.error('[X-ui] Sync failed:', error.message);
    return {
      success: false,
      message: `同步失败: ${error.message}`,
      nodes: [],
      count: 0,
    };
  }
}

/**
 * 生成 Sing-box 配置
 */
export function generateSingboxConfig(nodes: XuiNode[]): any {
  return {
    outbounds: nodes.map((node) => ({
      type: node.protocol,
      tag: node.name,
      server: node.address,
      server_port: node.port,
      ...(node.config?.client || {}),
    })),
  };
}

/**
 * 生成订阅链接（Base64 编码的节点列表）
 */
export function generateSubscriptionLink(nodes: XuiNode[]): string {
  const configLines = nodes.map((node) => {
    // 根据协议生成不同格式的链接
    switch (node.protocol) {
      case 'vless':
        return `vless://${node.config?.client?.id}@${node.address}:${node.port}?encryption=none&security=tls#${node.name}`;
      case 'trojan':
        return `trojan://${node.config?.client?.password}@${node.address}:${node.port}#${node.name}`;
      case 'shadowsocks':
        return `ss://${Buffer.from(`${node.cipher}:${node.password}`).toString('base64')}@${node.address}:${node.port}#${node.name}`;
      default:
        return '';
    }
  }).filter(Boolean);

  return Buffer.from(configLines.join('\n')).toString('base64');
}

export { XuiService, XuiConfig, XuiInbound, XuiClient };
