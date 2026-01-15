import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Shield, Users, Search, Plus, Check, ArrowLeft, CreditCard, Globe, TrendingUp, Settings, RefreshCw } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function AdminUsers() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activateDays, setActivateDays] = useState("30");
  const [selectedPlan, setSelectedPlan] = useState("专业版");
  const [trafficLimit, setTrafficLimit] = useState("214748364800");

  const { data: usersData, isLoading: usersLoading, refetch } = trpc.admin.getUsers.useQuery(undefined, {
    enabled: isAuthenticated && user?.role === 'admin',
  });

  const activateMutation = trpc.admin.activateUser.useMutation({
    onSuccess: () => {
      toast.success(`已为 ${selectedUser?.email || selectedUser?.name} 激活 ${activateDays} 天订阅`);
      setActivateDialogOpen(false);
      setSelectedUser(null);
      refetch();
    },
    onError: (error) => {
      toast.error(`激活失败: ${error.message}`);
    },
  });

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

  const filteredUsers = (usersData || []).filter(
    (u: any) =>
      (u.email?.toLowerCase() || '').includes(searchTerm.toLowerCase()) ||
      (u.name?.toLowerCase() || '').includes(searchTerm.toLowerCase())
  );

  const handleActivate = (user: any) => {
    setSelectedUser(user);
    setActivateDialogOpen(true);
  };

  const confirmActivate = () => {
    if (!selectedUser) return;
    activateMutation.mutate({
      userId: selectedUser.id,
      planName: selectedPlan,
      days: parseInt(activateDays),
      trafficLimit: parseInt(trafficLimit),
    });
  };

  const formatBytes = (bytes: number) => {
    if (bytes === 0) return '0 GB';
    const gb = bytes / (1024 * 1024 * 1024);
    return gb >= 1000 ? '无限' : `${gb.toFixed(1)} GB`;
  };

  const formatDate = (date: Date | string | null) => {
    if (!date) return '-';
    return new Date(date).toLocaleDateString('zh-CN');
  };

  const getStatusInfo = (subscription: any) => {
    if (!subscription) {
      return { status: 'pending', label: '待激活', className: 'bg-yellow-500/10 text-yellow-500' };
    }
    if (subscription.status === 'active' && new Date(subscription.endDate) > new Date()) {
      return { status: 'active', label: '有效', className: 'bg-green-500/10 text-green-500' };
    }
    return { status: 'expired', label: '已过期', className: 'bg-red-500/10 text-red-500' };
  };

  return (
    <div className="min-h-screen bg-background">
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
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
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
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <Settings className="w-5 h-5" />
                        <span>系统设置</span>
                      </div>
                    </Link>
                  </nav>
                </CardContent>
              </Card>
            </div>

            <div className="flex-1">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
                  <p className="text-muted-foreground">管理所有注册用户和订阅状态</p>
                </div>
                <div className="flex items-center gap-3">
                  <Button variant="outline" size="sm" onClick={() => refetch()} disabled={usersLoading}>
                    <RefreshCw className={`w-4 h-4 mr-2 ${usersLoading ? 'animate-spin' : ''}`} />
                    刷新
                  </Button>
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索邮箱或用户名..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  {usersLoading ? (
                    <div className="flex items-center justify-center py-12">
                      <div className="animate-spin w-8 h-8 border-2 border-primary border-t-transparent rounded-full" />
                    </div>
                  ) : filteredUsers.length === 0 ? (
                    <div className="text-center py-12 text-muted-foreground">
                      {searchTerm ? '未找到匹配的用户' : '暂无用户数据'}
                    </div>
                  ) : (
                    <div className="overflow-x-auto">
                      <table className="w-full">
                        <thead>
                          <tr className="border-b border-border">
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">用户</th>
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">套餐</th>
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">状态</th>
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">流量</th>
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">到期时间</th>
                            <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">操作</th>
                          </tr>
                        </thead>
                        <tbody>
                          {filteredUsers.map((u: any) => {
                            const statusInfo = getStatusInfo(u.subscription);
                            return (
                              <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                                <td className="py-4 px-4">
                                  <div>
                                    <p className="font-medium text-foreground">{u.name || '未设置'}</p>
                                    <p className="text-sm text-muted-foreground">{u.email || u.openId}</p>
                                  </div>
                                </td>
                                <td className="py-4 px-4 text-foreground">{u.subscription?.planName || '无'}</td>
                                <td className="py-4 px-4">
                                  <span className={`px-2 py-1 text-xs rounded ${statusInfo.className}`}>
                                    {statusInfo.label}
                                  </span>
                                </td>
                                <td className="py-4 px-4 text-foreground">
                                  {u.subscription ? `${formatBytes(u.subscription.trafficUsed || 0)} / ${formatBytes(u.subscription.trafficLimit || 0)}` : '-'}
                                </td>
                                <td className="py-4 px-4 text-muted-foreground">
                                  {u.subscription ? formatDate(u.subscription.endDate) : '-'}
                                </td>
                                <td className="py-4 px-4">
                                  <Button size="sm" variant="outline" className="border-primary text-primary hover:bg-primary/10" onClick={() => handleActivate(u)}>
                                    <Plus className="w-4 h-4 mr-1" />
                                    激活/续费
                                  </Button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      <Dialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">激活/续费订阅</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              为用户 {selectedUser?.email || selectedUser?.name} 手动激活或延长订阅时间
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">选择套餐</label>
              <Select value={selectedPlan} onValueChange={(value) => {
                setSelectedPlan(value);
                if (value === '基础版') setTrafficLimit('53687091200');
                else if (value === '专业版') setTrafficLimit('214748364800');
                else setTrafficLimit('1099511627776');
              }}>
                <SelectTrigger className="mt-2 bg-secondary border-border">
                  <SelectValue placeholder="选择套餐" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="基础版">基础版 - 50GB/月</SelectItem>
                  <SelectItem value="专业版">专业版 - 200GB/月</SelectItem>
                  <SelectItem value="企业版">企业版 - 1TB/月</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">订阅天数</label>
              <Select value={activateDays} onValueChange={setActivateDays}>
                <SelectTrigger className="mt-2 bg-secondary border-border">
                  <SelectValue placeholder="选择天数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1 天（测试）</SelectItem>
                  <SelectItem value="7">7 天</SelectItem>
                  <SelectItem value="30">30 天</SelectItem>
                  <SelectItem value="90">90 天</SelectItem>
                  <SelectItem value="180">180 天</SelectItem>
                  <SelectItem value="365">365 天</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="bg-secondary/50 rounded-lg p-3">
              <p className="text-sm text-muted-foreground">
                <span className="text-foreground font-medium">操作预览：</span><br />
                套餐：{selectedPlan}<br />
                时长：{activateDays} 天<br />
                流量：{formatBytes(parseInt(trafficLimit))}
              </p>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActivateDialogOpen(false)}>取消</Button>
            <Button className="gradient-primary text-white border-0" onClick={confirmActivate} disabled={activateMutation.isPending}>
              {activateMutation.isPending ? <RefreshCw className="w-4 h-4 mr-2 animate-spin" /> : <Check className="w-4 h-4 mr-2" />}
              确认激活
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
