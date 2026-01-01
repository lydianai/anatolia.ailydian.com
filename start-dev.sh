#!/bin/bash

# TÜRK DİJİTAL METROPOL - Development Server Başlatma
# Bu script tüm servisleri development modunda başlatır

set -e

# Renkler
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
PURPLE='\033[0;35m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Banner
echo -e "${CYAN}"
echo "╔═══════════════════════════════════════════════════════════╗"
echo "║                                                           ║"
echo "║         🇹🇷  TÜRK DİJİTAL METROPOL  🇹🇷                     ║"
echo "║                                                           ║"
echo "║         Türkiye'nin İlk Dijital Metropolü                ║"
echo "║                                                           ║"
echo "╚═══════════════════════════════════════════════════════════╝"
echo -e "${NC}"

# Başlık
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${PURPLE}   Development Sunucuları Başlatılıyor...${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""

# Root directory
ROOT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
cd "$ROOT_DIR"

# 1. Docker servisleri kontrol et
echo -e "${BLUE}[1/5]${NC} Docker servisleri kontrol ediliyor..."
if ! command -v docker &> /dev/null; then
    echo -e "${YELLOW}⚠️  Docker bulunamadı. PostgreSQL ve Redis manuel kurulum gerektirir.${NC}"
else
    echo -e "${GREEN}✓${NC} Docker bulundu"

    # Docker servisleri başlat
    cd apps/backend
    if [ -f "docker-compose.yml" ]; then
        echo -e "${BLUE}   Docker servisleri başlatılıyor (PostgreSQL, Redis, MongoDB)...${NC}"
        docker-compose up -d

        # Servislerin hazır olmasını bekle
        echo -e "${BLUE}   Veritabanlarının hazır olması bekleniyor...${NC}"
        sleep 5

        echo -e "${GREEN}✓${NC} Docker servisleri hazır"
        echo -e "${CYAN}   - PostgreSQL: localhost:5432${NC}"
        echo -e "${CYAN}   - Redis: localhost:6379${NC}"
        echo -e "${CYAN}   - MongoDB: localhost:27017${NC}"
        echo -e "${CYAN}   - Redis Commander: http://localhost:8081${NC}"
    fi
    cd "$ROOT_DIR"
fi
echo ""

# 2. Backend dependencies
echo -e "${BLUE}[2/5]${NC} Backend dependencies kontrol ediliyor..."
cd apps/backend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}   Backend dependencies yükleniyor...${NC}"
    npm install
fi
echo -e "${GREEN}✓${NC} Backend dependencies hazır"
cd "$ROOT_DIR"
echo ""

# 3. Frontend dependencies
echo -e "${BLUE}[3/5]${NC} Frontend dependencies kontrol ediliyor..."
cd apps/frontend
if [ ! -d "node_modules" ]; then
    echo -e "${YELLOW}   Frontend dependencies yükleniyor...${NC}"
    npm install
fi
echo -e "${GREEN}✓${NC} Frontend dependencies hazır"
cd "$ROOT_DIR"
echo ""

# 4. Database setup
echo -e "${BLUE}[4/5]${NC} Database setup kontrol ediliyor..."
cd apps/backend
if [ ! -d "prisma/migrations" ]; then
    echo -e "${YELLOW}   Database migration çalıştırılıyor...${NC}"
    npx prisma generate
    npx prisma migrate dev --name init
fi
echo -e "${GREEN}✓${NC} Database hazır"
cd "$ROOT_DIR"
echo ""

# 5. Servisleri başlat
echo -e "${BLUE}[5/5]${NC} Development servisleri başlatılıyor..."
echo ""

# Terminal pencerelerinde başlat (macOS için osascript kullan)
if [[ "$OSTYPE" == "darwin"* ]]; then
    # Backend terminal
    osascript -e "tell application \"Terminal\"
        do script \"cd '$ROOT_DIR/apps/backend' && echo '🔹 BACKEND SERVER' && echo '' && npm run dev\"
    end tell" &

    sleep 2

    # Frontend terminal
    osascript -e "tell application \"Terminal\"
        do script \"cd '$ROOT_DIR/apps/frontend' && echo '🔹 FRONTEND SERVER' && echo '' && npm run dev\"
    end tell" &

    echo -e "${GREEN}✓${NC} Yeni terminal pencereleri açıldı"
else
    # Linux için tmux veya screen kullanılabilir
    echo -e "${YELLOW}⚠️  Otomatik terminal açma sadece macOS'ta desteklenir${NC}"
    echo -e "${CYAN}   Manuel başlatma:${NC}"
    echo -e "${CYAN}   Terminal 1: cd apps/backend && npm run dev${NC}"
    echo -e "${CYAN}   Terminal 2: cd apps/frontend && npm run dev${NC}"
fi

echo ""
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   🎉 BAŞLATMA TAMAMLANDI!${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""
echo -e "${CYAN}📊 Servisler:${NC}"
echo -e "${GREEN}   ✓ Backend API:${NC}       http://localhost:3001"
echo -e "${GREEN}   ✓ Frontend:${NC}          http://localhost:3000"
echo -e "${GREEN}   ✓ Health Check:${NC}      http://localhost:3001/api/v1/health"
echo ""
echo -e "${CYAN}🎮 Demo Sayfaları:${NC}"
echo -e "${GREEN}   ✓ Ana Sayfa:${NC}         http://localhost:3000"
echo -e "${GREEN}   ✓ Animasyonlar:${NC}      http://localhost:3000/demo-animations"
echo -e "${GREEN}   ✓ Oyun UI:${NC}           http://localhost:3000/game-ui-demo"
echo -e "${GREEN}   ✓ Karakter Yaratma:${NC}  http://localhost:3000/character-creation"
echo -e "${GREEN}   ✓ Sprite Oluşturucu:${NC} http://localhost:3000/sprite-generator"
echo -e "${GREEN}   ✓ Oyun:${NC}              http://localhost:3000/game"
echo ""
echo -e "${CYAN}🔧 Admin Paneller:${NC}"
echo -e "${GREEN}   ✓ Prisma Studio:${NC}     npx prisma studio (apps/backend)"
echo -e "${GREEN}   ✓ Redis Commander:${NC}   http://localhost:8081"
echo ""
echo -e "${YELLOW}💡 İpucu:${NC}"
echo -e "   • İlk kullanımda kayıt olun: ${CYAN}http://localhost:3000/auth/register${NC}"
echo -e "   • Logs için terminal pencerelerine bakın"
echo -e "   • Durdurmak için: ${CYAN}./stop-dev.sh${NC}"
echo ""
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo -e "${GREEN}   Built with ❤️ for Turkey 🇹🇷${NC}"
echo -e "${PURPLE}═══════════════════════════════════════════════════════════${NC}"
echo ""
