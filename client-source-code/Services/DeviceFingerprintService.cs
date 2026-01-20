using System;
using System.Management;
using System.Security.Cryptography;
using System.Text;
using System.Net.NetworkInformation;
using System.Linq;

namespace LogVPN.Services
{
    /// <summary>
    /// 设备指纹识别服务
    /// 用于生成唯一的设备标识，防止免费试用滥用和账号共享
    /// </summary>
    public class DeviceFingerprintService
    {
        private static string _cachedFingerprint = null;
        
        /// <summary>
        /// 获取设备指纹（缓存版本）
        /// </summary>
        public static string GetDeviceFingerprint()
        {
            if (_cachedFingerprint != null)
            {
                return _cachedFingerprint;
            }
            
            _cachedFingerprint = GenerateDeviceFingerprint();
            return _cachedFingerprint;
        }
        
        /// <summary>
        /// 生成设备指纹
        /// 组合多个硬件标识生成唯一指纹
        /// </summary>
        private static string GenerateDeviceFingerprint()
        {
            try
            {
                var components = new StringBuilder();
                
                // 1. CPU ID
                components.Append(GetCpuId());
                components.Append("|");
                
                // 2. 硬盘序列号
                components.Append(GetDiskSerial());
                components.Append("|");
                
                // 3. 主板序列号
                components.Append(GetMotherboardSerial());
                components.Append("|");
                
                // 4. MAC 地址
                components.Append(GetMacAddress());
                
                // 生成 SHA256 哈希
                using (var sha256 = SHA256.Create())
                {
                    var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(components.ToString()));
                    return BitConverter.ToString(hash).Replace("-", "").ToLower();
                }
            }
            catch (Exception ex)
            {
                // 如果获取失败，使用机器名作为后备方案
                Console.WriteLine($"获取设备指纹失败: {ex.Message}");
                return GenerateFallbackFingerprint();
            }
        }
        
        /// <summary>
        /// 获取 CPU ID
        /// </summary>
        private static string GetCpuId()
        {
            try
            {
                using (var searcher = new ManagementObjectSearcher("SELECT ProcessorId FROM Win32_Processor"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        return obj["ProcessorId"]?.ToString() ?? "UNKNOWN_CPU";
                    }
                }
            }
            catch
            {
                return "UNKNOWN_CPU";
            }
            
            return "UNKNOWN_CPU";
        }
        
        /// <summary>
        /// 获取硬盘序列号
        /// </summary>
        private static string GetDiskSerial()
        {
            try
            {
                using (var searcher = new ManagementObjectSearcher("SELECT SerialNumber FROM Win32_DiskDrive"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        var serial = obj["SerialNumber"]?.ToString()?.Trim();
                        if (!string.IsNullOrEmpty(serial))
                        {
                            return serial;
                        }
                    }
                }
            }
            catch
            {
                return "UNKNOWN_DISK";
            }
            
            return "UNKNOWN_DISK";
        }
        
        /// <summary>
        /// 获取主板序列号
        /// </summary>
        private static string GetMotherboardSerial()
        {
            try
            {
                using (var searcher = new ManagementObjectSearcher("SELECT SerialNumber FROM Win32_BaseBoard"))
                {
                    foreach (ManagementObject obj in searcher.Get())
                    {
                        var serial = obj["SerialNumber"]?.ToString()?.Trim();
                        if (!string.IsNullOrEmpty(serial))
                        {
                            return serial;
                        }
                    }
                }
            }
            catch
            {
                return "UNKNOWN_BOARD";
            }
            
            return "UNKNOWN_BOARD";
        }
        
        /// <summary>
        /// 获取 MAC 地址
        /// </summary>
        private static string GetMacAddress()
        {
            try
            {
                var nics = NetworkInterface.GetAllNetworkInterfaces()
                    .Where(nic => nic.OperationalStatus == OperationalStatus.Up &&
                                  nic.NetworkInterfaceType != NetworkInterfaceType.Loopback)
                    .OrderBy(nic => nic.Name)
                    .ToList();
                
                if (nics.Count > 0)
                {
                    return nics[0].GetPhysicalAddress().ToString();
                }
            }
            catch
            {
                return "UNKNOWN_MAC";
            }
            
            return "UNKNOWN_MAC";
        }
        
        /// <summary>
        /// 生成后备指纹（使用机器名和用户名）
        /// </summary>
        private static string GenerateFallbackFingerprint()
        {
            var fallback = $"{Environment.MachineName}|{Environment.UserName}|{Environment.OSVersion}";
            
            using (var sha256 = SHA256.Create())
            {
                var hash = sha256.ComputeHash(Encoding.UTF8.GetBytes(fallback));
                return BitConverter.ToString(hash).Replace("-", "").ToLower();
            }
        }
        
        /// <summary>
        /// 验证设备指纹是否有效
        /// </summary>
        public static bool IsValidFingerprint(string fingerprint)
        {
            return !string.IsNullOrEmpty(fingerprint) && fingerprint.Length == 64;
        }
    }
}
