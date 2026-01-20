#!/bin/bash

# LogVPN 客户端部署脚本
# 用于接收 GitHub Actions 上传的安装程序并更新版本信息

set -e

# 配置
DOWNLOAD_DIR="/home/ubuntu/log-vpn/client/public/downloads"
INSTALLER_NAME="LogVPN_Setup.exe"
VERSION_FILE="$DOWNLOAD_DIR/version.json"

# 颜色输出
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}  LogVPN 客户端部署脚本${NC}"
echo -e "${GREEN}========================================${NC}"

# 检查下载目录是否存在
if [ ! -d "$DOWNLOAD_DIR" ]; then
    echo -e "${YELLOW}创建下载目录: $DOWNLOAD_DIR${NC}"
    mkdir -p "$DOWNLOAD_DIR"
fi

# 检查安装程序是否存在
if [ ! -f "$DOWNLOAD_DIR/$INSTALLER_NAME" ]; then
    echo -e "${RED}错误: 安装程序不存在: $DOWNLOAD_DIR/$INSTALLER_NAME${NC}"
    exit 1
fi

# 获取文件信息
FILE_SIZE=$(stat -f%z "$DOWNLOAD_DIR/$INSTALLER_NAME" 2>/dev/null || stat -c%s "$DOWNLOAD_DIR/$INSTALLER_NAME")
FILE_DATE=$(date -u +"%Y-%m-%dT%H:%M:%SZ")

# 计算文件哈希
echo -e "${YELLOW}计算文件哈希...${NC}"
MD5_HASH=$(md5sum "$DOWNLOAD_DIR/$INSTALLER_NAME" | awk '{print $1}')
SHA256_HASH=$(sha256sum "$DOWNLOAD_DIR/$INSTALLER_NAME" | awk '{print $1}')

# 生成版本信息
echo -e "${YELLOW}生成版本信息...${NC}"
cat > "$VERSION_FILE" << EOF
{
  "version": "1.0.0",
  "fileName": "$INSTALLER_NAME",
  "fileSize": $FILE_SIZE,
  "publishDate": "$FILE_DATE",
  "downloadUrl": "https://dj.siumingho.dpdns.org/downloads/$INSTALLER_NAME",
  "md5": "$MD5_HASH",
  "sha256": "$SHA256_HASH",
  "releaseNotes": "LogVPN 1.0.0 正式版\\n\\n新功能：\\n- OAuth 自动登录\\n- 自动获取节点列表\\n- 一键连接功能\\n- 流量统计和上报\\n- 设备指纹防共享\\n- 自动更新功能"
}
EOF

# 设置文件权限
chmod 644 "$DOWNLOAD_DIR/$INSTALLER_NAME"
chmod 644 "$VERSION_FILE"

echo -e "${GREEN}========================================${NC}"
echo -e "${GREEN}部署完成！${NC}"
echo -e "${GREEN}========================================${NC}"
echo -e "安装程序: $DOWNLOAD_DIR/$INSTALLER_NAME"
echo -e "文件大小: $(numfmt --to=iec-i --suffix=B $FILE_SIZE)"
echo -e "MD5: $MD5_HASH"
echo -e "SHA256: $SHA256_HASH"
echo -e "下载地址: https://dj.siumingho.dpdns.org/downloads/$INSTALLER_NAME"
echo -e "${GREEN}========================================${NC}"
