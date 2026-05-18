@echo off
title Installer
color 0B
cls

echo Loading...

pip install -r requirements.txt

if %errorlevel% neq 0 (
    color 0C
    echo   [Error]
    pause
    exit
)

echo   [OK]

playwright install

echo   Installations complete. Run "run.bat" to start.
pause