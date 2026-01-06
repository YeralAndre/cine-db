"use client";

import GenreFilterCard from "@/components/GenreFilterCard";
import Loading from "@/components/Loading";
import TopCard from "@/components/TopCard";
import fetchAPI from "@/lib/fetchAPI";
import { Movie } from "@/types/movies";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [movies, setMovies] = useState<Movie[] | null>(null);
  const [selectedFilter, setSelectedFilter] = useState<string>("Todos");
  const [loading, setLoading] = useState<boolean>(true);

  const genres = [
    { id: null, name: "Todos" },
    { id: 28, name: "Acción" },
    { id: 35, name: "Comedia" },
    { id: 18, name: "Drama" },
    { id: 27, name: "Terror" },
    { id: 878, name: "Ciencia Ficción" },
    { id: 10749, name: "Romance" },
    { id: 53, name: "Suspenso" },
  ];

  useEffect(() => {
    const fetchMovies = async () => {
      setLoading(true);
      try {
        let response;
        if (selectedFilter === "Todos") {
          response = await fetchAPI("top");
        } else {
          response = await fetchAPI("discover", {
            with_genres: genres.find((x) => x.name === selectedFilter)?.id,
            language: "es-ES",
            sort_by: "popularity.desc",
          });
        }
        console.log("fetched");
        const data = response as Movie[];
        setMovies(data);
      } catch (error) {
        console.error("Error fetching movies:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchMovies();
  }, [selectedFilter]);
  return (
    <div className="w-full flex flex-col items-center justify-center text-white mt-15">
      <section className="flex flex-col items-center w-full gap-4 py-4 mt-8 min-h-full">
        <div className="flex flex-col items-center w-full" id="start">
          <h1 className="text-gradient font-semibold text-5xl my-4 leading-relaxed">
            Ranking de las Mejores Películas
          </h1>
          <p className="text-gray-400 text-xl font-regular text-center max-w-2xl">
            Descubre las películas más populares calificadas por la audiencia.
          </p>
          <span className="flex flex-row gap-2 items-center px-4 py-2 rounded-xl bg-gradient my-8 font-medium w-fit text-black">
            <Activity className="w-4 h-4" />
            Top Películas
          </span>
          <p className="text-gray-400 text-xl font-regular">Filtrar por:</p>
          <div className="flex flex-row flex-nowrap gap-4 py-2 mb-8 custom-scrollbar">
            {genres.map((genre, index) => (
              <GenreFilterCard
                key={index}
                name={genre.name}
                setSelectedFilter={setSelectedFilter}
                selected={selectedFilter === genre.name}
              />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col items-center">
          {loading ? (
            <Loading />
          ) : (
            movies?.map((movie) => <TopCard {...movie} key={movie.id} />)
          )}
        </div>
      </section>
    </div>
  );
}
