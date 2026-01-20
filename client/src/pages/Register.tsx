import { useState, useEffect } from 'react';
import { useLocation } from 'wouter';
import { trpc } from '../lib/trpc';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '../components/ui/card';
import { toast } from 'sonner';
import { UserPlus, Mail, Lock, Gift } from 'lucide-react';

export default function Register() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [referralCode, setReferralCode] = useState('');
  const [isValidating, setIsValidating] = useState(false);
  const [referralValid, setReferralValid] = useState<boolean | null>(null);
  const [verificationCode, setVerificationCode] = useState('');
  const [countdown, setCountdown] = useState(0);

  const sendCodeMutation = trpc.auth.sendVerificationCode.useMutation({
    onSuccess: () => {
      toast.success('验证码已发送，请查收邮件');
      setCountdown(60);
    },
    onError: (error: any) => {
      toast.error(error.message || '验证码发送失败');
    },
  });

  const registerMutation = trpc.auth.register.useMutation({
    onSuccess: () => {
      toast.success('注册成功！请登录');
      setLocation('/');
    },
    onError: (error: any) => {
      toast.error(error.message || '注册失败');
    },
  });

  const validateReferralQuery = trpc.referral.validateReferralCode.useQuery;

  // 倒计时逻辑
  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  // 从 URL 参数中获取推荐码
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const refCode = params.get('ref');
    if (refCode) {
      setReferralCode(refCode);
      validateReferralCode(refCode);
    }
  }, []);

  const validateReferralCode = async (code: string) => {
    if (!code) {
      setReferralValid(null);
      return;
    }

    setIsValidating(true);
    try {
      const result = await fetch(`/api/trpc/referral.validateReferralCode?input=${encodeURIComponent(JSON.stringify({ code }))}`);
      const data = await result.json();
      const valid = data.result?.data?.valid || false;
      setReferralValid(valid);
      if (valid) {
        toast.success('推荐码有效！注册后你将获得 1GB 流量奖励');
      } else {
        toast.error('推荐码无效');
      }
    } catch (error) {
      setReferralValid(false);
    } finally {
      setIsValidating(false);
    }
  };

  const handleSendCode = async () => {
    if (!email) {
      toast.error('请先输入邮箱地址');
      return;
    }

    if (!email.includes('@')) {
      toast.error('请输入有效的邮箱地址');
      return;
    }

    sendCodeMutation.mutate({ email, type: 'register' });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error('请填写邮箱和密码');
      return;
    }

    if (!verificationCode) {
      toast.error('请输入邮箱验证码');
      return;
    }

    if (password !== confirmPassword) {
      toast.error('两次输入的密码不一致');
      return;
    }

    if (password.length < 6) {
      toast.error('密码长度至少为 6 位');
      return;
    }

    registerMutation.mutate({
      email,
      password,
      verificationCode,
      referralCode: referralCode || undefined,
    });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <div className="h-12 w-12 rounded-full bg-purple-600 flex items-center justify-center">
              <UserPlus className="h-6 w-6 text-white" />
            </div>
          </div>
          <CardTitle className="text-2xl text-center">注册 Log VPN</CardTitle>
          <CardDescription className="text-center">
            创建账号，开始使用安全、快速的 VPN 服务
          </CardDescription>
        </CardHeader>
        <form onSubmit={handleRegister}>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="email"
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="verificationCode">邮箱验证码</Label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="verificationCode"
                    type="text"
                    placeholder="输入 6 位验证码"
                    value={verificationCode}
                    onChange={(e) => setVerificationCode(e.target.value)}
                    className="pl-10"
                    maxLength={6}
                    required
                  />
                </div>
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleSendCode}
                  disabled={countdown > 0 || sendCodeMutation.isPending || !email}
                  className="whitespace-nowrap"
                >
                  {countdown > 0 ? `${countdown}s` : sendCodeMutation.isPending ? '发送中...' : '发送验证码'}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="password"
                  type="password"
                  placeholder="至少 6 位"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">确认密码</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="confirmPassword"
                  type="password"
                  placeholder="再次输入密码"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  className="pl-10"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="referralCode">推荐码（选填）</Label>
              <div className="relative">
                <Gift className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                <Input
                  id="referralCode"
                  type="text"
                  placeholder="输入推荐码获得 1GB 流量奖励"
                  value={referralCode}
                  onChange={(e) => {
                    setReferralCode(e.target.value);
                    if (e.target.value) {
                      validateReferralCode(e.target.value);
                    } else {
                      setReferralValid(null);
                    }
                  }}
                  className={`pl-10 ${
                    referralValid === true
                      ? 'border-green-500'
                      : referralValid === false
                      ? 'border-red-500'
                      : ''
                  }`}
                />
              </div>
              {referralValid === true && (
                <p className="text-xs text-green-600">
                  ✓ 推荐码有效！注册后你将获得 1GB 流量奖励
                </p>
              )}
              {referralValid === false && (
                <p className="text-xs text-red-600">
                  ✗ 推荐码无效
                </p>
              )}
            </div>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4">
            <Button
              type="submit"
              className="w-full"
              disabled={registerMutation.isPending || isValidating}
            >
              {registerMutation.isPending ? '注册中...' : '注册'}
            </Button>
            <div className="text-sm text-center text-muted-foreground">
              已有账号？{' '}
              <button
                type="button"
                onClick={() => setLocation('/')}
                className="text-purple-600 hover:underline"
              >
                立即登录
              </button>
            </div>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
