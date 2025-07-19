# 🎬 CineDB

Una aplicación web moderna para explorar películas populares, buscar información detallada y descubrir nuevos títulos. CineDB utiliza datos de IMDB para proporcionar una experiencia completa de navegación cinematográfica.

## ✨ Características

- **🏆 Top de Películas**: Visualiza las películas más populares del momento
- **🔍 Búsqueda Inteligente**: Busca películas por título con resultados instantáneos
- **📊 Información Detallada**: Accede a información completa incluyendo:
  - Sinopsis y calificaciones
  - Elenco y equipo de producción
  - Duración, año de lanzamiento y géneros
  - Tráilers integrados
- **📱 Diseño Responsivo**: Optimizado para dispositivos móviles y desktop
- **🎨 Interfaz Moderna**: Diseño oscuro con acentos en color ámbar
- **⚡ Rendimiento Optimizado**: Construido con Next.js 15 y Turbopack

## 🛠️ Tecnologías Utilizadas

### Frontend
- **Next.js 15.4.2** - Framework de React con App Router
- **React 19.1.0** - Biblioteca de interfaz de usuario
- **TypeScript** - Tipado estático para JavaScript
- **Tailwind CSS 4** - Framework de CSS utilitario
- **Lucide React** - Iconos modernos

### Backend & APIs
- **Next.js API Routes** - Endpoints del servidor
- **Cheerio** - Web scraping para extraer datos de IMDB
- **IMDB Integration** - Datos en tiempo real de películas

### Herramientas de Desarrollo
- **ESLint** - Linting de código
- **pnpm** - Gestor de paquetes rápido
- **Turbopack** - Bundler de nueva generación

## 🚀 Instalación y Configuración

### Prerrequisitos
- Node.js 18+ instalado
- pnpm instalado globalmente

### Pasos de Instalación

1. **Clonar el repositorio**
   ```bash
   git clone <repository-url>
   cd movie-webpage
   ```

2. **Instalar dependencias**
   ```bash
   pnpm install
   ```

3. **Ejecutar en modo desarrollo**
   ```bash
   pnpm dev
   ```

4. **Abrir en el navegador**
   ```
   http://localhost:3000
   ```

## 📁 Estructura del Proyecto

```
movie-webpage/
├── src/
│   ├── app/                    # App Router de Next.js
│   │   ├── page.tsx           # Página principal (Top películas)
│   │   ├── layout.tsx         # Layout principal
│   │   ├── globals.css        # Estilos globales
│   │   ├── api/               # API Routes
│   │   │   └── movies/        # Endpoints de películas
│   │   │       ├── top/       # Top películas
│   │   │       ├── search/    # Búsqueda
│   │   │       └── info/      # Información detallada
│   │   ├── search/            # Página de búsqueda
│   │   └── info/[id]/         # Página de detalles de película
│   ├── components/            # Componentes reutilizables
│   │   ├── Navbar.tsx         # Barra de navegación
│   │   ├── TopCard.tsx        # Tarjeta de película popular
│   │   ├── SearchResultCard.tsx # Tarjeta de resultado de búsqueda
│   │   └── Loading.tsx        # Componente de carga
│   ├── lib/                   # Utilidades y lógica de negocio
│   │   ├── api.ts            # Cliente de web scraping de IMDB
│   │   └── fetchAPI.ts       # Cliente de API interno
│   ├── types/                 # Definiciones de TypeScript
│   │   └── movies.d.ts       # Interfaces de películas
│   └── assets/               # Recursos estáticos
├── public/                   # Archivos públicos
├── package.json             # Dependencias y scripts
├── next.config.ts          # Configuración de Next.js
├── tailwind.config.js      # Configuración de Tailwind
└── tsconfig.json          # Configuración de TypeScript
```

## 🔧 Scripts Disponibles

- `pnpm dev` - Inicia el servidor de desarrollo con Turbopack
- `pnpm build` - Construye la aplicación para producción
- `pnpm start` - Inicia el servidor de producción
- `pnpm lint` - Ejecuta ESLint para revisar el código

## 🎯 Funcionalidades Principales

### 1. Página Principal - Top de Películas
- Muestra las películas más populares de IMDB
- Indicadores de tendencia (subiendo/bajando en popularidad)
- Información básica: título, año, duración, calificación
- Navegación directa a información detallada

### 2. Búsqueda de Películas
- Búsqueda en tiempo real por título
- Resultados con pósters, años y equipo de producción
- Interfaz de búsqueda intuitiva
- Manejo de estados de carga y errores

### 3. Información Detallada
- Vista completa de la película seleccionada
- Sinopsis, calificaciones y metadatos
- Información del elenco y equipo técnico
- Integración de tráilers de IMDB
- Etiquetas de géneros
- Diseño responsive y atractivo

### 4. Navegación
- Barra de navegación adaptiva
- Botón de regreso al inicio
- Enlaces directos a búsqueda
- Experiencia de usuario fluida

## 🎨 Diseño y UX

### Paleta de Colores
- **Primario**: Gris oscuro (`gray-950`)
- **Acento**: Ámbar (`amber-400`, `amber-500`)
- **Texto**: Blanco y grises (`gray-100`, `gray-400`)
- **Tarjetas**: Gris medio (`gray-900`)

### Características de Diseño
- Tema oscuro moderno y elegante
- Animaciones sutiles y transiciones suaves
- Iconografía consistente con Lucide React
- Tipografía clara con la fuente Inter
- Hover effects y estados interactivos

## 🔌 API Endpoints

### `/api/movies/top`
- **Método**: GET
- **Descripción**: Obtiene las películas más populares
- **Respuesta**: Array de `TopMovie[]`

### `/api/movies/search?q={query}`
- **Método**: GET
- **Parámetros**: `q` (string) - Término de búsqueda
- **Descripción**: Busca películas por título
- **Respuesta**: Array de `QueryMovie[]`

### `/api/movies/info?id={movieId}`
- **Método**: GET
- **Parámetros**: `id` (string) - ID de IMDB
- **Descripción**: Información completa de una película
- **Respuesta**: Objeto `InfoMovie`

## 📊 Tipos de Datos

### TopMovie
```typescript
interface TopMovie {
  id?: string;
  poster?: string;
  top?: string;
  status?: {
    info: "up" | "down";
    number: string;
  };
  title?: string;
  year?: string;
  duration?: string;
  category?: string;
  rating?: string;
}
```

### QueryMovie
```typescript
interface QueryMovie {
  id?: string;
  poster?: string;
  title?: string;
  year?: string;
  type?: string;
  authors?: string[];
}
```

### InfoMovie
```typescript
interface InfoMovie {
  id?: string;
  title?: string;
  originalTitle?: string;
  year?: string;
  category?: string;
  duration?: string;
  rating?: string;
  peopleRating?: string;
  poster?: string;
  tags?: string[];
  synopsis?: string;
  trailer?: string;
  direction?: string;
  writers?: string[];
  actors?: string[];
}
```

## 🌐 Fuente de Datos

CineDB utiliza **IMDB** como fuente principal de datos a través de web scraping:

- **URL Base**: `https://www.imdb.com/es`
- **Top Movies**: `/chart/moviemeter/`
- **Búsqueda**: `/find?q={query}&s=tt&exact=true`
- **Info**: `/title/{id}`

Los datos se extraen utilizando Cheerio para parsear HTML y JSON-LD estructurado.

## 🚀 Despliegue

### Producción
1. **Construir la aplicación**
   ```bash
   pnpm build
   ```

2. **Iniciar el servidor**
   ```bash
   pnpm start
   ```

### Variables de Entorno
No se requieren variables de entorno adicionales para el funcionamiento básico.

## 🤝 Contribución

1. Fork el repositorio
2. Crea una rama para tu feature (`git checkout -b feature/nueva-caracteristica`)
3. Commit tus cambios (`git commit -am 'Agregar nueva característica'`)
4. Push a la rama (`git push origin feature/nueva-caracteristica`)
5. Crea un Pull Request

## 📝 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔮 Roadmap

- [ ] Implementar paginación en resultados de búsqueda
- [ ] Agregar filtros por género y año
- [ ] Sistema de favoritos con localStorage
- [ ] Integración con más fuentes de datos
- [ ] Modo claro/oscuro toggle
- [ ] Optimización de SEO
- [ ] Progressive Web App (PWA)
- [ ] Internacionalización (i18n)

## 📧 Contacto

Para preguntas, sugerencias o reportes de errores, por favor abre un issue en el repositorio.

---

**CineDB** - Descubre el mundo del cine de una manera moderna y elegante. 🎬✨
