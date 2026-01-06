import * as APIInterfaces from "@/types/movies";

// ============================================
// TMDB API CONFIGURATION
// ============================================
const TMDB_BASE_URL = "https://api.themoviedb.org/3";
const TMDB_IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";
const TMDB_API_KEY = process.env.TMDB_API_KEY;

// ============================================
// HELPER FUNCTIONS
// ============================================

/**
 * Construye la URL completa del poster usando el path de TMDB
 */
function buildPosterUrl(path: string | null): string | undefined {
  if (!path) return undefined;
  return `${TMDB_IMAGE_BASE_URL}${path}`;
}

/**
 * Construye la URL de YouTube embed para el trailer
 */
function buildTrailerUrl(key: string | null): string | undefined {
  if (!key) return undefined;
  return `https://www.youtube.com/embed/${key}`;
}

/**
 * Convierte minutos a formato "Xh Ymin"
 * Ejemplo: 148 → "2h 28min"
 */
function formatRuntime(minutes: number | null): string {
  if (!minutes) return "";
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours === 0) return `${mins}min`;
  if (mins === 0) return `${hours}h`;
  return `${hours}h ${mins}min`;
}

/**
 * Realiza una petición a la API de TMDB con autenticación
 */
async function fetchTMDB(endpoint: string): Promise<any> {
  if (!TMDB_API_KEY) {
    throw new Error("TMDB_API_KEY no está configurada en las variables de entorno");
  }

  const url = `${TMDB_BASE_URL}${endpoint}`;
  const response = await fetch(url, {
    headers: {
      Authorization: `Bearer ${TMDB_API_KEY}`,
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`TMDB API error! status: ${response.status}`);
  }

  return await response.json();
}

// ============================================
// MAIN FUNCTIONS
// ============================================

/**
 * Obtiene las películas populares de TMDB
 * Mapea a la interfaz TopMovie
 */
async function topMovies(): Promise<APIInterfaces.TopMovie[]> {
  const data = await fetchTMDB("/movie/popular?language=es-ES&page=1");
  const movies: APIInterfaces.TopMovie[] = [];

  data.results.forEach((movie: any, index: number) => {
    const topMovie: APIInterfaces.TopMovie = {
      id: movie.id?.toString(),
      poster: buildPosterUrl(movie.poster_path),
      top: (index + 1).toString(), // Ranking basado en posición
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "",
      rating: movie.vote_average?.toFixed(1) || "",
    };
    movies.push(topMovie);
  });

  return movies;
}

/**
 * Busca películas por término de búsqueda
 * Mapea a la interfaz QueryMovie
 */
async function searchMovies(query: string): Promise<APIInterfaces.QueryMovie[]> {
  const encodedQuery = encodeURIComponent(query);
  const data = await fetchTMDB(`/search/movie?query=${encodedQuery}&language=es-ES&page=1`);
  const movies: APIInterfaces.QueryMovie[] = [];

  // Para obtener authors necesitaríamos llamar credits por cada película
  // Por performance, solo incluimos datos básicos de la búsqueda
  data.results.forEach((movie: any) => {
    const queryMovie: APIInterfaces.QueryMovie = {
      id: movie.id?.toString(),
      poster: buildPosterUrl(movie.poster_path),
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "",
      type: "movie", // TMDB search siempre es movie en este endpoint
      authors: [], // Requeriría llamada adicional a /movie/{id}/credits
    };
    movies.push(queryMovie);
  });

  return movies;
}

/**
 * Obtiene información detallada de una película específica
 * Usa append_to_response para obtener videos y credits en una sola llamada
 * Mapea a la interfaz InfoMovie
 */
async function infoMovie(movieId: string): Promise<APIInterfaces.InfoMovie> {
  // Una sola llamada con append_to_response para optimizar
  const data = await fetchTMDB(
    `/movie/${movieId}?language=es-ES&append_to_response=videos,credits`
  );

  // Extraer trailer de YouTube
  let trailerUrl: string | undefined;
  if (data.videos?.results) {
    const trailer = data.videos.results.find(
      (video: any) => video.type === "Trailer" && video.site === "YouTube"
    );
    trailerUrl = buildTrailerUrl(trailer?.key);
  }

  // Extraer director de los credits
  let director = "";
  if (data.credits?.crew) {
    const directorData = data.credits.crew.find(
      (person: any) => person.job === "Director"
    );
    director = directorData?.name || "";
  }

  // Extraer escritores de los credits
  let writers: string[] = [];
  if (data.credits?.crew) {
    writers = data.credits.crew
      .filter((person: any) => person.department === "Writing")
      .map((person: any) => person.name)
      .slice(0, 5); // Limitar a 5 escritores principales
  }

  // Extraer actores principales
  let actors: string[] = [];
  if (data.credits?.cast) {
    actors = data.credits.cast
      .slice(0, 10) // Top 10 actores
      .map((actor: any) => actor.name);
  }

  // Construir objeto InfoMovie
  const infoMovie: APIInterfaces.InfoMovie = {
    id: data.id?.toString(),
    title: data.title || "",
    originalTitle: data.original_title || "",
    year: data.release_date?.split("-")[0] || "",
    category: data.genres?.map((g: any) => g.name).join(", ") || "",
    duration: formatRuntime(data.runtime),
    rating: data.vote_average?.toFixed(1) || "",
    peopleRating: data.vote_count?.toString() || "",
    poster: buildPosterUrl(data.poster_path),
    tags: data.genres?.map((g: any) => g.name) || [],
    synopsis: data.overview || "",
    trailer: trailerUrl,
    direction: director,
    writers: writers,
    actors: actors,
  };

  return infoMovie;
}

// ============================================
// EXPORTED API FUNCTION
// ============================================

/**
 * Función principal de la API
 * Mantiene la misma firma que la versión original con IMDB scraping
 * 
 * @param type - Tipo de consulta: "top" | "search" | "info"
 * @param query - Parámetro opcional: término de búsqueda o ID de película
 * @returns Promise con array de películas o info de película individual
 */
export default async function api(
  type: "top" | "search" | "info",
  query?: string
): Promise<
  | APIInterfaces.TopMovie[]
  | APIInterfaces.QueryMovie[]
  | APIInterfaces.InfoMovie
> {
  try {
    switch (type) {
      case "top":
        return await topMovies();
      
      case "search":
        if (!query) {
          throw new Error("Search query is required for 'search' type.");
        }
        return await searchMovies(query);
      
      case "info":
        if (!query) {
          throw new Error("Movie ID is required for 'info' type.");
        }
        return await infoMovie(query);
      
      default:
        throw new Error(
          "Invalid type provided. Use 'top', 'search', or 'info'."
        );
    }
  } catch (error) {
    console.error("Error fetching data from TMDB API:", error);
    throw error;
  }
}
