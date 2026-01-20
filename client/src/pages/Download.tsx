import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Download, Monitor, Apple, Smartphone, ArrowLeft, Check, AlertCircle } from "lucide-react";
import { Link } from "wouter";
import { useState } from "react";
import { DownloadProgressTracker } from "@/components/DownloadProgressTracker";
import { VersionChecker } from "@/components/VersionChecker";
import { FileHashVerifier } from "@/components/FileHashVerifier";

export default function DownloadPage() {
  const [activeTab, setActiveTab] = useState("windows");

  const clients = [
    {
      platform: "Windows",
      icon: Monitor,
      version: "1.0.0",
      size: "178 MB",
      requirements: "Windows 10/11 64-bit",
      downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_1.0.0_Setup.exe",
      md5: "electron-vpn-client-windows",
      sha256: "electron-sing-box-client-windows",
      fileSize: 186646528,
      features: ["设备指纹识别", "节点延迟测试", "流量监控", "智能推荐节点", "自动更新"],
    },
    {
      platform: "macOS",
      icon: Apple,
      version: "1.0.0",
      size: "178 MB",
      requirements: "macOS 11.0+ (Intel & Apple Silicon)",
      downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_1.0.0_x64.dmg",
      md5: "electron-vpn-client-macos",
      sha256: "electron-sing-box-client-macos",
      fileSize: 186646528,
      features: ["设备指纹识别", "节点延迟测试", "流量监控", "智能推荐节点", "自动更新"],
    },
    {
      platform: "Android",
      icon: Smartphone,
      version: "1.0.0",
      size: "25 MB",
      requirements: "Android 8.0+",
      downloadUrl: "#",
      features: ["一键连接", "分应用代理", "流量统计", "小组件支持"],
      comingSoon: true,
    },
    {
      platform: "iOS",
      icon: Smartphone,
      version: "1.0.0",
      size: "20 MB",
      requirements: "iOS 14.0+",
      downloadUrl: "#",
      features: ["一键连接", "智能选路", "流量统计", "快捷指令支持"],
      comingSoon: true,
    },
  ];

  const desktopClients = clients.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <Link href="/">
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
                <Shield className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold text-foreground">Log VPN</span>
            </div>
          </Link>
          <Link href="/">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回首页
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-2">下载客户端</h1>
            <p className="text-muted-foreground">
              选择适合您设备的官方客户端，享受极速安全的网络体验
            </p>
          </div>

          {/* Tabs for Desktop Clients */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">桌面客户端</h2>
            <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="windows" className="flex items-center gap-2">
                  <Monitor className="w-4 h-4" />
                  Windows
                </TabsTrigger>
                <TabsTrigger value="macos" className="flex items-center gap-2">
                  <Apple className="w-4 h-4" />
                  macOS
                </TabsTrigger>
              </TabsList>

              {desktopClients.map((client) => (
                <TabsContent key={client.platform} value={client.platform.toLowerCase()}>
                  <div className="space-y-6">
                    {/* Client Info Card */}
                    <Card className="bg-card border-border">
                      <CardHeader>
                        <CardTitle className="text-foreground flex items-center gap-3">
                          <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                            <client.icon className="w-6 h-6 text-white" />
                          </div>
                          <div>
                            <p>{client.platform}</p>
                            <p className="text-sm font-normal text-muted-foreground">
                              v{client.version} · {client.size}
                            </p>
                          </div>
                        </CardTitle>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-muted-foreground mb-4">
                          系统要求: {client.requirements}
                        </p>
                        <ul className="grid grid-cols-2 gap-2 mb-6">
                          {client.features.map((feature, index) => (
                            <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Check className="w-4 h-4 text-primary" />
                              {feature}
                            </li>
                          ))}
                        </ul>
                      </CardContent>
                    </Card>

                    {/* Version Checker */}
                    <VersionChecker
                      currentVersion={client.version}
                      platform={client.platform as "Windows" | "macOS"}
                    />

                    {/* Download Progress Tracker */}
                    <DownloadProgressTracker
                      url={client.downloadUrl}
                      filename={`LogVPN_${client.platform}.exe`}
                      fileSize={client.fileSize || 0}
                    />

                    {/* File Hash Verifier */}
                    {client.md5 && client.sha256 && (
                      <FileHashVerifier
                        filename={`LogVPN_${client.platform}.exe`}
                        expectedMd5={client.md5}
                        expectedSha256={client.sha256}
                      />
                    )}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </div>

          {/* Mobile Clients */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">移动客户端</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {clients.slice(2).map((client) => (
                <Card key={client.platform} className="bg-card border-border relative">
                  {client.comingSoon && (
                    <div className="absolute top-4 right-4 px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded">
                      即将推出
                    </div>
                  )}
                  <CardHeader>
                    <CardTitle className="text-foreground flex items-center gap-3">
                      <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center">
                        <client.icon className="w-6 h-6 text-white" />
                      </div>
                      <div>
                        <p>{client.platform}</p>
                        <p className="text-sm font-normal text-muted-foreground">
                          v{client.version} · {client.size}
                        </p>
                      </div>
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground mb-4">
                      系统要求: {client.requirements}
                    </p>
                    <ul className="grid grid-cols-2 gap-2 mb-6">
                      {client.features.map((feature, index) => (
                        <li key={index} className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Check className="w-4 h-4 text-primary" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                    <Button
                      className="w-full"
                      variant="outline"
                      disabled={client.comingSoon}
                    >
                      <Download className="w-4 h-4 mr-2" />
                      {client.comingSoon ? "敬请期待" : `下载 ${client.platform} 版`}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Installation Guide */}
          <div className="mt-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">安装指南</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <Monitor className="w-5 h-5" />
                      Windows 安装步骤
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-2 ml-7">
                      <li>1. 点击上方"开始下载"按钮下载安装包</li>
                      <li>2. 下载完成后，使用校验工具验证文件完整性</li>
                      <li>3. 双击运行 LogVPN_Installer.exe 安装程序</li>
                      <li>4. 按照提示完成安装（默认安装到 Program Files）</li>
                      <li>5. 安装完成后自动启动客户端</li>
                      <li>6. 登录您的账号并选择节点连接</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-3 flex items-center gap-2">
                      <Apple className="w-5 h-5" />
                      macOS 安装步骤
                    </h4>
                    <ol className="text-sm text-muted-foreground space-y-2 ml-7">
                      <li>1. 点击上方"开始下载"按钮下载安装包</li>
                      <li>2. 下载完成后，使用校验工具验证文件完整性</li>
                      <li>3. 双击打开下载的 DMG 文件</li>
                      <li>4. 将 LogVPN 应用拖入 Applications 文件夹</li>
                      <li>5. 首次运行时可能需要在"安全与隐私"中允许运行</li>
                      <li>6. 登录账号并开始使用</li>
                    </ol>
                  </div>
                  <div className="mt-6 p-4 bg-secondary/50 rounded-lg border border-border flex gap-3">
                    <AlertCircle className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-muted-foreground">
                      <p className="font-medium text-foreground mb-1">重要提示</p>
                      <p>安装包直接从我们的服务器下载，请确保网络连接稳定。建议使用上方的校验工具验证下载的文件完整性，以确保安全性。</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Troubleshooting */}
          <div className="mt-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">常见问题</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Q: 下载速度很慢怎么办？</h4>
                    <p className="text-sm text-muted-foreground">A: 安装包较大（259-261 MB），下载时间取决于您的网络速度。建议使用有线网络或 WiFi 下载以获得更快的速度。您可以使用上方的进度追踪功能查看实时下载速度。</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Q: 如何验证下载的文件是否完整？</h4>
                    <p className="text-sm text-muted-foreground">A: 下载完成后，使用上方的"安装包校验"工具上传文件，系统会自动计算 MD5 和 SHA256 校验值并与官方值进行对比。如果校验成功，说明文件完整且未被篡改。</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Q: 安装后无法连接怎么办？</h4>
                    <p className="text-sm text-muted-foreground">A: 请确保您已登录账号并选择了可用的节点。如仍无法连接，请检查您的网络连接或联系客服。</p>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Q: 如何检查是否有新版本？</h4>
                    <p className="text-sm text-muted-foreground">A: 上方的"版本检查"工具会自动检查最新版本。如果有新版本可用，会显示更新内容和下载链接。您也可以手动点击"重新检查"按钮随时检查更新。</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
