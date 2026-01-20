import { describe, it, expect } from "vitest";
import {
  encryptNodeData,
  decryptNodeData,
  encryptNodeList,
  isValidEncryptedData,
  generateEncryptionKey,
} from "./nodeEncryption";

describe("Node Encryption Module", () => {
  describe("encryptNodeData and decryptNodeData", () => {
    it("should encrypt and decrypt node data correctly", () => {
      const testData = {
        protocol: "vless",
        address: "example.com",
        port: 443,
        uuid: "test-uuid-123",
      };

      const encrypted = encryptNodeData(testData);
      const decrypted = decryptNodeData(encrypted);

      expect(decrypted).toEqual(testData);
    });

    it("should produce different encrypted output for same data", () => {
      const testData = { protocol: "trojan", address: "test.com", port: 8443 };

      const encrypted1 = encryptNodeData(testData);
      const encrypted2 = encryptNodeData(testData);

      expect(encrypted1).not.toBe(encrypted2); // Different due to random IV
    });

    it("should handle complex nested objects", () => {
      const testData = {
        protocol: "vmess",
        address: "server.com",
        port: 10086,
        settings: {
          clients: [{ id: "uuid-1", level: 0 }],
          decryption: "none",
        },
      };

      const encrypted = encryptNodeData(testData);
      const decrypted = decryptNodeData(encrypted);

      expect(decrypted).toEqual(testData);
    });

    it("should throw error on invalid encrypted data", () => {
      expect(() => decryptNodeData("invalid-base64-data")).toThrow();
    });

    it("should throw error on corrupted encrypted data", () => {
      const testData = { protocol: "vless", address: "test.com", port: 443 };
      const encrypted = encryptNodeData(testData);

      // Corrupt the encrypted data
      const corrupted = Buffer.from(encrypted, "base64");
      corrupted[20] = corrupted[20] ^ 0xff; // Flip bits
      const corruptedBase64 = corrupted.toString("base64");

      expect(() => decryptNodeData(corruptedBase64)).toThrow();
    });
  });

  describe("encryptNodeList", () => {
    it("should encrypt node list while preserving names", () => {
      const nodes = [
        {
          id: "1",
          name: "Node 1",
          protocol: "vless",
          address: "server1.com",
          port: 443,
        },
        {
          id: "2",
          name: "Node 2",
          protocol: "trojan",
          address: "server2.com",
          port: 8443,
        },
      ];

      const encrypted = encryptNodeList(nodes);

      expect(encrypted).toHaveLength(2);
      expect(encrypted[0].name).toBe("Node 1");
      expect(encrypted[1].name).toBe("Node 2");
      expect(encrypted[0].id).toBe("1");
      expect(encrypted[1].id).toBe("2");
      expect(encrypted[0].encryptedData).toBeTruthy();
      expect(encrypted[1].encryptedData).toBeTruthy();
    });

    it("should encrypt protocol and address but not name", () => {
      const nodes = [
        {
          id: "1",
          name: "Public Node Name",
          protocol: "vless",
          address: "secret-server.com",
          port: 443,
        },
      ];

      const encrypted = encryptNodeList(nodes);
      const decrypted = decryptNodeData(encrypted[0].encryptedData);

      expect(encrypted[0].name).toBe("Public Node Name");
      expect(decrypted.protocol).toBe("vless");
      expect(decrypted.address).toBe("secret-server.com");
      expect(decrypted.port).toBe(443);
    });

    it("should handle empty node list", () => {
      const encrypted = encryptNodeList([]);
      expect(encrypted).toEqual([]);
    });

    it("should preserve additional node properties", () => {
      const nodes = [
        {
          id: "1",
          name: "Node 1",
          protocol: "vless",
          address: "server.com",
          port: 443,
          country: "US",
          countryCode: "us",
          settings: '{"custom": "value"}',
        },
      ];

      const encrypted = encryptNodeList(nodes);
      const decrypted = decryptNodeData(encrypted[0].encryptedData);

      expect(decrypted.country).toBe("US");
      expect(decrypted.countryCode).toBe("us");
      expect(decrypted.settings).toBe('{"custom": "value"}');
    });
  });

  describe("isValidEncryptedData", () => {
    it("should validate correct encrypted data", () => {
      const testData = { protocol: "vless", address: "test.com", port: 443 };
      const encrypted = encryptNodeData(testData);

      expect(isValidEncryptedData(encrypted)).toBe(true);
    });

    it("should reject invalid base64", () => {
      expect(isValidEncryptedData("not-valid-base64!!!")).toBe(false);
    });

    it("should reject too short data", () => {
      const shortData = Buffer.alloc(10).toString("base64");
      expect(isValidEncryptedData(shortData)).toBe(false);
    });

    it("should reject empty string", () => {
      expect(isValidEncryptedData("")).toBe(false);
    });
  });

  describe("generateEncryptionKey", () => {
    it("should generate valid encryption key", () => {
      const key = generateEncryptionKey();

      expect(key).toBeTruthy();
      expect(key.length).toBe(64); // 32 bytes in hex = 64 chars
      expect(/^[0-9a-f]+$/.test(key)).toBe(true);
    });

    it("should generate different keys each time", () => {
      const key1 = generateEncryptionKey();
      const key2 = generateEncryptionKey();

      expect(key1).not.toBe(key2);
    });
  });

  describe("Integration Tests", () => {
    it("should handle real-world node scenario", () => {
      const nodes = [
        {
          id: "vless-1",
          name: "🇺🇸 US Server 1",
          protocol: "vless",
          address: "us1.example.com",
          port: 443,
          country: "United States",
          countryCode: "us",
          settings: JSON.stringify({
            uuid: "550e8400-e29b-41d4-a716-446655440000",
            encryption: "none",
            flow: "xtls-rprx-vision",
          }),
        },
        {
          id: "trojan-1",
          name: "🇭🇰 HK Server 1",
          protocol: "trojan",
          address: "hk1.example.com",
          port: 8443,
          country: "Hong Kong",
          countryCode: "hk",
          settings: JSON.stringify({
            password: "secret-password",
            sni: "example.com",
          }),
        },
      ];

      const encrypted = encryptNodeList(nodes);

      // Verify structure
      expect(encrypted).toHaveLength(2);
      expect(encrypted[0].name).toBe("🇺🇸 US Server 1");
      expect(encrypted[1].name).toBe("🇭🇰 HK Server 1");

      // Verify decryption
      const decrypted1 = decryptNodeData(encrypted[0].encryptedData);
      const decrypted2 = decryptNodeData(encrypted[1].encryptedData);

      expect(decrypted1.protocol).toBe("vless");
      expect(decrypted1.address).toBe("us1.example.com");
      expect(decrypted2.protocol).toBe("trojan");
      expect(decrypted2.address).toBe("hk1.example.com");
    });
  });
});
