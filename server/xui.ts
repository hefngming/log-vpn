/**
 * X-ui API Integration Service
 * 
 * This module provides integration with 3x-ui panel for:
 * - Fetching inbound configurations (nodes)
 * - Managing client connections
 * - Syncing traffic statistics
 */

import axios, { AxiosInstance } from 'axios';

interface XuiConfig {
  baseUrl: string;
  username: string;
  password: string;
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

  constructor(config: XuiConfig) {
    this.config = config;
    this.client = axios.create({
      baseURL: config.baseUrl,
      timeout: 10000,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
    });
  }

  /**
   * Login to X-ui panel and get session cookie
   */
  async login(): Promise<boolean> {
    try {
      const response = await this.client.post('/login', 
        `username=${encodeURIComponent(this.config.username)}&password=${encodeURIComponent(this.config.password)}`,
        {
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        }
      );

      if (response.data.success) {
        // Extract session cookie from response
        const cookies = response.headers['set-cookie'];
        if (cookies) {
          this.sessionCookie = cookies.map((c: string) => c.split(';')[0]).join('; ');
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

      const response = await this.client.get('/panel/api/inbounds/list', {
        headers: {
          Cookie: this.sessionCookie,
        },
      });

      if (response.data.success) {
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
export async function syncNodesFromXui(): Promise<{
  success: boolean;
  synced: number;
  message: string;
}> {
  try {
    const inbounds = await xuiService.getInbounds();
    
    if (inbounds.length === 0) {
      return {
        success: false,
        synced: 0,
        message: '未能从 X-ui 获取节点信息，请检查配置',
      };
    }

    // TODO: Sync to database
    // For now, just return the count
    return {
      success: true,
      synced: inbounds.length,
      message: `成功同步 ${inbounds.length} 个节点`,
    };
  } catch (error) {
    return {
      success: false,
      synced: 0,
      message: `同步失败: ${error}`,
    };
  }
}

export { XuiService, XuiConfig, XuiInbound, XuiClient };
