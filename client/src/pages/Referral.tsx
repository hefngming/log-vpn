import { useState } from 'react';
import { trpc } from '../lib/trpc';
import { Button } from '../components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Input } from '../components/ui/input';
import { Share2, Copy, Gift, Users, TrendingUp } from 'lucide-react';
import { toast } from 'sonner';

export default function Referral() {
  const { data: codeData } = trpc.referral.getMyReferralCode.useQuery();
  const { data: stats } = trpc.referral.getMyReferralStats.useQuery();
  const { data: records } = trpc.referral.getMyReferralRecords.useQuery();

  const referralLink = codeData?.code 
    ? `${window.location.origin}/register?ref=${codeData.code}`
    : '';

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    toast.success('邀请链接已复制到剪贴板');
  };

  const shareLink = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Log VPN - 邀请注册',
        text: '使用我的邀请链接注册 Log VPN，我们都能获得 1GB 流量奖励！',
        url: referralLink,
      });
    } else {
      copyToClipboard();
    }
  };

  return (
    <div className="container max-w-6xl py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">邀请好友</h1>
        <p className="text-muted-foreground">
          分享你的专属邀请链接，邀请好友注册，你和好友都能获得 1GB 流量奖励！
        </p>
      </div>

      {/* 统计卡片 */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">邀请人数</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats?.totalReferrals || 0}</div>
            <p className="text-xs text-muted-foreground">累计邀请好友数</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">获得奖励</CardTitle>
            <Gift className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {((stats?.totalRewards || 0) / 1024).toFixed(2)} GB
            </div>
            <p className="text-xs text-muted-foreground">累计流量奖励</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">奖励规则</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">1 GB</div>
            <p className="text-xs text-muted-foreground">每邀请一位好友</p>
          </CardContent>
        </Card>
      </div>

      {/* 邀请链接卡片 */}
      <Card className="mb-8">
        <CardHeader>
          <CardTitle>你的专属邀请链接</CardTitle>
          <CardDescription>
            复制链接分享给好友，好友通过链接注册后，你们都能获得 1GB 流量奖励
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex gap-2">
            <Input
              value={referralLink}
              readOnly
              className="flex-1"
            />
            <Button onClick={copyToClipboard} variant="outline">
              <Copy className="h-4 w-4 mr-2" />
              复制
            </Button>
            <Button onClick={shareLink}>
              <Share2 className="h-4 w-4 mr-2" />
              分享
            </Button>
          </div>
          <div className="mt-4 p-4 bg-muted rounded-lg">
            <p className="text-sm font-medium mb-2">推荐码：{codeData?.code}</p>
            <p className="text-xs text-muted-foreground">
              好友也可以在注册时手动输入此推荐码
            </p>
          </div>
        </CardContent>
      </Card>

      {/* 邀请记录 */}
      <Card>
        <CardHeader>
          <CardTitle>邀请记录</CardTitle>
          <CardDescription>查看你邀请的好友列表</CardDescription>
        </CardHeader>
        <CardContent>
          {records && records.length > 0 ? (
            <div className="space-y-4">
              {records.map((record) => (
                <div
                  key={record.id}
                  className="flex items-center justify-between p-4 border rounded-lg"
                >
                  <div>
                    <p className="font-medium">
                      {record.referredUser?.name || record.referredUser?.email || '匿名用户'}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {new Date(record.createdAt).toLocaleDateString('zh-CN')}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-medium text-green-600">
                      +{(record.referrerReward / 1024).toFixed(2)} GB
                    </p>
                    <p className="text-xs text-muted-foreground">流量奖励</p>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-muted-foreground">
              <Users className="h-12 w-12 mx-auto mb-4 opacity-50" />
              <p>还没有邀请记录</p>
              <p className="text-sm">快去分享你的邀请链接吧！</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
