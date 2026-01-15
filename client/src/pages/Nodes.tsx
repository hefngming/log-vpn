import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Globe, Signal, ArrowLeft, Search, Copy, Check } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState } from "react";
import { toast } from "sonner";

export default function Nodes() {
  const { isAuthenticated, loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<number | null>(null);

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

  // Mock nodes data - will be replaced with real API data from X-ui
  const nodes = [
    { id: 1, name: "新加坡 - SG1", country: "Singapore", countryCode: "SG", protocol: "vless", latency: 45, load: 35, status: "online" },
    { id: 2, name: "日本 - JP1", country: "Japan", countryCode: "JP", protocol: "trojan", latency: 68, load: 42, status: "online" },
    { id: 3, name: "美国 - US1", country: "United States", countryCode: "US", protocol: "vless", latency: 180, load: 28, status: "online" },
    { id: 4, name: "香港 - HK1", country: "Hong Kong", countryCode: "HK", protocol: "shadowsocks", latency: 35, load: 65, status: "online" },
    { id: 5, name: "德国 - DE1", country: "Germany", countryCode: "DE", protocol: "vless", latency: 220, load: 18, status: "online" },
    { id: 6, name: "英国 - UK1", country: "United Kingdom", countryCode: "GB", protocol: "trojan", latency: 195, load: 22, status: "online" },
    { id: 7, name: "韩国 - KR1", country: "South Korea", countryCode: "KR", protocol: "vless", latency: 55, load: 48, status: "online" },
    { id: 8, name: "台湾 - TW1", country: "Taiwan", countryCode: "TW", protocol: "vmess", latency: 42, load: 55, status: "maintenance" },
  ];

  const filteredNodes = nodes.filter(
    (node) =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.country.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getLatencyColor = (latency: number) => {
    if (latency < 100) return "text-green-500";
    if (latency < 200) return "text-yellow-500";
    return "text-red-500";
  };

  const getLoadColor = (load: number) => {
    if (load < 50) return "bg-green-500";
    if (load < 80) return "bg-yellow-500";
    return "bg-red-500";
  };

  const copySubscriptionLink = (nodeId: number) => {
    // Mock subscription link
    const link = `https://dj.siumingho.dpdns.org/api/subscribe/${nodeId}`;
    navigator.clipboard.writeText(link);
    setCopiedId(nodeId);
    toast.success("订阅链接已复制");
    setTimeout(() => setCopiedId(null), 2000);
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
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl font-bold text-foreground mb-2">节点列表</h1>
              <p className="text-muted-foreground">
                共 {nodes.length} 个节点可用
              </p>
            </div>
            <div className="relative w-full md:w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="搜索节点..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-9 bg-secondary border-border"
              />
            </div>
          </div>

          {/* Subscription Link */}
          <Card className="bg-card border-border mb-8">
            <CardContent className="p-4">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                  <p className="font-medium text-foreground">通用订阅链接</p>
                  <p className="text-sm text-muted-foreground">
                    适用于 v2rayN、Clash、Shadowrocket 等客户端
                  </p>
                </div>
                <Button
                  variant="outline"
                  className="border-primary text-primary"
                  onClick={() => {
                    navigator.clipboard.writeText("https://dj.siumingho.dpdns.org/api/subscribe/all");
                    toast.success("订阅链接已复制");
                  }}
                >
                  <Copy className="w-4 h-4 mr-2" />
                  复制订阅链接
                </Button>
              </div>
            </CardContent>
          </Card>

          {/* Nodes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNodes.map((node) => (
              <Card
                key={node.id}
                className={`bg-card border-border hover:border-primary/50 transition-colors ${
                  node.status === "maintenance" ? "opacity-60" : ""
                }`}
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Globe className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-foreground">{node.name}</p>
                        <p className="text-sm text-muted-foreground">{node.country}</p>
                      </div>
                    </div>
                    <span
                      className={`px-2 py-1 text-xs rounded ${
                        node.status === "online"
                          ? "bg-green-500/10 text-green-500"
                          : "bg-yellow-500/10 text-yellow-500"
                      }`}
                    >
                      {node.status === "online" ? "在线" : "维护中"}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-4 mb-4">
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">协议</p>
                      <p className="text-sm font-medium text-foreground uppercase">
                        {node.protocol}
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">延迟</p>
                      <p className={`text-sm font-medium ${getLatencyColor(node.latency)}`}>
                        {node.latency} ms
                      </p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground mb-1">负载</p>
                      <div className="flex items-center gap-2">
                        <div className="flex-1 h-1.5 bg-secondary rounded-full overflow-hidden">
                          <div
                            className={`h-full ${getLoadColor(node.load)}`}
                            style={{ width: `${node.load}%` }}
                          />
                        </div>
                        <span className="text-xs text-muted-foreground">{node.load}%</span>
                      </div>
                    </div>
                  </div>

                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full border-primary text-primary"
                    onClick={() => copySubscriptionLink(node.id)}
                    disabled={node.status === "maintenance"}
                  >
                    {copiedId === node.id ? (
                      <>
                        <Check className="w-4 h-4 mr-2" />
                        已复制
                      </>
                    ) : (
                      <>
                        <Copy className="w-4 h-4 mr-2" />
                        复制节点链接
                      </>
                    )}
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNodes.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">没有找到匹配的节点</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
