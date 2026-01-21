; LogVPN 安装程序脚本 (NSIS 3.x)
; 编译方式: 右键点击此文件 → Compile NSIS Script

!include "MUI2.nsh"
!include "x64.nsh"
!include "WinVer.nsh"

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

; ========== MUI 设置 ==========
!insertmacro MUI_PAGE_WELCOME
!insertmacro MUI_PAGE_DIRECTORY
!insertmacro MUI_PAGE_INSTFILES
!insertmacro MUI_PAGE_FINISH

!insertmacro MUI_LANGUAGE "SimpChinese"

; ========== 安装程序部分 ==========
Section "LogVPN 客户端"
    SectionIn RO
    
    ; 设置输出路径
    SetOutPath "$INSTDIR"
    
    ; 复制主程序
    File "v2rayN\bin\Release\x64\v2rayN.exe"
    File "v2rayN\bin\Release\x64\v2rayN.exe.config"
    File "v2rayN\bin\Release\x64\v2rayUpgrade.exe"
    
    ; 复制依赖文件
    File /r "v2rayN\bin\Release\x64\*.*"
    
    ; 创建开始菜单快捷方式
    CreateDirectory "$SMPROGRAMS\LogVPN"
    CreateShortCut "$SMPROGRAMS\LogVPN\LogVPN.lnk" "$INSTDIR\v2rayN.exe"
    CreateShortCut "$SMPROGRAMS\LogVPN\卸载.lnk" "$INSTDIR\Uninstall.exe"
    
    ; 创建桌面快捷方式
    CreateShortCut "$DESKTOP\LogVPN.lnk" "$INSTDIR\v2rayN.exe"
    
    ; 创建卸载程序
    WriteUninstaller "$INSTDIR\Uninstall.exe"
    
    ; 写入注册表
    WriteRegStr HKLM "Software\LogVPN" "InstallDir" "$INSTDIR"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "DisplayName" "LogVPN"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "DisplayVersion" "1.0.0"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "UninstallString" "$INSTDIR\Uninstall.exe"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "InstallLocation" "$INSTDIR"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "Publisher" "LogVPN"
    WriteRegStr HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN" "HelpLink" "https://dj.siumingho.dpdns.org"
    
    ; 显示完成信息
    DetailPrint "LogVPN 安装完成！"
SectionEnd

Section "启动菜单快捷方式"
    CreateDirectory "$SMPROGRAMS\LogVPN"
    CreateShortCut "$SMPROGRAMS\LogVPN\LogVPN.lnk" "$INSTDIR\v2rayN.exe"
SectionEnd

Section "桌面快捷方式"
    CreateShortCut "$DESKTOP\LogVPN.lnk" "$INSTDIR\v2rayN.exe"
SectionEnd

; ========== 卸载程序部分 ==========
Section "Uninstall"
    ; 删除文件
    Delete "$INSTDIR\v2rayN.exe"
    Delete "$INSTDIR\v2rayN.exe.config"
    Delete "$INSTDIR\v2rayUpgrade.exe"
    Delete "$INSTDIR\Uninstall.exe"
    
    ; 删除所有文件
    RMDir /r "$INSTDIR"
    
    ; 删除快捷方式
    RMDir /r "$SMPROGRAMS\LogVPN"
    Delete "$DESKTOP\LogVPN.lnk"
    
    ; 删除注册表项
    DeleteRegKey HKLM "Software\LogVPN"
    DeleteRegKey HKLM "Software\Microsoft\Windows\CurrentVersion\Uninstall\LogVPN"
    
    DetailPrint "LogVPN 已卸载"
SectionEnd

; ========== 函数 ==========
Function .onInit
    ${If} ${RunningX64}
        DetailPrint "检测到 64 位系统"
    ${Else}
        MessageBox MB_OK "LogVPN 仅支持 64 位 Windows 系统"
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
    MessageBox MB_YESNO "LogVPN 安装完成！现在启动应用吗？" IDNO end
    ExecShell "open" "$INSTDIR\v2rayN.exe"
    end:
FunctionEnd

; ========== 卸载函数 ==========
Function un.onInit
    MessageBox MB_OKCANCEL "确定要卸载 LogVPN 吗？" IDOK next
    Abort
    next:
FunctionEnd

Function un.onUninstSuccess
    MessageBox MB_OK "LogVPN 已成功卸载"
FunctionEnd
