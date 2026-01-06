# 🎬 CineDB

Una aplicación web moderna para explorar películas populares, buscar información detallada y descubrir nuevos títulos. CineDB utiliza la API de **The Movie Database (TMDB)** para proporcionar una experiencia completa de navegación cinematográfica con datos actualizados en tiempo real.

> **🔄 Migración Completada:** Este proyecto ha sido migrado exitosamente de IMDB web scraping a TMDB API (Enero 2026).

## ✨ Características

- **🏆 Top 20 Películas Populares**: Visualiza las películas más populares del momento según TMDB
- **🔍 Búsqueda Instantánea**: Busca películas por título con resultados en tiempo real
- **📊 Información Detallada**: Accede a información completa incluyendo:
  - Sinopsis y calificaciones (TMDB ratings)
  - Director, guionistas y elenco completo
  - Duración, año de lanzamiento y géneros
  - **Tráilers de YouTube** integrados
  - Número de votos de usuarios
- **📱 Diseño Responsivo**: Optimizado para dispositivos móviles, tablets y desktop
- **🎨 Interfaz Moderna**: Diseño oscuro con acentos en color ámbar
- **⚡ Rendimiento Optimizado**: Construido con Next.js 15 y Turbopack
- **🌐 Contenido en Español**: Datos traducidos automáticamente por TMDB

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.4.2** - Framework de React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript 5** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos y accesibles

### Backend & APIs
- **Next.js API Routes** - Server-side endpoints
- **TMDB API (v3)** - The Movie Database API oficial
- **Fetch API** - Peticiones HTTP nativas (sin librerías externas)

### Herramientas de Desarrollo
- **ESLint 9** - Linting de código
- **pnpm 10.13.1** - Gestor de paquetes rápido y eficiente
- **Turbopack** - Bundler de nueva generación

## 🚀 Instalación y Configuración

### Prerrequisitos
- **Node.js 20+** instalado ([Descargar aquí](https://nodejs.org/))
- **pnpm** instalado globalmente:
  ```bash
  npm install -g pnpm
  ```
- **Cuenta de TMDB** (gratuita) para obtener API Key

---

### 🔑 Paso 1: Obtener tu API Key de TMDB

1. **Crear cuenta en TMDB** (si no tienes una)
   - Ve a [https://www.themoviedb.org/signup](https://www.themoviedb.org/signup)
   - Completa el registro (hazlo con un correo que no sea de Google para evitar un error 403)

2. **Solicitar API Access**
   - Inicia sesión en TMDB
   - Ve a tu perfil → **Settings** → **API**
   - Haz clic en **"Create"** o **"Request an API Key"**
   - Selecciona **"Developer"** (no comercial)
   - Completa el formulario básico
   - Acepta los términos de uso

3. **Copiar el Read Access Token (v4)**
   - Una vez aprobado, verás dos tokens
   - **Importante:** Copia el **"API Read Access Token (v4 auth)"**
   - Este es un token Bearer largo (empieza con `eyJ...`)
   - **NO uses** el "API Key (v3 auth)"

---

### 📦 Paso 2: Clonar e Instalar

```bash
# 1. Clonar el repositorio
git clone https://github.com/YeralAndre/cine-db.git
cd cine-db

# 2. Instalar dependencias
pnpm install

# 3. Crear archivo de variables de entorno
cp .env.example .env.local
```

---

### ⚙️ Paso 3: Configurar Variables de Entorno

Abre el archivo `.env.local` y agrega tu API Key:

```env
# .env.local
TMDB_API_KEY=tu_token_bearer_completo_aqui
```

> **⚠️ Importante:** NUNCA compartas tu API Key públicamente ni la subas a GitHub. El archivo `.env.local` ya está en `.gitignore`.

---

### 🏃 Paso 4: Ejecutar el Proyecto

```bash
# Modo desarrollo
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

---

## 🔒 Seguridad

- ✅ **API Key en servidor:** La clave TMDB solo se usa en API Routes (server-side)
- ✅ **No se expone al cliente:** El código JavaScript del navegador nunca ve la API key
- ✅ **Rate limiting:** TMDB permite 1,000,000 requests/mes en plan gratuito
- ✅ **HTTPS:** Vercel proporciona SSL automático

## 📁 Estructura del Proyecto

```
cine-db/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Página principal (Top 20 películas)
│   │   ├── layout.tsx         # Layout principal con Navbar
│   │   ├── globals.css        # Estilos globales
│   │   ├── api/               # API Routes (Server-side)
│   │   │   └── movies/        # Endpoints de películas
│   │   │       ├── top/       # GET /api/movies/top
│   │   │       ├── search/    # GET /api/movies/search?q={query}
│   │   │       └── info/      # GET /api/movies/info?id={movieId}
│   │   ├── search/            # Página de búsqueda
│   │   │   └── page.tsx       # /search
│   │   └── info/[id]/         # Página de detalles
│   │       └── page.tsx       # /info/{id}
│   ├── components/            # Componentes reutilizables
│   │   ├── Navbar.tsx         # Barra de navegación
│   │   ├── TopCard.tsx        # Tarjeta de película popular
│   │   ├── SearchResultCard.tsx # (No usado - integrado en search/page.tsx)
│   │   └── Loading.tsx        # Spinner de carga
│   ├── lib/                   # Lógica de negocio
│   │   ├── api.ts            # ⭐ Cliente TMDB API (core)
│   │   └── fetchAPI.ts       # Cliente de API interno
│   ├── types/                 # TypeScript Interfaces
│   │   ├── movies.d.ts       # TopMovie, QueryMovie, InfoMovie
│   │   └── images.d.ts       # Tipos para importar imágenes
│   └── assets/               # Recursos estáticos
│       ├── placeholder.png   # Imagen placeholder
│       └── placeholder.svg   # SVG placeholder
├── public/                   # Archivos públicos estáticos
├── .env.example             # Plantilla de variables de entorno
├── package.json             # Dependencias y scripts
├── next.config.ts          # Configuración de Next.js
├── postcss.config.mjs      # Configuración de PostCSS
└── tsconfig.json          # Configuración de TypeScript
```

## 🔧 Scripts Disponibles

```bash
# Desarrollo con Turbopack (hot reload)
pnpm dev

# Build de producción
pnpm build

# Ejecutar build de producción
pnpm start

# Linting de código
pnpm lint
```

## 🎯 API Endpoints

### Endpoints Internos (Next.js API Routes)

Estos endpoints son consumidos por el frontend:

```
GET /api/movies/top
└── Retorna: TopMovie[]
    └── Top 20 películas populares

GET /api/movies/search?q={query}
└── Retorna: QueryMovie[]
    └── Resultados de búsqueda

GET /api/movies/info?id={movieId}
└── Retorna: InfoMovie
    └── Información completa de película + trailer + créditos
```

### TMDB API (Backend)

El archivo `src/lib/api.ts` consume estos endpoints de TMDB:

```
GET https://api.themoviedb.org/3/movie/popular
└── Usado por: topMovies()

GET https://api.themoviedb.org/3/search/movie?query={q}
└── Usado por: searchMovies()

GET https://api.themoviedb.org/3/movie/{id}?append_to_response=videos,credits
└── Usado por: infoMovie()
```

---

## 🎨 Diseño y UX

### Paleta de Colores
- **Fondo Principal**: Gris oscuro (`gray-950`)
- **Acento Primario**: Ámbar (`amber-400`, `amber-500`)
- **Texto**: Blanco y grises (`gray-100`, `gray-300`, `gray-400`)
- **Tarjetas**: Gris medio (`gray-800`, `gray-900`)
- **Bordes**: Grises translúcidos

### Tipografía
- Sistema de fuentes nativo (optimizado por Tailwind)
- Tamaños adaptables según viewport
- Weights: Normal (400), Medium (500), Semibold (600), Bold (700)

### Interacciones
- Hover states en tarjetas y botones
- Transiciones suaves (200ms)
- Loading spinners animados
- Responsive grid adaptable

---

## 📊 TypeScript Interfaces

### TopMovie
```typescript
interface TopMovie {
  id?: string;
  poster?: string;
  top?: string;           // Posición en ranking
  title?: string;
  year?: string;
  rating?: string;        // Calificación promedio
}
```

### QueryMovie
```typescript
interface QueryMovie {
  id?: string;
  poster?: string;
  title?: string;
  year?: string;
  type?: string;          // "movie"
  authors?: string[];     // (Vacío en versión actual)
}
```

### InfoMovie
```typescript
interface InfoMovie {
  id?: string;
  title?: string;
  originalTitle?: string;
  year?: string;
  category?: string;       // Géneros separados por coma
  duration?: string;       // Formato "2h 18min"
  rating?: string;
  peopleRating?: string;   // Número de votos
  poster?: string;
  tags?: string[];         // Array de géneros
  synopsis?: string;
  trailer?: string;        // URL de YouTube embed
  direction?: string;      // Director
  writers?: string[];      // Hasta 5 guionistas
  actors?: string[];       // Top 10 actores
}
```

---

## 🔧 Configuración Avanzada

### Variables de Entorno

Archivo `.env.local`:
```env
# TMDB API Configuration
TMDB_API_KEY=tu_token_bearer_aqui
```

Archivo `.env.example` (para repositorio):
```env
# TMDB API Configuration
# Obtén tu API Key en: https://www.themoviedb.org/settings/api
# Usa el "API Read Access Token (v4 auth)" NO el "API Key (v3 auth)"

TMDB_API_KEY=your_tmdb_bearer_token_here
```

### Next.js Config

El proyecto usa configuración estándar de Next.js 15 con Turbopack habilitado.

---

## 🐛 Troubleshooting

### Error: "TMDB_API_KEY no está configurada"
- ✅ Verifica que existe el archivo `.env.local`
- ✅ Asegúrate de usar `TMDB_API_KEY` (sin `NEXT_PUBLIC_`)
- ✅ Reinicia el servidor de desarrollo (`pnpm dev`)

### Error: "HTTP error! status: 401"
- ❌ Tu API Key es inválida o expiró
- ✅ Verifica que copiaste el **Read Access Token (v4)** completo
- ✅ Regenera el token en TMDB si es necesario

### No aparecen posters
- ✅ Verifica tu conexión a internet
- ✅ Chequea que TMDB esté operativo
- ✅ Revisa la consola del navegador para errores de CORS

### Build falla en Vercel
- ✅ Asegúrate de agregar `TMDB_API_KEY` en Vercel Environment Variables
- ✅ Verifica que el repositorio tiene todos los archivos necesarios
- ✅ Revisa los logs de build en Vercel Dashboard

---

## 📝 Changelog

### v2.0.0 (Enero 2026) - Migración TMDB
- ✅ Migración completa de IMDB scraping a TMDB API
- ✅ Eliminada dependencia de Cheerio
- ✅ Trailers de YouTube integrados
- ✅ Información de créditos completa (director, guionistas, actores)
- ✅ Datos actualizados en tiempo real
- ✅ Mejor rendimiento y confiabilidad

### v1.0.0 (2024) - Versión Inicial
- ✅ Web scraping de IMDB
- ✅ Top películas
- ✅ Búsqueda básica
- ✅ Información detallada

---

## 🤝 Contribuciones

Las contribuciones son bienvenidas. Por favor:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/AmazingFeature`)
3. Commit tus cambios (`git commit -m 'Add: AmazingFeature'`)
4. Push a la rama (`git push origin feature/AmazingFeature`)
5. Abre un Pull Request

---

## 📄 Licencia

Este proyecto está bajo licencia MIT. Ver archivo `LICENSE` para más detalles.

---

## 🙏 Agradecimientos

- [The Movie Database (TMDB)](https://www.themoviedb.org/) - Por su excelente API gratuita
- [Next.js](https://nextjs.org/) - Framework increíble
- [Vercel](https://vercel.com/) - Hosting y deploy simplificado
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS framework
- [Lucide Icons](https://lucide.dev/) - Iconos hermosos y consistentes

---

## 📞 Contacto

**Proyecto Link:** [https://github.com/YeralAndre/cine-db](https://github.com/YeralAndre/cine-db)

**Live Demo:** [https://cine-db.vercel.app](https://cine-db.vercel.app)

---

<div align="center">

**⭐ Si te gustó el proyecto, dale una estrella en GitHub ⭐**

Hecho con ❤️ usando Next.js y TMDB API

</div>