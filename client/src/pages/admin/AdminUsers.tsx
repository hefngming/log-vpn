import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
import { Shield, Users, Search, Plus, Clock, Check, X, ArrowLeft, CreditCard, Globe, TrendingUp } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminUsers() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [activateDialogOpen, setActivateDialogOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<any>(null);
  const [activateDays, setActivateDays] = useState("30");

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

  // Mock users data
  const users = [
    { id: 1, email: "user1@example.com", name: "张三", plan: "专业版", status: "active", trafficUsed: "45.2 GB", trafficLimit: "200 GB", endDate: "2024-02-15", createdAt: "2024-01-01" },
    { id: 2, email: "user2@example.com", name: "李四", plan: "基础版", status: "expired", trafficUsed: "12.8 GB", trafficLimit: "50 GB", endDate: "2024-01-10", createdAt: "2023-12-15" },
    { id: 3, email: "user3@example.com", name: "王五", plan: "企业版", status: "active", trafficUsed: "128.5 GB", trafficLimit: "无限", endDate: "2024-03-20", createdAt: "2024-01-05" },
    { id: 4, email: "user4@example.com", name: "赵六", plan: "无", status: "pending", trafficUsed: "0 GB", trafficLimit: "1 GB", endDate: "-", createdAt: "2024-01-14" },
    { id: 5, email: "user5@example.com", name: "钱七", plan: "专业版", status: "active", trafficUsed: "89.3 GB", trafficLimit: "200 GB", endDate: "2024-02-28", createdAt: "2024-01-08" },
  ];

  const filteredUsers = users.filter(
    (u) =>
      u.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
      u.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleActivate = (user: any) => {
    setSelectedUser(user);
    setActivateDialogOpen(true);
  };

  const confirmActivate = () => {
    // TODO: Call API to activate subscription
    toast.success(`已为 ${selectedUser.email} 延长 ${activateDays} 天订阅`);
    setActivateDialogOpen(false);
    setSelectedUser(null);
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
          {/* Sidebar + Content */}
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
                  </nav>
                </CardContent>
              </Card>
            </div>

            {/* Main Content */}
            <div className="flex-1">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">用户管理</h1>
                  <p className="text-muted-foreground">管理所有注册用户和订阅状态</p>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索用户..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-secondary border-border"
                  />
                </div>
              </div>

              {/* Users Table */}
              <Card className="bg-card border-border">
                <CardContent className="p-0">
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
                        {filteredUsers.map((u) => (
                          <tr key={u.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                            <td className="py-4 px-4">
                              <div>
                                <p className="font-medium text-foreground">{u.name}</p>
                                <p className="text-sm text-muted-foreground">{u.email}</p>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-foreground">{u.plan}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  u.status === "active"
                                    ? "bg-green-500/10 text-green-500"
                                    : u.status === "expired"
                                    ? "bg-red-500/10 text-red-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                                }`}
                              >
                                {u.status === "active" ? "有效" : u.status === "expired" ? "已过期" : "待激活"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-foreground">
                              {u.trafficUsed} / {u.trafficLimit}
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{u.endDate}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Button
                                  size="sm"
                                  variant="outline"
                                  className="border-primary text-primary hover:bg-primary/10"
                                  onClick={() => handleActivate(u)}
                                >
                                  <Plus className="w-4 h-4 mr-1" />
                                  激活/延长
                                </Button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>

      {/* Activate Dialog */}
      <Dialog open={activateDialogOpen} onOpenChange={setActivateDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">激活/延长订阅</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              为用户 {selectedUser?.email} 手动激活或延长订阅时间
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">选择套餐</label>
              <Select defaultValue="pro">
                <SelectTrigger className="mt-2 bg-secondary border-border">
                  <SelectValue placeholder="选择套餐" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="basic">基础版 - 50GB/月</SelectItem>
                  <SelectItem value="pro">专业版 - 200GB/月</SelectItem>
                  <SelectItem value="enterprise">企业版 - 无限流量</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">延长天数</label>
              <Select value={activateDays} onValueChange={setActivateDays}>
                <SelectTrigger className="mt-2 bg-secondary border-border">
                  <SelectValue placeholder="选择天数" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="7">7 天</SelectItem>
                  <SelectItem value="30">30 天</SelectItem>
                  <SelectItem value="90">90 天</SelectItem>
                  <SelectItem value="180">180 天</SelectItem>
                  <SelectItem value="365">365 天</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setActivateDialogOpen(false)}>
              取消
            </Button>
            <Button className="gradient-primary text-white border-0" onClick={confirmActivate}>
              <Check className="w-4 h-4 mr-2" />
              确认激活
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
