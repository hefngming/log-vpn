import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // 调用后端登录 API
      const response = await fetch(`${import.meta.env.VITE_API_URL || 'https://dj.siumingho.dpdns.org'}/api/trpc/auth.login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          json: { email, password }
        }),
        credentials: 'include',
      });

      const data = await response.json();

      if (data.result?.data?.json?.success) {
        toast({
          title: '登录成功',
          description: '欢迎回来！',
        });
        // 保存用户信息到 localStorage
        localStorage.setItem('user', JSON.stringify(data.result.data.json.user));
        // 跳转到节点页面
        window.location.href = '/nodes';
      } else {
        toast({
          title: '登录失败',
          description: data.result?.data?.json?.message || '邮箱或密码错误',
          variant: 'destructive',
        });
      }
    } catch (error) {
      toast({
        title: '登录失败',
        description: '网络错误，请检查连接',
        variant: 'destructive',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-900 via-purple-800 to-indigo-900 p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="space-y-1">
          <div className="flex items-center justify-center mb-4">
            <img src="/images/logo.png" alt="LogVPN" className="h-16 w-16" />
          </div>
          <CardTitle className="text-2xl font-bold text-center">LogVPN 客户端</CardTitle>
          <CardDescription className="text-center">
            登录您的账号以开始使用
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email">邮箱</Label>
              <Input
                id="email"
                type="email"
                placeholder="your@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">密码</Label>
              <Input
                id="password"
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? '登录中...' : '登录'}
            </Button>
          </form>
          <div className="mt-4 text-center text-sm text-muted-foreground">
            还没有账号？{' '}
            <a href="https://dj.siumingho.dpdns.org/register" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline">
              前往注册
            </a>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
