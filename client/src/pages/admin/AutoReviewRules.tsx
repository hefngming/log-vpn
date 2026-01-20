import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Plus, Edit, Trash2, Power, PowerOff } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";

interface AutoReviewRule {
  id: number;
  name: string;
  description: string | null;
  isEnabled: boolean;
  priority: number;
  conditions: string;
  action: 'auto_approve' | 'auto_reject' | 'manual_review';
  autoApproveDays: number | null;
  autoApproveTrafficGB: number | null;
  createdBy: number;
  createdAt: Date;
  updatedAt: Date;
}

interface RuleConditions {
  amountMatch?: boolean;
  minAmount?: number;
  maxAmount?: number;
  userEmailPattern?: string;
}

export default function AutoReviewRules() {
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedRule, setSelectedRule] = useState<AutoReviewRule | null>(null);
  
  // Form state
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [priority, setPriority] = useState(0);
  const [action, setAction] = useState<'auto_approve' | 'auto_reject' | 'manual_review'>('auto_approve');
  const [autoApproveDays, setAutoApproveDays] = useState(30);
  const [autoApproveTrafficGB, setAutoApproveTrafficGB] = useState(200);
  
  // Conditions
  const [amountMatch, setAmountMatch] = useState(true);
  const [minAmount, setMinAmount] = useState(199);
  const [maxAmount, setMaxAmount] = useState(199);

  const { data: rules, isLoading, refetch } = trpc.autoReview.getRules.useQuery();

  const createMutation = trpc.autoReview.createRule.useMutation({
    onSuccess: () => {
      toast.success("规则创建成功");
      setShowCreateDialog(false);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`创建失败: ${error.message}`);
    },
  });

  const updateMutation = trpc.autoReview.updateRule.useMutation({
    onSuccess: () => {
      toast.success("规则更新成功");
      setShowEditDialog(false);
      setSelectedRule(null);
      resetForm();
      refetch();
    },
    onError: (error) => {
      toast.error(`更新失败: ${error.message}`);
    },
  });

  const deleteMutation = trpc.autoReview.deleteRule.useMutation({
    onSuccess: () => {
      toast.success("规则删除成功");
      refetch();
    },
    onError: (error) => {
      toast.error(`删除失败: ${error.message}`);
    },
  });

  const toggleMutation = trpc.autoReview.toggleRule.useMutation({
    onSuccess: () => {
      toast.success("规则状态更新成功");
      refetch();
    },
    onError: (error) => {
      toast.error(`更新失败: ${error.message}`);
    },
  });

  const resetForm = () => {
    setName("");
    setDescription("");
    setPriority(0);
    setAction('auto_approve');
    setAutoApproveDays(30);
    setAutoApproveTrafficGB(200);
    setAmountMatch(true);
    setMinAmount(199);
    setMaxAmount(199);
  };

  const handleCreate = () => {
    const conditions: RuleConditions = {
      amountMatch,
      minAmount,
      maxAmount,
    };

    createMutation.mutate({
      name,
      description,
      priority,
      conditions: JSON.stringify(conditions),
      action,
      autoApproveDays: action === 'auto_approve' ? autoApproveDays : undefined,
      autoApproveTrafficGB: action === 'auto_approve' ? autoApproveTrafficGB : undefined,
    });
  };

  const handleEdit = (rule: AutoReviewRule) => {
    setSelectedRule(rule);
    setName(rule.name);
    setDescription(rule.description || "");
    setPriority(rule.priority);
    setAction(rule.action);
    setAutoApproveDays(rule.autoApproveDays || 30);
    setAutoApproveTrafficGB(rule.autoApproveTrafficGB || 200);
    
    try {
      const conditions = JSON.parse(rule.conditions) as RuleConditions;
      setAmountMatch(conditions.amountMatch || false);
      setMinAmount(conditions.minAmount || 0);
      setMaxAmount(conditions.maxAmount || 0);
    } catch (e) {
      console.error("Failed to parse conditions:", e);
    }
    
    setShowEditDialog(true);
  };

  const handleUpdate = () => {
    if (!selectedRule) return;

    const conditions: RuleConditions = {
      amountMatch,
      minAmount,
      maxAmount,
    };

    updateMutation.mutate({
      id: selectedRule.id,
      name,
      description,
      priority,
      conditions: JSON.stringify(conditions),
      action,
      autoApproveDays: action === 'auto_approve' ? autoApproveDays : undefined,
      autoApproveTrafficGB: action === 'auto_approve' ? autoApproveTrafficGB : undefined,
    });
  };

  const handleDelete = (ruleId: number) => {
    if (confirm("确定要删除这条规则吗？")) {
      deleteMutation.mutate({ id: ruleId });
    }
  };

  const handleToggle = (ruleId: number, isEnabled: boolean) => {
    toggleMutation.mutate({ id: ruleId, isEnabled: !isEnabled });
  };

  const getActionBadge = (action: string) => {
    switch (action) {
      case 'auto_approve':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">自动通过</Badge>;
      case 'auto_reject':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">自动拒绝</Badge>;
      case 'manual_review':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">人工审核</Badge>;
      default:
        return <Badge variant="outline">{action}</Badge>;
    }
  };

  const RuleFormFields = () => (
    <>
      <div className="space-y-4">
        <div>
          <Label htmlFor="name">规则名称</Label>
          <Input
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="例如：无限尊享套餐自动审核"
            className="bg-background border-border"
          />
        </div>

        <div>
          <Label htmlFor="description">规则描述（可选）</Label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="描述这条规则的用途"
            className="bg-background border-border"
          />
        </div>

        <div>
          <Label htmlFor="priority">优先级</Label>
          <Input
            id="priority"
            type="number"
            value={priority}
            onChange={(e) => setPriority(Number(e.target.value))}
            placeholder="数字越大优先级越高"
            className="bg-background border-border"
          />
        </div>

        <div>
          <Label htmlFor="action">审核动作</Label>
          <Select value={action} onValueChange={(v) => setAction(v as any)}>
            <SelectTrigger className="bg-background border-border">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="auto_approve">自动通过</SelectItem>
              <SelectItem value="auto_reject">自动拒绝</SelectItem>
              <SelectItem value="manual_review">转人工审核</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {action === 'auto_approve' && (
          <>
            <div>
              <Label htmlFor="days">自动发放天数</Label>
              <Input
                id="days"
                type="number"
                value={autoApproveDays}
                onChange={(e) => setAutoApproveDays(Number(e.target.value))}
                className="bg-background border-border"
              />
            </div>

            <div>
              <Label htmlFor="traffic">自动发放流量（GB）</Label>
              <Input
                id="traffic"
                type="number"
                value={autoApproveTrafficGB}
                onChange={(e) => setAutoApproveTrafficGB(Number(e.target.value))}
                className="bg-background border-border"
              />
            </div>
          </>
        )}

        <div className="border-t border-border pt-4">
          <h3 className="text-sm font-medium mb-3">触发条件</h3>
          
          <div className="flex items-center justify-between mb-3">
            <Label htmlFor="amountMatch">金额匹配</Label>
            <Switch
              id="amountMatch"
              checked={amountMatch}
              onCheckedChange={setAmountMatch}
            />
          </div>

          {amountMatch && (
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="minAmount">最小金额（￥）</Label>
                <Input
                  id="minAmount"
                  type="number"
                  value={minAmount}
                  onChange={(e) => setMinAmount(Number(e.target.value))}
                  className="bg-background border-border"
                />
              </div>
              <div>
                <Label htmlFor="maxAmount">最大金额（￥）</Label>
                <Input
                  id="maxAmount"
                  type="number"
                  value={maxAmount}
                  onChange={(e) => setMaxAmount(Number(e.target.value))}
                  className="bg-background border-border"
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">自动审核规则</h1>
            <p className="text-muted-foreground">配置支付凭证自动审核规则，减少人工审核工作量</p>
          </div>
          <Button
            onClick={() => {
              resetForm();
              setShowCreateDialog(true);
            }}
            className="bg-primary"
          >
            <Plus className="w-4 h-4 mr-2" />
            新建规则
          </Button>
        </div>

        {/* Rules List */}
        <div className="space-y-4">
          {isLoading ? (
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center text-muted-foreground">
                加载中...
              </CardContent>
            </Card>
          ) : rules && rules.length > 0 ? (
            rules.map((rule) => (
              <Card key={rule.id} className="bg-card border-border">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <h3 className="text-lg font-semibold text-foreground">{rule.name}</h3>
                        {getActionBadge(rule.action)}
                        <Badge variant="outline" className="bg-primary/10 text-primary border-primary/30">
                          优先级: {rule.priority}
                        </Badge>
                        {rule.isEnabled ? (
                          <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">
                            <Power className="w-3 h-3 mr-1" />
                            已启用
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="bg-gray-500/10 text-gray-500 border-gray-500/30">
                            <PowerOff className="w-3 h-3 mr-1" />
                            已禁用
                          </Badge>
                        )}
                      </div>
                      
                      {rule.description && (
                        <p className="text-sm text-muted-foreground mb-3">{rule.description}</p>
                      )}

                      <div className="text-sm text-muted-foreground">
                        {(() => {
                          try {
                            const conditions = JSON.parse(rule.conditions) as RuleConditions;
                            return (
                              <div className="space-y-1">
                                {conditions.amountMatch && (
                                  <p>• 金额范围：￥{conditions.minAmount} - ￥{conditions.maxAmount}</p>
                                )}
                                {rule.action === 'auto_approve' && (
                                  <>
                                    <p>• 自动发放：{rule.autoApproveDays}天 / {rule.autoApproveTrafficGB}GB</p>
                                  </>
                                )}
                              </div>
                            );
                          } catch (e) {
                            return <p>条件解析失败</p>;
                          }
                        })()}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleToggle(rule.id, rule.isEnabled)}
                      >
                        {rule.isEnabled ? <PowerOff className="w-4 h-4" /> : <Power className="w-4 h-4" />}
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleEdit(rule)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                        onClick={() => handleDelete(rule.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <Card className="bg-card border-border">
              <CardContent className="p-6 text-center text-muted-foreground">
                暂无规则，点击"新建规则"开始配置
              </CardContent>
            </Card>
          )}
        </div>

        {/* Create Dialog */}
        <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
          <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>新建自动审核规则</DialogTitle>
            </DialogHeader>
            <RuleFormFields />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowCreateDialog(false)}>
                取消
              </Button>
              <Button onClick={handleCreate} disabled={!name || createMutation.isPending}>
                {createMutation.isPending ? "创建中..." : "创建"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog open={showEditDialog} onOpenChange={setShowEditDialog}>
          <DialogContent className="bg-card border-border max-w-2xl max-h-[80vh] overflow-y-auto">
            <DialogHeader>
              <DialogTitle>编辑自动审核规则</DialogTitle>
            </DialogHeader>
            <RuleFormFields />
            <DialogFooter>
              <Button variant="outline" onClick={() => setShowEditDialog(false)}>
                取消
              </Button>
              <Button onClick={handleUpdate} disabled={!name || updateMutation.isPending}>
                {updateMutation.isPending ? "更新中..." : "更新"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </DashboardLayout>
  );
}
