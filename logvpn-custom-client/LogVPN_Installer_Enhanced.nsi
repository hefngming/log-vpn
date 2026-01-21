; LogVPN 增强版安装程序脚本 (NSIS 3.x)
; 功能：自动启动、快捷方式优化、卸载确认、安装后自动运行

!include "MUI2.nsh"
!include "x64.nsh"
!include "WinVer.nsh"
!include "nsDialogs.nsh"

; ========== 基本信息 ==========
Name "LogVPN"
OutFile "LogVPN_Setup.exe"
InstallDir "$PROGRAMFILES\LogVPN"
InstallDirRegKey HKLM "Software\LogVPN" "InstallDir"

; ========== 版本信息 ==========
VIProductVersion "1.0.0.0"
VIAddVersionKey /LANG=2052 "ProductName" "LogVPN"
VIAddVersionKey /LANG=2052 "CompanyName" "LogVPN"
VIAddVersionKey /LANG=2052 "FileDescription" "LogVPN - 安全、快速、全球"
VIAddVersionKey /LANG=2052 "FileVersion" "1.0.0"
VIAddVersionKey /LANG=2052 "ProductVersion" "1.0.0"
VIAddVersionKey /LANG=2052 "LegalCopyright" "Copyright © 2024 LogVPN"

; ========== 安装程序设置 ==========
RequestExecutionLevel admin
SetCompressor /SOLID lzma
ShowInstDetails show
ShowUninstDetails show
BrandingText "LogVPN 1.0.0"

; ========== 变量定义 ==========
Var StartMenuFolder
Var AutoStart
Var CreateDesktopShortcut

; ========== MUI 设置 ==========
!insertmacro MUI_PAGE_WELCOME

; 自定义选项页面
Page custom nsDialogsPage nsDialogsPageLeave

!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_STARTMENU Application $StartMenuFolder
!insertmacro MUI_PAGE_INSTFILES

; 完成页面（带启动应用选项）
!define MUI_FINISHPAGE_RUN "$INSTDIR\v2rayN.exe"
!define MUI_FINISHPAGE_RUN_TEXT "立即启动 LogVPN"
!define MUI_FINISHPAGE_SHOWREADME "$INSTDIR\README.txt"
!define MUI_FINISHPAGE_SHOWREADME_TEXT "查看使用说明"
!insertmacro MUI_PAGE_FINISH

; 卸载页面
!insertmacro MUI_UNPAGE_CONFIRM
!insertmacro MUI_UNPAGE_INSTFILES

!insertmacro MUI_LANGUAGE "SimpChinese"

; ========== 自定义选项页面 ==========
Function nsDialogsPage
    nsDialogs::Create 1018
    Pop $0
    
    ${If} $0 == error
        Abort
    ${EndIf}
    
    ; 创建标题
    ${NSD_CreateLabel} 0 10 100% 20 "安装选项"
    Pop $0
    
    ; 自动启动选项
    ${NSD_CreateCheckbox} 10 40 100% 12 "安装后自动启动 LogVPN"
    Pop $AutoStart
    ${NSD_SetState} $AutoStart ${BST_CHECKED}
    
    ; 创建桌面快捷方式选项
    ${NSD_CreateCheckbox} 10 60 100% 12 "创建桌面快捷方式"
    Pop $CreateDesktopShortcut
    ${NSD_SetState} $CreateDesktopShortcut ${BST_CHECKED}
    
    ; 信息文本
    ${NSD_CreateLabel} 10 90 100% 60 "LogVPN 是一个基于 v2rayN 的定制 VPN 客户端。$\n$\n功能特性：$\n• 账号密码登录$\n• 自动订阅获取$\n• 流量统计上报$\n• 防共享保护"
    Pop $0
    
    nsDialogs::Show
FunctionEnd

Function nsDialogsPageLeave
    ; 获取用户选择
    ${NSD_GetState} $AutoStart $AutoStart
    ${NSD_GetState} $CreateDesktopShortcut $CreateDesktopShortcut
FunctionEnd

; ========== 安装程序部分 ==========
Section "LogVPN 客户端"
    SectionIn RO
    
    ; 设置输出路径
    SetOutPath "$INSTDIR"
    
    DetailPrint "正在复制应用程序文件..."
    
    ; 复制主程序
    File "v2rayN\bin\Release\x64\v2rayN.exe"
    File "v2rayN\bin\Release\x64\v2rayN.exe.config"
    File "v2rayN\bin\Release\x64\v2rayUpgrade.exe"
    
    ; 复制依赖文件
    File /r "v2rayN\bin\Release\x64\*.*"
    
    ; 创建使用说明文件
    FileOpen $0 "$INSTDIR\README.txt" w
    FileWrite $0 "LogVPN 使用说明$\r$\n"
    FileWrite $0 "=================$\r$\n$\r$\n"
    FileWrite $0 "1. 首次启动时，请使用您的 LogVPN 账号登录$\r$\n"
    FileWrite $0 "2. 登录后会自动获取可用的节点列表$\r$\n"
    FileWrite $0 "3. 选择节点并点击连接即可开始使用$\r$\n"
    FileWrite $0 "4. 在设置中可以查看流量使用情况$\r$\n$\r$\n"
    FileWrite $0 "技术支持：https://dj.siumingho.dpdns.org$\r$\n"
    FileClose $0
    
    DetailPrint "正在创建快捷方式..."
    
    ; 创建开始菜单快捷方式
    !insertmacro MUI_STARTMENU_WRITE_BEGIN Application
        CreateDirectory "$SMPROGRAMS\$StartMenuFolder"
        CreateShortCut "$SMPROGRAMS\$StartMenuFolder\LogVPN.lnk" "$INSTDIR\v2rayN.exe" "" "$INSTDIR\v2rayN.exe" 0
        CreateShortCut "$SMPROGRAMS\$StartMenuFolder\卸载 LogVPN.lnk" "$INSTDIR\Uninstall.exe" "" "$INSTDIR\Uninstall.exe" 0
    !insertmacro MUI_STARTMENU_WRITE_END
    
    ; 创建桌面快捷方式（如果用户选择）
    ${If} $CreateDesktopShortcut == 1
        DetailPrint "创建桌面快捷方式..."
        CreateShortCut "$DESKTOP\LogVPN.lnk" "$INSTDIR\v2rayN.exe" "" "$INSTDIR\v2rayN.exe" 0
    ${EndIf}
    
    DetailPrint "正在创建卸载程序..."
    
    ; 创建卸载程序
    WriteUninstaller "$INSTDIR\Uninstall.exe"
    
    DetailPrint "正在写入注册表..."
    
    ; 写入注册表
    WriteRegStr HKLM "Software\LogVPN" "InstallDir" "$INSTDIR"
    WriteRegStr HKLM "Software\LogVPN" "Version" "1.0.0"
    WriteRegStr HKLM "Software\LogVPN" "InstallDate" "$(Date)"
    
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "DisplayName" "LogVPN"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "DisplayVersion" "1.0.0"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "UninstallString" "$INSTDIR\Uninstall.exe"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "InstallLocation" "$INSTDIR"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "Publisher" "LogVPN"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "HelpLink" "https://dj.siumingho.dpdns.org"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "URLInfoAbout" "https://dj.siumingho.dpdns.org"
    
    DetailPrint "LogVPN 安装完成！"
SectionEnd

; ========== 卸载程序部分 ==========
Section "Uninstall"
    DetailPrint "正在删除应用程序文件..."
    
    ; 删除文件
    Delete "$INSTDIR\v2rayN.exe"
    Delete "$INSTDIR\v2rayN.exe.config"
    Delete "$INSTDIR\v2rayUpgrade.exe"
    Delete "$INSTDIR\README.txt"
    Delete "$INSTDIR\Uninstall.exe"
    
    ; 删除所有文件
    RMDir /r "$INSTDIR"
    
    DetailPrint "正在删除快捷方式..."
    
    ; 删除快捷方式
    !insertmacro MUI_STARTMENU_GETFOLDER Application $StartMenuFolder
    RMDir /r "$SMPROGRAMS\$StartMenuFolder"
    Delete "$DESKTOP\LogVPN.lnk"
    
    DetailPrint "正在清理注册表..."
    
    ; 删除注册表项
    DeleteRegKey HKLM "Software\LogVPN"
    DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN"
    
    DetailPrint "LogVPN 已卸载"
SectionEnd

; ========== 函数 ==========
Function .onInit
    ; 检查操作系统
    ${If} ${RunningX64}
        DetailPrint "检测到 64 位系统"
    ${Else}
        MessageBox MB_OK "LogVPN 仅支持 64 位 Windows 系统"
        Quit
    ${EndIf}
    
    ; 检查 Windows 版本（Windows 10 或更高）
    ${If} ${AtLeastWinVista}
        DetailPrint "Windows 版本检查通过"
    ${Else}
        MessageBox MB_OK "LogVPN 需要 Windows Vista 或更高版本"
        Quit
    ${EndIf}
    
    ; 检查 .NET Framework 4.8
    ReadRegStr $0 HKLM "Software\Microsoft\NET Framework Setup\NDP\v4\Full" "Release"
    ${If} $0 < 528040
        MessageBox MB_OK "需要安装 .NET Framework 4.8 或更高版本$\n请访问: https://dotnet.microsoft.com/download/dotnet-framework/net48"
        Quit
    ${EndIf}
    
    DetailPrint "系统检查完成"
FunctionEnd

Function .onInstSuccess
    ; 如果用户选择了自动启动
    ${If} $AutoStart == 1
        DetailPrint "启动 LogVPN..."
        ExecShell "open" "$INSTDIR\v2rayN.exe"
    ${EndIf}
    
    ; 显示完成信息
    MessageBox MB_OK "LogVPN 安装完成！$\n$\n您现在可以从开始菜单或桌面启动应用。"
FunctionEnd

Function .onInstFailed
    MessageBox MB_OK "LogVPN 安装失败。$\n$\n请检查系统要求或联系技术支持。"
FunctionEnd

; ========== 卸载函数 ==========
Function un.onInit
    MessageBox MB_OKCANCEL "确定要卸载 LogVPN 吗？$\n$\n这将删除所有应用程序文件。" IDOK next
    Abort
    next:
FunctionEnd

Function un.onUninstSuccess
    MessageBox MB_OK "LogVPN 已成功卸载。$\n$\n感谢您的使用！"
FunctionEnd

Function un.onUninstFailed
    MessageBox MB_OK "LogVPN 卸载失败。$\n$\n请手动删除应用程序文件。"
FunctionEnd
