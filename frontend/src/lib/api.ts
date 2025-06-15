import * as APIInterfaces from "../types/index.d";

export default async function api(
  type: "top" | "search" | "info",
  query?: string
): Promise<
  | APIInterfaces.TopMovie[]
  | APIInterfaces.QueryMovie[]
  | APIInterfaces.InfoMovie
> {
  try {
    const API_URL = import.meta.env.VITE_API_URL as string;
    switch (type) {
      case "top":
        return (await fetch(`${API_URL}/api/movies/top`)).json() as Promise<
          APIInterfaces.TopMovie[]
        >;
      case "search":
        if (!query) {
          throw new Error("Search query is required for 'search' type.");
        }
        return (
          await fetch(
            `${API_URL}/api/movies/search?q=${encodeURIComponent(query)}`,
            {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
              },
            }
          )
        ).json() as Promise<APIInterfaces.TopMovie[]>;
      case "info":
        if (!query) {
          throw new Error("Movie ID is required for 'info' type.");
        }
        const res = await fetch(
          `${API_URL}/api/movies/info?id=${encodeURIComponent(query)}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        if (!res.ok) {
          throw `Error fetching movie info: ${res.statusText}`;
        }
        return (await res.json()) as Promise<APIInterfaces.InfoMovie>;
      default:
        throw new Error(
          "Invalid type provided. Use 'top', 'search', or 'info'."
        );
    }
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}
