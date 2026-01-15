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
import { Shield, Users, Search, ArrowLeft, CreditCard, Globe, TrendingUp, Plus, Edit, Trash2, RefreshCw } from "lucide-react";
import { Link, useLocation } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function AdminNodes() {
  const { user, isAuthenticated, loading } = useAuth();
  const [, setLocation] = useLocation();
  const [searchTerm, setSearchTerm] = useState("");
  const [addDialogOpen, setAddDialogOpen] = useState(false);

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

  // Mock nodes data
  const nodes = [
    { id: 1, name: "新加坡 - SG1", country: "Singapore", countryCode: "SG", protocol: "vless", address: "sg1.example.com", port: 443, status: "online", users: 156 },
    { id: 2, name: "日本 - JP1", country: "Japan", countryCode: "JP", protocol: "trojan", address: "jp1.example.com", port: 443, status: "online", users: 203 },
    { id: 3, name: "美国 - US1", country: "United States", countryCode: "US", protocol: "vless", address: "us1.example.com", port: 443, status: "online", users: 89 },
    { id: 4, name: "香港 - HK1", country: "Hong Kong", countryCode: "HK", protocol: "shadowsocks", address: "hk1.example.com", port: 8388, status: "online", users: 312 },
    { id: 5, name: "台湾 - TW1", country: "Taiwan", countryCode: "TW", protocol: "vmess", address: "tw1.example.com", port: 443, status: "maintenance", users: 0 },
  ];

  const filteredNodes = nodes.filter(
    (n) =>
      n.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      n.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSyncXui = () => {
    toast.success("正在从 X-ui 同步节点信息...");
    // TODO: Call API to sync from X-ui
    setTimeout(() => {
      toast.success("节点同步完成");
    }, 2000);
  };

  const handleDeleteNode = (nodeId: number) => {
    toast.success(`节点已删除`);
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
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors cursor-pointer">
                        <CreditCard className="w-5 h-5" />
                        <span>订单管理</span>
                      </div>
                    </Link>
                    <Link href="/admin/nodes">
                      <div className="flex items-center gap-3 px-3 py-2 rounded-lg bg-primary/10 text-primary cursor-pointer">
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
                  <h1 className="text-2xl font-bold text-foreground">节点管理</h1>
                  <p className="text-muted-foreground">管理 VPN 节点和同步 X-ui 配置</p>
                </div>
                <div className="flex items-center gap-3">
                  <div className="relative w-full md:w-64">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="搜索节点..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9 bg-secondary border-border"
                    />
                  </div>
                  <Button
                    variant="outline"
                    className="border-primary text-primary"
                    onClick={handleSyncXui}
                  >
                    <RefreshCw className="w-4 h-4 mr-2" />
                    同步 X-ui
                  </Button>
                  <Button
                    className="gradient-primary text-white border-0"
                    onClick={() => setAddDialogOpen(true)}
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    添加节点
                  </Button>
                </div>
              </div>

              <Card className="bg-card border-border">
                <CardContent className="p-0">
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b border-border">
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">节点名称</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">协议</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">地址</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">端口</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">状态</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">在线用户</th>
                          <th className="text-left py-4 px-4 text-sm font-medium text-muted-foreground">操作</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredNodes.map((node) => (
                          <tr key={node.id} className="border-b border-border last:border-0 hover:bg-secondary/50">
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center">
                                  <Globe className="w-4 h-4 text-primary" />
                                </div>
                                <div>
                                  <p className="font-medium text-foreground">{node.name}</p>
                                  <p className="text-sm text-muted-foreground">{node.country}</p>
                                </div>
                              </div>
                            </td>
                            <td className="py-4 px-4 text-foreground uppercase">{node.protocol}</td>
                            <td className="py-4 px-4 text-foreground font-mono text-sm">{node.address}</td>
                            <td className="py-4 px-4 text-foreground">{node.port}</td>
                            <td className="py-4 px-4">
                              <span
                                className={`px-2 py-1 text-xs rounded ${
                                  node.status === "online"
                                    ? "bg-green-500/10 text-green-500"
                                    : "bg-yellow-500/10 text-yellow-500"
                                }`}
                              >
                                {node.status === "online" ? "在线" : "维护中"}
                              </span>
                            </td>
                            <td className="py-4 px-4 text-foreground">{node.users}</td>
                            <td className="py-4 px-4">
                              <div className="flex items-center gap-2">
                                <Button size="sm" variant="ghost" className="text-muted-foreground hover:text-foreground">
                                  <Edit className="w-4 h-4" />
                                </Button>
                                <Button
                                  size="sm"
                                  variant="ghost"
                                  className="text-red-500 hover:text-red-400"
                                  onClick={() => handleDeleteNode(node.id)}
                                >
                                  <Trash2 className="w-4 h-4" />
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

      {/* Add Node Dialog */}
      <Dialog open={addDialogOpen} onOpenChange={setAddDialogOpen}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">添加节点</DialogTitle>
            <DialogDescription className="text-muted-foreground">
              手动添加新的 VPN 节点
            </DialogDescription>
          </DialogHeader>
          <div className="space-y-4 py-4">
            <div>
              <label className="text-sm font-medium text-foreground">节点名称</label>
              <Input placeholder="例如: 新加坡 - SG1" className="mt-2 bg-secondary border-border" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">国家</label>
                <Input placeholder="Singapore" className="mt-2 bg-secondary border-border" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">国家代码</label>
                <Input placeholder="SG" className="mt-2 bg-secondary border-border" />
              </div>
            </div>
            <div>
              <label className="text-sm font-medium text-foreground">协议</label>
              <Select defaultValue="vless">
                <SelectTrigger className="mt-2 bg-secondary border-border">
                  <SelectValue placeholder="选择协议" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="vless">VLESS</SelectItem>
                  <SelectItem value="trojan">Trojan</SelectItem>
                  <SelectItem value="shadowsocks">Shadowsocks</SelectItem>
                  <SelectItem value="vmess">VMess</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground">服务器地址</label>
                <Input placeholder="example.com" className="mt-2 bg-secondary border-border" />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground">端口</label>
                <Input placeholder="443" type="number" className="mt-2 bg-secondary border-border" />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setAddDialogOpen(false)}>
              取消
            </Button>
            <Button className="gradient-primary text-white border-0" onClick={() => {
              toast.success("节点添加成功");
              setAddDialogOpen(false);
            }}>
              添加节点
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
