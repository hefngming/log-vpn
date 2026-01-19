/**
 * Device Fingerprinting Module
 * Generates and validates device fingerprints to prevent free trial abuse
 */

import crypto from 'crypto';

export interface DeviceCharacteristics {
  userAgent: string;
  screenResolution: string;
  timezone: string;
  language: string;
  hardwareInfo: {
    cores?: number;
    memory?: number;
    platform?: string;
  };
}

export function generateDeviceFingerprint(characteristics: DeviceCharacteristics): string {
  const fingerprintData = JSON.stringify({
    userAgent: characteristics.userAgent,
    screenResolution: characteristics.screenResolution,
    timezone: characteristics.timezone,
    language: characteristics.language,
    platform: characteristics.hardwareInfo.platform,
    cores: characteristics.hardwareInfo.cores,
  });

  return crypto
    .createHash('sha256')
    .update(fingerprintData)
    .digest('hex');
}

export function isValidFingerprint(fingerprint: string): boolean {
  return /^[a-f0-9]{64}$/.test(fingerprint);
}

export function createFingerprintFromDeviceData(data: {
  userAgent?: string;
  screenWidth?: number;
  screenHeight?: number;
  timezone?: string;
  language?: string;
  cores?: number;
  memory?: number;
  platform?: string;
}): string {
  const characteristics: DeviceCharacteristics = {
    userAgent: data.userAgent || 'unknown',
    screenResolution: `${data.screenWidth || 0}x${data.screenHeight || 0}`,
    timezone: data.timezone || 'unknown',
    language: data.language || 'unknown',
    hardwareInfo: {
      cores: data.cores,
      memory: data.memory,
      platform: data.platform,
    },
  };

  return generateDeviceFingerprint(characteristics);
}

export function calculateFreeTrialExpiration(): Date {
  const expiresAt = new Date();
  expiresAt.setDate(expiresAt.getDate() + 1);
  return expiresAt;
}

export function isFingerprintExpired(expiresAt: Date): boolean {
  return new Date() > expiresAt;
}

export function summarizeDeviceCharacteristics(characteristics: DeviceCharacteristics): string {
  return `Device: ${characteristics.screenResolution} | TZ: ${characteristics.timezone} | Lang: ${characteristics.language}`;
}
