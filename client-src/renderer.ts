/**
 * Renderer Process Integration
 * Provides React hooks and utilities for Electron features
 */

import { useEffect, useState, useCallback } from 'react';

/**
 * Type definitions for Electron APIs
 */
interface ElectronAPI {
  checkForUpdates: () => void;
  onUpdateCheckResult: (callback: (result: UpdateCheckResult) => void) => void;
  getTrafficUsage: () => Promise<TrafficUsage | null>;
  startTrafficMonitor: () => Promise<{ success: boolean }>;
  stopTrafficMonitor: () => Promise<{ success: boolean }>;
  getTrafficConfig: () => Promise<TrafficMonitorConfig>;
  updateTrafficConfig: (config: Partial<TrafficMonitorConfig>) => Promise<{ success: boolean }>;
  onTrafficUpdate: (callback: (usage: TrafficUsage) => void) => void;
  getOnboardingStatus: () => Promise<OnboardingStatus>;
  updateOnboardingStatus: (status: OnboardingStatus) => Promise<{ success: boolean }>;
  skipOnboarding: () => Promise<{ success: boolean }>;
  getAppVersion: () => Promise<AppVersionInfo>;
  getAppPath: (name: string) => Promise<string>;
  openExternal: (url: string) => Promise<void>;
  showMessageBox: (options: any) => Promise<{ response: number }>;
}

interface UpdateCheckResult {
  hasUpdate: boolean;
  currentVersion: string;
  latestVersion: string;
  updateInfo?: {
    version: string;
    releaseDate: string;
    downloadUrl: string;
    releaseNotes: string;
    mandatory: boolean;
  };
}

interface TrafficUsage {
  dailyUsed: number;
  dailyLimit: number;
  dailyRemaining: number;
  dailyPercentage: number;
  monthlyUsed: number;
  monthlyLimit: number;
  monthlyRemaining: number;
  monthlyPercentage: number;
  isDailyLimitReached: boolean;
  isMonthlyLimitReached: boolean;
}

interface TrafficMonitorConfig {
  checkInterval: number;
  warningThreshold: number;
  criticalThreshold: number;
}

interface OnboardingStatus {
  completed: boolean;
  currentStep: number;
  skipped: boolean;
  skippedAt?: string;
}

interface AppVersionInfo {
  version: string;
  platform: string;
  arch: string;
}

/**
 * Get Electron API
 */
export function getElectronAPI(): ElectronAPI | null {
  if (typeof window !== 'undefined' && (window as any).electron) {
    return (window as any).electron;
  }
  return null;
}

/**
 * Check if running in Electron
 */
export function isElectron(): boolean {
  return getElectronAPI() !== null;
}

/**
 * Hook for auto-update checking
 */
export function useAutoUpdate() {
  const [hasUpdate, setHasUpdate] = useState(false);
  const [updateInfo, setUpdateInfo] = useState<UpdateCheckResult['updateInfo'] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const api = getElectronAPI();

  useEffect(() => {
    if (!api) return;

    // Listen for update check results
    api.onUpdateCheckResult((result) => {
      setHasUpdate(result.hasUpdate);
      if (result.updateInfo) {
        setUpdateInfo(result.updateInfo);
      }
      setIsLoading(false);
    });
  }, [api]);

  const checkForUpdates = useCallback(() => {
    if (!api) return;
    setIsLoading(true);
    api.checkForUpdates();
  }, [api]);

  return {
    hasUpdate,
    updateInfo,
    isLoading,
    checkForUpdates,
  };
}

/**
 * Hook for traffic monitoring
 */
export function useTrafficMonitoring() {
  const [trafficUsage, setTrafficUsage] = useState<TrafficUsage | null>(null);
  const [isMonitoring, setIsMonitoring] = useState(false);
  const [config, setConfig] = useState<TrafficMonitorConfig | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const api = getElectronAPI();

  useEffect(() => {
    if (!api) return;

    // Listen for traffic updates
    api.onTrafficUpdate((usage) => {
      setTrafficUsage(usage);
    });

    // Get initial config
    api.getTrafficConfig().then(setConfig).catch(console.error);
  }, [api]);

  const startMonitoring = useCallback(async () => {
    if (!api) return;
    setIsLoading(true);
    try {
      const result = await api.startTrafficMonitor();
      if (result.success) {
        setIsMonitoring(true);
      }
    } catch (error) {
      console.error('Failed to start traffic monitor:', error);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  const stopMonitoring = useCallback(async () => {
    if (!api) return;
    setIsLoading(true);
    try {
      const result = await api.stopTrafficMonitor();
      if (result.success) {
        setIsMonitoring(false);
      }
    } catch (error) {
      console.error('Failed to stop traffic monitor:', error);
    } finally {
      setIsLoading(false);
    }
  }, [api]);

  const updateConfig = useCallback(
    async (newConfig: Partial<TrafficMonitorConfig>) => {
      if (!api) return;
      try {
        const result = await api.updateTrafficConfig(newConfig);
        if (result.success) {
          setConfig((prev) => (prev ? { ...prev, ...newConfig } : null));
        }
      } catch (error) {
        console.error('Failed to update traffic config:', error);
      }
    },
    [api]
  );

  return {
    trafficUsage,
    isMonitoring,
    config,
    isLoading,
    startMonitoring,
    stopMonitoring,
    updateConfig,
  };
}

/**
 * Hook for onboarding management
 */
export function useOnboarding() {
  const [status, setStatus] = useState<OnboardingStatus | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const api = getElectronAPI();

  useEffect(() => {
    if (!api) {
      setIsLoading(false);
      return;
    }

    // Load onboarding status
    api
      .getOnboardingStatus()
      .then(setStatus)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [api]);

  const updateStatus = useCallback(
    async (newStatus: Partial<OnboardingStatus>) => {
      if (!api || !status) return;

      const updatedStatus = { ...status, ...newStatus };
      try {
        const result = await api.updateOnboardingStatus(updatedStatus);
        if (result.success) {
          setStatus(updatedStatus);
        }
      } catch (error) {
        console.error('Failed to update onboarding status:', error);
      }
    },
    [api, status]
  );

  const skipOnboarding = useCallback(async () => {
    if (!api) return;

    try {
      const result = await api.skipOnboarding();
      if (result.success) {
        setStatus({
          completed: false,
          currentStep: 0,
          skipped: true,
        });
      }
    } catch (error) {
      console.error('Failed to skip onboarding:', error);
    }
  }, [api]);

  const completeStep = useCallback(
    async (stepNumber: number) => {
      await updateStatus({ currentStep: stepNumber + 1 });
    },
    [updateStatus]
  );

  const completeOnboarding = useCallback(async () => {
    await updateStatus({ completed: true, currentStep: 0 });
  }, [updateStatus]);

  return {
    status,
    isLoading,
    updateStatus,
    skipOnboarding,
    completeStep,
    completeOnboarding,
  };
}

/**
 * Hook for app information
 */
export function useAppInfo() {
  const [version, setVersion] = useState<AppVersionInfo | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const api = getElectronAPI();

  useEffect(() => {
    if (!api) {
      setIsLoading(false);
      return;
    }

    api
      .getAppVersion()
      .then(setVersion)
      .catch(console.error)
      .finally(() => setIsLoading(false));
  }, [api]);

  return {
    version,
    isLoading,
  };
}

/**
 * Export all utilities
 */
export default {
  getElectronAPI,
  isElectron,
  useAutoUpdate,
  useTrafficMonitoring,
  useOnboarding,
  useAppInfo,
};
