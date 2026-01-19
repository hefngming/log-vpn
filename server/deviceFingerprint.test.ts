import { describe, it, expect } from 'vitest';
import {
  generateDeviceFingerprint,
  isValidFingerprint,
  createFingerprintFromDeviceData,
  calculateFreeTrialExpiration,
  isFingerprintExpired,
  summarizeDeviceCharacteristics,
  DeviceCharacteristics,
} from './deviceFingerprint';

describe('Device Fingerprinting', () => {
  describe('generateDeviceFingerprint', () => {
    it('should generate a valid SHA256 hash', () => {
      const characteristics: DeviceCharacteristics = {
        userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)',
        screenResolution: '1920x1080',
        timezone: 'Asia/Shanghai',
        language: 'zh-CN',
        hardwareInfo: {
          cores: 8,
          memory: 16,
          platform: 'Win32',
        },
      };

      const fingerprint = generateDeviceFingerprint(characteristics);
      expect(fingerprint).toMatch(/^[a-f0-9]{64}$/);
    });

    it('should generate consistent fingerprints for same characteristics', () => {
      const characteristics: DeviceCharacteristics = {
        userAgent: 'Mozilla/5.0',
        screenResolution: '1920x1080',
        timezone: 'UTC',
        language: 'en',
        hardwareInfo: { cores: 4, memory: 8 },
      };

      const fp1 = generateDeviceFingerprint(characteristics);
      const fp2 = generateDeviceFingerprint(characteristics);
      expect(fp1).toBe(fp2);
    });

    it('should generate different fingerprints for different characteristics', () => {
      const char1: DeviceCharacteristics = {
        userAgent: 'Mozilla/5.0',
        screenResolution: '1920x1080',
        timezone: 'UTC',
        language: 'en',
        hardwareInfo: { cores: 4 },
      };

      const char2: DeviceCharacteristics = {
        userAgent: 'Mozilla/5.0',
        screenResolution: '1024x768',
        timezone: 'UTC',
        language: 'en',
        hardwareInfo: { cores: 4 },
      };

      const fp1 = generateDeviceFingerprint(char1);
      const fp2 = generateDeviceFingerprint(char2);
      expect(fp1).not.toBe(fp2);
    });
  });

  describe('isValidFingerprint', () => {
    it('should validate correct SHA256 hash', () => {
      const validHash = 'a'.repeat(64);
      expect(isValidFingerprint(validHash)).toBe(true);
    });

    it('should reject invalid hashes', () => {
      expect(isValidFingerprint('invalid')).toBe(false);
      expect(isValidFingerprint('a'.repeat(63))).toBe(false);
      expect(isValidFingerprint('g'.repeat(64))).toBe(false);
    });
  });

  describe('createFingerprintFromDeviceData', () => {
    it('should create fingerprint from device data', () => {
      const data = {
        userAgent: 'Mozilla/5.0',
        screenWidth: 1920,
        screenHeight: 1080,
        timezone: 'UTC',
        language: 'en',
        cores: 4,
        memory: 8,
        platform: 'Linux',
      };

      const fingerprint = createFingerprintFromDeviceData(data);
      expect(isValidFingerprint(fingerprint)).toBe(true);
    });

    it('should handle missing device data gracefully', () => {
      const data = {};
      const fingerprint = createFingerprintFromDeviceData(data);
      expect(isValidFingerprint(fingerprint)).toBe(true);
    });
  });

  describe('calculateFreeTrialExpiration', () => {
    it('should return a date 1 day from now', () => {
      const now = new Date();
      const expiration = calculateFreeTrialExpiration();
      const diffMs = expiration.getTime() - now.getTime();
      const diffDays = diffMs / (1000 * 60 * 60 * 24);

      expect(diffDays).toBeGreaterThan(0.999);
      expect(diffDays).toBeLessThan(1.001);
    });
  });

  describe('isFingerprintExpired', () => {
    it('should return false for future dates', () => {
      const futureDate = new Date(Date.now() + 1000 * 60 * 60);
      expect(isFingerprintExpired(futureDate)).toBe(false);
    });

    it('should return true for past dates', () => {
      const pastDate = new Date(Date.now() - 1000 * 60 * 60);
      expect(isFingerprintExpired(pastDate)).toBe(true);
    });

    it('should return true for past time', () => {
      const pastTime = new Date(Date.now() - 1);
      expect(isFingerprintExpired(pastTime)).toBe(true);
    });
  });

  describe('summarizeDeviceCharacteristics', () => {
    it('should create a readable summary', () => {
      const characteristics: DeviceCharacteristics = {
        userAgent: 'Mozilla/5.0',
        screenResolution: '1920x1080',
        timezone: 'Asia/Shanghai',
        language: 'zh-CN',
        hardwareInfo: { cores: 8 },
      };

      const summary = summarizeDeviceCharacteristics(characteristics);
      expect(summary).toContain('1920x1080');
      expect(summary).toContain('Asia/Shanghai');
      expect(summary).toContain('zh-CN');
    });
  });
});
