import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Globe, Signal, ArrowLeft, Search, Copy, Check, RefreshCw, Download } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import { useAuth } from "@/_core/hooks/useAuth";

export default function Nodes() {
  const { isAuthenticated, loading, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // tRPC query for encrypted nodes
  const encryptedNodesQuery = trpc.nodes.getEncrypted.useQuery();

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

  // Load encrypted nodes on mount
  useEffect(() => {
    if (encryptedNodesQuery.data?.nodes) {
      setNodes(encryptedNodesQuery.data.nodes);
      setLastUpdated(new Date().toLocaleString('zh-CN'));
    }
  }, [encryptedNodesQuery.data]);

  const handleRefresh = async () => {
    setIsLoading(true);
    try {
      await encryptedNodesQuery.refetch();
      toast.success("✅ 节点已刷新");
    } catch (error: any) {
      toast.error(`刷新失败: ${error.message}`);
    } finally {
      setIsLoading(false);
    }
  };

  const filteredNodes = nodes.filter(
    (node) =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const copySubscriptionLink = (nodeId: string) => {
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
                {lastUpdated && ` • 最后更新: ${lastUpdated}`}
              </p>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <Button
                onClick={handleRefresh}
                disabled={isLoading || encryptedNodesQuery.isLoading}
                className="flex-1 md:flex-none"
              >
                <RefreshCw className={`w-4 h-4 mr-2 ${isLoading || encryptedNodesQuery.isLoading ? 'animate-spin' : ''}`} />
                {isLoading || encryptedNodesQuery.isLoading ? '加载中...' : '刷新节点'}
              </Button>
              <div className="relative flex-1 md:flex-none md:w-64">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input
                  placeholder="搜索节点..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-9 bg-secondary border-border"
                />
              </div>
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

          {/* Nodes Grid - Only Show Names */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNodes.length > 0 ? (
              filteredNodes.map((node) => (
                <Card
                  key={node.id}
                  className="bg-card border-border hover:border-primary/50 transition-colors"
                >
                  <CardContent className="p-4">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex-1">
                        <p className="font-medium text-foreground truncate text-lg">{node.name}</p>
                        <p className="text-xs text-muted-foreground mt-1">节点 ID: {node.id}</p>
                      </div>
                      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                    </div>
                    
                    {/* Action Buttons */}
                    <div className="flex gap-2 mt-4">
                      <Button
                        size="sm"
                        variant="outline"
                        className="flex-1"
                        onClick={() => copySubscriptionLink(node.id)}
                      >
                        {copiedId === node.id ? (
                          <>
                            <Check className="w-3 h-3 mr-1" />
                            已复制
                          </>
                        ) : (
                          <>
                            <Copy className="w-3 h-3 mr-1" />
                            复制链接
                          </>
                        )}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4 opacity-50" />
                <p className="text-muted-foreground">暂无可用节点</p>
              </div>
            )}
          </div>

          {/* Info Card */}
          <Card className="bg-card border-border mt-8">
            <CardHeader>
              <CardTitle className="text-base">使用说明</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3 text-sm text-muted-foreground">
              <p>✅ 节点信息已加密传输，安全可靠</p>
              <p>✅ 仅显示节点名称，完整配置在客户端解密</p>
              <p>✅ 复制订阅链接后，在 VPN 客户端中导入使用</p>
              <p>✅ 支持 v2rayN、Clash、Shadowrocket 等主流客户端</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
