import { useAuth } from "@/_core/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Shield, Globe, Signal, ArrowLeft, Search, Copy, Check, RefreshCw, Download } from "lucide-react";
import { Link } from "wouter";
import { getLoginUrl } from "@/const";
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

export default function Nodes() {
  const { isAuthenticated, loading, user } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const [nodes, setNodes] = useState<any[]>([]);
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState<string | null>(null);
  
  // tRPC mutation for syncing nodes
  const syncNodesMutation = trpc.nodes.sync.useMutation();

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

  // Handle node sync
  const handleSyncNodes = async () => {
    setIsSyncing(true);
    try {
      const result = await syncNodesMutation.mutateAsync();
      if (result.success) {
        setNodes(result.nodes || []);
        setLastUpdated(new Date().toLocaleString('zh-CN'));
        toast.success(`✅ 成功获取 ${result.count} 个节点`);
      } else {
        toast.error(`❌ ${result.message}`);
      }
    } catch (error: any) {
      toast.error(`获取节点失败: ${error.message}`);
    } finally {
      setIsSyncing(false);
    }
  };

  // Auto sync nodes on mount (only for admin)
  useEffect(() => {
    if (user?.role === 'admin') {
      handleSyncNodes();
    }
  }, []);

  const filteredNodes = nodes.filter(
    (node) =>
      node.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      node.address?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getProtocolColor = (protocol: string) => {
    const colorMap: Record<string, string> = {
      'vless': 'bg-blue-500/10 text-blue-500',
      'trojan': 'bg-purple-500/10 text-purple-500',
      'shadowsocks': 'bg-red-500/10 text-red-500',
      'vmess': 'bg-cyan-500/10 text-cyan-500',
      'xray': 'bg-orange-500/10 text-orange-500',
    };
    return colorMap[protocol?.toLowerCase()] || 'bg-gray-500/10 text-gray-500';
  };

  const downloadNodeConfig = (node: any) => {
    const config = {
      name: node.name,
      protocol: node.protocol,
      server: node.address,
      server_port: node.port,
      ...node.config,
    };
    
    const blob = new Blob([JSON.stringify(config, null, 2)], {
      type: 'application/json',
    });
    
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${node.name}.json`;
    a.click();
    window.URL.revokeObjectURL(url);
    toast.success('节点配置已下载');
  };

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
              {user?.role === 'admin' && (
                <Button
                  onClick={handleSyncNodes}
                  disabled={isSyncing}
                  className="flex-1 md:flex-none"
                >
                  <RefreshCw className={`w-4 h-4 mr-2 ${isSyncing ? 'animate-spin' : ''}`} />
                  {isSyncing ? '同步中...' : '更新节点'}
                </Button>
              )}
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

          {/* Nodes Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredNodes.map((node) => (
              <Card
                key={node.id}
                className="bg-card border-border hover:border-primary/50 transition-colors"
              >
                <CardContent className="p-4">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <p className="font-medium text-foreground truncate">{node.name}</p>
                      <p className="text-sm text-muted-foreground truncate">{node.address}:{node.port}</p>
                    </div>
                    <span className={`px-2 py-1 text-xs rounded whitespace-nowrap ml-2 ${getProtocolColor(node.protocol)}`}>
                      {node.protocol?.toUpperCase()}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    {node.cipher && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">加密:</span> {node.cipher}
                      </p>
                    )}
                    {node.config?.inbound?.protocol && (
                      <p className="text-xs text-muted-foreground">
                        <span className="font-medium">协议:</span> {node.config.inbound.protocol}
                      </p>
                    )}
                  </div>

                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      className="flex-1 border-primary text-primary"
                      onClick={() => copySubscriptionLink(node.id)}
                    >
                      {copiedId === node.id ? (
                        <>
                          <Check className="w-4 h-4 mr-1" />
                          已复制
                        </>
                      ) : (
                        <>
                          <Copy className="w-4 h-4 mr-1" />
                          复制
                        </>
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      className="border-primary text-primary"
                      onClick={() => downloadNodeConfig(node)}
                    >
                      <Download className="w-4 h-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredNodes.length === 0 && (
            <div className="text-center py-12">
              <Globe className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">
                {nodes.length === 0 ? '暂无节点，请点击"更新节点"获取最新列表' : '没有找到匹配的节点'}
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
