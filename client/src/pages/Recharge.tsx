import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Shield, Check, QrCode, MessageCircle, ArrowLeft } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";

export default function Recharge() {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  const plans = [
    {
      id: 1,
      name: "基础版",
      price: 29,
      duration: 30,
      traffic: "50GB",
      devices: 3,
      features: ["基础节点", "标准速度", "邮件支持"],
    },
    {
      id: 2,
      name: "专业版",
      price: 59,
      duration: 30,
      traffic: "200GB",
      devices: 5,
      features: ["全部节点", "高速连接", "优先客服", "多设备支持"],
      recommended: true,
    },
    {
      id: 3,
      name: "企业版",
      price: 199,
      duration: 30,
      traffic: "无限",
      devices: 10,
      features: ["专属高速节点", "无限流量", "7x24 专属客服", "API 接入"],
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
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <Link href="/dashboard">
                <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  返回控制台
                </Button>
              </Link>
            ) : (
              <a href={getLoginUrl()}>
                <Button className="gradient-primary text-white border-0">
                  登录 / 注册
                </Button>
              </a>
            )}
          </div>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-3xl font-bold text-foreground mb-2">选择您的套餐</h1>
            <p className="text-muted-foreground">灵活的套餐选择，满足您的不同需求</p>
          </div>

          {/* Plans */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-card border-border relative ${
                  plan.recommended ? "border-primary" : ""
                }`}
              >
                {plan.recommended && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-1 bg-primary text-primary-foreground text-sm rounded-full">
                    推荐
                  </div>
                )}
                <CardHeader>
                  <CardTitle className="text-foreground">{plan.name}</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-3xl font-bold text-foreground mb-4">
                    ¥{plan.price}
                    <span className="text-lg font-normal text-muted-foreground">/月</span>
                  </div>
                  <div className="space-y-2 mb-6">
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">{plan.traffic}</span> 流量/月
                    </p>
                    <p className="text-muted-foreground">
                      <span className="text-foreground font-medium">{plan.devices}</span> 个设备同时在线
                    </p>
                  </div>
                  <ul className="space-y-2 mb-6">
                    {plan.features.map((feature, index) => (
                      <li key={index} className="flex items-center gap-2 text-muted-foreground">
                        <Check className="w-4 h-4 text-primary" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                  <Button
                    className={`w-full ${
                      plan.recommended
                        ? "gradient-primary text-white border-0"
                        : "border-primary text-primary hover:bg-primary/10"
                    }`}
                    variant={plan.recommended ? "default" : "outline"}
                    onClick={() => {
                      const paymentSection = document.getElementById("payment-section");
                      paymentSection?.scrollIntoView({ behavior: "smooth" });
                    }}
                  >
                    选择套餐
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Payment Section */}
          <div id="payment-section" className="max-w-2xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground flex items-center gap-2">
                  <QrCode className="w-5 h-5 text-primary" />
                  支付方式
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* QR Code Placeholder */}
                <div className="text-center mb-6">
                  <div className="w-64 h-64 mx-auto bg-white rounded-lg p-4 mb-4">
                    {/* Placeholder QR Code */}
                    <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 rounded flex items-center justify-center">
                      <div className="text-center">
                        <QrCode className="w-16 h-16 text-gray-400 mx-auto mb-2" />
                        <p className="text-sm text-gray-500">收款码占位</p>
                        <p className="text-xs text-gray-400">请联系客服获取</p>
                      </div>
                    </div>
                  </div>
                  <p className="text-lg font-bold text-foreground mb-2">
                    请扫码支付 ¥199 元
                  </p>
                  <p className="text-muted-foreground text-sm">
                    支付完成后，请联系客服或上传截图激活账户
                  </p>
                </div>

                {/* Instructions */}
                <div className="bg-secondary/50 rounded-lg p-4 mb-6">
                  <h4 className="font-medium text-foreground mb-2 flex items-center gap-2">
                    <MessageCircle className="w-4 h-4 text-primary" />
                    支付说明
                  </h4>
                  <ol className="text-sm text-muted-foreground space-y-2">
                    <li>1. 使用微信或支付宝扫描上方二维码</li>
                    <li>2. 支付对应套餐金额</li>
                    <li>3. 支付完成后截图保存</li>
                    <li>4. 联系客服并发送支付截图</li>
                    <li>5. 客服确认后将为您开通服务</li>
                  </ol>
                </div>

                {/* Contact */}
                <div className="text-center">
                  <p className="text-muted-foreground mb-4">
                    客服联系方式：
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button variant="outline" className="border-primary text-primary">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      微信客服
                    </Button>
                    <Button variant="outline" className="border-primary text-primary">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Telegram
                    </Button>
                  </div>
                </div>

                {/* Epay Integration Notice - Hidden, for future use */}
                {/* 
                  TODO: 易支付接口预留位置
                  当获得易支付 PID 和 KEY 后，在此处集成自动支付功能
                  
                  配置项:
                  - EPAY_PID: 商户ID
                  - EPAY_KEY: 商户密钥
                  - EPAY_API_URL: 易支付接口地址
                  
                  接口调用示例:
                  const createOrder = async (planId: number) => {
                    const response = await trpc.payment.createOrder.mutate({ planId });
                    window.location.href = response.paymentUrl;
                  };
                */}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
