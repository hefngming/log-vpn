/**
 * Version Management Module
 * Handles version checking and update management for Electron client
 */

export interface VersionInfo {
  version: string;
  releaseDate: string;
  downloadUrl: string;
  releaseNotes: string;
  mandatory: boolean;
  minVersion?: string; // Minimum version required to update to this version
}

export interface VersionCheckResponse {
  currentVersion: string;
  latestVersion: string;
  hasUpdate: boolean;
  updateInfo?: VersionInfo;
  message?: string;
}

// Current version of the application
const CURRENT_APP_VERSION = "1.0.0";

// Version history - in production, this would be stored in a database
const versionHistory: Record<string, VersionInfo> = {
  "1.0.0": {
    version: "1.0.0",
    releaseDate: "2026-01-19",
    downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_Installer.exe",
    releaseNotes: "Initial release with core VPN functionality",
    mandatory: false,
  },
  "1.0.1": {
    version: "1.0.1",
    releaseDate: "2026-01-20",
    downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_Installer_1.0.1.exe",
    releaseNotes: "Bug fixes and performance improvements",
    mandatory: false,
    minVersion: "1.0.0",
  },
  "1.1.0": {
    version: "1.1.0",
    releaseDate: "2026-02-01",
    downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_Installer_1.1.0.exe",
    releaseNotes: "Added automatic update checking and improved UI",
    mandatory: true,
    minVersion: "1.0.0",
  },
};

/**
 * Compare two semantic versions
 * Returns: -1 if v1 < v2, 0 if v1 == v2, 1 if v1 > v2
 */
export function compareVersions(v1: string, v2: string): number {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const part1 = parts1[i] || 0;
    const part2 = parts2[i] || 0;

    if (part1 < part2) return -1;
    if (part1 > part2) return 1;
  }

  return 0;
}

/**
 * Get the latest version available
 */
export function getLatestVersion(): string {
  const versions = Object.keys(versionHistory).sort((a, b) => {
    return compareVersions(b, a); // Sort in descending order
  });

  return versions[0] || CURRENT_APP_VERSION;
}

/**
 * Check if an update is available for the given version
 */
export function checkForUpdate(clientVersion: string): VersionCheckResponse {
  const latestVersion = getLatestVersion();
  const hasUpdate = compareVersions(clientVersion, latestVersion) < 0;

  const response: VersionCheckResponse = {
    currentVersion: clientVersion,
    latestVersion,
    hasUpdate,
  };

  if (hasUpdate && versionHistory[latestVersion]) {
    response.updateInfo = versionHistory[latestVersion];
  }

  return response;
}

/**
 * Get version information for a specific version
 */
export function getVersionInfo(version: string): VersionInfo | null {
  return versionHistory[version] || null;
}

/**
 * Get all available versions
 */
export function getAllVersions(): VersionInfo[] {
  return Object.values(versionHistory).sort((a, b) => {
    return compareVersions(b.version, a.version);
  });
}

/**
 * Add or update a version (for admin use)
 */
export function setVersionInfo(versionInfo: VersionInfo): void {
  versionHistory[versionInfo.version] = versionInfo;
}

/**
 * Validate if a version string is valid semantic version
 */
export function isValidVersion(version: string): boolean {
  const semverRegex = /^\d+\.\d+\.\d+$/;
  return semverRegex.test(version);
}

/**
 * Get update history between two versions
 */
export function getUpdateHistory(fromVersion: string, toVersion: string): VersionInfo[] {
  const versions = Object.values(versionHistory)
    .filter((v) => {
      const cmp1 = compareVersions(v.version, fromVersion);
      const cmp2 = compareVersions(v.version, toVersion);
      return cmp1 > 0 && cmp2 <= 0;
    })
    .sort((a, b) => compareVersions(b.version, a.version));

  return versions;
}

/**
 * Check if a version requires mandatory update
 */
export function isMandatoryUpdate(version: string): boolean {
  const versionInfo = versionHistory[version];
  return versionInfo?.mandatory || false;
}
