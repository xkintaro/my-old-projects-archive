@echo off
title Starter
color 0A
cls

echo Loading...

timeout /t 2 >nul

start http://127.0.0.1:5000

python app.py

if %errorlevel% neq 0 (
    color 0C
    echo.
    echo   [Error]
    pause
)