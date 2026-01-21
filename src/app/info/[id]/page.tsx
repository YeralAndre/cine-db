"use client";

import { use, useEffect, useState } from "react";
import type { InfoMovie, Movie } from "@/types/movies";
import fetchAPI from "@/lib/fetchAPI";
import placeholder from "@/assets/placeholder.svg";
import { Calendar, Clock, SquareArrowOutUpRight, Star } from "lucide-react";
import Image from "next/image";
import MoviesInfoSections from "@/components/MoviesInfoSections";
import { toast } from "sonner";
import MovieDetailsSkeleton from "@/components/skeletons/MovieDetails";

export default function InfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = use(params);
  const [movie, setMovie] = useState<InfoMovie | null>(null);
  const [similarMovies, setSimilarsMovies] = useState<Movie[] | null>();
  const [recommendedMovies, setRecommendedMovies] = useState<Movie[] | null>();
  const [loadingSimilarMovies, setLoadingSimilarMovies] =
    useState<boolean>(true);
  const [loadingRecommendedMovies, setLoadingRecommendedMovies] =
    useState<boolean>(true);

  useEffect(() => {
    async function fetchMovieInfo() {
      try {
        const data = (await fetchAPI("info", movieId)) as InfoMovie;
        setMovie(data);

        document.title = `${data.title} | CineDB`;
        document
          .querySelector?.('meta[name="description"]')
          ?.setAttribute("content", (data.synopsis as string) || "");
      } catch (_error) {
        toast.error("No se pudo cargar la información de la película.");
        setMovie(null);
      }
    }
    async function fetchSimilarMovies() {
      setLoadingSimilarMovies(true);
      try {
        const data = (await fetchAPI("similar", movieId)) as Movie[];
        setSimilarsMovies(data);
      } catch (_e) {
        setSimilarsMovies(null);
      } finally {
        setLoadingSimilarMovies(false);
      }
    }
    async function fetchRecommendedMovies() {
      setLoadingRecommendedMovies(true);
      try {
        const data = (await fetchAPI("recommendations", movieId)) as Movie[];
        setRecommendedMovies(data);
      } catch (_e) {
        setRecommendedMovies(null);
      } finally {
        setLoadingRecommendedMovies(false);
      }
    }
    fetchMovieInfo();
    fetchSimilarMovies();
    fetchRecommendedMovies();
  }, [movieId]);

  if (!movie) return <MovieDetailsSkeleton />;

  return (
    <div className="p-4 mb-10 mt-25 flex flex-col items-center gap-4 w-full mx-auto">
      <div className="flex flex-row gap-10 w-full max-w-5xl mx-auto mb-5">
        <Image
          src={movie.poster ? movie.poster : placeholder}
          alt={`${movie.title} poster`}
          className="object-cover rounded-lg w-auto h-150 shrink-0"
          height={600}
          width={400}
          loading="eager"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold text-amber-400">
            {movie.title}
          </h1>
          <p className="text-lg font-light text-gray-300 w-full my-2 text-justify">
            {movie.synopsis}
          </p>
          <div className="flex flex-row gap-8 items-center text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 text-yellow-400! fill-current" />
              <span className="font-bold text-white!">
                {movie.rating}
                <span className="font-medium! text-gray-300!">/10</span>
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-5 h-5 " />
              <span className=" font-medium">{movie.year}</span>
            </div>
            <div className="flex items-center gap-1">
              <Clock className="w-5 h-5" />
              <span className="font-medium">{movie.duration}</span>
            </div>
          </div>
          {movie.tags && movie.tags.length > 0 && (
            <div className="flex flex-wrap gap-2 mt-2">
              {movie.tags.map((tag, index) => (
                <span
                  key={index}
                  className="border border-yellow-300/30 bg-yellow-500/30 text-yellow-400 px-2 py-1 rounded-full text-md"
                >
                  {tag}
                </span>
              ))}
            </div>
          )}
          <div className="flex flex-col justify-center mt-3">
            {movie.direction && (
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <span className="font-semibold text-lg text-amber-400">
                  Dirección:
                </span>
                <span className="font-medium">{movie.direction}</span>
              </div>
            )}
            {movie.writers && movie.writers.length > 0 && (
              <div className="flex flex-row items-start gap-2 w-full text-gray-300 mb-4">
                <span className="font-semibold text-lg text-amber-400 shrink-0">
                  Guionistas:
                </span>
                <span className="font-medium">{movie.writers.join(", ")}</span>
              </div>
            )}
            {movie.actors && movie.actors.length > 0 && (
              <div className="flex flex-row w-full gap-2 text-gray-300 mb-4">
                <span className="font-semibold text-lg text-amber-400 shrink-0">
                  Elenco:
                </span>
                <span className="font-medium">{movie.actors.join(", ")}</span>
              </div>
            )}
          </div>
          <div className="flex flex-row w-full items-center justify-center">
            <a
              href={`https://www.themoviedb.org/movie/${movieId}`}
              target="_blank"
              className="flex flex-row gap-4 items-center bg-gradient px-4 py-3 rounded-md text-black"
            >
              <SquareArrowOutUpRight className="w-5 h-5 mt-1" />
              <span className="font-bold">Ver en TMDB</span>
            </a>
          </div>
        </div>
      </div>
      <div className="w-full max-w-5xl">
        <h2 className="text-3xl font-semibold text-amber-400 mb-4">Trailer</h2>
        {movie.trailer ? (
          <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
            <iframe
              src={movie.trailer}
              className="absolute top-0 left-0 w-full h-full rounded-lg"
              allowFullScreen
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            ></iframe>
          </div>
        ) : (
          <div className="flex flex-row items-center justify-center">
            <p className="text-gray-400 text-lg font-light text-center max-w-2xl my-8">
              No encontramos un trailer para esta película.
            </p>
          </div>
        )}
      </div>
      <div className="bg-gray-700 h-[0.5px] w-3/5 my-8" />
      {similarMovies && similarMovies.length > 0 && (
        <MoviesInfoSections
          title="¿Te gustó la película?"
          subtitle="Prueba con estas entregas:"
          data={similarMovies as Movie[]}
          loading={loadingSimilarMovies}
        />
      )}
      {recommendedMovies && recommendedMovies.length > 0 && (
        <MoviesInfoSections
          title="También te pueden interesar"
          data={recommendedMovies as Movie[]}
          loading={loadingRecommendedMovies}
        />
      )}
    </div>
  );
}
