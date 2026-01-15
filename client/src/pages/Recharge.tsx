import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Check, QrCode, MessageCircle, ArrowLeft, Download, Copy, X } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function Recharge() {
  const { isAuthenticated, loading } = useAuth();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');

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

  const handleSelectPlan = (plan: typeof plans[0]) => {
    setSelectedPlan(plan);
    setShowPaymentDialog(true);
  };

  const handleSaveQrcode = () => {
    // 在移动端提示用户长按保存
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      toast.info("请长按图片保存到相册", { duration: 3000 });
    } else {
      // 桌面端直接下载
      const link = document.createElement('a');
      link.href = paymentMethod === 'wechat' ? '/images/wechat-pay.jpg' : '/images/alipay.jpg';
      link.download = `${paymentMethod === 'wechat' ? '微信' : '支付宝'}收款码.jpg`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast.success("收款码已保存");
    }
  };

  const handleCopyAmount = () => {
    if (selectedPlan) {
      navigator.clipboard.writeText(selectedPlan.price.toString());
      toast.success("金额已复制");
    }
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
                    onClick={() => handleSelectPlan(plan)}
                  >
                    立即购买
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-2xl mx-auto">
            <Card className="bg-card border-border">
              <CardHeader>
                <CardTitle className="text-foreground">常见问题</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h4 className="font-medium text-foreground mb-1">如何激活订阅？</h4>
                  <p className="text-sm text-muted-foreground">
                    选择套餐后扫码支付，支付完成后联系客服发送截图即可激活。
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">支持哪些支付方式？</h4>
                  <p className="text-sm text-muted-foreground">
                    目前支持微信支付和支付宝，后续将开通更多支付方式。
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-foreground mb-1">订阅可以退款吗？</h4>
                  <p className="text-sm text-muted-foreground">
                    购买后 7 天内未使用可申请全额退款，请联系客服处理。
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="bg-card border-border max-w-md">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center justify-between">
              <span className="flex items-center gap-2">
                <QrCode className="w-5 h-5 text-primary" />
                扫码支付
              </span>
            </DialogTitle>
          </DialogHeader>
          
          <div className="space-y-6">
            {/* Plan Info */}
            {selectedPlan && (
              <div className="bg-secondary/50 rounded-lg p-4 text-center">
                <p className="text-muted-foreground mb-1">{selectedPlan.name}</p>
                <p className="text-3xl font-bold text-foreground">
                  ¥{selectedPlan.price}
                  <span className="text-sm font-normal text-muted-foreground ml-1">
                    / {selectedPlan.duration}天
                  </span>
                </p>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="mt-2 text-primary"
                  onClick={handleCopyAmount}
                >
                  <Copy className="w-3 h-3 mr-1" />
                  复制金额
                </Button>
              </div>
            )}

            {/* Payment Method Tabs */}
            <div className="flex gap-2">
              <Button
                variant={paymentMethod === 'wechat' ? 'default' : 'outline'}
                className={`flex-1 ${paymentMethod === 'wechat' ? 'bg-green-600 hover:bg-green-700' : ''}`}
                onClick={() => setPaymentMethod('wechat')}
              >
                微信支付
              </Button>
              <Button
                variant={paymentMethod === 'alipay' ? 'default' : 'outline'}
                className={`flex-1 ${paymentMethod === 'alipay' ? 'bg-blue-600 hover:bg-blue-700' : ''}`}
                onClick={() => setPaymentMethod('alipay')}
              >
                支付宝
              </Button>
            </div>

            {/* QR Code */}
            <div className="text-center">
              <div className="w-56 h-56 mx-auto bg-white rounded-lg p-2 mb-4">
                <img 
                  src={paymentMethod === 'wechat' ? '/images/wechat-pay.jpg' : '/images/alipay.jpg'}
                  alt={paymentMethod === 'wechat' ? '微信收款码' : '支付宝收款码'}
                  className="w-full h-full object-contain rounded"
                />
              </div>
              <Button 
                variant="outline" 
                size="sm" 
                className="border-primary text-primary"
                onClick={handleSaveQrcode}
              >
                <Download className="w-4 h-4 mr-2" />
                保存收款码
              </Button>
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-500 font-medium text-sm mb-2">⚠️ 重要提示</p>
              <p className="text-sm text-muted-foreground">
                支付完成后，请务必<span className="text-foreground font-medium">保留支付截图</span>并联系客服进行手动激活。
              </p>
            </div>

            {/* Instructions */}
            <div className="space-y-2 text-sm text-muted-foreground">
              <p className="flex items-start gap-2">
                <span className="text-primary font-medium">1.</span>
                使用{paymentMethod === 'wechat' ? '微信' : '支付宝'}扫描上方二维码
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-medium">2.</span>
                支付 ¥{selectedPlan?.price} 元
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-medium">3.</span>
                截图保存支付凭证
              </p>
              <p className="flex items-start gap-2">
                <span className="text-primary font-medium">4.</span>
                联系客服发送截图激活账户
              </p>
            </div>

            {/* Contact Buttons */}
            <div className="flex gap-3">
              <Button variant="outline" className="flex-1 border-green-500 text-green-500 hover:bg-green-500/10">
                <MessageCircle className="w-4 h-4 mr-2" />
                微信客服
              </Button>
              <Button variant="outline" className="flex-1 border-blue-500 text-blue-500 hover:bg-blue-500/10">
                <MessageCircle className="w-4 h-4 mr-2" />
                Telegram
              </Button>
            </div>
          </div>

          {/* 
            ============================================================
            【易支付接口预留位置】
            ============================================================
            
            当获得易支付 PID 和 KEY 后，修改以下配置文件启用自动支付：
            
            1. 服务端配置文件: server/payment.ts
               - 在 PaymentService 中配置易支付参数
               - 将 activeProvider 切换为 EpayProvider
            
            2. 数据库配置:
               INSERT INTO paymentConfigs (name, provider, config, isActive) VALUES 
               ('易支付', 'epay', '{"pid":"YOUR_PID","key":"YOUR_KEY","apiUrl":"https://pay.example.com"}', true);
            
            3. 前端调用示例:
               const handleAutoPay = async () => {
                 const result = await trpc.payment.create.mutate({ planId: selectedPlan.id });
                 if (result.payUrl) {
                   window.location.href = result.payUrl;
                 }
               };
            
            ============================================================
          */}
        </DialogContent>
      </Dialog>
    </div>
  );
}
