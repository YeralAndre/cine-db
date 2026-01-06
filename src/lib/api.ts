import * as APIInterfaces from "@/types/movies";

const genreMap: {
  [key: number]: string;
} = {
  28: "Acción",
  12: "Aventura",
  16: "Animación",
  35: "Comedia",
  80: "Crimen",
  99: "Documental",
  18: "Drama",
  10751: "Familia",
  14: "Fantasía",
  36: "Historia",
  27: "Terror",
  10402: "Música",
  9648: "Misterio",
  10749: "Romance",
  878: "Ciencia ficción",
  10770: "Película de TV",
  53: "Suspenso",
  10752: "Bélica",
  37: "Western",
};

// Ejemplo: genre_ids [878, 12, 14] → "Ciencia ficción, Aventura, Fantasía"

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
    throw new Error(
      "TMDB_API_KEY no está configurada en las variables de entorno"
    );
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
 * Mapea a la interfaz Movie
 */
async function topMovies(): Promise<APIInterfaces.Movie[]> {
  const data = await fetchTMDB("/movie/popular?language=es-ES&page=1");
  const movies: APIInterfaces.Movie[] = [];

  data.results.forEach((movie: any, index: number) => {
    const movieData: APIInterfaces.Movie = {
      id: movie.id?.toString(),
      poster: buildPosterUrl(movie.poster_path),
      top: (index + 1).toString(), // Ranking basado en posición
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "",
      rating: movie.vote_average?.toFixed(1) || "",
      genres: movie.genre_ids
        ?.map((id: number) => genreMap[id])
        .filter((name: string | undefined) => name !== undefined) as string[],
      overview: movie.overview || "",
      adult: movie.adult || false,
    };
    movies.push(movieData);
  });

  return movies;
}

/**
 * Descubre películas por género
 * Mapea a la interfaz Movie (mismo formato que popular)
 */
async function discoverMovies(params: {
  with_genres: string;
  sort_by?: string;
  language?: string;
}): Promise<APIInterfaces.Movie[]> {
  const sortBy = params.sort_by || "popularity.desc";
  const language = params.language || "es-ES";
  const data = await fetchTMDB(
    `/discover/movie?with_genres=${params.with_genres}&sort_by=${sortBy}&language=${language}&page=1`
  );
  const movies: APIInterfaces.Movie[] = [];

  data.results.forEach((movie: any, index: number) => {
    const movieData: APIInterfaces.Movie = {
      id: movie.id?.toString(),
      poster: buildPosterUrl(movie.poster_path),
      top: (index + 1).toString(),
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "",
      rating: movie.vote_average?.toFixed(1) || "",
      genres: movie.genre_ids
        ?.map((id: number) => genreMap[id])
        .filter((name: string | undefined) => name !== undefined) as string[],
      overview: movie.overview || "",
      adult: movie.adult || false,
    };
    movies.push(movieData);
  });

  return movies;
}

/**
 * Obtiene películas recomendadas basadas en una película
 * Mapea a la interfaz Movie
 */
async function recommendedMovies(movieId: string): Promise<APIInterfaces.Movie[]> {
  const data = await fetchTMDB(`/movie/${movieId}/recommendations?language=es-ES&page=1`);
  const movies: APIInterfaces.Movie[] = [];

  data.results.forEach((movie: any, index: number) => {
    const movieData: APIInterfaces.Movie = {
      id: movie.id?.toString(),
      poster: buildPosterUrl(movie.poster_path),
      top: (index + 1).toString(),
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "",
      rating: movie.vote_average?.toFixed(1) || "",
      genres: movie.genre_ids
        ?.map((id: number) => genreMap[id])
        .filter((name: string | undefined) => name !== undefined) as string[],
      overview: movie.overview || "",
      adult: movie.adult || false,
    };
    movies.push(movieData);
  });

  return movies;
}

/**
 * Obtiene películas similares basadas en una película
 * Mapea a la interfaz Movie
 */
async function similarMovies(movieId: string): Promise<APIInterfaces.Movie[]> {
  const data = await fetchTMDB(`/movie/${movieId}/similar?language=es-ES&page=1`);
  const movies: APIInterfaces.Movie[] = [];

  data.results.forEach((movie: any, index: number) => {
    const movieData: APIInterfaces.Movie = {
      id: movie.id?.toString(),
      poster: buildPosterUrl(movie.poster_path),
      top: (index + 1).toString(),
      title: movie.title,
      year: movie.release_date?.split("-")[0] || "",
      rating: movie.vote_average?.toFixed(1) || "",
      genres: movie.genre_ids
        ?.map((id: number) => genreMap[id])
        .filter((name: string | undefined) => name !== undefined) as string[],
      overview: movie.overview || "",
      adult: movie.adult || false,
    };
    movies.push(movieData);
  });

  return movies;
}

/**
 * Busca películas por término de búsqueda
 * Mapea a la interfaz QueryMovie
 */
async function searchMovies(
  query: string
): Promise<APIInterfaces.QueryMovie[]> {
  const encodedQuery = encodeURIComponent(query);
  const data = await fetchTMDB(
    `/search/movie?query=${encodedQuery}&language=es-ES&page=1`
  );
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
 * @param type - Tipo de consulta: "top" | "search" | "info" | "discover" | "recommendations" | "similar"
 * @param query - Parámetro opcional: término de búsqueda, ID de película, o objeto con parámetros de discover
 * @returns Promise con array de películas o info de película individual
 */
export default async function api(
  type: "top" | "search" | "info" | "discover" | "recommendations" | "similar",
  query?: string | { with_genres: string; sort_by?: string; language?: string }
): Promise<
  | APIInterfaces.Movie[]
  | APIInterfaces.QueryMovie[]
  | APIInterfaces.InfoMovie
> {
  try {
    switch (type) {
      case "top":
        return await topMovies();

      case "search":
        if (!query || typeof query !== "string") {
          throw new Error("Search query is required for 'search' type.");
        }
        return await searchMovies(query);

      case "info":
        if (!query || typeof query !== "string") {
          throw new Error("Movie ID is required for 'info' type.");
        }
        return await infoMovie(query);

      case "discover":
        if (!query || typeof query === "string") {
          throw new Error("Discover params object is required for 'discover' type.");
        }
        return await discoverMovies(query);

      case "recommendations":
        if (!query || typeof query !== "string") {
          throw new Error("Movie ID is required for 'recommendations' type.");
        }
        return await recommendedMovies(query);

      case "similar":
        if (!query || typeof query !== "string") {
          throw new Error("Movie ID is required for 'similar' type.");
        }
        return await similarMovies(query);

      default:
        throw new Error(
          "Invalid type provided. Use 'top', 'search', 'info', 'discover', 'recommendations', or 'similar'."
        );
    }
  } catch (error) {
    console.error("Error fetching data from TMDB API:", error);
    throw error;
  }
}
