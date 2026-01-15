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
    if (!isAuthenticated) {
      window.location.href = getLoginUrl();
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

          {/* Customer Service Info */}
          <div className="max-w-2xl mx-auto mb-8">
            <Card className="bg-card border-border">
              <CardContent className="p-6">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <MessageCircle className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h4 className="font-medium text-foreground">客服 Telegram</h4>
                    <p className="text-muted-foreground">
                      <a href="https://t.me/siumingh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
                        @siumingh
                      </a>
                      <span className="text-sm ml-2">(请在激活连接后添加获取最新动态)</span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                    选择套餐后扫码支付，然后上传支付截图提交凭证，管理员审核后即可激活。
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
        <DialogContent className="bg-card border-border max-w-md max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-foreground flex items-center gap-2">
              <QrCode className="w-5 h-5 text-primary" />
              扫码支付
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
              <div className="w-48 h-48 mx-auto bg-white rounded-lg p-2 mb-4">
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

            {/* Upload Payment Proof */}
            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">上传支付凭证</p>
              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileSelect}
                className="hidden"
              />
              
              {uploadedImage ? (
                <div className="relative">
                  <img 
                    src={uploadedImage} 
                    alt="支付凭证" 
                    className="w-full h-40 object-contain bg-secondary rounded-lg"
                  />
                  <Button
                    variant="outline"
                    size="sm"
                    className="absolute top-2 right-2"
                    onClick={() => setUploadedImage(null)}
                  >
                    重新选择
                  </Button>
                </div>
              ) : (
                <div
                  className="border-2 border-dashed border-border rounded-lg p-8 text-center cursor-pointer hover:border-primary/50 transition-colors"
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Upload className="w-8 h-8 mx-auto mb-2 text-muted-foreground" />
                  <p className="text-sm text-muted-foreground">点击上传支付截图</p>
                  <p className="text-xs text-muted-foreground mt-1">支持 JPG、PNG，最大 5MB</p>
                </div>
              )}
            </div>

            {/* Important Notice */}
            <div className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg p-4">
              <p className="text-yellow-500 font-medium text-sm mb-2">⚠️ 重要提示</p>
              <p className="text-sm text-muted-foreground">
                支付完成后，请上传支付截图并点击"提交凭证"。管理员审核通过后将自动激活您的订阅。
              </p>
            </div>

            {/* Submit Button */}
            <Button
              className="w-full gradient-primary text-white border-0"
              disabled={!uploadedImage || isUploading}
              onClick={handleSubmitProof}
            >
              {isUploading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  提交中...
                </>
              ) : (
                <>
                  <Upload className="w-4 h-4 mr-2" />
                  提交凭证
                </>
              )}
            </Button>

            {/* Telegram Contact */}
            <div className="text-center text-sm text-muted-foreground">
              <p>如有问题请联系客服 Telegram: <a href="https://t.me/siumingh" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">@siumingh</a></p>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Dialog */}
      <Dialog open={showSuccessDialog} onOpenChange={setShowSuccessDialog}>
        <DialogContent className="bg-card border-border max-w-sm text-center">
          <div className="py-6">
            <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500/10 flex items-center justify-center">
              <Check className="w-8 h-8 text-green-500" />
            </div>
            <h3 className="text-xl font-bold text-foreground mb-2">凭证提交成功</h3>
            <p className="text-muted-foreground mb-6">
              您的支付凭证已提交，请等待管理员审核。审核通过后将通过邮件通知您。
            </p>
            <div className="space-y-3">
              <Link href="/dashboard">
                <Button className="w-full gradient-primary text-white border-0">
                  返回控制台
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="w-full"
                onClick={() => setShowSuccessDialog(false)}
              >
                继续浏览
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
