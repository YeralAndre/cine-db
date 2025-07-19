"use client";

import { use, useEffect, useState } from "react";
import type { InfoMovie } from "@/types/movies";
import fetchAPI from "@/lib/fetchAPI";
import placeholder from "@/assets/placeholder.svg";
import { Calendar, Clock, Star } from "lucide-react";
import Loading from "@/components/Loading";

export default function InfoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: movieId } = use(params);
  const [movie, setMovie] = useState<InfoMovie | null>(null);

  useEffect(() => {
    async function fetchMovieInfo() {
      try {
        const data = (await fetchAPI("info", movieId)) as InfoMovie;
        console.log(data);
        setMovie(data);
      } catch (error) {
        console.error("Failed to fetch movie info:", error);
        setMovie(null);
      }
    }
    fetchMovieInfo();
  }, [movieId]);

  if (!movie) return <Loading />;

  return (
    <div className="p-4 my-10 flex flex-col items-center gap-4 w-full mx-auto">
      <div className="flex flex-row gap-10 w-1/2 mx-auto mb-5">
        <img
          src={movie.poster ? movie.poster : placeholder}
          alt={`${movie.title} poster`}
          className="h-[400px] object-cover rounded-lg"
        />
        <div className="flex flex-col gap-2">
          <h1 className="text-5xl font-semibold text-amber-400">
            {movie.title}
          </h1>
          <p className="text-lg font-light text-gray-300 w-full my-2">
            {movie.synopsis}
          </p>
          <div className="flex flex-row gap-2 items-center text-gray-300">
            <div className="flex items-center gap-1">
              <Star className="w-5 h-5 !text-yellow-400 fill-current" />
              <span className="font-bold !text-white">
                {movie.rating}
                <span className="!font-medium !text-gray-300">/10</span>
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
                  className="border border-yellow-300/30 bg-yellow-500/30 text-yellow-400 px-2 py-1 rounded-full text-xs"
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
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <span className="font-semibold text-lg text-amber-400">
                  Guionistas:
                </span>
                <span className="font-medium">{movie.writers.join(", ")}</span>
              </div>
            )}
            {movie.actors && movie.actors.length > 0 && (
              <div className="flex items-center gap-2 text-gray-300 mb-2">
                <span className="font-semibold text-lg text-amber-400">
                  Elenco:
                </span>
                <span className="font-medium">{movie.actors.join(", ")}</span>
              </div>
            )}
          </div>
        </div>
      </div>
      {movie.trailer && (
        <iframe
          src={
            "https://www.imdb.com/es/video/embed/" +
            movie.trailer?.split("/")[5]
          }
          width={"1080px"}
          height={"720px"}
          allowFullScreen={true}
        ></iframe>
      )}
    </div>
  );
}
