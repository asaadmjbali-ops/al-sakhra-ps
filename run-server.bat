@echo off
chcp 65001 > nul
title تشغيل منظومة مراكز الصخرة التعليمية
echo ========================================================
echo جاري تشغيل لوحة التحكم لمجموعة مراكز الصخرة التعليمية...
echo ========================================================
start http://localhost:3000/
powershell -NoProfile -ExecutionPolicy Bypass -File "%~dp0server.ps1" -Port 3000
pause
