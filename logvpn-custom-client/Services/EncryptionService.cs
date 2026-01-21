using System;
using System.Security.Cryptography;
using System.Text;

namespace LogVPN.Services
{
    /// <summary>
    /// 加密服务
    /// 提供 AES-256-CBC 加密和解密功能
    /// </summary>
    public static class EncryptionService
    {
        private const string EncryptionKey = "logvpn-encryption-key-2024-secret"; // 32 字节密钥
        private const string EncryptionIV = "logvpn-iv-2024--"; // 16 字节 IV

        /// <summary>
        /// AES-256-CBC 加密
        /// </summary>
        public static string EncryptAES256CBC(string plainText)
        {
            try
            {
                using (var aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes(EncryptionKey);
                    aes.IV = Encoding.UTF8.GetBytes(EncryptionIV);
                    aes.Mode = CipherMode.CBC;
                    aes.Padding = PaddingMode.PKCS7;

                    using (var encryptor = aes.CreateEncryptor(aes.Key, aes.IV))
                    {
                        var plainBytes = Encoding.UTF8.GetBytes(plainText);
                        var encryptedBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);
                        return Convert.ToBase64String(encryptedBytes);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"加密失败: {ex.Message}");
            }
        }

        /// <summary>
        /// AES-256-CBC 解密
        /// </summary>
        public static string DecryptAES256CBC(string cipherText)
        {
            try
            {
                using (var aes = Aes.Create())
                {
                    aes.Key = Encoding.UTF8.GetBytes(EncryptionKey);
                    aes.IV = Encoding.UTF8.GetBytes(EncryptionIV);
                    aes.Mode = CipherMode.CBC;
                    aes.Padding = PaddingMode.PKCS7;

                    using (var decryptor = aes.CreateDecryptor(aes.Key, aes.IV))
                    {
                        var cipherBytes = Convert.FromBase64String(cipherText);
                        var decryptedBytes = decryptor.TransformFinalBlock(cipherBytes, 0, cipherBytes.Length);
                        return Encoding.UTF8.GetString(decryptedBytes);
                    }
                }
            }
            catch (Exception ex)
            {
                throw new Exception($"解密失败: {ex.Message}");
            }
        }

        /// <summary>
        /// MD5 哈希
        /// </summary>
        public static string ComputeMD5(string input)
        {
            using (var md5 = MD5.Create())
            {
                var hash = md5.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder();
                foreach (var b in hash)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }

        /// <summary>
        /// SHA256 哈希
        /// </summary>
        public static string ComputeSHA256(string input)
        {
            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(input));
                var sb = new StringBuilder();
                foreach (var b in hash)
                {
                    sb.Append(b.ToString("x2"));
                }
                return sb.ToString();
            }
        }
    }
}
