import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Users, Search, ArrowLeft, CreditCard, Globe, TrendingUp, Check, X } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminOrders() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");

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

  // Mock orders data
  const orders = [
    { id: "ORD001", user: "user1@example.com", plan: "专业版", amount: 59, status: "paid", paymentMethod: "微信", createdAt: "2024-01-14 10:30" },
    { id: "ORD002", user: "user2@example.com", plan: "企业版", amount: 199, status: "pending", paymentMethod: "-", createdAt: "2024-01-14 10:15" },
    { id: "ORD003", user: "user3@example.com", plan: "基础版", amount: 29, status: "paid", paymentMethod: "支付宝", createdAt: "2024-01-14 09:45" },
    { id: "ORD004", user: "user4@example.com", plan: "专业版", amount: 59, status: "paid", paymentMethod: "微信", createdAt: "2024-01-14 08:20" },
    { id: "ORD005", user: "user5@example.com", plan: "基础版", amount: 29, status: "failed", paymentMethod: "-", createdAt: "2024-01-13 22:10" },
  ];

  const filteredOrders = orders.filter(
    (o) =>
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.user.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleConfirmPayment = (orderId: string) => {
    toast.success(`订单 ${orderId} 已确认支付`);
  };

  const handleCancelOrder = (orderId: string) => {
    toast.success(`订单 ${orderId} 已取消`);
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
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
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
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6">
                <div>
                  <h1 className="text-2xl font-bold text-foreground">订单管理</h1>
                  <p className="text-muted-foreground">查看和管理所有订单</p>
                </div>
                <div className="relative w-full md:w-64">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input
                    placeholder="搜索订单..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-9 bg-secondary border-border"
                  />
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">订单号</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">用户</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">套餐</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">金额</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">状态</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">支付方式</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">时间</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                            <td className="py-4 px-4 text-foreground font-mono">{order.id}</td>
                            <td className="py-4 px-4 text-foreground">{order.user}</td>
                            <td className="py-4 px-4 text-foreground">{order.plan}</td>
                            <td className="py-4 px-4 text-foreground">¥{order.amount}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  order.status === "paid"
                                    ? "bg-green-500/10 text-green-500"
                                    : order.status === "pending"
                                    ? "bg-yellow-500/10 text-yellow-500"
                                    : "bg-red-500/10 text-red-500"
                                }`}
                              >
                                {order.status === "paid" ? "已支付" : order.status === "pending" ? "待支付" : "失败"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-muted-foreground">{order.paymentMethod}</td>
                            <td className="py-4 px-4 text-muted-foreground">{order.createdAt}</td>
                            <td className="py-4 px-4">
                              {order.status === "pending" && (
                                <div className="flex items-center gap-2">
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-green-500 text-green-500 hover:bg-green-500/10"
                                    onClick={() => handleConfirmPayment(order.id)}
                                  >
                                    <Check className="w-4 h-4" />
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant="outline"
                                    className="border-red-500 text-red-500 hover:bg-red-500/10"
                                    onClick={() => handleCancelOrder(order.id)}
                                  >
                                    <X className="w-4 h-4" />
                                  </Button>
                                </div>
                              )}
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
    </div>
  );
}
