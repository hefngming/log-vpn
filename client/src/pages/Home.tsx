import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Shield, Zap, Globe, Download, ArrowRight, Check } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Home() {
  const { user, isAuthenticated } = useAuth();

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-lg border-b border-border">
        <div className="container flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
              <Shield className="w-5 h-5 text-white" />
            </div>
            <span className="text-xl font-bold text-foreground">Log VPN</span>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/download">
              <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                下载客户端
              </Button>
            </Link>
            {isAuthenticated && (
              <Link href="/referral">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  邀请好友
                </Button>
              </Link>
            )}
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button className="gradient-primary text-white border-0">
                  控制台
                </Button>
              </Link>
            ) : (
              <>
                <Link href="/register">
                  <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                    注册
                  </Button>
                </Link>
                <a href={getLoginUrl()}>
                  <Button className="gradient-primary text-white border-0">
                    登录
                  </Button>
                </a>
              </>
            )}
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl" />
        
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl md:text-6xl font-bold text-foreground mb-6">
              安全. 快速. 全球.
              <br />
              <span className="text-primary">这就是 Log VPN</span>
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              采用最先进的加密技术，为您提供极速、稳定、安全的网络加速服务。
              <br />
              支持 VLESS、Trojan、Shadowsocks 等多种协议。
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/download">
                <Button size="lg" className="gradient-primary text-white border-0 glow-primary">
                  <Download className="w-5 h-5 mr-2" />
                  立即下载
                </Button>
              </Link>
              <Link href="/recharge">
                <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary/10">
                  查看套餐
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-12">
            为什么选择 Log VPN
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Zap className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">极速连接</h3>
                <p className="text-muted-foreground">
                  采用优化的网络线路和智能路由技术，确保您获得最快的连接速度。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">安全加密</h3>
                <p className="text-muted-foreground">
                  军事级别的加密技术，保护您的隐私和数据安全，无日志政策。
                </p>
              </CardContent>
            </Card>
            <Card className="bg-card border-border hover:border-primary/50 transition-colors">
              <CardContent className="p-6">
                <div className="w-12 h-12 rounded-lg gradient-primary flex items-center justify-center mb-4">
                  <Globe className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">全球节点</h3>
                <p className="text-muted-foreground">
                  遍布全球的高速服务器节点，让您随时随地畅享网络自由。
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20">
        <div className="container">
          <h2 className="text-3xl font-bold text-center text-foreground mb-4">
            选择您的套餐
          </h2>
          <p className="text-center text-muted-foreground mb-12">
            免费体验或无限尊享，畅享网络自由
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {/* Free Trial Plan */}
            <Card className="bg-card border-border hover:border-primary/50 transition-colors w-full">
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">免费体验</h3>
                <div className="text-4xl font-bold text-foreground mb-6 text-center">
                  ￥0<span className="text-xl font-normal text-muted-foreground">/天</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">1GB 流量</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">1 天有效期</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">基础节点</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">每设备限一次</span>
                  </li>
                </ul>
                <Link href="/dashboard">
                  <Button className="w-full border-primary text-primary hover:bg-primary hover:text-primary-foreground py-6 text-lg" variant="outline">
                    免费体验
                  </Button>
                </Link>
              </CardContent>
            </Card>

            {/* Premium Unlimited Plan */}
            <Card className="bg-card border-primary relative w-full">
              <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                热门
              </div>
              <CardContent className="p-8">
                <h3 className="text-2xl font-bold text-foreground mb-2 text-center">无限尊享版</h3>
                <div className="text-4xl font-bold text-foreground mb-6 text-center">
                  ￥199<span className="text-xl font-normal text-muted-foreground">/月</span>
                </div>
                <ul className="space-y-4 mb-8">
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">无限流量</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">10 个设备同时在线</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">专属高速节点</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">7x24 专属客服</span>
                  </li>
                  <li className="flex items-center gap-3 text-muted-foreground">
                    <Check className="w-5 h-5 text-primary" />
                    <span className="text-base">支持 VLESS、Trojan、Shadowsocks</span>
                  </li>
                </ul>
                <Link href="/recharge">
                  <Button className="w-full gradient-primary text-white border-0 py-6 text-lg">
                    立即购买
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-card/50">
        <div className="container">
          <div className="max-w-2xl mx-auto text-center">
            <h2 className="text-3xl font-bold text-foreground mb-4">
              立即开始您的安全之旅
            </h2>
            <p className="text-muted-foreground mb-8">
              新用户注册即送 1 天免费试用，体验极速网络加速服务
            </p>
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button size="lg" className="gradient-primary text-white border-0 glow-primary">
                  进入控制台
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button size="lg" className="gradient-primary text-white border-0 glow-primary">
                  免费注册
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </a>
            )}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border">
        <div className="container">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 rounded gradient-primary flex items-center justify-center">
                <Shield className="w-4 h-4 text-white" />
              </div>
              <span className="font-semibold text-foreground">Log VPN</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2024 Log VPN. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
