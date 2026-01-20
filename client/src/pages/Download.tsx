import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Download, Monitor, Apple, Smartphone, Chrome, ArrowLeft, Check } from "lucide-react";
import { Link } from "wouter";

export default function DownloadPage() {
  const clients = [
    {
      platform: "Windows",
      icon: Monitor,
      version: "1.0.0",
      size: "45 MB",
      requirements: "Windows 10/11 64-bit",
      downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_Official.exe",
      features: ["一键连接", "智能选路", "流量统计", "开机自启"],
    },
    {
      platform: "macOS",
      icon: Apple,
      version: "1.0.0",
      size: "38 MB",
      requirements: "macOS 11.0+",
      downloadUrl: "https://dj.siumingho.dpdns.org/downloads/LogVPN_Official.exe",
      features: ["一键连接", "智能选路", "流量统计", "菜单栏快捷操作"],
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
              选择适合您设备的客户端，享受极速安全的网络体验
            </p>
          </div>

          {/* Desktop Clients */}
          <div className="mb-12">
            <h2 className="text-xl font-semibold text-foreground mb-6">桌面客户端</h2>
            <div className="grid md:grid-cols-2 gap-6">
              {clients.slice(0, 2).map((client) => (
                <Card key={client.platform} className="bg-card border-border">
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
                    <a href={client.downloadUrl} target="_blank" rel="noopener noreferrer" className="block">
                      <Button className="w-full gradient-primary text-white border-0">
                        <Download className="w-4 h-4 mr-2" />
                        下载 {client.platform} 版
                      </Button>
                    </a>
                  </CardContent>
                </Card>
              ))}
            </div>
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

          {/* Third-party Clients */}
          <div>
            <h2 className="text-xl font-semibold text-foreground mb-6">第三方客户端</h2>
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <p className="text-muted-foreground mb-6">
                  您也可以使用以下第三方客户端，通过订阅链接连接我们的服务：
                </p>
                <div className="grid md:grid-cols-4 gap-4">
                  {[
                    { name: "v2rayN", platform: "Windows", url: "https://github.com/2dust/v2rayN" },
                    { name: "ClashX Pro", platform: "macOS", url: "https://github.com/yichengchen/clashX" },
                    { name: "v2rayNG", platform: "Android", url: "https://github.com/2dust/v2rayNG" },
                    { name: "Shadowrocket", platform: "iOS", url: "#" },
                  ].map((app) => (
                    <a
                      key={app.name}
                      href={app.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block"
                    >
                      <Card className="bg-secondary/50 border-border hover:border-primary/50 transition-colors">
                        <CardContent className="p-4 text-center">
                          <Chrome className="w-8 h-8 text-primary mx-auto mb-2" />
                          <p className="font-medium text-foreground">{app.name}</p>
                          <p className="text-sm text-muted-foreground">{app.platform}</p>
                        </CardContent>
                      </Card>
                    </a>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Installation Guide */}
          <div className="mt-12">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">安装指南</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-foreground mb-2">Windows 安装步骤</h4>
                    <ol className="text-sm text-muted-foreground space-y-1">
                      <li>1. 下载 Windows 客户端安装包</li>
                      <li>2. 双击运行安装程序</li>
                      <li>3. 按照提示完成安装</li>
                      <li>4. 启动客户端并登录您的账号</li>
                      <li>5. 选择节点并点击连接按钮</li>
                    </ol>
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground mb-2">macOS 安装步骤</h4>
                    <ol className="text-sm text-muted-foreground space-y-1">
                      <li>1. 下载 macOS 客户端 DMG 文件</li>
                      <li>2. 双击打开 DMG 文件</li>
                      <li>3. 将应用拖入 Applications 文件夹</li>
                      <li>4. 首次运行时右键选择"打开"</li>
                      <li>5. 登录账号并开始使用</li>
                    </ol>
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
