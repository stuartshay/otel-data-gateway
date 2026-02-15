#!/bin/bash
# =============================================================================
# otel-data-gateway Development Environment Setup
# =============================================================================

set -e

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}otel-data-gateway Setup${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""

REQUIRED_NODE_VERSION="24"

# Check git
echo -e "${YELLOW}Checking git...${NC}"
if ! command -v git &> /dev/null; then
    echo -e "${RED}Error: git is not installed${NC}"
    exit 1
fi
GIT_VERSION=$(git --version)
echo -e "${GREEN}✓ ${GIT_VERSION}${NC}"
echo ""

# Check nvm / Node.js
echo -e "${YELLOW}Checking nvm...${NC}"
if [ -s "$HOME/.nvm/nvm.sh" ]; then
    export NVM_DIR="$HOME/.nvm"
    # shellcheck source=/dev/null
    [ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"
    echo -e "${GREEN}✓ nvm found${NC}"

    echo -e "${YELLOW}Checking for Node.js ${REQUIRED_NODE_VERSION}...${NC}"
    if ! nvm use --delete-prefix ${REQUIRED_NODE_VERSION} &>/dev/null; then
        echo -e "${YELLOW}Installing Node.js ${REQUIRED_NODE_VERSION}...${NC}"
        nvm install ${REQUIRED_NODE_VERSION}
        nvm use --delete-prefix ${REQUIRED_NODE_VERSION}
    else
        echo -e "${GREEN}✓ Node.js ${REQUIRED_NODE_VERSION} already installed${NC}"
        nvm use --delete-prefix ${REQUIRED_NODE_VERSION}
    fi
else
    echo -e "${YELLOW}⚠ nvm not found, checking system Node.js...${NC}"
    if ! command -v node &> /dev/null; then
        echo -e "${RED}Error: Node.js is not installed${NC}"
        echo "Install nvm: https://github.com/nvm-sh/nvm"
        exit 1
    fi
fi

NODE_VERSION=$(node --version)
echo -e "${GREEN}✓ Node.js ${NODE_VERSION}${NC}"

NODE_MAJOR=$(node --version | cut -d. -f1 | sed 's/v//')
if [ "$NODE_MAJOR" -lt "$REQUIRED_NODE_VERSION" ]; then
    echo -e "${RED}Error: Node.js ${REQUIRED_NODE_VERSION}.x or higher is required${NC}"
    exit 1
fi

NPM_VERSION=$(npm --version)
echo -e "${GREEN}✓ npm ${NPM_VERSION}${NC}"
echo ""

# Install dependencies
echo -e "${YELLOW}Installing npm dependencies...${NC}"
if npm install; then
    echo -e "${GREEN}✓ Dependencies installed${NC}"
else
    echo -e "${RED}Error: Failed to install npm dependencies${NC}"
    exit 1
fi
echo ""

# Initialize Husky
echo -e "${YELLOW}Setting up Husky git hooks...${NC}"
if npm run prepare &>/dev/null; then
    echo -e "${GREEN}✓ Husky initialized${NC}"
    if [ -f .husky/pre-commit ]; then
        chmod +x .husky/pre-commit
        echo -e "${GREEN}✓ Pre-commit hook configured${NC}"
    fi
else
    echo -e "${YELLOW}⚠ Husky initialization failed${NC}"
fi
echo ""

# Create .env if not exists
if [ ! -f .env ]; then
    echo -e "${YELLOW}Creating .env from defaults...${NC}"
    cat > .env << 'EOF'
# otel-data-gateway configuration
PORT=4000
OTEL_DATA_API_URL=https://api.lab.informationcart.com
NODE_ENV=development
EOF
    echo -e "${GREEN}✓ Created .env${NC}"
else
    echo -e "${GREEN}✓ .env already exists${NC}"
fi
echo ""

# Build
echo -e "${YELLOW}Building TypeScript...${NC}"
if npm run build; then
    echo -e "${GREEN}✓ Build successful${NC}"
else
    echo -e "${RED}Build failed${NC}"
    exit 1
fi
echo ""

# Summary
echo -e "${GREEN}=================================${NC}"
echo -e "${GREEN}Setup Complete!${NC}"
echo -e "${GREEN}=================================${NC}"
echo ""
echo "Next steps:"
echo "  1. Review .env configuration"
echo "  2. Run dev server: npm run dev"
echo "  3. Open GraphQL Playground: http://localhost:4000"
echo ""
echo "Commands:"
echo "  npm run dev       - Start development server (watch mode)"
echo "  npm run build     - Build for production"
echo "  npm run start     - Start production server"
echo "  npm run lint      - Run ESLint"
echo "  npm run test      - Run tests"
echo ""
