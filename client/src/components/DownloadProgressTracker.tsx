import React, { useState, useRef, useEffect } from 'react';
import { Progress } from '@/components/ui/progress';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Download, X, Check, AlertCircle } from 'lucide-react';

interface DownloadProgressTrackerProps {
  url: string;
  filename: string;
  fileSize: number;
  onComplete?: () => void;
  onError?: (error: Error) => void;
}

interface DownloadState {
  isDownloading: boolean;
  progress: number;
  downloadedSize: number;
  speed: number; // bytes per second
  timeRemaining: number; // seconds
  isComplete: boolean;
  hasError: boolean;
  errorMessage: string;
}

export function DownloadProgressTracker({
  url,
  filename,
  fileSize,
  onComplete,
  onError,
}: DownloadProgressTrackerProps) {
  const [state, setState] = useState<DownloadState>({
    isDownloading: false,
    progress: 0,
    downloadedSize: 0,
    speed: 0,
    timeRemaining: 0,
    isComplete: false,
    hasError: false,
    errorMessage: '',
  });

  const abortControllerRef = useRef<AbortController | null>(null);
  const startTimeRef = useRef<number>(0);
  const lastUpdateRef = useRef<{ time: number; size: number }>({ time: 0, size: 0 });

  const formatBytes = (bytes: number): string => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  const formatSpeed = (bytesPerSecond: number): string => {
    return formatBytes(bytesPerSecond) + '/s';
  };

  const formatTime = (seconds: number): string => {
    if (seconds <= 0) return '计算中...';
    if (seconds < 60) return `${Math.ceil(seconds)}秒`;
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.ceil(seconds % 60);
    if (minutes < 60) return `${minutes}分${remainingSeconds}秒`;
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    return `${hours}小时${remainingMinutes}分`;
  };

  const handleDownload = async () => {
    try {
      setState((prev) => ({
        ...prev,
        isDownloading: true,
        hasError: false,
        errorMessage: '',
        progress: 0,
        downloadedSize: 0,
      }));

      abortControllerRef.current = new AbortController();
      startTimeRef.current = Date.now();
      lastUpdateRef.current = { time: Date.now(), size: 0 };

      const response = await fetch(url, {
        signal: abortControllerRef.current.signal,
      });

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: ${response.statusText}`);
      }

      if (!response.body) {
        throw new Error('响应体为空');
      }

      const reader = response.body.getReader();
      let downloadedSize = 0;
      const chunks: Uint8Array[] = [];

      while (true) {
        const { done, value } = await reader.read();

        if (done) break;

        if (value) {
          chunks.push(new Uint8Array(value));
          downloadedSize += value.length;
        }

        const progress = (downloadedSize / fileSize) * 100;
        const now = Date.now();
        const timeDiff = (now - lastUpdateRef.current.time) / 1000;
        const sizeDiff = downloadedSize - lastUpdateRef.current.size;
        const speed = timeDiff > 0 ? sizeDiff / timeDiff : 0;
        const timeRemaining = speed > 0 ? (fileSize - downloadedSize) / speed : 0;

        if (timeDiff > 0.5) {
          setState((prev) => ({
            ...prev,
            progress: Math.min(progress, 99),
            downloadedSize,
            speed,
            timeRemaining,
          }));
          lastUpdateRef.current = { time: now, size: downloadedSize };
        }
      }

      // 创建 Blob 并触发下载
      const blob = new Blob(chunks as BlobPart[], { type: 'application/octet-stream' });
      const link = document.createElement('a');
      link.href = URL.createObjectURL(blob);
      link.download = filename;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(link.href);

      setState((prev) => ({
        ...prev,
        progress: 100,
        downloadedSize: fileSize,
        isDownloading: false,
        isComplete: true,
      }));

      onComplete?.();
    } catch (error) {
      if (error instanceof Error && error.name === 'AbortError') {
        setState((prev) => ({
          ...prev,
          isDownloading: false,
          hasError: true,
          errorMessage: '下载已取消',
        }));
      } else {
        const errorMessage = error instanceof Error ? error.message : '下载失败';
        setState((prev) => ({
          ...prev,
          isDownloading: false,
          hasError: true,
          errorMessage,
        }));
        onError?.(error instanceof Error ? error : new Error(String(error)));
      }
    }
  };

  const handleCancel = () => {
    abortControllerRef.current?.abort();
    setState((prev) => ({
      ...prev,
      isDownloading: false,
      hasError: true,
      errorMessage: '下载已取消',
    }));
  };

  const handleReset = () => {
    setState({
      isDownloading: false,
      progress: 0,
      downloadedSize: 0,
      speed: 0,
      timeRemaining: 0,
      isComplete: false,
      hasError: false,
      errorMessage: '',
    });
  };

  return (
    <Card className="bg-card border-border">
      <CardContent className="p-6">
        <div className="space-y-4">
          {/* Status Header */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              {state.isComplete && (
                <Check className="w-5 h-5 text-green-500" />
              )}
              {state.hasError && (
                <AlertCircle className="w-5 h-5 text-red-500" />
              )}
              {state.isDownloading && (
                <Download className="w-5 h-5 text-primary animate-bounce" />
              )}
              <span className="font-medium text-foreground">
                {state.isDownloading && '正在下载...'}
                {state.isComplete && '下载完成'}
                {state.hasError && '下载失败'}
                {!state.isDownloading && !state.isComplete && !state.hasError && '准备下载'}
              </span>
            </div>
            <span className="text-sm text-muted-foreground">
              {formatBytes(state.downloadedSize)} / {formatBytes(fileSize)}
            </span>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <Progress value={state.progress} className="h-2" />
            <div className="text-sm text-muted-foreground">
              {Math.round(state.progress)}%
            </div>
          </div>

          {/* Download Stats */}
          {state.isDownloading && (
            <div className="grid grid-cols-3 gap-4 p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground">下载速度</p>
                <p className="text-sm font-medium text-foreground">
                  {formatSpeed(state.speed)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">剩余时间</p>
                <p className="text-sm font-medium text-foreground">
                  {formatTime(state.timeRemaining)}
                </p>
              </div>
              <div>
                <p className="text-xs text-muted-foreground">文件大小</p>
                <p className="text-sm font-medium text-foreground">
                  {formatBytes(fileSize)}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {state.hasError && state.errorMessage && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-600">{state.errorMessage}</p>
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex gap-2">
            {!state.isDownloading && !state.isComplete && (
              <Button
                onClick={handleDownload}
                className="flex-1 gradient-primary text-white border-0"
              >
                <Download className="w-4 h-4 mr-2" />
                开始下载
              </Button>
            )}

            {state.isDownloading && (
              <Button
                onClick={handleCancel}
                variant="outline"
                className="flex-1"
              >
                <X className="w-4 h-4 mr-2" />
                取消下载
              </Button>
            )}

            {(state.isComplete || state.hasError) && (
              <>
                <Button
                  onClick={handleReset}
                  variant="outline"
                  className="flex-1"
                >
                  重新下载
                </Button>
                {state.isComplete && (
                  <Button
                    disabled
                    className="flex-1 bg-green-500/20 text-green-600 border-green-500/30"
                  >
                    <Check className="w-4 h-4 mr-2" />
                    下载完成
                  </Button>
                )}
              </>
            )}
          </div>

          {/* Info Text */}
          <p className="text-xs text-muted-foreground">
            💡 提示：下载速度取决于您的网络连接。大文件下载可能需要几分钟，请保持网络连接稳定。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
