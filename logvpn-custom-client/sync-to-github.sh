#!/bin/bash

# LogVPN GitHub 同步脚本
# 用于将本地源代码同步到 GitHub 仓库

set -e

# 颜色定义
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# 配置
GITHUB_USERNAME="${1:-}"
GITHUB_REPO="${2:-logvpn-client}"
LOCAL_PATH="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# 函数定义
print_header() {
    echo -e "${BLUE}========================================${NC}"
    echo -e "${BLUE}$1${NC}"
    echo -e "${BLUE}========================================${NC}"
}

print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

print_info() {
    echo -e "${BLUE}ℹ $1${NC}"
}

# 检查前置条件
check_prerequisites() {
    print_header "检查前置条件"
    
    # 检查 Git
    if ! command -v git &> /dev/null; then
        print_error "Git 未安装"
        exit 1
    fi
    print_success "Git 已安装"
    
    # 检查 GitHub 用户名
    if [ -z "$GITHUB_USERNAME" ]; then
        print_error "请提供 GitHub 用户名"
        echo "用法: ./sync-to-github.sh YOUR_USERNAME [REPO_NAME]"
        exit 1
    fi
    print_success "GitHub 用户名: $GITHUB_USERNAME"
    
    # 检查本地路径
    if [ ! -d "$LOCAL_PATH" ]; then
        print_error "本地路径不存在: $LOCAL_PATH"
        exit 1
    fi
    print_success "本地路径: $LOCAL_PATH"
}

# 初始化 Git 仓库
init_git_repo() {
    print_header "初始化 Git 仓库"
    
    cd "$LOCAL_PATH"
    
    # 检查是否已是 Git 仓库
    if [ -d ".git" ]; then
        print_info "已是 Git 仓库，跳过初始化"
        return
    fi
    
    # 初始化 Git
    git init
    print_success "Git 仓库已初始化"
    
    # 配置 Git 用户信息
    git config user.name "LogVPN Build Bot"
    git config user.email "build@logvpn.local"
    print_success "Git 用户信息已配置"
}

# 配置远程仓库
setup_remote() {
    print_header "配置远程仓库"
    
    cd "$LOCAL_PATH"
    
    REMOTE_URL="https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}.git"
    
    # 检查远程仓库是否已存在
    if git remote | grep -q "origin"; then
        print_info "远程仓库已存在，更新 URL"
        git remote set-url origin "$REMOTE_URL"
    else
        print_info "添加远程仓库"
        git remote add origin "$REMOTE_URL"
    fi
    
    print_success "远程仓库 URL: $REMOTE_URL"
}

# 准备文件
prepare_files() {
    print_header "准备文件"
    
    cd "$LOCAL_PATH"
    
    # 创建必要的目录
    mkdir -p src assets .github/workflows
    print_success "目录结构已创建"
    
    # 创建 .gitignore
    if [ ! -f ".gitignore" ]; then
        cat > .gitignore << 'EOF'
# Dependencies
node_modules/
package-lock.json
yarn.lock

# Build output
dist/
out/
*.exe
*.msi

# IDE
.vscode/
.idea/
*.swp
*.swo
*~

# OS
.DS_Store
Thumbs.db

# Logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*

# Environment
.env
.env.local
.env.*.local

# Temporary
temp/
tmp/
*.tmp
EOF
        print_success ".gitignore 已创建"
    fi
    
    # 创建 README.md
    if [ ! -f "README.md" ]; then
        cat > README.md << 'EOF'
# LogVPN Client

Secure, Fast, Global VPN Client

## Features

- OAuth 自动登录
- 自动订阅获取
- 一键连接
- 流量统计
- 设备指纹防共享
- 自动更新

## Build

```bash
npm install
npm run build
npm run dist:win
```

## Development

```bash
npm install
npm run dev
```

## License

MIT
EOF
        print_success "README.md 已创建"
    fi
}

# 提交文件
commit_files() {
    print_header "提交文件"
    
    cd "$LOCAL_PATH"
    
    # 检查是否有更改
    if git status --porcelain | grep -q .; then
        print_info "发现文件更改，正在提交..."
        
        git add .
        print_success "文件已暂存"
        
        git commit -m "Initial commit: LogVPN Electron client setup"
        print_success "文件已提交"
    else
        print_info "没有文件更改"
    fi
}

# 推送到 GitHub
push_to_github() {
    print_header "推送到 GitHub"
    
    cd "$LOCAL_PATH"
    
    # 检查分支
    CURRENT_BRANCH=$(git rev-parse --abbrev-ref HEAD)
    print_info "当前分支: $CURRENT_BRANCH"
    
    # 推送代码
    print_info "正在推送代码到 GitHub..."
    if git push -u origin "$CURRENT_BRANCH" 2>&1; then
        print_success "代码已推送到 GitHub"
    else
        print_warning "推送失败，可能是因为仓库为空或需要身份验证"
        print_info "请手动运行: git push -u origin $CURRENT_BRANCH"
    fi
}

# 验证配置
verify_setup() {
    print_header "验证配置"
    
    cd "$LOCAL_PATH"
    
    # 检查关键文件
    local files=(
        "package.json"
        "electron-builder.json"
        ".github/workflows/electron-build.yml"
        "src/main.ts"
        "tsconfig.json"
    )
    
    local missing=0
    for file in "${files[@]}"; do
        if [ -f "$file" ]; then
            print_success "✓ $file"
        else
            print_warning "✗ $file (可选)"
            ((missing++))
        fi
    done
    
    if [ $missing -eq 0 ]; then
        print_success "所有关键文件都已存在"
    else
        print_warning "部分文件缺失，请手动创建"
    fi
}

# 显示后续步骤
show_next_steps() {
    print_header "后续步骤"
    
    echo ""
    echo "1. 在 GitHub 上配置 Secrets:"
    echo "   - SSH_PRIVATE_KEY: 您的 SSH 私钥"
    echo "   - SERVER_HOST: 155.94.160.248"
    echo "   - SERVER_USER: ubuntu"
    echo ""
    echo "2. 访问 GitHub Actions:"
    echo "   https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/actions"
    echo ""
    echo "3. 监控编译过程:"
    echo "   - 查看工作流日志"
    echo "   - 验证编译输出"
    echo ""
    echo "4. 下载编译结果:"
    echo "   https://github.com/${GITHUB_USERNAME}/${GITHUB_REPO}/actions"
    echo ""
}

# 主函数
main() {
    print_header "LogVPN GitHub 同步脚本"
    
    check_prerequisites
    init_git_repo
    setup_remote
    prepare_files
    commit_files
    push_to_github
    verify_setup
    show_next_steps
    
    print_success "同步完成！"
}

# 运行主函数
main "$@"
