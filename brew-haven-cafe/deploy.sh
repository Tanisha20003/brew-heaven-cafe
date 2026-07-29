#!/bin/bash

# 🚀 Brew Haven Café - Automated Deployment Script
# Supports: GitHub, Vercel, Docker, AWS, Railway, Render

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Project info
PROJECT_NAME="Brew Haven Café"
PROJECT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

echo -e "${BLUE}╔════════════════════════════════════════╗${NC}"
echo -e "${BLUE}║  $PROJECT_NAME - Deployment Script  ║${NC}"
echo -e "${BLUE}╚════════════════════════════════════════╝${NC}"
echo ""

# Function: Display menu
show_menu() {
    echo -e "${YELLOW}Choose deployment platform:${NC}"
    echo "1) GitHub + Vercel (Recommended - FREE)"
    echo "2) Docker (Local/Server)"
    echo "3) AWS Elastic Beanstalk"
    echo "4) Railway.app"
    echo "5) Render.com"
    echo "6) Setup All (GitHub, Docker ready)"
    echo "7) Exit"
    echo ""
}

# Function: Check prerequisites
check_prerequisites() {
    echo -e "${BLUE}Checking prerequisites...${NC}"
    
    # Check Node.js
    if ! command -v node &> /dev/null; then
        echo -e "${RED}❌ Node.js not found${NC}"
        exit 1
    fi
    
    # Check npm
    if ! command -v npm &> /dev/null; then
        echo -e "${RED}❌ npm not found${NC}"
        exit 1
    fi
    
    echo -e "${GREEN}✓ Node.js: $(node --version)${NC}"
    echo -e "${GREEN}✓ npm: $(npm --version)${NC}"
    echo ""
}

# Function: Setup GitHub
setup_github() {
    echo -e "${BLUE}📦 Setting up GitHub repository...${NC}"
    
    if [ ! -d ".git" ]; then
        git init
        echo -e "${GREEN}✓ Git initialized${NC}"
    fi
    
    # Add all files
    git add .
    git commit -m "Initial Brew Haven Café website setup" 2>/dev/null || true
    echo -e "${GREEN}✓ Files staged${NC}"
    
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Create repository at https://github.com/new"
    echo "2. Replace YOUR_USERNAME with your GitHub username:"
    echo ""
    echo "   git remote add origin https://github.com/YOUR_USERNAME/brew-haven-cafe.git"
    echo "   git branch -M main"
    echo "   git push -u origin main"
    echo ""
}

# Function: Setup Docker
setup_docker() {
    echo -e "${BLUE}🐳 Setting up Docker...${NC}"
    
    # Check if Docker is installed
    if ! command -v docker &> /dev/null; then
        echo -e "${YELLOW}⚠️  Docker not found. Install from: https://docker.com${NC}"
        return
    fi
    
    echo -e "${GREEN}✓ Docker found: $(docker --version)${NC}"
    echo ""
    
    echo -e "${BLUE}Building Docker image...${NC}"
    docker build -t brew-haven-cafe:latest .
    echo -e "${GREEN}✓ Docker image built${NC}"
    echo ""
    
    echo -e "${BLUE}Starting container...${NC}"
    docker run -p 3000:3000 --name brew-haven-cafe-app brew-haven-cafe:latest &
    echo -e "${GREEN}✓ Container running at http://localhost:3000${NC}"
    echo ""
    echo -e "${YELLOW}Useful Docker commands:${NC}"
    echo "  docker stop brew-haven-cafe-app"
    echo "  docker logs brew-haven-cafe-app"
    echo "  docker push YOUR_REGISTRY/brew-haven-cafe"
    echo ""
}

# Function: Vercel deployment
deploy_vercel() {
    echo -e "${BLUE}⚡ Deploying to Vercel...${NC}"
    
    # Check if Vercel CLI is installed
    if ! command -v vercel &> /dev/null; then
        echo -e "${YELLOW}Installing Vercel CLI...${NC}"
        npm install -g vercel
    fi
    
    echo -e "${BLUE}Logging into Vercel...${NC}"
    vercel login
    
    echo -e "${BLUE}Deploying...${NC}"
    vercel --prod
    
    echo -e "${GREEN}✓ Deployed to Vercel!${NC}"
    echo ""
}

# Function: Railway deployment
deploy_railway() {
    echo -e "${BLUE}🚂 Deploying to Railway...${NC}"
    
    # Check if Railway CLI is installed
    if ! command -v railway &> /dev/null; then
        echo -e "${YELLOW}Installing Railway CLI...${NC}"
        curl -fsSL https://railway.app/install.sh | bash
    fi
    
    echo -e "${BLUE}Logging into Railway...${NC}"
    railway login
    
    echo -e "${BLUE}Initializing Railway project...${NC}"
    railway init
    
    echo -e "${BLUE}Deploying...${NC}"
    railway up
    
    echo -e "${GREEN}✓ Deployed to Railway!${NC}"
    echo ""
}

# Function: Render deployment
deploy_render() {
    echo -e "${BLUE}🎨 Deploying to Render...${NC}"
    
    echo -e "${YELLOW}Manual steps for Render:${NC}"
    echo "1. Go to https://render.com"
    echo "2. Connect your GitHub repository"
    echo "3. Select: Node/Next.js environment"
    echo "4. Build command: npm run build"
    echo "5. Start command: npm run start"
    echo "6. Click Deploy"
    echo ""
}

# Function: AWS deployment
deploy_aws() {
    echo -e "${BLUE}☁️  Deploying to AWS Elastic Beanstalk...${NC}"
    
    if ! command -v eb &> /dev/null; then
        echo -e "${YELLOW}Installing AWS EB CLI...${NC}"
        pip install awsebcli
    fi
    
    echo -e "${BLUE}Initializing Elastic Beanstalk...${NC}"
    eb init -p node.js-18 brew-haven-cafe --region us-east-1
    
    echo -e "${BLUE}Creating environment...${NC}"
    eb create brew-haven-cafe-prod
    
    echo -e "${BLUE}Deploying...${NC}"
    eb deploy
    
    echo -e "${BLUE}Opening application...${NC}"
    eb open
    
    echo -e "${GREEN}✓ Deployed to AWS!${NC}"
    echo ""
}

# Function: Build for production
build_production() {
    echo -e "${BLUE}🔨 Building for production...${NC}"
    
    npm install
    npm run build
    
    echo -e "${GREEN}✓ Build complete!${NC}"
    echo "   Size: $(du -sh .next | cut -f1)"
    echo ""
}

# Function: Full setup
full_setup() {
    echo -e "${BLUE}🚀 Full Setup - GitHub + Docker Ready${NC}"
    echo ""
    
    check_prerequisites
    build_production
    setup_github
    
    echo -e "${YELLOW}Building Docker image...${NC}"
    if command -v docker &> /dev/null; then
        docker build -t brew-haven-cafe:latest .
        echo -e "${GREEN}✓ Docker image ready${NC}"
    else
        echo -e "${YELLOW}⚠️  Docker not installed (optional)${NC}"
    fi
    
    echo ""
    echo -e "${GREEN}✅ Setup Complete!${NC}"
    echo ""
    echo -e "${YELLOW}Next steps:${NC}"
    echo "1. Push to GitHub (see instructions above)"
    echo "2. Deploy to Vercel (https://vercel.com/new)"
    echo "3. Or run Docker: docker run -p 3000:3000 brew-haven-cafe:latest"
    echo ""
}

# Main script logic
main() {
    check_prerequisites
    
    while true; do
        show_menu
        read -p "Enter your choice (1-7): " choice
        
        case $choice in
            1)
                build_production
                setup_github
                deploy_vercel
                ;;
            2)
                build_production
                setup_docker
                ;;
            3)
                build_production
                deploy_aws
                ;;
            4)
                build_production
                deploy_railway
                ;;
            5)
                deploy_render
                ;;
            6)
                full_setup
                ;;
            7)
                echo -e "${YELLOW}Goodbye! 👋${NC}"
                exit 0
                ;;
            *)
                echo -e "${RED}Invalid choice. Please try again.${NC}"
                ;;
        esac
        
        echo ""
        read -p "Press Enter to continue..."
        clear
    done
}

# Run main function
main
