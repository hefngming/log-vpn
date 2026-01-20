; LogVPN 安装程序脚本
; 基于 NSIS (Nullsoft Scriptable Install System)

!define PRODUCT_NAME "LogVPN"
!define PRODUCT_VERSION "1.0.0"
!define PRODUCT_PUBLISHER "LogVPN Team"
!define PRODUCT_WEB_SITE "https://dj.siumingho.dpdns.org"
!define PRODUCT_DIR_REGKEY "Software\Microsoft\Windows\CurrentVersion\App Paths\LogVPN.exe"
!define PRODUCT_UNINST_KEY "Software\Microsoft\Windows\CurrentVersion\Uninstall\${PRODUCT_NAME}"
!define PRODUCT_UNINST_ROOT_KEY "HKLM"

; MUI 设置
!include "MUI2.nsh"

!define MUI_ABORTWARNING
!define MUI_ICON "Resources\icon.ico"
!define MUI_UNICON "${NSISDIR}\Contrib\Graphics\Icons\modern-uninstall.ico"

; 欢迎页面
!insertmacro MUI_PAGE_WELCOME
; 许可协议页面
!insertmacro MUI_PAGE_LICENSE "LICENSE.txt"
; 安装目录选择页面
!insertmacro MUI_PAGE_DIRECTORY
; 安装过程页面
!insertmacro MUI_PAGE_INSTFILES
; 完成页面
!define MUI_FINISHPAGE_RUN "$INSTDIR\LogVPN.exe"
!insertmacro MUI_PAGE_FINISH

; 卸载页面
!insertmacro MUI_UNPAGE_INSTFILES

; 语言文件
!insertmacro MUI_LANGUAGE "SimpChinese"
!insertmacro MUI_LANGUAGE "English"

; 安装程序基本信息
Name "${PRODUCT_NAME} ${PRODUCT_VERSION}"
OutFile "LogVPN_Setup.exe"
InstallDir "$PROGRAMFILES\LogVPN"
InstallDirRegKey HKLM "${PRODUCT_DIR_REGKEY}" ""
ShowInstDetails show
ShowUnInstDetails show

; 请求管理员权限
RequestExecutionLevel admin

Section "MainSection" SEC01
  SetOutPath "$INSTDIR"
  SetOverwrite ifnewer
  
  ; 复制主程序文件
  File "bin\Release\LogVPN.exe"
  File "bin\Release\LogVPN.exe.config"
  
  ; 复制 v2ray 核心文件
  File "bin\Release\v2ray.exe"
  File "bin\Release\v2ctl.exe"
  File "bin\Release\geoip.dat"
  File "bin\Release\geosite.dat"
  
  ; 复制依赖库
  File "bin\Release\*.dll"
  
  ; 复制资源文件
  SetOutPath "$INSTDIR\Resources"
  File /r "Resources\*.*"
  
  ; 创建快捷方式
  CreateDirectory "$SMPROGRAMS\LogVPN"
  CreateShortCut "$SMPROGRAMS\LogVPN\LogVPN.lnk" "$INSTDIR\LogVPN.exe"
  CreateShortCut "$DESKTOP\LogVPN.lnk" "$INSTDIR\LogVPN.exe"
  CreateShortCut "$SMPROGRAMS\LogVPN\卸载 LogVPN.lnk" "$INSTDIR\uninst.exe"
SectionEnd

Section -AdditionalIcons
  WriteIniStr "$INSTDIR\${PRODUCT_NAME}.url" "InternetShortcut" "URL" "${PRODUCT_WEB_SITE}"
  CreateShortCut "$SMPROGRAMS\LogVPN\官方网站.lnk" "$INSTDIR\${PRODUCT_NAME}.url"
SectionEnd

Section -Post
  WriteUninstaller "$INSTDIR\uninst.exe"
  WriteRegStr HKLM "${PRODUCT_DIR_REGKEY}" "" "$INSTDIR\LogVPN.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayName" "$(^Name)"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "UninstallString" "$INSTDIR\uninst.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayIcon" "$INSTDIR\LogVPN.exe"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "DisplayVersion" "${PRODUCT_VERSION}"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "URLInfoAbout" "${PRODUCT_WEB_SITE}"
  WriteRegStr ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}" "Publisher" "${PRODUCT_PUBLISHER}"
SectionEnd

Function un.onUninstSuccess
  HideWindow
  MessageBox MB_ICONINFORMATION|MB_OK "$(^Name) 已成功从您的计算机中卸载。"
FunctionEnd

Function un.onInit
  MessageBox MB_ICONQUESTION|MB_YESNO|MB_DEFBUTTON2 "您确实要完全卸载 $(^Name) 及其所有组件吗？" IDYES +2
  Abort
FunctionEnd

Section Uninstall
  ; 删除文件
  Delete "$INSTDIR\${PRODUCT_NAME}.url"
  Delete "$INSTDIR\uninst.exe"
  Delete "$INSTDIR\LogVPN.exe"
  Delete "$INSTDIR\LogVPN.exe.config"
  Delete "$INSTDIR\v2ray.exe"
  Delete "$INSTDIR\v2ctl.exe"
  Delete "$INSTDIR\geoip.dat"
  Delete "$INSTDIR\geosite.dat"
  Delete "$INSTDIR\*.dll"
  
  ; 删除资源文件夹
  RMDir /r "$INSTDIR\Resources"
  
  ; 删除快捷方式
  Delete "$SMPROGRAMS\LogVPN\卸载 LogVPN.lnk"
  Delete "$SMPROGRAMS\LogVPN\官方网站.lnk"
  Delete "$DESKTOP\LogVPN.lnk"
  Delete "$SMPROGRAMS\LogVPN\LogVPN.lnk"
  
  RMDir "$SMPROGRAMS\LogVPN"
  RMDir "$INSTDIR"
  
  ; 删除注册表项
  DeleteRegKey ${PRODUCT_UNINST_ROOT_KEY} "${PRODUCT_UNINST_KEY}"
  DeleteRegKey HKLM "${PRODUCT_DIR_REGKEY}"
  SetAutoClose true
SectionEnd
