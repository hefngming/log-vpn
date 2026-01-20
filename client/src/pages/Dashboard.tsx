import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Shield, Download, Upload, Clock, Globe, CreditCard, Settings, LogOut, Gift } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function Dashboard() {
  const { user, isAuthenticated, loading, logout } = useAuth();
  const [, setLocation] = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    window.location.href = getLoginUrl();
    return null;
  }

  const handleLogout = async () => {
    await logout();
    setLocation("/");
  };

  // Mock data - will be replaced with real API data
  const subscription = {
    planName: "专业版",
    status: "active",
    trafficUsed: 45.2 * 1024 * 1024 * 1024, // 45.2 GB
    trafficLimit: 200 * 1024 * 1024 * 1024, // 200 GB
    endDate: new Date(Date.now() + 25 * 24 * 60 * 60 * 1000), // 25 days from now
  };

  const trafficPercent = (subscription.trafficUsed / subscription.trafficLimit) * 100;
  const daysRemaining = Math.ceil((subscription.endDate.getTime() - Date.now()) / (1000 * 60 * 60 * 24));

  const formatBytes = (bytes: number) => {
    const gb = bytes / (1024 * 1024 * 1024);
    return gb >= 1 ? `${gb.toFixed(1)} GB` : `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

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
          <div className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              欢迎, {user?.name || user?.email || "用户"}
            </span>
            <Button variant="ghost" size="sm" onClick={handleLogout}>
              <LogOut className="w-4 h-4 mr-2" />
              退出
            </Button>
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground mb-2">控制台</h1>
            <p className="text-muted-foreground">管理您的订阅和查看使用情况</p>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            <Link href="/nodes">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Globe className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">节点列表</p>
                    <p className="text-sm text-muted-foreground">查看可用节点</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/recharge">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <CreditCard className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">充值续费</p>
                    <p className="text-sm text-muted-foreground">购买套餐</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/download">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Download className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">下载客户端</p>
                    <p className="text-sm text-muted-foreground">Win / Mac</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
            <Link href="/referral">
              <Card className="bg-card border-border hover:border-primary/50 transition-colors cursor-pointer">
                <CardContent className="p-4 flex items-center gap-3">
                  <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Gift className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <p className="font-medium text-foreground">邀请好友</p>
                    <p className="text-sm text-muted-foreground">获得流量奖励</p>
                  </div>
                </CardContent>
              </Card>
            </Link>
          </div>

          {/* Subscription Status */}
          <div className="grid md:grid-cols-2 gap-6 mb-8">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Shield className="w-5 h-5 text-primary" />
                  订阅状态
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <div>
                    <p className="text-2xl font-bold text-foreground">{subscription.planName}</p>
                    <p className="text-sm text-muted-foreground">
                      {subscription.status === "active" ? (
                        <span className="text-green-500">● 有效</span>
                      ) : (
                        <span className="text-red-500">● 已过期</span>
                      )}
                    </p>
                  </div>
                  <Link href="/recharge">
                    <Button variant="outline" size="sm" className="border-primary text-primary">
                      续费
                    </Button>
                  </Link>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>剩余 {daysRemaining} 天</span>
                  <span className="text-xs">
                    (到期时间: {subscription.endDate.toLocaleDateString()})
                  </span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <Upload className="w-5 h-5 text-primary" />
                  流量使用
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="mb-4">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-2xl font-bold text-foreground">
                      {formatBytes(subscription.trafficUsed)}
                    </span>
                    <span className="text-muted-foreground">
                      / {formatBytes(subscription.trafficLimit)}
                    </span>
                  </div>
                  <Progress value={trafficPercent} className="h-2" />
                </div>
                <p className="text-sm text-muted-foreground">
                  已使用 {trafficPercent.toFixed(1)}% 的月度流量
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Recent Activity */}
          <Card className="bg-card border-border">
            <CardHeader>
              <CardTitle className="text-foreground">最近连接</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { node: "新加坡 - SG1", time: "2 小时前", duration: "1h 23m", traffic: "1.2 GB" },
                  { node: "日本 - JP1", time: "昨天", duration: "3h 45m", traffic: "3.8 GB" },
                  { node: "美国 - US1", time: "2 天前", duration: "2h 10m", traffic: "2.1 GB" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between py-3 border-b border-border last:border-0">
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                        <Globe className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{item.node}</p>
                        <p className="text-sm text-muted-foreground">{item.time}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-foreground">{item.traffic}</p>
                      <p className="text-sm text-muted-foreground">{item.duration}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
