# 🎬 CineDB - Movie Database Web App

Una aplicación web moderna para explorar y buscar información de películas, construida con React, TypeScript, Tailwind CSS y Vite.

## ✨ Características

### 🏠 **Página Principal (Home)**
- **Top de Películas**: Visualización de las películas más populares
- **Rankings dinámicos**: Indicadores de tendencia (subiendo/bajando)
- **Tarjetas interactivas**: Información completa con rating, duración, categoría
- **Navegación intuitiva**: Click para ver detalles completos

### 🔍 **Búsqueda Avanzada**
- **Búsqueda en tiempo real**: Resultados mientras escribes
- **Debouncing inteligente**: Búsqueda optimizada al presionar Enter
- **Estados de carga**: Animaciones de loading con puntos suspensivos
- **Grid responsivo**: Layout adaptativo para diferentes tamaños de pantalla
- **Placeholder images**: Manejo de imágenes faltantes

### 📄 **Página de Información**
- **Detalles completos**: Sinopsis, dirección, guionistas, elenco
- **Trailers integrados**: Reproducción de trailers desde IMDB
- **Tags categorizados**: Etiquetas visuales por género
- **Ratings visuales**: Sistema de calificación con estrellas
- **Información técnica**: Duración, año, categoría

### 🎨 **Diseño y UX**
- **Tema oscuro**: Interfaz moderna con colores amber y grises
- **Responsivo**: Diseño adaptable a móviles, tablets y desktop
- **Animaciones suaves**: Transiciones y hover effects
- **Iconografía**: Lucide React icons para mejor UX
- **Tipografía**: Fuente Inter para óptima legibilidad

## 🚀 Tecnologías

- **Frontend**: React 19.1.0 + TypeScript
- **Styling**: Tailwind CSS 4.1.10
- **Routing**: React Router DOM 7.6.2
- **Icons**: Lucide React 0.515.0
- **Build Tool**: Vite 6.3.5
- **Linting**: ESLint 9.25.0

## 📁 Estructura del Repositorio

\`\`\`
movie-webapp/
├── frontend/               # React + TypeScript App
│   ├── src/
│   │   ├── components/
│   │   │   ├── navbar.tsx          # Navegación principal
│   │   │   ├── TopCard.tsx         # Tarjeta de película para home
│   │   │   └── SearchResultCard.tsx # Tarjeta para resultados de búsqueda
│   │   ├── pages/
│   │   │   ├── home.tsx            # Página principal con top películas
│   │   │   ├── search.tsx          # Página de búsqueda
│   │   │   └── info.tsx            # Página de detalles de película
│   │   ├── lib/
│   │   │   └── api.ts              # Cliente API para endpoints
│   │   ├── types/
│   │   │   └── index.d.ts          # Definiciones TypeScript
│   │   ├── assets/
│   │   │   └── placeholder.*       # Imágenes placeholder
│   │   └── App.tsx                 # Configuración de rutas principales
│   ├── package.json
│   ├── vite.config.ts
│   └── tailwind.config.js
└── backend/                # API Server
    ├── src/
    ├── package.json
    └── ...
\`\`\`

## 🛠️ Instalación y Uso

### Prerrequisitos
- Node.js 18+ 
- pnpm (recomendado) o npm

### Instalación
\`\`\`bash
# Clonar el repositorio
git clone <repository-url>
cd movie-webapp

# Instalar dependencias del frontend
cd frontend
pnpm install

# Instalar dependencias del backend
cd ../backend
pnpm install

# Configurar variables de entorno
cp .env.example .env
# Editar VITE_API_URL con tu endpoint de API
\`\`\`

### Desarrollo
\`\`\`bash
# Frontend (desde /frontend)
pnpm dev        # Puerto 5173

# Backend (desde /backend)
pnpm dev        # Puerto 3000

# Linting (desde /frontend)
pnpm lint

# Build para producción (desde /frontend)
pnpm build

# Preview del build (desde /frontend)
pnpm preview
\`\`\`

## 🌐 API Integration

La aplicación consume una API REST con los siguientes endpoints:

- **GET** \`/api/movies/top\` - Lista de películas más populares
- **GET** \`/api/movies/search?q={query}\` - Búsqueda de películas
- **GET** \`/api/movies/info?id={id}\` - Información detallada de película

### Tipos de Datos
\`\`\`typescript
interface TopMovie {
  id: string;
  top: string;
  poster: string;
  title: string;
  year: string;
  duration: string;
  category: string;
  rating: string;
  status: {
    info: string;
    number: string | null;
  };
}

interface InfoMovie {
  title: string;
  originalTitle: string;
  year: string;
  poster: string;
  synopsis: string;
  direction: string;
  writers: string[];
  actors: string[];
  rating: string;
  peopleRating: string;
  category: string;
  duration: string;
  tags: string[];
  trailer?: string;
}
\`\`\`

## 🎯 Características Técnicas

### ⚡ Rendimiento
- **Lazy Loading**: Carga diferida de componentes
- **Debounced Search**: Búsqueda optimizada
- **Error Boundaries**: Manejo robusto de errores
- **TypeScript**: Tipado estático para mayor confiabilidad

### 📱 Responsivo
- **Grid System**: Layout flexible con CSS Grid y Flexbox
- **Breakpoints**: sm, md, lg, xl para diferentes dispositivos
- **Touch Friendly**: Interfaz optimizada para pantallas táctiles

### 🔒 Manejo de Estados
- **useState**: Estado local de componentes
- **useEffect**: Efectos secundarios y ciclo de vida
- **Error Handling**: Captura y manejo de errores de API

## 🎨 Diseño

### Paleta de Colores
- **Primary**: Amber (400-500) para elementos destacados
- **Background**: Gray scale (800-950) para el tema oscuro
- **Text**: White y Gray (300-400) para contenido
- **Accents**: Yellow para ratings, Orange para categorías

### UI/UX Inspiración
**Diseño basado en**: [Enlace al diseño de v0 - https://v0.dev/chat/movie-info-website-I1nq4klxSlF]

## 🤝 Contribución

1. Fork el proyecto
2. Crea una branch para tu feature (\`git checkout -b feature/AmazingFeature\`)
3. Commit tus cambios (\`git commit -m 'Add some AmazingFeature'\`)
4. Push a la branch (\`git push origin feature/AmazingFeature\`)
5. Abre un Pull Request

### 📂 Estructura de Contribución
- **Frontend**: Cambios en \`/frontend\` para UI/UX y funcionalidades del cliente
- **Backend**: Cambios en \`/backend\` para API y lógica del servidor
- **Full-stack**: Para features que requieren cambios en ambos lados

### 🧪 Testing
\`\`\`bash
# Tests del frontend
cd frontend && pnpm test

# Tests del backend
cd backend && pnpm test
\`\`\`

## 📝 Licencia

Este proyecto está bajo la Licencia MIT - ver el archivo [LICENSE](LICENSE) para más detalles.

## 👥 Autor

**Yeral Reyes** - *Desarrollo Full Stack*

---

⭐ ¡Si te gusta este proyecto, no olvides darle una estrella!
