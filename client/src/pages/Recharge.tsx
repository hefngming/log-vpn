import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Shield, Check, QrCode, MessageCircle, ArrowLeft, Download, Copy, Upload, Image, Loader2 } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState, useRef } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Recharge() {
  const { isAuthenticated, loading, user } = useAuth();
  const [showPaymentDialog, setShowPaymentDialog] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<typeof plans[0] | null>(null);
  const [paymentMethod, setPaymentMethod] = useState<'wechat' | 'alipay'>('wechat');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const uploadProofMutation = trpc.paymentProof.upload.useMutation({
    onSuccess: () => {
      setShowPaymentDialog(false);
      setShowSuccessDialog(true);
      setUploadedImage(null);
    },
    onError: (error) => {
      toast.error(`提交失败: ${error.message}`);
      setIsUploading(false);
    },
  });

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
      name: "免费体验",
      price: 0,
      duration: 1,
      traffic: "1GB",
      devices: 1,
      features: ["体验版本", "1天有效期", "每台设备仅一次", "标准节点"],
      isFree: true,
    },
    {
      id: 2,
      name: "无限尊享版",
      price: 199,
      duration: "永久",
      traffic: "200GB/月",
      dailyLimit: "10GB/天",
      devices: 10,
      features: ["200GB 月流量", "10GB 日流量限制", "永久使用", "全部高速节点", "7x24 专属客服", "10 个设备同时在线"],
      recommended: true,
    },
  ];

  const handleSelectPlan = (plan: typeof plans[0]) => {
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
      return;
    }
    
    // 免费版直接激活
    if (plan.isFree) {
      toast.success("免费版已激活！您可以体验 1 天，1GB 流量");
      return;
    }
    
    setSelectedPlan(plan);
    setUploadedImage(null);
    setShowPaymentDialog(true);
  };

  const handleSaveQrcode = () => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
    if (isMobile) {
      toast.info("请长按图片保存到相册", { duration: 3000 });
    } else {
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

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      toast.error("请选择图片文件");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("图片大小不能超过 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target?.result as string);
    };
    reader.readAsDataURL(file);
  };

  const handleSubmitProof = async () => {
    if (!uploadedImage || !selectedPlan) {
      toast.error("请先上传支付凭证");
      return;
    }

    setIsUploading(true);
    
    // Extract base64 data from data URL
    const base64Data = uploadedImage.split(',')[1];
    const imageType = uploadedImage.split(';')[0].split(':')[1];

    uploadProofMutation.mutate({
      planName: selectedPlan.name,
      amount: selectedPlan.price.toString(),
      imageBase64: base64Data,
      imageType: imageType,
    });
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
          <Link href="/dashboard">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回控制台
            </Button>
          </Link>
        </div>
      </nav>

      <div className="pt-24 pb-12">
        <div className="container">
          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">选择您的套餐</h1>
            <p className="text-xl text-muted-foreground">
              灵活的套餐选择，满足您的不同需求
            </p>
          </div>

          {/* Plans Grid */}
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
            {plans.map((plan) => (
              <Card
                key={plan.id}
                className={`bg-card border-border relative overflow-hidden transition-all ${
                  plan.recommended ? 'md:scale-105 border-primary/50' : ''
                }`}
              >
                {plan.recommended && (
                  <div className="absolute top-0 right-0 bg-primary text-white px-4 py-1 text-sm font-medium">
                    推荐
                  </div>
                )}
                
                <CardHeader>
                  <CardTitle className="text-2xl">{plan.name}</CardTitle>
                  <div className="mt-4">
                    <div className="text-4xl font-bold text-primary">
                      ¥{plan.price}
                      <span className="text-lg text-muted-foreground ml-2">{plan.price === 0 ? '免费' : '/月'}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-6">
                  {/* Plan Details */}
                  <div className="space-y-3 border-b border-border pb-6">
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">流量限制</span>
                      <span className="font-semibold text-foreground">{plan.traffic}</span>
                    </div>
                    {plan.dailyLimit && (
                      <div className="flex items-center justify-between">
                        <span className="text-muted-foreground">日流量限制</span>
                        <span className="font-semibold text-foreground">{plan.dailyLimit}</span>
                      </div>
                    )}
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">有效期</span>
                      <span className="font-semibold text-foreground">{typeof plan.duration === 'string' ? plan.duration : plan.duration + ' 天'}</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-muted-foreground">设备数</span>
                      <span className="font-semibold text-foreground">{plan.devices} 个</span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="space-y-3">
                    {plan.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center gap-3">
                        <Check className="w-5 h-5 text-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <Button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full ${
                      plan.recommended
                        ? 'gradient-primary text-white border-0'
                        : 'border-primary text-primary'
                    }`}
                    variant={plan.recommended ? 'default' : 'outline'}
                  >
                    {plan.isFree ? '立即体验' : '选择套餐'}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* FAQ Section */}
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl font-bold text-foreground mb-8 text-center">常见问题</h2>
            <div className="space-y-4">
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">免费版有什么限制？</h3>
                  <p className="text-muted-foreground">
                    免费版为体验版本，每台设备仅可激活一次，有效期 1 天，流量限制 1GB。
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">无限尊享版的日流量限制是什么意思？</h3>
                  <p className="text-muted-foreground">
                    无限尊享版每月提供 200GB 流量，同时每天限制 10GB 流量。例如，如果您在一天内用完 10GB，需要等到次日才能继续使用。
                  </p>
                </CardContent>
              </Card>
              <Card className="bg-card border-border">
                <CardContent className="p-6">
                  <h3 className="font-semibold text-foreground mb-2">如何支付？</h3>
                  <p className="text-muted-foreground">
                    目前支持微信和支付宝转账。选择套餐后，按照页面提示扫码支付，上传支付凭证即可。我们会在 24 小时内审核并激活您的订阅。
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Dialog */}
      <Dialog open={showPaymentDialog} onOpenChange={setShowPaymentDialog}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>支付 {selectedPlan?.name}</DialogTitle>
          </DialogHeader>

          <div className="space-y-6">
            {/* Payment Amount */}
            <div className="bg-card border border-border rounded-lg p-4">
              <p className="text-sm text-muted-foreground mb-2">应付金额</p>
              <div className="flex items-center justify-between">
                <span className="text-3xl font-bold text-primary">¥{selectedPlan?.price}</span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={handleCopyAmount}
                  className="border-primary text-primary"
                >
                  <Copy className="w-4 h-4 mr-2" />
                  复制
                </Button>
              </div>
            </div>

            {/* Payment Method Selection */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">选择支付方式</p>
              <div className="grid grid-cols-2 gap-3">
                <Button
                  variant={paymentMethod === 'wechat' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('wechat')}
                  className={paymentMethod === 'wechat' ? 'gradient-primary text-white border-0' : 'border-border'}
                >
                  微信支付
                </Button>
                <Button
                  variant={paymentMethod === 'alipay' ? 'default' : 'outline'}
                  onClick={() => setPaymentMethod('alipay')}
                  className={paymentMethod === 'alipay' ? 'gradient-primary text-white border-0' : 'border-border'}
                >
                  支付宝
                </Button>
              </div>
            </div>

            {/* QR Code */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">扫码支付</p>
              <div className="bg-secondary rounded-lg p-4 aspect-square flex items-center justify-center">
                <div className="text-center">
                  <QrCode className="w-12 h-12 text-muted-foreground mx-auto mb-2" />
                  <p className="text-sm text-muted-foreground">
                    {paymentMethod === 'wechat' ? '微信' : '支付宝'}收款码
                  </p>
                </div>
              </div>
              <Button
                variant="outline"
                className="w-full border-primary text-primary"
                onClick={handleSaveQrcode}
              >
                <Download className="w-4 h-4 mr-2" />
                保存收款码
              </Button>
            </div>

            {/* Upload Proof */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">上传支付凭证</p>
              <div
                className="border-2 border-dashed border-border rounded-lg p-6 text-center cursor-pointer hover:border-primary/50 transition-colors"
                onClick={() => fileInputRef.current?.click()}
              >
                {uploadedImage ? (
                  <div className="space-y-3">
                    <img src={uploadedImage} alt="Payment proof" className="max-h-32 mx-auto rounded" />
                    <p className="text-sm text-muted-foreground">点击重新选择</p>
                  </div>
                ) : (
                  <div className="space-y-2">
                    <Image className="w-8 h-8 text-muted-foreground mx-auto" />
                    <p className="text-sm text-foreground">点击选择图片</p>
                    <p className="text-xs text-muted-foreground">或拖拽图片到此处</p>
                  </div>
                )}
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
              />
            </div>

            {/* Submit Button */}
            <Button
              onClick={handleSubmitProof}
              disabled={!uploadedImage || isUploading}
              className="w-full gradient-primary text-white border-0"
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  提交支付凭证
                </>
              )}
            </Button>

            {/* Customer Service */}
            <div className="bg-card border border-border rounded-lg p-4 text-center">
              <p className="text-sm text-muted-foreground mb-2">需要帮助？</p>
              <Button variant="ghost" className="text-primary text-sm">
                <MessageCircle className="w-4 h-4 mr-2" />
                联系客服
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="sm:max-w-md text-center">
          <div className="space-y-4">
            <div className="w-12 h-12 rounded-full gradient-primary flex items-center justify-center mx-auto">
              <Check className="w-6 h-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-foreground mb-2">提交成功！</h2>
              <p className="text-muted-foreground">
                感谢您的支付。我们会在 24 小时内审核您的支付凭证，并自动激活您的订阅。
              </p>
            </div>
            <Button
              onClick={() => setShowSuccessDialog(false)}
              className="w-full gradient-primary text-white border-0"
            >
              返回控制台
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
