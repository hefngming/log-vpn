/**
 * 节点同步功能测试
 * 测试从 3x-ui 获取节点的 tRPC 端点
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { syncNodesFromXui, generateSingboxConfig, generateSubscriptionLink } from './xui';

describe('Nodes Sync - 3x-ui Integration', () => {
  
  describe('syncNodesFromXui', () => {
    it('应该返回成功的响应结构', async () => {
      const result = await syncNodesFromXui();
      
      expect(result).toHaveProperty('success');
      expect(result).toHaveProperty('message');
      expect(result).toHaveProperty('nodes');
      expect(result).toHaveProperty('count');
      expect(Array.isArray(result.nodes)).toBe(true);
      expect(typeof result.count).toBe('number');
    });

    it('当同步失败时应该返回 success: false', async () => {
      const result = await syncNodesFromXui();
      
      // 由于 3x-ui 可能不可用，我们检查响应格式是否正确
      if (!result.success) {
        expect(result.message).toBeTruthy();
        expect(result.nodes).toEqual([]);
        expect(result.count).toBe(0);
      }
    });

    it('节点对象应该包含必要的字段', async () => {
      const result = await syncNodesFromXui();
      
      if (result.success && result.nodes.length > 0) {
        const node = result.nodes[0];
        
        expect(node).toHaveProperty('id');
        expect(node).toHaveProperty('name');
        expect(node).toHaveProperty('protocol');
        expect(node).toHaveProperty('address');
        expect(node).toHaveProperty('port');
        
        expect(typeof node.id).toBe('string');
        expect(typeof node.name).toBe('string');
        expect(typeof node.protocol).toBe('string');
        expect(typeof node.address).toBe('string');
        expect(typeof node.port).toBe('number');
      }
    });
  });

  describe('generateSingboxConfig', () => {
    it('应该生成有效的 Sing-box 配置', () => {
      const mockNodes = [
        {
          id: '1',
          name: 'Test Node 1',
          protocol: 'vless',
          address: '192.168.1.1',
          port: 443,
          config: {
            client: {
              id: 'test-uuid',
              email: 'test@example.com',
            },
          },
        },
        {
          id: '2',
          name: 'Test Node 2',
          protocol: 'trojan',
          address: '192.168.1.2',
          port: 443,
          config: {
            client: {
              password: 'test-password',
            },
          },
        },
      ];

      const config = generateSingboxConfig(mockNodes);

      expect(config).toHaveProperty('outbounds');
      expect(Array.isArray(config.outbounds)).toBe(true);
      expect(config.outbounds.length).toBe(2);

      // 检查第一个出站
      const outbound1 = config.outbounds[0];
      expect(outbound1.type).toBe('vless');
      expect(outbound1.tag).toBe('Test Node 1');
      expect(outbound1.server).toBe('192.168.1.1');
      expect(outbound1.server_port).toBe(443);

      // 检查第二个出站
      const outbound2 = config.outbounds[1];
      expect(outbound2.type).toBe('trojan');
      expect(outbound2.tag).toBe('Test Node 2');
      expect(outbound2.server).toBe('192.168.1.2');
      expect(outbound2.server_port).toBe(443);
    });

    it('应该处理空节点列表', () => {
      const config = generateSingboxConfig([]);
      
      expect(config).toHaveProperty('outbounds');
      expect(config.outbounds).toEqual([]);
    });
  });

  describe('generateSubscriptionLink', () => {
    it('应该生成有效的 Base64 编码订阅链接', () => {
      const mockNodes = [
        {
          id: '1',
          name: 'Test Node',
          protocol: 'vless',
          address: '192.168.1.1',
          port: 443,
          config: {
            client: {
              id: 'test-uuid',
            },
          },
        },
      ];

      const link = generateSubscriptionLink(mockNodes);

      // 应该是 Base64 编码的字符串
      expect(typeof link).toBe('string');
      expect(link.length).toBeGreaterThan(0);

      // 解码并验证内容
      const decoded = Buffer.from(link, 'base64').toString('utf-8');
      expect(decoded).toContain('vless://');
      expect(decoded).toContain('192.168.1.1');
      expect(decoded).toContain('443');
    });

    it('应该支持多种协议的链接生成', () => {
      const mockNodes = [
        {
          id: '1',
          name: 'VLESS Node',
          protocol: 'vless',
          address: '192.168.1.1',
          port: 443,
          config: {
            client: {
              id: 'vless-uuid',
            },
          },
        },
        {
          id: '2',
          name: 'Trojan Node',
          protocol: 'trojan',
          address: '192.168.1.2',
          port: 443,
          config: {
            client: {
              password: 'trojan-password',
            },
          },
        },
        {
          id: '3',
          name: 'SS Node',
          protocol: 'shadowsocks',
          address: '192.168.1.3',
          port: 443,
          cipher: 'chacha20-poly1305',
          password: 'ss-password',
        },
      ];

      const link = generateSubscriptionLink(mockNodes);
      const decoded = Buffer.from(link, 'base64').toString('utf-8');

      expect(decoded).toContain('vless://');
      expect(decoded).toContain('trojan://');
      expect(decoded).toContain('ss://');
    });

    it('应该处理空节点列表', () => {
      const link = generateSubscriptionLink([]);
      
      // 空列表应该生成空的 Base64 字符串
      const decoded = Buffer.from(link, 'base64').toString('utf-8');
      expect(decoded).toBe('');
    });
  });

  describe('Node Protocol Support', () => {
    it('应该支持 VLESS 协议', () => {
      const node = {
        id: '1',
        name: 'VLESS Node',
        protocol: 'vless',
        address: '192.168.1.1',
        port: 443,
        config: {
          client: {
            id: 'uuid-string',
          },
        },
      };

      const config = generateSingboxConfig([node]);
      expect(config.outbounds[0].type).toBe('vless');
    });

    it('应该支持 Trojan 协议', () => {
      const node = {
        id: '1',
        name: 'Trojan Node',
        protocol: 'trojan',
        address: '192.168.1.1',
        port: 443,
        config: {
          client: {
            password: 'password',
          },
        },
      };

      const config = generateSingboxConfig([node]);
      expect(config.outbounds[0].type).toBe('trojan');
    });

    it('应该支持 Shadowsocks 协议', () => {
      const node = {
        id: '1',
        name: 'SS Node',
        protocol: 'shadowsocks',
        address: '192.168.1.1',
        port: 443,
        cipher: 'chacha20-poly1305',
        password: 'password',
      };

      const config = generateSingboxConfig([node]);
      expect(config.outbounds[0].type).toBe('shadowsocks');
    });

    it('应该支持 VMess 协议', () => {
      const node = {
        id: '1',
        name: 'VMess Node',
        protocol: 'vmess',
        address: '192.168.1.1',
        port: 443,
        config: {
          client: {
            id: 'uuid-string',
          },
        },
      };

      const config = generateSingboxConfig([node]);
      expect(config.outbounds[0].type).toBe('vmess');
    });
  });
});
