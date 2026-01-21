# Resources 目录

## 📁 文件说明

### 必需文件

1. **icon.ico** - Windows 应用图标
   - 格式：ICO
   - 尺寸：256x256（推荐包含多个尺寸：16, 32, 48, 64, 128, 256）
   - 用途：Windows 安装程序和应用图标

2. **icon.icns** - macOS 应用图标
   - 格式：ICNS
   - 尺寸：包含多个尺寸（16x16 到 1024x1024）
   - 用途：macOS 应用图标和 DMG 图标

### 可选文件

3. **dmg-background.png** - macOS DMG 安装背景图
   - 格式：PNG
   - 尺寸：540x380 像素
   - 用途：macOS DMG 安装窗口背景
   - 如果不需要，可以在 package.json 中删除 `background` 配置

## 🎨 创建图标

### Windows 图标 (.ico)

**在线工具**：
- https://convertio.co/png-ico/
- https://www.icoconverter.com/

**步骤**：
1. 准备一个 1024x1024 的 PNG 图标
2. 上传到在线工具
3. 选择包含多个尺寸（16, 32, 48, 64, 128, 256）
4. 下载 .ico 文件
5. 保存为 `resources/icon.ico`

### macOS 图标 (.icns)

**在线工具**：
- https://cloudconvert.com/png-to-icns
- https://iconverticons.com/online/

**步骤**：
1. 准备一个 1024x1024 的 PNG 图标
2. 上传到在线工具
3. 下载 .icns 文件
4. 保存为 `resources/icon.icns`

**在 macOS 上手动创建**：

```bash
# 创建 iconset 目录
mkdir LogVPN.iconset

# 生成不同尺寸（需要 sips 命令，macOS 自带）
sips -z 16 16     icon.png --out LogVPN.iconset/icon_16x16.png
sips -z 32 32     icon.png --out LogVPN.iconset/icon_16x16@2x.png
sips -z 32 32     icon.png --out LogVPN.iconset/icon_32x32.png
sips -z 64 64     icon.png --out LogVPN.iconset/icon_32x32@2x.png
sips -z 128 128   icon.png --out LogVPN.iconset/icon_128x128.png
sips -z 256 256   icon.png --out LogVPN.iconset/icon_128x128@2x.png
sips -z 256 256   icon.png --out LogVPN.iconset/icon_256x256.png
sips -z 512 512   icon.png --out LogVPN.iconset/icon_256x256@2x.png
sips -z 512 512   icon.png --out LogVPN.iconset/icon_512x512.png
sips -z 1024 1024 icon.png --out LogVPN.iconset/icon_512x512@2x.png

# 转换为 .icns
iconutil -c icns LogVPN.iconset -o resources/icon.icns
```

## 📋 检查清单

在打包之前，确保：

- [ ] `resources/icon.ico` 存在（Windows 必需）
- [ ] `resources/icon.icns` 存在（macOS 必需）
- [ ] `resources/dmg-background.png` 存在（macOS 可选）
- [ ] 图标清晰，边缘平滑
- [ ] 图标在深色和浅色背景下都清晰可见

## 🔍 验证图标

### Windows
```bash
# 查看 .ico 文件信息
file resources/icon.ico
```

### macOS
```bash
# 查看 .icns 文件信息
sips -g all resources/icon.icns
```

## 🎨 设计建议

- 使用简洁的设计，避免过多细节
- 确保在小尺寸（16x16）下仍然清晰可辨
- 使用高对比度的颜色
- 避免使用纯黑或纯白背景
- 考虑品牌一致性（与网站、Logo 保持一致）

---

**当前状态**：
- ⚠️ 图标文件缺失，需要手动添加
- ⚠️ 在添加图标之前，electron-builder 可能会使用默认图标或报错

**下一步**：
1. 准备 1024x1024 PNG 图标
2. 使用在线工具转换为 .ico 和 .icns
3. 保存到 resources 目录
4. 测试打包
