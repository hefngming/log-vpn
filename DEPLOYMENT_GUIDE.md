# LogVPN 部署和运维指南

## 目录

1. [快速开始](#快速开始)
2. [系统要求](#系统要求)
3. [部署步骤](#部署步骤)
4. [配置说明](#配置说明)
5. [运维操作](#运维操作)
6. [故障排查](#故障排查)
7. [性能优化](#性能优化)
8. [安全加固](#安全加固)

---

## 快速开始

### 前置条件
- Ubuntu 22.04 LTS 服务器
- Docker 和 Docker Compose
- 域名和 SSL 证书
- 邮箱账号 (用于 SMTP)

### 一键部署
```bash
# 1. 克隆项目
git clone https://github.com/yourusername/log-vpn.git
cd log-vpn

# 2. 配置环境变量
cp .env.example .env
# 编辑 .env 文件，填入必要的配置

# 3. 启动服务
docker-compose up -d

# 4. 初始化数据库
docker-compose exec app pnpm db:push

# 5. 访问应用
# 前端: https://your-domain.com
# 管理面板: https://your-domain.com:2053
```

---

## 系统要求

### 硬件要求
| 资源 | 最小配置 | 推荐配置 |
|------|---------|---------|
| CPU | 2核 | 4核+ |
| 内存 | 2GB | 4GB+ |
| 存储 | 20GB | 100GB+ |
| 带宽 | 10Mbps | 100Mbps+ |

### 软件要求
- Docker 20.10+
- Docker Compose 2.0+
- Node.js 18+ (用于本地开发)
- PostgreSQL 14+ (可选，如果不使用 Docker)

### 网络要求
- 开放端口 80 (HTTP)
- 开放端口 443 (HTTPS)
- 开放端口 2053 (3x-ui 管理面板)
- 允许出站连接到 Gmail SMTP

---

## 部署步骤

### 步骤 1: 准备服务器

```bash
# 更新系统
sudo apt update && sudo apt upgrade -y

# 安装必要工具
sudo apt install -y curl wget git

# 安装 Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sudo sh get-docker.sh

# 安装 Docker Compose
sudo curl -L "https://github.com/docker/compose/releases/latest/download/docker-compose-$(uname -s)-$(uname -m)" -o /usr/local/bin/docker-compose
sudo chmod +x /usr/local/bin/docker-compose

# 验证安装
docker --version
docker-compose --version
```

### 步骤 2: 克隆和配置项目

```bash
# 克隆项目
git clone https://github.com/yourusername/log-vpn.git
cd log-vpn

# 创建环境文件
cat > .env << EOF
# 数据库
DATABASE_URL=postgresql://postgres:password@db:5432/log_vpn

# JWT
JWT_SECRET=$(openssl rand -base64 32)

# OAuth
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your-app-id

# SMTP
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password

# 应用配置
VITE_APP_TITLE=Log VPN
VITE_APP_LOGO=/logo.png

# 3x-ui
XRAY_API_URL=http://xray:10085
XRAY_API_KEY=your-xray-api-key
EOF
```

### 步骤 3: 配置 Nginx

```bash
# 创建 Nginx 配置文件
sudo tee /etc/nginx/sites-available/log-vpn.conf > /dev/null << 'EOF'
upstream app {
    server localhost:3000;
}

server {
    listen 80;
    server_name your-domain.com;
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name your-domain.com;

    ssl_certificate /etc/letsencrypt/live/your-domain.com/fullchain.pem;
    ssl_certificate_key /etc/letsencrypt/live/your-domain.com/privkey.pem;

    # SSL 配置
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers HIGH:!aNULL:!MD5;
    ssl_prefer_server_ciphers on;

    # 静态文件缓存
    location /downloads/ {
        alias /var/www/html/downloads/;
        expires 30d;
        add_header Cache-Control "public, immutable";
    }

    # 反向代理
    location / {
        proxy_pass http://app;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
    }
}
EOF

# 启用配置
sudo ln -s /etc/nginx/sites-available/log-vpn.conf /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 步骤 4: 配置 SSL 证书

```bash
# 安装 Certbot
sudo apt install -y certbot python3-certbot-nginx

# 获取证书
sudo certbot certonly --nginx -d your-domain.com

# 配置自动续签
sudo systemctl enable certbot.timer
sudo systemctl start certbot.timer
```

### 步骤 5: 启动应用

```bash
# 启动所有服务
docker-compose up -d

# 查看日志
docker-compose logs -f app

# 初始化数据库
docker-compose exec app pnpm db:push

# 创建管理员账号
docker-compose exec app pnpm tsx scripts/create-admin.ts
```

### 步骤 6: 验证部署

```bash
# 检查前端
curl -I https://your-domain.com

# 检查 API
curl -s https://your-domain.com/api/trpc/nodes.getEncrypted | head -c 200

# 检查 3x-ui
curl -I https://your-domain.com:2053
```

---

## 配置说明

### 环境变量详解

#### 数据库配置
```bash
DATABASE_URL=postgresql://user:password@host:5432/database
# 格式: postgresql://[user[:password]@][host][:port][/database]
```

#### JWT 配置
```bash
JWT_SECRET=your-secret-key
# 用于签名 JWT Token，建议使用 openssl 生成
# openssl rand -base64 32
```

#### SMTP 配置
```bash
SMTP_HOST=smtp.gmail.com
SMTP_PORT=465
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password  # 使用 Gmail 应用密码，不是账户密码
```

#### OAuth 配置
```bash
OAUTH_SERVER_URL=https://api.manus.im
VITE_OAUTH_PORTAL_URL=https://portal.manus.im
VITE_APP_ID=your-app-id  # 从 Manus 平台获取
```

### Docker Compose 配置

```yaml
version: '3.8'

services:
  app:
    build: .
    ports:
      - "3000:3000"
    environment:
      - DATABASE_URL=postgresql://postgres:password@db:5432/log_vpn
      - JWT_SECRET=${JWT_SECRET}
      - SMTP_HOST=${SMTP_HOST}
      - SMTP_PORT=${SMTP_PORT}
      - SMTP_USER=${SMTP_USER}
      - SMTP_PASS=${SMTP_PASS}
    depends_on:
      - db
    volumes:
      - ./:/app
      - /app/node_modules

  db:
    image: postgres:14
    environment:
      - POSTGRES_PASSWORD=password
      - POSTGRES_DB=log_vpn
    volumes:
      - postgres_data:/var/lib/postgresql/data
    ports:
      - "5432:5432"

  redis:
    image: redis:7
    ports:
      - "6379:6379"

volumes:
  postgres_data:
```

---

## 运维操作

### 日常维护

#### 查看日志
```bash
# 查看所有服务日志
docker-compose logs

# 查看特定服务日志
docker-compose logs app

# 实时查看日志
docker-compose logs -f app

# 查看最后 100 行
docker-compose logs --tail=100 app
```

#### 数据库备份
```bash
# 备份数据库
docker-compose exec db pg_dump -U postgres log_vpn > backup.sql

# 恢复数据库
docker-compose exec -T db psql -U postgres log_vpn < backup.sql

# 自动备份脚本
#!/bin/bash
BACKUP_DIR="/backups/log-vpn"
DATE=$(date +%Y%m%d_%H%M%S)
docker-compose exec -T db pg_dump -U postgres log_vpn > $BACKUP_DIR/backup_$DATE.sql
# 删除 7 天前的备份
find $BACKUP_DIR -name "backup_*.sql" -mtime +7 -delete
```

#### 更新应用
```bash
# 拉取最新代码
git pull origin main

# 重新构建镜像
docker-compose build --no-cache

# 重启服务
docker-compose up -d

# 运行数据库迁移
docker-compose exec app pnpm db:push
```

#### 监控资源使用
```bash
# 查看容器资源使用
docker stats

# 查看磁盘使用
df -h

# 查看内存使用
free -h

# 查看 CPU 使用
top
```

### 用户管理

#### 创建管理员账号
```bash
docker-compose exec app pnpm tsx scripts/create-admin.ts
```

#### 重置用户密码
```bash
docker-compose exec app pnpm tsx scripts/reset-password.ts user@example.com
```

#### 导出用户数据
```bash
docker-compose exec db psql -U postgres log_vpn -c "SELECT * FROM users;" > users.csv
```

### 节点管理

#### 添加节点
```bash
# 通过 3x-ui 管理面板添加
# 或使用 API:
curl -X POST http://localhost:3000/api/trpc/nodes.add \
  -H "Content-Type: application/json" \
  -d '{
    "name": "节点名称",
    "protocol": "vmess",
    "address": "1.2.3.4",
    "port": 10000
  }'
```

#### 同步节点
```bash
# 从 3x-ui 同步节点
curl -X POST http://localhost:3000/api/trpc/nodes.sync
```

#### 删除节点
```bash
curl -X POST http://localhost:3000/api/trpc/nodes.delete \
  -H "Content-Type: application/json" \
  -d '{"id": 1}'
```

---

## 故障排查

### 常见问题

#### 1. 前端无法连接到后端 API
```bash
# 检查 API 服务是否运行
docker-compose ps

# 检查 API 日志
docker-compose logs app

# 测试 API 连接
curl http://localhost:3000/api/trpc/health

# 检查防火墙
sudo ufw status
sudo ufw allow 3000
```

#### 2. 数据库连接失败
```bash
# 检查数据库服务
docker-compose ps db

# 查看数据库日志
docker-compose logs db

# 测试数据库连接
docker-compose exec db psql -U postgres -c "SELECT 1;"

# 检查环境变量
docker-compose exec app env | grep DATABASE
```

#### 3. SMTP 邮件发送失败
```bash
# 检查 SMTP 配置
docker-compose exec app env | grep SMTP

# 测试邮件发送
docker-compose exec app pnpm tsx scripts/test-email.ts

# 查看邮件日志
docker-compose logs app | grep -i email
```

#### 4. SSL 证书过期
```bash
# 检查证书有效期
sudo openssl x509 -in /etc/letsencrypt/live/your-domain.com/fullchain.pem -noout -dates

# 手动续签
sudo certbot renew --force-renewal

# 重启 Nginx
sudo systemctl restart nginx
```

#### 5. 高内存占用
```bash
# 检查内存使用
docker stats

# 重启服务释放内存
docker-compose restart app

# 检查是否有内存泄漏
docker-compose logs app | grep -i "memory\|leak"
```

### 调试技巧

#### 启用调试模式
```bash
# 在 .env 中添加
DEBUG=log-vpn:*

# 重启服务
docker-compose restart app

# 查看调试日志
docker-compose logs app | grep DEBUG
```

#### 进入容器调试
```bash
# 进入应用容器
docker-compose exec app bash

# 进入数据库容器
docker-compose exec db bash

# 运行 Node.js REPL
docker-compose exec app node
```

#### 查看网络连接
```bash
# 查看端口监听
sudo netstat -tlnp | grep 3000

# 查看连接状态
sudo ss -tlnp | grep 3000
```

---

## 性能优化

### 数据库优化

#### 添加索引
```sql
-- 用户邮箱索引
CREATE INDEX idx_users_email ON users(email);

-- 订阅用户索引
CREATE INDEX idx_subscriptions_user_id ON subscriptions(user_id);

-- 验证码邮箱索引
CREATE INDEX idx_verification_codes_email ON verification_codes(email);
```

#### 查询优化
```sql
-- 使用 EXPLAIN 分析查询
EXPLAIN ANALYZE SELECT * FROM users WHERE email = 'test@example.com';

-- 检查表统计
ANALYZE users;

-- 清理死行
VACUUM ANALYZE users;
```

### 缓存优化

#### Redis 缓存
```javascript
// 缓存节点列表
const cacheKey = 'nodes:list';
const cached = await redis.get(cacheKey);
if (cached) return JSON.parse(cached);

const nodes = await db.query('SELECT * FROM nodes');
await redis.setex(cacheKey, 3600, JSON.stringify(nodes));
return nodes;
```

#### CDN 缓存
```nginx
# 在 Nginx 配置中添加
location /api/ {
    proxy_cache_bypass $http_pragma $http_authorization;
    add_header X-Cache-Status $upstream_cache_status;
}
```

### 应用优化

#### 启用 gzip 压缩
```nginx
gzip on;
gzip_types text/plain text/css application/json application/javascript;
gzip_min_length 1000;
```

#### 优化 Node.js
```bash
# 增加 Node.js 内存限制
NODE_OPTIONS="--max-old-space-size=4096" npm start

# 启用集群模式
# 在应用代码中使用 cluster 模块
```

---

## 安全加固

### 访问控制

#### 限制 IP 访问
```nginx
# 只允许特定 IP 访问管理面板
location /admin/ {
    allow 1.2.3.4;
    deny all;
}
```

#### 速率限制
```nginx
limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
location /api/ {
    limit_req zone=api burst=20 nodelay;
}
```

### 数据安全

#### 启用 HTTPS 强制
```nginx
add_header Strict-Transport-Security "max-age=31536000; includeSubDomains" always;
```

#### 设置安全头
```nginx
add_header X-Content-Type-Options "nosniff" always;
add_header X-Frame-Options "SAMEORIGIN" always;
add_header X-XSS-Protection "1; mode=block" always;
add_header Referrer-Policy "strict-origin-when-cross-origin" always;
```

### 备份和恢复

#### 自动备份
```bash
#!/bin/bash
# 每天凌晨 2 点执行备份
0 2 * * * /home/ubuntu/backup.sh

# backup.sh 内容
#!/bin/bash
BACKUP_DIR="/backups/log-vpn"
DATE=$(date +\%Y\%m\%d)
docker-compose exec -T db pg_dump -U postgres log_vpn | gzip > $BACKUP_DIR/backup_$DATE.sql.gz
# 上传到云存储
aws s3 cp $BACKUP_DIR/backup_$DATE.sql.gz s3://your-bucket/backups/
```

#### 灾难恢复
```bash
# 从备份恢复
gunzip < backup_20260120.sql.gz | docker-compose exec -T db psql -U postgres log_vpn
```

---

## 监控和告警

### 设置监控

#### 使用 Prometheus
```yaml
# prometheus.yml
global:
  scrape_interval: 15s

scrape_configs:
  - job_name: 'docker'
    static_configs:
      - targets: ['localhost:9323']
```

#### 使用 Grafana
```bash
# 启动 Grafana
docker run -d -p 3001:3000 grafana/grafana

# 添加 Prometheus 数据源
# 访问 http://localhost:3001
```

### 告警规则

#### CPU 使用过高
```yaml
alert: HighCPUUsage
expr: rate(container_cpu_usage_seconds_total[5m]) > 0.8
for: 5m
```

#### 内存使用过高
```yaml
alert: HighMemoryUsage
expr: container_memory_usage_bytes / 1024 / 1024 > 2048
for: 5m
```

#### 磁盘空间不足
```yaml
alert: LowDiskSpace
expr: node_filesystem_avail_bytes / 1024 / 1024 / 1024 < 10
for: 5m
```

---

## 总结

本指南涵盖了 LogVPN 系统的完整部署和运维流程。遵循这些步骤和最佳实践，可以确保系统的稳定性、安全性和高性能。

如有任何问题，请参考故障排查部分或联系技术支持。

---

**最后更新**: 2026年1月20日  
**版本**: 1.0  
**维护者**: LogVPN 技术团队
