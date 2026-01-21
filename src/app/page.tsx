"use client";

import GenreFilterCard from "@/components/GenreFilterCard";
import Loading from "@/components/Loading";
import TopCardSkeleton from "@/components/skeletons/TopCard";
import TopCard from "@/components/TopCard";
import fetchAPI from "@/lib/fetchAPI";
import { Movie } from "@/types/movies";
import { Activity, Loader } from "lucide-react";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import MoviesInfoSections from "@/components/MoviesInfoSections";

export default function Home() {
  useEffect(() => {
    document.title = "Inicio | CineDB";
  }, []);

  const [movies, setMovies] = useState<Movie[]>([]);
  const [topRatedMovies, setTopRatedMovies] = useState<Movie[]>([]);
  const [nowPlayingMovies, setNowPlayingMovies] = useState<Movie[]>([]);
  const [upcomingMovies, setUpcomingMovies] = useState<Movie[]>([]);
  const [selectedFilter, setSelectedFilter] = useState<string>("Todos");
  const [loading, setLoading] = useState<boolean>(true);
  const [moreLoading, setMoreLoading] = useState<boolean>(false);
  const [topRatedMoviesLoading, setTopRatedMoviesLoading] =
    useState<boolean>(true);
  const [nowPlayingMoviesLoading, setNowPlayingMoviesLoading] =
    useState<boolean>(true);
  const [upcomingMoviesLoading, setUpcomingMoviesLoading] =
    useState<boolean>(true);
  const [page, setPage] = useState(1);

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
    const fetchCategories = async () => {
      try {
        setTopRatedMoviesLoading(true);
        setNowPlayingMoviesLoading(true);
        setUpcomingMoviesLoading(true);
        const [topRated, nowPlaying, upcoming] = await Promise.all([
          fetchAPI("top-rated"),
          fetchAPI("now-playing"),
          fetchAPI("upcoming"),
        ]);
        setTopRatedMovies(topRated as Movie[]);
        setNowPlayingMovies(nowPlaying as Movie[]);
        setUpcomingMovies(upcoming as Movie[]);
      } catch (_) {
        toast.warning("Ocurrió un error al cargar algunas películas.");
      } finally {
        setTopRatedMoviesLoading(false);
        setNowPlayingMoviesLoading(false);
        setUpcomingMoviesLoading(false);
      }
    };
    fetchCategories();
  }, []);

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
        const data = response as Movie[];
        setMovies(data);
      } catch (_) {
        toast.error("Error al cargar las películas. Inténtalo nuevamente.");
      } finally {
        setLoading(false);
      }
    };

    fetchMovies();
  }, [selectedFilter]);

  const loadMore = async () => {
    setMoreLoading(true);
    try {
      const data = (await fetchAPI("top", {
        page: page + 1,
      })) as Movie[];

      if (data.length === 0) {
        toast.info("No hay más películas disponibles.");
        setMoreLoading(false);
        return;
      }

      setMovies((prev) => {
        const newMovies = data.filter(
          ({ id }: Movie) => !prev.find((movie) => movie.id === id),
        );
        return [...prev, ...newMovies];
      });
      setPage(page + 1);
    } catch (_) {
      toast.error("Error al cargar las películas. Inténtalo nuevamente.");
    } finally {
      setMoreLoading(false);
    }
  };

  return (
    <div className="w-full flex flex-col items-center justify-center text-white mt-15">
      <section className="flex flex-col items-center w-full gap-4 py-4 mt-8 min-h-full">
        <div className="flex flex-col gap-4" id="start">
          {(topRatedMoviesLoading || topRatedMovies.length > 0) && (
            <MoviesInfoSections
              title="Mejor Calificadas"
              data={topRatedMovies as Movie[]}
              loading={topRatedMoviesLoading}
            />
          )}

          {(nowPlayingMoviesLoading || nowPlayingMovies.length > 0) && (
            <MoviesInfoSections
              title="Ahora en Cartelera"
              data={nowPlayingMovies as Movie[]}
              loading={nowPlayingMoviesLoading}
            />
          )}

          {(upcomingMoviesLoading || upcomingMovies.length > 0) && (
            <MoviesInfoSections
              title="Próximamente"
              data={upcomingMovies as Movie[]}
              loading={upcomingMoviesLoading}
            />
          )}
        </div>

        <div className="bg-gray-700 h-[0.5px] w-3/5 my-16" />

        <div className="flex flex-col items-center w-full">
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
        <div className="w-full flex flex-col items-center min-h-500">
          {loading ? (
            <>
              {[...Array(5)].map((_, i) => (
                <TopCardSkeleton key={i} />
              ))}
            </>
          ) : (
            movies?.map((movie, i) => (
              <TopCard {...movie} key={movie.id} top={(i + 1).toString()} />
            ))
          )}
        </div>
        {moreLoading ? (
          <div>
            <div className="my-8">
              <Loading disableMargin={true} />
            </div>
          </div>
        ) : (
          <button
            className="flex flex-row gap-2 items-center px-4 py-2 rounded-xl bg-gradient mb-4 font-medium w-fit text-black cursor-pointer"
            onClick={() => loadMore()}
          >
            <Loader className="w-4 h-4" />
            Cargar más
          </button>
        )}
      </section>
    </div>
  );
}
