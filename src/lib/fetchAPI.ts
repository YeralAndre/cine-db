import * as APIInterfaces from "@/types/movies";

type FetchParams = Record<string, string | number | null | undefined>;

function buildQueryString(params: FetchParams): string {
  const entries = Object.entries(params)
    .filter(([_, value]) => value != null) // Remover null/undefined
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`);
  return entries.length > 0 ? `?${entries.join("&")}` : "";
}

export default async function fetchAPI(
  type:
    | "top"
    | "search"
    | "info"
    | "discover"
    | "recommendations"
    | "similar"
    | "top-rated"
    | "now-playing"
    | "upcoming",
  params?: string | FetchParams,
): Promise<
  APIInterfaces.Movie[] | APIInterfaces.QueryMovie[] | APIInterfaces.InfoMovie
> {
  try {
    switch (type) {
      case "top": {
        const queryString =
          typeof params === "object" ? buildQueryString(params) : "";
        return (await fetch(`/api/movies/top${queryString}`)).json() as Promise<
          APIInterfaces.Movie[]
        >;
      }
      case "discover": {
        if (!params || typeof params === "string") {
          throw new Error(
            "Discover requires params object with genre filters.",
          );
        }
        const queryString = buildQueryString(params);
        return (
          await fetch(`/api/movies/discover${queryString}`)
        ).json() as Promise<APIInterfaces.Movie[]>;
      }
      case "search": {
        if (!params) {
          throw new Error("Search query is required for 'search' type.");
        }
        const queryString =
          typeof params === "string"
            ? `?q=${encodeURIComponent(params)}`
            : buildQueryString(params);
        return (
          await fetch(`/api/movies/search${queryString}`)
        ).json() as Promise<APIInterfaces.QueryMovie[]>;
      }
      case "info": {
        if (!params) {
          throw new Error("Movie ID is required for 'info' type.");
        }
        const queryString =
          typeof params === "string"
            ? `?id=${encodeURIComponent(params)}`
            : buildQueryString(params);
        return (
          await fetch(`/api/movies/info${queryString}`)
        ).json() as Promise<APIInterfaces.InfoMovie>;
      }
      case "recommendations": {
        if (!params || typeof params !== "string") {
          throw new Error("Movie ID is required for 'recommendations' type.");
        }
        return (
          await fetch(
            `/api/movies/recommendations?id=${encodeURIComponent(params)}`,
          )
        ).json() as Promise<APIInterfaces.Movie[]>;
      }
      case "similar": {
        if (!params || typeof params !== "string") {
          throw new Error("Movie ID is required for 'similar' type.");
        }
        return (
          await fetch(`/api/movies/similar?id=${encodeURIComponent(params)}`)
        ).json() as Promise<APIInterfaces.Movie[]>;
      }
      case "top-rated": {
        return (await fetch(`/api/movies/top-rated`)).json() as Promise<
          APIInterfaces.Movie[]
        >;
      }
      case "now-playing": {
        return (await fetch(`/api/movies/now-playing`)).json() as Promise<
          APIInterfaces.Movie[]
        >;
      }
      case "upcoming": {
        return (await fetch(`/api/movies/upcoming`)).json() as Promise<
          APIInterfaces.Movie[]
        >;
      }
      default:
        throw new Error(
          "Invalid type provided. Use 'top', 'search', 'info', 'discover', 'recommendations', 'similar', 'top-rated', 'now-playing', or 'upcoming'.",
        );
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}
