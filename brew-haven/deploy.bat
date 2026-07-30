@echo off
REM 🚀 Brew Haven Café - Windows Deployment Script

setlocal enabledelayedexpansion

REM Colors (Windows 10+)
cls
color 0B

echo.
echo ╔════════════════════════════════════════╗
echo ║  Brew Haven Café - Deployment Script  ║
echo ╚════════════════════════════════════════╝
echo.

REM Check Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Node.js not found. Install from: https://nodejs.org
    pause
    exit /b 1
)

echo ✓ Node.js: 
node --version

echo ✓ npm: 
npm --version

:menu
cls
echo.
echo Choose deployment platform:
echo 1) GitHub + Vercel (Recommended - FREE)
echo 2) Docker (requires Docker Desktop)
echo 3) Build Only
echo 4) Setup GitHub
echo 5) View Documentation
echo 6) Exit
echo.

set /p choice="Enter your choice (1-6): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto docker
if "%choice%"=="3" goto build
if "%choice%"=="4" goto github
if "%choice%"=="5" goto docs
if "%choice%"=="6" goto end

echo Invalid choice. Try again.
timeout /t 2
goto menu

:build
echo.
echo 🔨 Building for production...
echo.
npm install
npm run build
echo.
echo ✓ Build complete!
echo.
pause
goto menu

:github
echo.
echo 📦 Setting up GitHub repository...
echo.

if not exist ".git" (
    git init
    echo ✓ Git initialized
)

git add .
git commit -m "Initial Brew Haven Café setup" 2>nul

echo.
echo Next steps:
echo 1. Create repository at https://github.com/new
echo 2. Run these commands:
echo.
echo    git remote add origin https://github.com/YOUR_USERNAME/brew-haven-cafe.git
echo    git branch -M main
echo    git push -u origin main
echo.
pause
goto menu

:docker
echo.
echo 🐳 Docker Deployment
echo.

REM Check if Docker is installed
where docker >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ Docker not found. Install Docker Desktop from: https://docker.com
    pause
    goto menu
)

echo ✓ Docker found: 
docker --version

echo.
echo Building Docker image...
docker build -t brew-haven-cafe:latest .

echo.
echo Starting container at http://localhost:3000...
start http://localhost:3000
docker run -p 3000:3000 --name brew-haven-cafe-app brew-haven-cafe:latest

echo.
pause
goto menu

:docs
cls
echo.
echo 📖 DEPLOYMENT DOCUMENTATION
echo.
echo === GITHUB + VERCEL (Easiest) ===
echo 1. Go to https://github.com/new
echo 2. Create repository "brew-haven-cafe"
echo 3. Run: git remote add origin https://github.com/YOUR_USERNAME/brew-haven-cafe.git
echo 4. Run: git push -u origin main
echo 5. Go to https://vercel.com/new
echo 6. Import your GitHub repository
echo 7. Click Deploy - Done! 🎉
echo.
echo === LOCAL DEVELOPMENT ===
echo npm install
echo npm run dev
echo Open http://localhost:3000
echo.
echo === PRODUCTION BUILD ===
echo npm run build
echo npm run start
echo.
echo === DOCKER ===
echo docker build -t brew-haven-cafe .
echo docker run -p 3000:3000 brew-haven-cafe
echo.
echo === WINDOWS USERS ===
echo Install: Node.js, Git, Docker Desktop
echo Then run this script!
echo.
pause
goto menu

:end
echo.
echo Thank you! 👋
echo.
exit /b 0
