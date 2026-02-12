# =============================================================================
# otel-data-gateway Makefile
# =============================================================================

.PHONY: help setup install dev build clean lint format test docker-build docker-run docker-push all

.DEFAULT_GOAL := help

# Variables
DOCKER_IMAGE := stuartshay/otel-data-gateway
DOCKER_TAG := latest
NODE_VERSION := 24

# Colors for output
RED := \033[0;31m
GREEN := \033[0;32m
YELLOW := \033[1;33m
NC := \033[0m

help: ## Show this help message
	@echo "$(GREEN)otel-data-gateway Makefile Commands$(NC)"
	@echo ""
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  $(YELLOW)%-20s$(NC) %s\n", $$1, $$2}'
	@echo ""

# =============================================================================
# Setup and Installation
# =============================================================================

setup: ## Run initial project setup
	@echo "$(YELLOW)Running setup script...$(NC)"
	@bash setup.sh

install: ## Install npm dependencies
	@echo "$(YELLOW)Installing dependencies...$(NC)"
	@npm install
	@echo "$(GREEN)✓ Dependencies installed$(NC)"

clean: ## Clean build artifacts and node_modules
	@echo "$(YELLOW)Cleaning build artifacts...$(NC)"
	@rm -rf dist node_modules
	@echo "$(GREEN)✓ Cleaned$(NC)"

# =============================================================================
# Development
# =============================================================================

dev: ## Start development server with watch mode
	@echo "$(YELLOW)Starting dev server...$(NC)"
	@npm run dev

build: ## Build for production
	@echo "$(YELLOW)Building for production...$(NC)"
	@npm run build
	@echo "$(GREEN)✓ Build complete$(NC)"

start: ## Start production server
	@echo "$(YELLOW)Starting production server...$(NC)"
	@npm run start

# =============================================================================
# Code Quality
# =============================================================================

lint: ## Run all linters
	@echo "$(YELLOW)Running linters...$(NC)"
	@npm run lint:all --silent
	@echo "$(GREEN)✓ Linting complete$(NC)"

lint-fix: ## Fix linting issues automatically
	@echo "$(YELLOW)Fixing lint issues...$(NC)"
	@npm run lint:fix
	@npm run lint:md:fix
	@echo "$(GREEN)✓ Fixes applied$(NC)"

format: ## Format code with Prettier
	@echo "$(YELLOW)Formatting code...$(NC)"
	@npm run format
	@echo "$(GREEN)✓ Formatting complete$(NC)"

format-check: ## Check code formatting
	@npm run format:check

type-check: ## Run TypeScript type checking
	@echo "$(YELLOW)Running type check...$(NC)"
	@npm run type-check
	@echo "$(GREEN)✓ Type check complete$(NC)"

# =============================================================================
# Testing
# =============================================================================

test: ## Run tests
	@echo "$(YELLOW)Running tests...$(NC)"
	@npm run test
	@echo "$(GREEN)✓ Tests complete$(NC)"

test-watch: ## Run tests in watch mode
	@npm run test:watch

# =============================================================================
# Docker
# =============================================================================

docker-build: ## Build Docker image
	@echo "$(YELLOW)Building Docker image...$(NC)"
	@docker build -t $(DOCKER_IMAGE):$(DOCKER_TAG) .
	@echo "$(GREEN)✓ Docker image built: $(DOCKER_IMAGE):$(DOCKER_TAG)$(NC)"

docker-run: ## Run Docker container locally (http://localhost:4000)
	@echo "$(YELLOW)Running Docker container...$(NC)"
	@docker run -p 4000:4000 --name otel-data-gateway --rm \
		-e OTEL_DATA_API_URL=https://api.lab.informationcart.com \
		$(DOCKER_IMAGE):$(DOCKER_TAG)

docker-push: ## Push Docker image to registry
	@echo "$(YELLOW)Pushing Docker image...$(NC)"
	@docker push $(DOCKER_IMAGE):$(DOCKER_TAG)
	@echo "$(GREEN)✓ Image pushed$(NC)"

docker-stop: ## Stop running Docker container
	@docker stop otel-data-gateway || true

# =============================================================================
# Git Hooks
# =============================================================================

hooks-install: ## Install git hooks
	@echo "$(YELLOW)Installing git hooks...$(NC)"
	@npm run prepare
	@echo "$(GREEN)✓ Git hooks installed$(NC)"

# =============================================================================
# Convenience Targets
# =============================================================================

all: clean install lint type-check build ## Clean, install, lint, type-check, and build

check: lint type-check test ## Run all checks

pre-commit: lint type-check ## Run pre-commit checks locally

verify: ## Verify environment and dependencies
	@echo "$(YELLOW)Verifying environment...$(NC)"
	@echo "Node.js: $$(node --version)"
	@echo "npm: $$(npm --version)"
	@echo "$(GREEN)✓ Environment verified$(NC)"

reset: clean install ## Reset project
	@echo "$(GREEN)✓ Project reset complete$(NC)"

rebuild: clean install build ## Clean, install, and build
