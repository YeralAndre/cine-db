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
        $(element).find(".ipc-media img").attr("src") || undefined;
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
/*
async function infoMovieV1(url: string): Promise<APIInterfaces.InfoMovie> {
  const html = await fetchHtml(url);
  const $ = cheerio.load(html);
  const data: APIInterfaces.InfoMovie = {};

  const element = $("[data-testid='hero-parent']");
  data["id"] = url.split("/")[5] || undefined;
  data["title"] = element.find(".hero__primary-text").text().trim();
  data["originalTitle"] =
    element.find(".sc-cb6a22b2-1").text().trim().split(": ")[1] || "";
  const metadata = element
    .find(".sc-cb6a22b2-2")
    .find("li")
    .map((_, li) => $(li).text().trim())
    .get();
  data["year"] = metadata[0] || "";
  data["category"] = metadata[1] || "";
  data["duration"] = metadata[2] || "";

  const ratingElement = element.find(".sc-8e956c5c-0").find(".sc-8e956c5c-1");
  data["rating"] =
    ratingElement.find(".sc-4dc495c1-0").find("div").first().text().trim() ||
    "";
  data["peopleRating"] =
    ratingElement.find(".sc-4dc495c1-0").find("div").last().text().trim() || "";

  const popularityElement = ratingElement.last().find(".sc-9d3bc82f-3");
  data["popularity"] = {
    top: popularityElement.find(".sc-c5358bb8-1").text().trim() || "",
    status: {
      info: popularityElement
        .find("[data-testid^='hero-rating-bar__popularity__']")
        .attr("data-testid")
        ?.endsWith("up")
        ? "up"
        : "down",
      number: popularityElement.find(".sc-c5358bb8-2").text().trim() || "0",
    },
  };

  data["poster"] =
    element
      .find(".sc-42c2285c-5")
      .find("img")
      .attr("srcset")
      ?.split(" ")
      .reverse()
      .slice(1)
      .shift() || "";

  const descElement = element.find(".sc-42c2285c-10");
  data["tags"] = descElement
    .find(".ipc-chip-list__scroller")
    .find("a")
    .map((_, a) => $(a).text().trim())
    .get();
  data["synopsis"] = descElement.find("p").find(".sc-e32edc92-2").text().trim();
  data["trailer"] =
    "https://www.imdb.com" +
      $("[data-testid='videos-slate-overlay-1']").attr("href") || "";

  element
    .find(".sc-42c2285c-10")
    .find(".ipc-metadata-list")
    .find("[data-testid='title-pc-principal-credit']")
    .map((_, li) => {
      switch (_) {
        case 0:
          data["direction"] = $(li).find("div").text().trim();
          break;
        case 1:
          data["writers"] = $(li)
            .find("div")
            .find("ul")
            .find("li")
            .map((_, li) => $(li).text().trim())
            .get();
          break;
        case 2:
          data["actors"] = $(li)
            .find("div")
            .find("ul")
            .find("li")
            .map((_, li) => $(li).text().trim())
            .get();
          break;
      }
    });
  return data;
}
*/
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
    duration: json.duration?.replaceAll("PT", "").replaceAll("M", "min").replaceAll("H", "h ") || "",
    rating: json.aggregateRating?.ratingValue?.toString() || "",
    peopleRating: json.aggregateRating?.ratingCount?.toString() || "",
    poster: json.image || "",
    tags: Array.isArray(json.genre) ? json.genre : [],
    synopsis: json.description || "",
    trailer: json.trailer?.embedUrl || "",
    direction: Array.isArray(json.director)
      ? json.director.map((d: any) => d.name).join(", ")
      : json.director?.name || "",
    writers: (json.creator || [])
      .filter((c: any) => c["@type"] === "Person")
      .map((w: any) => w.name),
    actors: (json.actor || []).map((a: any) => a.name),
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


function normalizeDuration(input: string): string {
  const match = input.match(/(\d+)\s*h\s*(\d+)/i) || input.match(/(\d+)[hH]\s*(\d+)[mM]?/);
  if (!match) return input;
  const hours = parseInt(match[1]);
  const minutes = parseInt(match[2]);
  return `${hours}h ${minutes}m`;
}