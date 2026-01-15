import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, Users, ArrowLeft, CreditCard, Globe, TrendingUp, Settings, Mail, Key, Save } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminSettings() {
  const { user, isAuthenticated, loading } = useAuth();
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

  if (user?.role !== "admin") {
    setLocation("/dashboard");
    return null;
  }

  const handleSave = () => {
    toast.success("设置已保存");
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
              <span className="text-sm text-muted-foreground ml-2">管理后台</span>
            </div>
          </Link>
          <Link href="/admin">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回仪表盘
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container">
          <div className="flex gap-6">
            {/* Sidebar */}
            <div className="hidden md:block w-64 shrink-0">
              <Card className="bg-card border-border sticky top-24">
                <CardContent className="p-4">
                  <nav className="space-y-1">
                    <Link href="/admin">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <TrendingUp className="w-5 h-5" />
                        <span>仪表盘</span>
                      </div>
                    </Link>
                    <Link href="/admin/users">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <Users className="w-5 h-5" />
                        <span>用户管理</span>
                      </div>
                    </Link>
                    <Link href="/admin/orders">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <CreditCard className="w-5 h-5" />
                        <span>订单管理</span>
                      </div>
                    </Link>
                    <Link href="/admin/nodes">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <Globe className="w-5 h-5" />
                        <span>节点管理</span>
                      </div>
                    </Link>
                    <Link href="/admin/settings">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
                        <Settings className="w-5 h-5" />
                        <span>系统设置</span>
                      </div>
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              <div className="mb-6">
                <h1 className="text-2xl font-bold text-foreground">系统设置</h1>
                <p className="text-muted-foreground">配置系统参数和第三方服务</p>
              </div>

              <Tabs defaultValue="xui" className="space-y-6">
                <TabsList className="bg-secondary">
                  <TabsTrigger value="xui">X-ui 配置</TabsTrigger>
                  <TabsTrigger value="smtp">邮件配置</TabsTrigger>
                  <TabsTrigger value="payment">支付配置</TabsTrigger>
                  <TabsTrigger value="general">通用设置</TabsTrigger>
                </TabsList>

                {/* X-ui Configuration */}
                <TabsContent value="xui">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <Globe className="w-5 h-5 text-primary" />
                        X-ui 面板配置
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>面板地址</Label>
                          <Input
                            placeholder="https://your-xui-panel.com"
                            defaultValue="https://dj.siumingho.dpdns.org"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                        <div>
                          <Label>面板端口</Label>
                          <Input
                            placeholder="54321"
                            defaultValue="54321"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>管理员用户名</Label>
                          <Input
                            placeholder="admin"
                            defaultValue="admin"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                        <div>
                          <Label>管理员密码</Label>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            defaultValue="admin123"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>自动同步节点</Label>
                          <p className="text-sm text-muted-foreground">每小时自动从 X-ui 同步节点信息</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Button className="gradient-primary text-white border-0" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        保存配置
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* SMTP Configuration */}
                <TabsContent value="smtp">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <Mail className="w-5 h-5 text-primary" />
                        SMTP 邮件配置
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>SMTP 服务器</Label>
                          <Input
                            placeholder="smtp.gmail.com"
                            defaultValue="smtp.gmail.com"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                        <div>
                          <Label>端口</Label>
                          <Input
                            placeholder="465"
                            defaultValue="465"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>用户名</Label>
                          <Input
                            placeholder="your-email@gmail.com"
                            defaultValue="siuminghe@gmail.com"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                        <div>
                          <Label>授权码</Label>
                          <Input
                            type="password"
                            placeholder="••••••••"
                            defaultValue="xznm dngy flap ollu"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>启用 SSL</Label>
                          <p className="text-sm text-muted-foreground">使用 SSL 加密连接</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Button className="gradient-primary text-white border-0" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        保存配置
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* Payment Configuration */}
                <TabsContent value="payment">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <CreditCard className="w-5 h-5 text-primary" />
                        支付配置 (易支付)
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="bg-yellow-500/10 border border-yellow-500/20 rounded-lg p-4 mb-4">
                        <p className="text-yellow-500 text-sm">
                          易支付接口正在审核中，当前使用手动收款模式。审核通过后填入以下配置即可自动切换。
                        </p>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div>
                          <Label>商户 ID (PID)</Label>
                          <Input
                            placeholder="请填入易支付商户ID"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                        <div>
                          <Label>商户密钥 (KEY)</Label>
                          <Input
                            type="password"
                            placeholder="请填入易支付商户密钥"
                            className="mt-2 bg-secondary border-border"
                          />
                        </div>
                      </div>
                      <div>
                        <Label>易支付接口地址</Label>
                        <Input
                          placeholder="https://pay.example.com"
                          className="mt-2 bg-secondary border-border"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>启用自动支付</Label>
                          <p className="text-sm text-muted-foreground">配置完成后启用自动支付功能</p>
                        </div>
                        <Switch />
                      </div>
                      <Button className="gradient-primary text-white border-0" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        保存配置
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>

                {/* General Settings */}
                <TabsContent value="general">
                  <Card className="bg-card border-border">
                    <CardHeader>
                      <CardTitle className="text-foreground flex items-center gap-2">
                        <Settings className="w-5 h-5 text-primary" />
                        通用设置
                      </CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label>网站名称</Label>
                        <Input
                          placeholder="Log VPN"
                          defaultValue="Log VPN"
                          className="mt-2 bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <Label>新用户默认流量 (GB)</Label>
                        <Input
                          type="number"
                          placeholder="1"
                          defaultValue="1"
                          className="mt-2 bg-secondary border-border"
                        />
                      </div>
                      <div>
                        <Label>新用户默认有效期 (天)</Label>
                        <Input
                          type="number"
                          placeholder="1"
                          defaultValue="1"
                          className="mt-2 bg-secondary border-border"
                        />
                      </div>
                      <div className="flex items-center justify-between">
                        <div>
                          <Label>开放注册</Label>
                          <p className="text-sm text-muted-foreground">允许新用户注册</p>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <Button className="gradient-primary text-white border-0" onClick={handleSave}>
                        <Save className="w-4 h-4 mr-2" />
                        保存配置
                      </Button>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
