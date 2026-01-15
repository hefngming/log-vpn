import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, CreditCard, Globe, TrendingUp, ArrowUpRight, ArrowDownRight, Shield, ArrowLeft, Settings } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";

export default function AdminDashboard() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();

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

  // Mock stats data
  const stats = [
    {
      title: "总用户数",
      value: "1,234",
      change: "+12%",
      trend: "up",
      icon: Users,
    },
    {
      title: "活跃订阅",
      value: "856",
      change: "+8%",
      trend: "up",
      icon: CreditCard,
    },
    {
      title: "在线节点",
      value: "12",
      change: "0%",
      trend: "neutral",
      icon: Globe,
    },
    {
      title: "今日收入",
      value: "¥2,580",
      change: "+23%",
      trend: "up",
      icon: TrendingUp,
    },
  ];

  const recentOrders = [
    { id: "ORD001", user: "user1@example.com", plan: "专业版", amount: "¥59", status: "paid", time: "10 分钟前" },
    { id: "ORD002", user: "user2@example.com", plan: "企业版", amount: "¥199", status: "pending", time: "25 分钟前" },
    { id: "ORD003", user: "user3@example.com", plan: "基础版", amount: "¥29", status: "paid", time: "1 小时前" },
    { id: "ORD004", user: "user4@example.com", plan: "专业版", amount: "¥59", status: "paid", time: "2 小时前" },
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
              <span className="text-sm text-muted-foreground ml-2">管理后台</span>
            </div>
          </Link>
          <Link href="/dashboard">
            <Button variant="ghost" className="text-muted-foreground hover:text-foreground">
              <ArrowLeft className="w-4 h-4 mr-2" />
              返回用户控制台
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
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
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

            {/* Main Content */}
            <div className="flex-1 space-y-6">
              {/* Header */}
              <div>
                <h1 className="text-2xl font-bold text-foreground">管理仪表盘</h1>
                <p className="text-muted-foreground">欢迎回来，{user?.name || "管理员"}</p>
              </div>

              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {stats.map((stat) => (
                  <Card key={stat.title} className="bg-card border-border">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div>
                          <p className="text-sm text-muted-foreground">{stat.title}</p>
                          <p className="text-2xl font-bold text-foreground mt-1">{stat.value}</p>
                        </div>
                        <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                          <stat.icon className="w-6 h-6 text-primary" />
                        </div>
                      </div>
                      <div className="flex items-center gap-1 mt-4">
                        {stat.trend === "up" ? (
                          <ArrowUpRight className="w-4 h-4 text-green-500" />
                        ) : stat.trend === "down" ? (
                          <ArrowDownRight className="w-4 h-4 text-red-500" />
                        ) : null}
                        <span
                          className={`text-sm ${
                            stat.trend === "up"
                              ? "text-green-500"
                              : stat.trend === "down"
                              ? "text-red-500"
                              : "text-muted-foreground"
                          }`}
                        >
                          {stat.change}
                        </span>
                        <span className="text-sm text-muted-foreground">vs 上月</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Recent Orders */}
              <Card className="bg-card border-border">
                <CardHeader>
                  <CardTitle className="text-foreground">最近订单</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">订单号</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">用户</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">套餐</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">金额</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">状态</th>
                          <th className="text-left py-3 px-4 text-sm font-medium text-muted-foreground">时间</th>
                        </tr>
                      </thead>
                      <tbody>
                        {recentOrders.map((order) => (
                          <tr key={order.id} className="border-b border-border last:border-0">
                            <td className="py-3 px-4 text-sm text-foreground">{order.id}</td>
                            <td className="py-3 px-4 text-sm text-foreground">{order.user}</td>
                            <td className="py-3 px-4 text-sm text-foreground">{order.plan}</td>
                            <td className="py-3 px-4 text-sm text-foreground">{order.amount}</td>
                            <td className="py-3 px-4">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  order.status === "paid"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                                }`}
                              >
                                {order.status === "paid" ? "已支付" : "待支付"}
                              </span>
                            </td>
                            <td className="py-3 px-4 text-sm text-muted-foreground">{order.time}</td>
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
