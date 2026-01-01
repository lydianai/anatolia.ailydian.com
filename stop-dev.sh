#!/bin/bash

# TÜRK DİJİTAL METROPOL - Development Server Durdurma
# Bu script tüm servisleri durdurur

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║         🇹🇷  TÜRK DİJİTAL METROPOL  🇹🇷                     ║"
echo "║           Development Server Durdurma                     ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"
echo ""

# Root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# 1. Node process'leri durdur
echo -e "${BLUE}[1/2]${NC} Node.js servisleri durduruluyor..."

# Backend (port 3001)
BACKEND_PID=$(lsof -ti:3001 2>/dev/null || echo "")
if [ ! -z "$BACKEND_PID" ]; then
    kill -9 $BACKEND_PID 2>/dev/null || true
    echo -e "${GREEN}✓${NC} Backend durduruldu (port 3001)"
else
    echo -e "${YELLOW}⚠${NC} Backend çalışmıyor"
fi

# Frontend (port 3000)
FRONTEND_PID=$(lsof -ti:3000 2>/dev/null || echo "")
if [ ! -z "$FRONTEND_PID" ]; then
    kill -9 $FRONTEND_PID 2>/dev/null || true
    echo -e "${GREEN}✓${NC} Frontend durduruldu (port 3000)"
else
    echo -e "${YELLOW}⚠${NC} Frontend çalışmıyor"
fi

echo ""

# 2. Docker servisleri durdur (opsiyonel)
echo -e "${BLUE}[2/2]${NC} Docker servisleri kontrol ediliyor..."
cd apps/backend
if [ -f "docker-compose.yml" ]; then
    echo -e "${YELLOW}   Docker servislerini durdurmak ister misiniz? (y/N)${NC}"
    read -t 10 -n 1 -r STOP_DOCKER || STOP_DOCKER="n"
    echo ""

    if [[ $STOP_DOCKER =~ ^[Yy]$ ]]; then
        docker-compose down
        echo -e "${GREEN}✓${NC} Docker servisleri durduruldu"
    else
        echo -e "${CYAN}ℹ${NC} Docker servisleri çalışmaya devam ediyor"
    fi
fi
cd "$ROOT_DIR"

echo ""
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   ✓ Tüm servisler durduruldu!${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${YELLOW}💡 Yeniden başlatmak için:${NC} ${CYAN}./start-dev.sh${NC}"
echo ""
