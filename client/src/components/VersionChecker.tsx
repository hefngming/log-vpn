import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { AlertCircle, CheckCircle, Download, RefreshCw } from 'lucide-react';

interface VersionInfo {
  platform: string;
  version: string;
  filename: string;
  size: number;
  sizeDisplay: string;
  downloadUrl: string;
  md5: string;
  sha256: string;
  releaseDate: string;
  changelog: string[];
  requirements: string;
  mandatory: boolean;
}

interface VersionCheckerProps {
  currentVersion?: string;
  platform: 'Windows' | 'macOS';
  onUpdateAvailable?: (version: VersionInfo) => void;
}

export function VersionChecker({
  currentVersion = '1.0.0',
  platform,
  onUpdateAvailable,
}: VersionCheckerProps) {
  const [latestVersion, setLatestVersion] = useState<VersionInfo | null>(null);
  const [isChecking, setIsChecking] = useState(false);
  const [hasUpdate, setHasUpdate] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [lastCheckTime, setLastCheckTime] = useState<Date | null>(null);

  const compareVersions = (v1: string, v2: string): number => {
    const parts1 = v1.split('.').map(Number);
    const parts2 = v2.split('.').map(Number);

    for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
      const p1 = parts1[i] || 0;
      const p2 = parts2[i] || 0;
      if (p1 > p2) return 1;
      if (p1 < p2) return -1;
    }
    return 0;
  };

  const checkForUpdates = async () => {
    setIsChecking(true);
    setError(null);

    try {
      // 从 versions.json 获取版本信息
      const response = await fetch('/versions.json');
      if (!response.ok) {
        throw new Error('无法获取版本信息');
      }

      const data = await response.json();
      const versions: VersionInfo[] = data.versions || [];

      // 查找对应平台的版本
      const platformVersion = versions.find(
        (v) => v.platform === platform
      );

      if (!platformVersion) {
        throw new Error(`未找到 ${platform} 版本信息`);
      }

      setLatestVersion(platformVersion);
      setLastCheckTime(new Date());

      // 比较版本
      const comparison = compareVersions(platformVersion.version, currentVersion);
      if (comparison > 0) {
        setHasUpdate(true);
        onUpdateAvailable?.(platformVersion);
      } else {
        setHasUpdate(false);
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : '版本检查失败';
      setError(errorMessage);
      console.error('Version check error:', err);
    } finally {
      setIsChecking(false);
    }
  };

  useEffect(() => {
    // 组件挂载时自动检查版本
    checkForUpdates();
  }, [platform]);

  const formatDate = (dateString: string): string => {
    try {
      const date = new Date(dateString);
      return date.toLocaleDateString('zh-CN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
      });
    } catch {
      return dateString;
    }
  };

  if (!latestVersion) {
    return null;
  }

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-foreground">
          {hasUpdate ? (
            <>
              <AlertCircle className="w-5 h-5 text-yellow-500" />
              有新版本可用
            </>
          ) : (
            <>
              <CheckCircle className="w-5 h-5 text-green-500" />
              已是最新版本
            </>
          )}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Version Info */}
          <div className="grid grid-cols-2 gap-4 p-3 bg-secondary/50 rounded-lg">
            <div>
              <p className="text-xs text-muted-foreground">当前版本</p>
              <p className="text-sm font-medium text-foreground">v{currentVersion}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">最新版本</p>
              <p className="text-sm font-medium text-foreground">
                v{latestVersion.version}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">发布日期</p>
              <p className="text-sm font-medium text-foreground">
                {formatDate(latestVersion.releaseDate)}
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground">文件大小</p>
              <p className="text-sm font-medium text-foreground">
                {latestVersion.sizeDisplay}
              </p>
            </div>
          </div>

          {/* Changelog */}
          {latestVersion.changelog && latestVersion.changelog.length > 0 && (
            <div>
              <h4 className="font-medium text-foreground mb-2">更新内容</h4>
              <ul className="space-y-1">
                {latestVersion.changelog.map((item, index) => (
                  <li key={index} className="text-sm text-muted-foreground flex items-start gap-2">
                    <span className="text-primary mt-1">•</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Error Message */}
          {error && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {/* Mandatory Update Warning */}
          {hasUpdate && latestVersion.mandatory && (
            <div className="p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-lg">
              <p className="text-sm text-yellow-600">
                ⚠️ 此版本为强制更新，请立即升级以获得最佳体验和安全性。
              </p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {hasUpdate && (
              <a href={latestVersion.downloadUrl} target="_blank" rel="noopener noreferrer" className="flex-1">
                <Button className="w-full gradient-primary text-white border-0">
                  <Download className="w-4 h-4 mr-2" />
                  下载最新版本
                </Button>
              </a>
            )}

            <Button
              onClick={checkForUpdates}
              disabled={isChecking}
              variant="outline"
              className={hasUpdate ? 'flex-1' : 'w-full'}
            >
              <RefreshCw className={`w-4 h-4 mr-2 ${isChecking ? 'animate-spin' : ''}`} />
              {isChecking ? '检查中...' : '重新检查'}
            </Button>
          </div>

          {/* Last Check Time */}
          {lastCheckTime && (
            <p className="text-xs text-muted-foreground text-center">
              最后检查时间：{lastCheckTime.toLocaleTimeString('zh-CN')}
            </p>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
