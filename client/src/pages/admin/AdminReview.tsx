import DashboardLayout from "@/components/DashboardLayout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  ClipboardCheck, 
  Clock, 
  CheckCircle, 
  XCircle, 
  Image as ImageIcon,
  User,
  Calendar,
  DollarSign,
  Loader2,
  Eye,
  CheckSquare,
  Square,
  Download
} from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";
import { trpc } from "@/lib/trpc";
import * as XLSX from 'xlsx';

interface PaymentProof {
  id: number;
  userId: number;
  userEmail: string | null;
  planName: string;
  amount: string;
  imageUrl: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: Date;
  reviewedAt: Date | null;
  adminNote: string | null;
}

export default function AdminReview() {
  const [selectedProof, setSelectedProof] = useState<PaymentProof | null>(null);
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [days, setDays] = useState(30);
  const [trafficGB, setTrafficGB] = useState(200);
  const [adminNote, setAdminNote] = useState("");
  const [selectedProofIds, setSelectedProofIds] = useState<number[]>([]);
  const [showBatchApproveDialog, setShowBatchApproveDialog] = useState(false);
  const [showBatchRejectDialog, setShowBatchRejectDialog] = useState(false);

  const { data: pendingProofs, isLoading: loadingPending, refetch: refetchPending } = trpc.admin.getPendingProofs.useQuery();
  const { data: allProofs, isLoading: loadingAll, refetch: refetchAll } = trpc.admin.getAllProofs.useQuery();

  const approveMutation = trpc.admin.approveProof.useMutation({
    onSuccess: () => {
      toast.success("凭证已审核通过，用户订阅已激活");
      setShowApproveDialog(false);
      setSelectedProof(null);
      refetchPending();
      refetchAll();
    },
    onError: (error) => {
      toast.error(`审核失败: ${error.message}`);
    },
  });

  const rejectMutation = trpc.admin.rejectProof.useMutation({
    onSuccess: () => {
      toast.success("凭证已拒绝");
      setShowRejectDialog(false);
      setSelectedProof(null);
      refetchPending();
      refetchAll();
    },
    onError: (error) => {
      toast.error(`操作失败: ${error.message}`);
    },
  });

  const batchApproveMutation = trpc.admin.batchApproveProofs.useMutation({
    onSuccess: (result) => {
      toast.success(`批量审核完成：成功 ${result.success} 个，失败 ${result.failed} 个`);
      if (result.errors.length > 0) {
        result.errors.forEach(error => toast.error(error));
      }
      setShowBatchApproveDialog(false);
      setSelectedProofIds([]);
      refetchPending();
      refetchAll();
    },
    onError: (error) => {
      toast.error(`批量审核失败: ${error.message}`);
    },
  });

  const batchRejectMutation = trpc.admin.batchRejectProofs.useMutation({
    onSuccess: (result) => {
      toast.success(`批量拒绝完成：成功 ${result.success} 个，失败 ${result.failed} 个`);
      if (result.errors.length > 0) {
        result.errors.forEach(error => toast.error(error));
      }
      setShowBatchRejectDialog(false);
      setSelectedProofIds([]);
      refetchPending();
      refetchAll();
    },
    onError: (error) => {
      toast.error(`批量拒绝失败: ${error.message}`);
    },
  });

  const handleApprove = (proof: PaymentProof) => {
    setSelectedProof(proof);
    setDays(30);
    setTrafficGB(200);
    setAdminNote("");
    setShowApproveDialog(true);
  };

  const handleReject = (proof: PaymentProof) => {
    setSelectedProof(proof);
    setAdminNote("");
    setShowRejectDialog(true);
  };

  const handleViewImage = (proof: PaymentProof) => {
    setSelectedProof(proof);
    setShowImageDialog(true);
  };

  const confirmApprove = () => {
    if (!selectedProof) return;
    approveMutation.mutate({
      proofId: selectedProof.id,
      days,
      trafficLimit: trafficGB * 1024 * 1024 * 1024, // Convert GB to bytes
      adminNote: adminNote || undefined,
    });
  };

  const confirmReject = () => {
    if (!selectedProof) return;
    rejectMutation.mutate({
      proofId: selectedProof.id,
      adminNote,
    });
  };

  const handleSelectProof = (proofId: number) => {
    setSelectedProofIds(prev => 
      prev.includes(proofId) 
        ? prev.filter(id => id !== proofId)
        : [...prev, proofId]
    );
  };

  const handleSelectAll = () => {
    if (!pendingProofs) return;
    if (selectedProofIds.length === pendingProofs.length) {
      setSelectedProofIds([]);
    } else {
      setSelectedProofIds(pendingProofs.map(p => p.id));
    }
  };

  const handleBatchApprove = () => {
    if (selectedProofIds.length === 0) {
      toast.error("请先选择要审核的凭证");
      return;
    }
    setDays(30);
    setTrafficGB(200);
    setAdminNote("");
    setShowBatchApproveDialog(true);
  };

  const handleBatchReject = () => {
    if (selectedProofIds.length === 0) {
      toast.error("请先选择要拒绝的凭证");
      return;
    }
    setAdminNote("");
    setShowBatchRejectDialog(true);
  };

  const confirmBatchApprove = () => {
    batchApproveMutation.mutate({
      proofIds: selectedProofIds,
      days,
      trafficLimit: trafficGB * 1024 * 1024 * 1024,
      adminNote,
    });
  };

  const confirmBatchReject = () => {
    batchRejectMutation.mutate({
      proofIds: selectedProofIds,
      adminNote,
    });
  };

  const handleExportExcel = () => {
    const proofs = allProofs || [];
    if (proofs.length === 0) {
      toast.error("没有数据可导出");
      return;
    }

    const data = proofs.map(proof => ({
      '订单号': proof.id,
      '用户邮箱': proof.userEmail || 'N/A',
      '套餐类型': proof.planName,
      '支付金额': `￥${proof.amount}`,
      '审核状态': proof.status === 'pending' ? '待审核' : proof.status === 'approved' ? '已通过' : '已拒绝',
      '提交时间': formatDate(proof.createdAt),
      '审核时间': proof.reviewedAt ? formatDate(proof.reviewedAt) : 'N/A',
      '备注': proof.adminNote || 'N/A',
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, '支付凭证');
    XLSX.writeFile(wb, `支付凭证记录_${new Date().toISOString().split('T')[0]}.xlsx`);
    toast.success("导出成功");
  };

  const handleExportCSV = () => {
    const proofs = allProofs || [];
    if (proofs.length === 0) {
      toast.error("没有数据可导出");
      return;
    }

    const headers = ['订单号', '用户邮箱', '套餐类型', '支付金额', '审核状态', '提交时间', '审核时间', '备注'];
    const rows = proofs.map(proof => [
      proof.id,
      proof.userEmail || 'N/A',
      proof.planName,
      `￥${proof.amount}`,
      proof.status === 'pending' ? '待审核' : proof.status === 'approved' ? '已通过' : '已拒绝',
      formatDate(proof.createdAt),
      proof.reviewedAt ? formatDate(proof.reviewedAt) : 'N/A',
      proof.adminNote || 'N/A',
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.map(cell => `"${cell}"`).join(','))
    ].join('\n');

    const blob = new Blob([`\uFEFF${csvContent}`], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = `支付凭证记录_${new Date().toISOString().split('T')[0]}.csv`;
    link.click();
    toast.success("导出成功");
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'pending':
        return <Badge variant="outline" className="bg-yellow-500/10 text-yellow-500 border-yellow-500/30">待审核</Badge>;
      case 'approved':
        return <Badge variant="outline" className="bg-green-500/10 text-green-500 border-green-500/30">已通过</Badge>;
      case 'rejected':
        return <Badge variant="outline" className="bg-red-500/10 text-red-500 border-red-500/30">已拒绝</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  const formatDate = (date: Date | string) => {
    return new Date(date).toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const ProofCard = ({ proof, showActions = true, showCheckbox = false }: { proof: PaymentProof; showActions?: boolean; showCheckbox?: boolean }) => (
    <Card className="bg-card border-border">
      <CardContent className="p-4">
        <div className="flex gap-4">
          {/* Checkbox */}
          {showCheckbox && (
            <div className="flex items-start pt-1">
              <button
                onClick={() => handleSelectProof(proof.id)}
                className="text-muted-foreground hover:text-primary transition-colors"
              >
                {selectedProofIds.includes(proof.id) ? (
                  <CheckSquare className="w-5 h-5 text-primary" />
                ) : (
                  <Square className="w-5 h-5" />
                )}
              </button>
            </div>
          )}
          
          {/* Image Preview */}
          <div 
            className="w-24 h-24 bg-secondary rounded-lg overflow-hidden cursor-pointer flex-shrink-0"
            onClick={() => handleViewImage(proof)}
          >
            <img 
              src={proof.imageUrl} 
              alt="支付凭证" 
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between mb-2">
              <div>
                <p className="font-medium text-foreground truncate">
                  {proof.userEmail || `用户 #${proof.userId}`}
                </p>
                <p className="text-sm text-muted-foreground">{proof.planName}</p>
              </div>
              {getStatusBadge(proof.status)}
            </div>
            
            <div className="flex items-center gap-4 text-sm text-muted-foreground mb-3">
              <span className="flex items-center gap-1">
                <DollarSign className="w-3 h-3" />
                ¥{proof.amount}
              </span>
              <span className="flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {formatDate(proof.createdAt)}
              </span>
            </div>
            
            {showActions && proof.status === 'pending' && (
              <div className="flex gap-2">
                <Button 
                  size="sm" 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => handleApprove(proof)}
                >
                  <CheckCircle className="w-3 h-3 mr-1" />
                  通过
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                  onClick={() => handleReject(proof)}
                >
                  <XCircle className="w-3 h-3 mr-1" />
                  拒绝
                </Button>
                <Button 
                  size="sm" 
                  variant="outline"
                  onClick={() => handleViewImage(proof)}
                >
                  <Eye className="w-3 h-3 mr-1" />
                  查看大图
                </Button>
              </div>
            )}
            
            {proof.adminNote && (
              <p className="text-sm text-muted-foreground mt-2 italic">
                备注: {proof.adminNote}
              </p>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-foreground">审核中心</h1>
            <p className="text-muted-foreground">审核用户提交的支付凭证</p>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={handleExportExcel}
              className="border-primary text-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              导出 Excel
            </Button>
            <Button
              variant="outline"
              onClick={handleExportCSV}
              className="border-primary text-primary"
            >
              <Download className="w-4 h-4 mr-2" />
              导出 CSV
            </Button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-3 gap-4">
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-yellow-500/10 flex items-center justify-center">
                <Clock className="w-5 h-5 text-yellow-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">{pendingProofs?.length || 0}</p>
                <p className="text-sm text-muted-foreground">待审核</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-green-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allProofs?.filter(p => p.status === 'approved').length || 0}
                </p>
                <p className="text-sm text-muted-foreground">已通过</p>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-card border-border">
            <CardContent className="p-4 flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-red-500/10 flex items-center justify-center">
                <XCircle className="w-5 h-5 text-red-500" />
              </div>
              <div>
                <p className="text-2xl font-bold text-foreground">
                  {allProofs?.filter(p => p.status === 'rejected').length || 0}
                </p>
                <p className="text-sm text-muted-foreground">已拒绝</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="pending" className="space-y-4">
          <TabsList className="bg-secondary">
            <TabsTrigger value="pending" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              待审核 ({pendingProofs?.length || 0})
            </TabsTrigger>
            <TabsTrigger value="all" className="data-[state=active]:bg-primary data-[state=active]:text-primary-foreground">
              全部记录
            </TabsTrigger>
          </TabsList>

          <TabsContent value="pending" className="space-y-4">
            {loadingPending ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : pendingProofs && pendingProofs.length > 0 ? (
              <>
                {/* Batch Actions */}
                <div className="flex items-center justify-between bg-card border border-border rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <button
                      onClick={handleSelectAll}
                      className="text-muted-foreground hover:text-primary transition-colors"
                    >
                      {selectedProofIds.length === pendingProofs.length ? (
                        <CheckSquare className="w-5 h-5 text-primary" />
                      ) : (
                        <Square className="w-5 h-5" />
                      )}
                    </button>
                    <span className="text-sm text-muted-foreground">
                      {selectedProofIds.length > 0 ? `已选择 ${selectedProofIds.length} 个` : '全选'}
                    </span>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-green-500/50 text-green-500 hover:bg-green-500/10"
                      onClick={handleBatchApprove}
                      disabled={selectedProofIds.length === 0}
                    >
                      <CheckCircle className="w-4 h-4 mr-1" />
                      批量通过
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      className="border-red-500/50 text-red-500 hover:bg-red-500/10"
                      onClick={handleBatchReject}
                      disabled={selectedProofIds.length === 0}
                    >
                      <XCircle className="w-4 h-4 mr-1" />
                      批量拒绝
                    </Button>
                  </div>
                </div>
                
                <div className="space-y-4">
                  {pendingProofs.map((proof) => (
                    <ProofCard key={proof.id} proof={proof as PaymentProof} showCheckbox={true} />
                  ))}
                </div>
              </>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <ClipboardCheck className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">暂无待审核的凭证</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>

          <TabsContent value="all" className="space-y-4">
            {loadingAll ? (
              <div className="flex items-center justify-center py-12">
                <Loader2 className="w-8 h-8 animate-spin text-primary" />
              </div>
            ) : allProofs && allProofs.length > 0 ? (
              <div className="space-y-4">
                {allProofs.map((proof) => (
                  <ProofCard key={proof.id} proof={proof as PaymentProof} showActions={proof.status === 'pending'} />
                ))}
              </div>
            ) : (
              <Card className="bg-card border-border">
                <CardContent className="p-12 text-center">
                  <ImageIcon className="w-12 h-12 mx-auto mb-4 text-muted-foreground" />
                  <p className="text-muted-foreground">暂无审核记录</p>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>

      {/* Approve Dialog */}
      <Dialog open={showApproveDialog} onOpenChange={setShowApproveDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">确认激活订阅</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProof && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">用户</p>
                <p className="font-medium text-foreground">{selectedProof.userEmail || `用户 #${selectedProof.userId}`}</p>
                <p className="text-sm text-muted-foreground mt-2">套餐</p>
                <p className="font-medium text-foreground">{selectedProof.planName} - ¥{selectedProof.amount}</p>
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>有效期（天）</Label>
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 30)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>流量限制（GB）</Label>
                <Input
                  type="number"
                  value={trafficGB}
                  onChange={(e) => setTrafficGB(parseInt(e.target.value) || 200)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>备注（可选）</Label>
              <Input
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="添加审核备注..."
                className="bg-secondary border-border"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowApproveDialog(false)}>
              取消
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={confirmApprove}
              disabled={approveMutation.isPending}
            >
              {approveMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  确认激活
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Reject Dialog */}
      <Dialog open={showRejectDialog} onOpenChange={setShowRejectDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">拒绝凭证</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {selectedProof && (
              <div className="bg-secondary/50 rounded-lg p-4">
                <p className="text-sm text-muted-foreground">用户</p>
                <p className="font-medium text-foreground">{selectedProof.userEmail || `用户 #${selectedProof.userId}`}</p>
              </div>
            )}
            <div className="space-y-2">
              <Label>拒绝原因（可选）</Label>
              <Input
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="如：截图不清晰、金额不符..."
                className="bg-secondary border-border"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowRejectDialog(false)}>
              取消
            </Button>
            <Button 
              variant="destructive"
              onClick={confirmReject}
              disabled={rejectMutation.isPending}
            >
              {rejectMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  确认拒绝
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Image Preview Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent className="bg-card border-border max-w-2xl">
          <DialogHeader>
            <DialogTitle className="text-foreground">支付凭证预览</DialogTitle>
          </DialogHeader>
          {selectedProof && (
            <div className="space-y-4">
              <img 
                src={selectedProof.imageUrl} 
                alt="支付凭证" 
                className="w-full rounded-lg"
              />
              <div className="flex items-center justify-between text-sm text-muted-foreground">
                <span>{selectedProof.userEmail || `用户 #${selectedProof.userId}`}</span>
                <span>{selectedProof.planName} - ￥{selectedProof.amount}</span>
                <span>{formatDate(selectedProof.createdAt)}</span>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Batch Approve Dialog */}
      <Dialog open={showBatchApproveDialog} onOpenChange={setShowBatchApproveDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">批量激活订阅</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">将激活 {selectedProofIds.length} 个用户的订阅</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>有效期（天）</Label>
                <Input
                  type="number"
                  value={days}
                  onChange={(e) => setDays(parseInt(e.target.value) || 30)}
                  className="bg-secondary border-border"
                />
              </div>
              <div className="space-y-2">
                <Label>流量限制（GB）</Label>
                <Input
                  type="number"
                  value={trafficGB}
                  onChange={(e) => setTrafficGB(parseInt(e.target.value) || 200)}
                  className="bg-secondary border-border"
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label>备注（可选）</Label>
              <Input
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="添加审核备注..."
                className="bg-secondary border-border"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBatchApproveDialog(false)}>
              取消
            </Button>
            <Button 
              className="bg-green-600 hover:bg-green-700"
              onClick={confirmBatchApprove}
              disabled={batchApproveMutation.isPending}
            >
              {batchApproveMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <CheckCircle className="w-4 h-4 mr-2" />
                  确认激活
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Batch Reject Dialog */}
      <Dialog open={showBatchRejectDialog} onOpenChange={setShowBatchRejectDialog}>
        <DialogContent className="bg-card border-border">
          <DialogHeader>
            <DialogTitle className="text-foreground">批量拒绝凭证</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="bg-secondary/50 rounded-lg p-4">
              <p className="text-sm text-muted-foreground">将拒绝 {selectedProofIds.length} 个支付凭证</p>
            </div>
            <div className="space-y-2">
              <Label>拒绝原因（可选）</Label>
              <Input
                value={adminNote}
                onChange={(e) => setAdminNote(e.target.value)}
                placeholder="说明拒绝原因..."
                className="bg-secondary border-border"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowBatchRejectDialog(false)}>
              取消
            </Button>
            <Button 
              variant="outline"
              className="border-red-500/50 text-red-500 hover:bg-red-500/10"
              onClick={confirmBatchReject}
              disabled={batchRejectMutation.isPending}
            >
              {batchRejectMutation.isPending ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  处理中...
                </>
              ) : (
                <>
                  <XCircle className="w-4 h-4 mr-2" />
                  确认拒绝
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </DashboardLayout>
  );
}
