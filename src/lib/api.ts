import * as cheerio from "cheerio";
import * as APIInterfaces from "@/types/movies";

async function fetchHtml(url: string): Promise<string> {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return await response.text();
}

async function topMovies(url: string): Promise<APIInterfaces.TopMovie[]> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const movies: APIInterfaces.TopMovie[] = [];

  $(".ipc-metadata-list")
    .children(".ipc-metadata-list-summary-item")
    .each((_, element) => {
      const data: APIInterfaces.TopMovie = {};
      data["poster"] = $(element)
        .find(".cli-poster-container")
        .find("img")
        .attr("src");
      const children = $(element).find(".cli-children");
      data["top"] = children
        .find(".cli-meter-title-header")
        .text()
        .split("(")[0]
        .trim();
      const status =
        children
          .find(".cli-meter-title-header")
          .find("span")
          .attr("aria-label")
          ?.toLowerCase() || "";
      data["status"] = {
        info: status.startsWith("subi") ? "up" : "down",
        number: status.split(" ")[1] || "0",
      };
      data["id"] =
        children.find(".ipc-title").find("a").attr("href")?.split("/")[3] ||
        undefined;
      data["title"] = children.find(".ipc-title").text().trim();
      const metadata = children
        .find(".cli-title-metadata")
        .children("span")
        .map((_, span) => $(span).text().trim())
        .get();
      data["year"] = metadata[0] || "";
      data["duration"] = metadata[1] || "";
      data["category"] = metadata[2] || "";
      data["rating"] =
        children.find(".ipc-rating-star--rating").text().trim() || "";
      movies.push(data);
    });

  return movies;
}

async function searchMovies(url: string): Promise<APIInterfaces.QueryMovie[]> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const movies: APIInterfaces.QueryMovie[] = [];

  $(".ipc-metadata-list")
    .children(".ipc-metadata-list-summary-item")
    .each((_, element) => {
      const data: APIInterfaces.QueryMovie = {};
      data["poster"] =
        $(element).find(".ipc-media img").attr("src")?.split("@")[0] + ".jpg" ||
        undefined;
      const children = $(element).find(".ipc-metadata-list-summary-item__c");
      data["id"] = children.find("a").attr("href")?.split("/")[3] || undefined;
      data["title"] = children.find("a").text().trim();
      const metadata = children.find("ul").map((_, ul) => $(ul));
      const specs = metadata[0]
        ?.find("li")
        ?.map((_, li) => $(li).text().trim())
        ?.get();
      data["year"] = specs[0] || undefined;
      data["type"] = specs[1] || undefined;
      data["authors"] =
        metadata[1]
          ?.text()
          ?.split(",")
          ?.map((x) => x.trim()) || [];
      if (data["authors"][0] === "") {
        data["authors"] = [];
      }
      movies.push(data);
    });

  return movies;
}

async function infoMovie(url: string): Promise<APIInterfaces.InfoMovie> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const element = $("script[type='application/ld+json']");
  const json = JSON.parse(element?.html?.() as string);

  const data: APIInterfaces.InfoMovie = {
    id: url.split("/")[5] || undefined,
    title: json.name || "",
    originalTitle: json.alternateName || "",
    year: json.datePublished?.split("-")[0] || "",
    category: Array.isArray(json.genre)
      ? json.genre.join(", ")
      : json.genre || "",
    duration:
      json.duration
        ?.replaceAll("PT", "")
        .replaceAll("M", "min")
        .replaceAll("H", "h ") || "",
    rating: json.aggregateRating?.ratingValue?.toString() || "",
    peopleRating: json.aggregateRating?.ratingCount?.toString() || "",
    poster: json.image || "",
    tags: Array.isArray(json.genre) ? json.genre : [],
    synopsis: json.description || "",
    trailer: json.trailer?.embedUrl || "",
    direction: Array.isArray(json.director)
      ? json.director.map((d: { name: string }) => d.name).join(", ")
      : json.director?.name || "",
    writers: (json.creator || [])
      .filter((c: { "@type": string }) => c["@type"] === "Person")
      .map((w: { name: string }) => w.name),
    actors: (json.actor || []).map((a: { name: string }) => a.name),
  };

  return data;
}

export default async function api(
  type: "top" | "search" | "info",
  query?: string
): Promise<
  | APIInterfaces.TopMovie[]
  | APIInterfaces.QueryMovie[]
  | APIInterfaces.InfoMovie
> {
  try {
    const baseUrl = "https://www.imdb.com/es";
    let url = "";
    switch (type) {
      case "top":
        url = `${baseUrl}/chart/moviemeter/`;
        return topMovies(url);
      case "search":
        if (!query) {
          throw new Error("Search query is required for 'search' type.");
        }
        url = `${baseUrl}/find?q=${encodeURIComponent(query)}&s=tt&exact=true`;
        return searchMovies(url);
      case "info":
        if (!query) {
          throw new Error("Movie ID is required for 'info' type.");
        }
        url = `${baseUrl}/title/${query}`;
        return infoMovie(url);
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
