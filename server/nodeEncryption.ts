import crypto from "crypto";

/**
 * 节点加密模块
 * 使用 AES-256-GCM 加密节点配置，确保客户端安全获取节点信息
 */

// 从环境变量获取加密密钥，如果不存在则生成一个默认密钥
const ENCRYPTION_KEY = process.env.NODE_ENCRYPTION_KEY || "log-vpn-default-encryption-key-32-chars";
const ALGORITHM = "aes-256-gcm";
const IV_LENGTH = 16; // 初始化向量长度
const AUTH_TAG_LENGTH = 16; // 认证标签长度

/**
 * 验证加密密钥长度
 */
function getEncryptionKey(): Buffer {
  const key = ENCRYPTION_KEY.padEnd(32, "0").slice(0, 32);
  return Buffer.from(key, "utf-8");
}

/**
 * 加密节点数据
 * @param data 要加密的节点数据对象
 * @returns 加密后的数据（Base64 编码）
 */
export function encryptNodeData(data: Record<string, any>): string {
  try {
    const plaintext = JSON.stringify(data);
    const key = getEncryptionKey();
    const iv = crypto.randomBytes(IV_LENGTH);

    const cipher = crypto.createCipheriv(ALGORITHM, key, iv);
    let encrypted = cipher.update(plaintext, "utf-8", "hex");
    encrypted += cipher.final("hex");

    const authTag = cipher.getAuthTag();

    // 将 IV + 认证标签 + 加密数据组合
    const combined = Buffer.concat([iv, authTag, Buffer.from(encrypted, "hex")]);
    return combined.toString("base64");
  } catch (error) {
    console.error("Node encryption error:", error);
    throw new Error("Failed to encrypt node data");
  }
}

/**
 * 解密节点数据
 * @param encryptedData Base64 编码的加密数据
 * @returns 解密后的节点数据对象
 */
export function decryptNodeData(encryptedData: string): Record<string, any> {
  try {
    const key = getEncryptionKey();
    const combined = Buffer.from(encryptedData, "base64");

    // 提取 IV、认证标签和加密数据
    const iv = combined.slice(0, IV_LENGTH);
    const authTag = combined.slice(IV_LENGTH, IV_LENGTH + AUTH_TAG_LENGTH);
    const encrypted = combined.slice(IV_LENGTH + AUTH_TAG_LENGTH);

    const decipher = crypto.createDecipheriv(ALGORITHM, key, iv);
    decipher.setAuthTag(authTag);

    let decrypted = decipher.update(encrypted.toString("hex"), "hex", "utf-8");
    decrypted += decipher.final("utf-8");

    return JSON.parse(decrypted);
  } catch (error) {
    console.error("Node decryption error:", error);
    throw new Error("Failed to decrypt node data");
  }
}

/**
 * 批量加密节点列表
 * @param nodes 节点数组
 * @returns 加密后的节点数组
 */
export function encryptNodeList(
  nodes: Array<{
    id: string;
    name: string;
    protocol: string;
    address: string;
    port: number;
    [key: string]: any;
  }>
): Array<{
  id: string;
  name: string;
  encryptedData: string;
}> {
  return nodes.map((node) => ({
    id: node.id,
    name: node.name, // 仅保留节点名称未加密
    encryptedData: encryptNodeData({
      protocol: node.protocol,
      address: node.address,
      port: node.port,
      ...Object.fromEntries(
        Object.entries(node).filter(
          ([key]) => !["id", "name", "protocol", "address", "port"].includes(key)
        )
      ),
    }),
  }));
}

/**
 * 生成加密密钥（用于初始化）
 */
export function generateEncryptionKey(): string {
  return crypto.randomBytes(32).toString("hex");
}

/**
 * 验证加密数据完整性
 * @param encryptedData Base64 编码的加密数据
 * @returns 是否有效
 */
export function isValidEncryptedData(encryptedData: string): boolean {
  try {
    const combined = Buffer.from(encryptedData, "base64");
    // 最小长度：IV(16) + AuthTag(16) + 加密数据(至少1字节)
    return combined.length >= IV_LENGTH + AUTH_TAG_LENGTH + 1;
  } catch {
    return false;
  }
}
