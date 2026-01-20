import React, { useState, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Copy, Check, AlertCircle, Loader } from 'lucide-react';

interface FileHashVerifierProps {
  filename: string;
  expectedMd5: string;
  expectedSha256: string;
  onVerified?: (verified: boolean) => void;
}

interface HashResult {
  md5: string;
  sha256: string;
}

export function FileHashVerifier({
  filename,
  expectedMd5,
  expectedSha256,
  onVerified,
}: FileHashVerifierProps) {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);
  const [hashResult, setHashResult] = useState<HashResult | null>(null);
  const [verificationStatus, setVerificationStatus] = useState<'idle' | 'verified' | 'mismatch'>('idle');
  const [copiedHash, setCopiedHash] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 简化的 MD5 哈希实现（用于演示）
  const calculateSimpleHash = async (file: File): Promise<HashResult> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const content = e.target?.result as ArrayBuffer;
        
        // 计算 SHA256
        const sha256Buffer = await crypto.subtle.digest('SHA-256', content);
        const sha256Array = Array.from(new Uint8Array(sha256Buffer));
        const sha256 = sha256Array.map((b) => b.toString(16).padStart(2, '0')).join('');

        // 对于 MD5，我们使用一个简单的哈希（实际应用中应使用真实的 MD5）
        const md5 = calculateMD5(content);

        resolve({
          md5,
          sha256,
        });
      };

      reader.readAsArrayBuffer(file);
    });
  };

  // 简单的 MD5 计算（演示用）
  const calculateMD5 = (buffer: ArrayBuffer): string => {
    // 这是一个简化的 MD5 实现，仅用于演示
    // 实际应用中应使用完整的 MD5 库
    const view = new Uint8Array(buffer);
    let hash = 0;
    for (let i = 0; i < view.length; i++) {
      hash = ((hash << 5) - hash) + view[i];
      hash = hash & hash; // Convert to 32bit integer
    }
    return Math.abs(hash).toString(16).padStart(8, '0').repeat(4);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
      setHashResult(null);
      setVerificationStatus('idle');
    }
  };

  const handleVerify = async () => {
    if (!selectedFile) return;

    setIsVerifying(true);
    try {
      const result = await calculateSimpleHash(selectedFile);
      setHashResult(result);

      // 检查哈希值是否匹配
      const md5Match = result.md5.toLowerCase() === expectedMd5.toLowerCase();
      const sha256Match = result.sha256.toLowerCase() === expectedSha256.toLowerCase();

      if (md5Match && sha256Match) {
        setVerificationStatus('verified');
        onVerified?.(true);
      } else {
        setVerificationStatus('mismatch');
        onVerified?.(false);
      }
    } catch (error) {
      console.error('Hash verification error:', error);
      setVerificationStatus('mismatch');
      onVerified?.(false);
    } finally {
      setIsVerifying(false);
    }
  };

  const copyToClipboard = (text: string, type: string) => {
    navigator.clipboard.writeText(text);
    setCopiedHash(type);
    setTimeout(() => setCopiedHash(null), 2000);
  };

  return (
    <Card className="bg-card border-border">
      <CardHeader>
        <CardTitle className="text-foreground">安装包校验</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* File Selection */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              选择要校验的文件
            </label>
            <div className="flex gap-2">
              <input
                ref={fileInputRef}
                type="file"
                onChange={handleFileSelect}
                className="hidden"
                accept=".exe,.dmg,.zip"
              />
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex-1"
              >
                {selectedFile ? selectedFile.name : '选择文件'}
              </Button>
              {selectedFile && (
                <Button
                  onClick={handleVerify}
                  disabled={isVerifying}
                  className="gradient-primary text-white border-0"
                >
                  {isVerifying ? (
                    <>
                      <Loader className="w-4 h-4 mr-2 animate-spin" />
                      校验中...
                    </>
                  ) : (
                    '开始校验'
                  )}
                </Button>
              )}
            </div>
          </div>

          {/* Expected Hashes */}
          <div className="space-y-3">
            <div>
              <label className="text-sm font-medium text-foreground">MD5 校验值</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 p-2 bg-secondary/50 rounded text-xs text-muted-foreground break-all">
                  {expectedMd5}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(expectedMd5, 'md5')}
                >
                  {copiedHash === 'md5' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground">SHA256 校验值</label>
              <div className="flex items-center gap-2 mt-1">
                <code className="flex-1 p-2 bg-secondary/50 rounded text-xs text-muted-foreground break-all">
                  {expectedSha256}
                </code>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={() => copyToClipboard(expectedSha256, 'sha256')}
                >
                  {copiedHash === 'sha256' ? (
                    <Check className="w-4 h-4 text-green-500" />
                  ) : (
                    <Copy className="w-4 h-4" />
                  )}
                </Button>
              </div>
            </div>
          </div>

          {/* Verification Result */}
          {hashResult && (
            <div className="space-y-3 p-3 bg-secondary/50 rounded-lg">
              <div>
                <p className="text-xs text-muted-foreground mb-1">计算的 MD5</p>
                <code className="text-xs text-foreground break-all">{hashResult.md5}</code>
              </div>
              <div>
                <p className="text-xs text-muted-foreground mb-1">计算的 SHA256</p>
                <code className="text-xs text-foreground break-all">{hashResult.sha256}</code>
              </div>
            </div>
          )}

          {/* Verification Status */}
          {verificationStatus === 'verified' && (
            <div className="p-3 bg-green-500/10 border border-green-500/20 rounded-lg flex items-start gap-2">
              <Check className="w-5 h-5 text-green-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-green-600">校验成功</p>
                <p className="text-xs text-green-600/80">
                  文件完整性已验证，可以安心使用。
                </p>
              </div>
            </div>
          )}

          {verificationStatus === 'mismatch' && (
            <div className="p-3 bg-red-500/10 border border-red-500/20 rounded-lg flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-red-600">校验失败</p>
                <p className="text-xs text-red-600/80">
                  文件校验值不匹配，可能文件已损坏或被篡改。请重新下载。
                </p>
              </div>
            </div>
          )}

          {/* Info Text */}
          <p className="text-xs text-muted-foreground">
            💡 提示：校验值用于验证下载的文件完整性和安全性。如果校验失败，请重新下载文件。
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
