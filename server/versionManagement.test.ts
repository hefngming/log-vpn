import { describe, it, expect } from 'vitest';
import {
  compareVersions,
  getLatestVersion,
  checkForUpdate,
  getVersionInfo,
  getAllVersions,
  isValidVersion,
  getUpdateHistory,
  isMandatoryUpdate,
} from './versionManagement';

describe('Version Management', () => {
  describe('compareVersions', () => {
    it('should correctly compare semantic versions', () => {
      expect(compareVersions('1.0.0', '1.0.1')).toBe(-1);
      expect(compareVersions('1.0.1', '1.0.0')).toBe(1);
      expect(compareVersions('1.0.0', '1.0.0')).toBe(0);
      expect(compareVersions('1.0.0', '2.0.0')).toBe(-1);
      expect(compareVersions('2.0.0', '1.0.0')).toBe(1);
    });

    it('should handle different version lengths', () => {
      expect(compareVersions('1.0', '1.0.0')).toBe(0);
      expect(compareVersions('1.0.0', '1.0')).toBe(0);
      expect(compareVersions('1', '1.0.0')).toBe(0);
    });
  });

  describe('getLatestVersion', () => {
    it('should return the latest version', () => {
      const latest = getLatestVersion();
      expect(latest).toBeDefined();
      expect(isValidVersion(latest)).toBe(true);
    });
  });

  describe('checkForUpdate', () => {
    it('should detect available updates', () => {
      const result = checkForUpdate('1.0.0');
      expect(result.currentVersion).toBe('1.0.0');
      expect(result.latestVersion).toBeDefined();
      expect(typeof result.hasUpdate).toBe('boolean');
    });

    it('should return update info when update is available', () => {
      const result = checkForUpdate('1.0.0');
      if (result.hasUpdate) {
        expect(result.updateInfo).toBeDefined();
        expect(result.updateInfo?.version).toBeDefined();
        expect(result.updateInfo?.downloadUrl).toBeDefined();
      }
    });

    it('should indicate no update when on latest version', () => {
      const latest = getLatestVersion();
      const result = checkForUpdate(latest);
      expect(result.hasUpdate).toBe(false);
    });
  });

  describe('getVersionInfo', () => {
    it('should return version info for existing version', () => {
      const info = getVersionInfo('1.0.0');
      expect(info).toBeDefined();
      expect(info?.version).toBe('1.0.0');
      expect(info?.downloadUrl).toBeDefined();
    });

    it('should return null for non-existent version', () => {
      const info = getVersionInfo('99.99.99');
      expect(info).toBeNull();
    });
  });

  describe('getAllVersions', () => {
    it('should return all versions sorted in descending order', () => {
      const versions = getAllVersions();
      expect(versions.length).toBeGreaterThan(0);
      
      for (let i = 0; i < versions.length - 1; i++) {
        expect(compareVersions(versions[i].version, versions[i + 1].version)).toBeGreaterThanOrEqual(0);
      }
    });

    it('should include version info for each version', () => {
      const versions = getAllVersions();
      versions.forEach((v) => {
        expect(v.version).toBeDefined();
        expect(v.releaseDate).toBeDefined();
        expect(v.downloadUrl).toBeDefined();
        expect(v.releaseNotes).toBeDefined();
      });
    });
  });

  describe('isValidVersion', () => {
    it('should validate correct semantic versions', () => {
      expect(isValidVersion('1.0.0')).toBe(true);
      expect(isValidVersion('0.0.1')).toBe(true);
      expect(isValidVersion('10.20.30')).toBe(true);
    });

    it('should reject invalid versions', () => {
      expect(isValidVersion('1.0')).toBe(false);
      expect(isValidVersion('1')).toBe(false);
      expect(isValidVersion('1.0.0.0')).toBe(false);
      expect(isValidVersion('v1.0.0')).toBe(false);
      expect(isValidVersion('abc')).toBe(false);
    });
  });

  describe('getUpdateHistory', () => {
    it('should return versions between two versions', () => {
      const history = getUpdateHistory('1.0.0', '1.1.0');
      expect(Array.isArray(history)).toBe(true);
      
      history.forEach((v) => {
        const cmp1 = compareVersions(v.version, '1.0.0');
        const cmp2 = compareVersions(v.version, '1.1.0');
        expect(cmp1).toBeGreaterThan(0);
        expect(cmp2).toBeLessThanOrEqual(0);
      });
    });

    it('should return empty array when no versions in range', () => {
      const history = getUpdateHistory('1.1.0', '1.0.0');
      expect(history).toEqual([]);
    });
  });

  describe('isMandatoryUpdate', () => {
    it('should identify mandatory updates', () => {
      const isMandatory = isMandatoryUpdate('1.1.0');
      expect(typeof isMandatory).toBe('boolean');
    });

    it('should return false for non-existent versions', () => {
      const isMandatory = isMandatoryUpdate('99.99.99');
      expect(isMandatory).toBe(false);
    });
  });
});
