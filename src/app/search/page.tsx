"use client";

import { Frown, Search } from "lucide-react";
import { useEffect, useState } from "react";
import * as APIInterfaces from "@/types/movies";
import placeholder from "@/assets/placeholder.png";
import fetchAPI from "@/lib/fetchAPI";
import Image from "next/image";
import { toast } from "sonner";
import MoviesCardSkeleton from "@/components/skeletons/MoviesCard";

export default function SearchPage() {
  useEffect(() => {
    document.title = "Buscar Películas | CineDB";
  }, []);

  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    APIInterfaces.QueryMovie[]
  >([]);

  const search = async (query: string) => {
    if (!query.trim()) {
      toast.warning("Por favor, ingresa una película para buscar.");
      return;
    }
    fetchAPI("search", query)
      .then(
        (
          response:
            | APIInterfaces.Movie[]
            | APIInterfaces.QueryMovie[]
            | APIInterfaces.InfoMovie,
        ) => {
          if (Array.isArray(response) && response.length > 0) {
            setSearchResults(response as APIInterfaces.QueryMovie[]);
          } else {
            throw new Error("No se encontraron películas para tu búsqueda.", {
              cause: "Search",
            });
          }
        },
      )
      .catch((error: Error) => {
        if (error.cause == "Search") {
          toast.error(error.message);
        } else {
          toast.error("Error al buscar películas. Inténtalo nuevamente.");
        }
      })
      .finally(() => {
        setIsSearching(false);
      });
  };

  const BeforeSearch = () => {
    return (
      <>
        <Search className="w-16 h-16 text-gray-400 mt-8 animate-pulse" />
        <p className="text-gray-400 text-lg font-light text-center max-w-2xl mt-8">
          Ingrese una película para comenzar la búsqueda. <br />
          Por ejemplo:{" "}
          <span className="text-amber-400">&quot;Inception&quot;</span>,{" "}
          <span className="text-amber-400">&quot;The Matrix&quot;</span>, etc.
        </p>
      </>
    );
  };

  const AfterSearch = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl">
        {searchResults.length > 0 ? (
          <p className="text-gray-400 text-lg font-light text-center max-w-2xl my-8">
            Mostrando resultados para:{" "}
            <span className="text-amber-400">{searchQuery}</span>
          </p>
        ) : (
          <div className="text-gray-400 text-lg font-light text-center max-w-2xl my-8 flex flex-col items-center justify-center">
            <Frown className="w-16 h-16 text-gray-400 my-8" />
            <p>
              No encontramos películas para{" "}
              <span className="text-amber-400">
                &quot;{searchQuery.slice(0, 20)}&quot;
              </span>
            </p>
            ¡Intenta buscar con otro término!
          </div>
        )}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 w-full max-w-6xl">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center p-2 bg-gray-800 rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-200"
              onClick={() => (window.location.href = `/info/${movie.id}`)}
              aria-label={`Ver información de ${movie.title}`}
            >
              <div className="w-full aspect-2/3 mb-2 relative overflow-hidden rounded-lg">
                <Image
                  src={movie.poster ? movie.poster : placeholder}
                  alt={`${movie.title} poster`}
                  className="object-cover"
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <h3 className="text-sm font-semibold text-white text-center line-clamp-2">
                {movie.title}
              </h3>
              <p className="text-xs text-gray-400">{movie.year}</p>
              {movie.authors && (
                <p className="text-xs text-gray-500 text-center line-clamp-1">
                  {movie.authors.join(", ")}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      setIsSearching(true);
      setSearchQuery(inputValue);
      search(inputValue);
    }
  };

  return (
    <section className="flex flex-col items-center w-full min-h-screen gap-4 py-4 mt-24">
      <div className="flex flex-col items-center w-full" id="start">
        <h1 className="text-amber-400 font-semibold text-5xl my-4">
          Buscar Películas
        </h1>
        <p className="text-gray-400 text-lg font-light text-center max-w-2xl">
          Utiliza la barra de búsqueda para encontrar tus películas favoritas.
        </p>
        <div className="bg-gray-900 px-4 py-2 flex flex-row items-center gap-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors mt-8 max-w-1/3 w-full">
          <Search className="w-4 h-4" />
          <form onSubmit={handleSubmit} className="w-full">
            <input
              type="text"
              placeholder="Buscar película..."
              className="bg-transparent outline-none text-sm placeholder-gray-500 w-full"
              aria-label="Search"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isSearching}
              maxLength={25}
            />
          </form>
        </div>
        {isSearching && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 w-full max-w-6xl">
            {[...Array(12)].map((_, i) => (
              <MoviesCardSkeleton key={i} />
            ))}
          </div>
        )}
        {!isSearching && searchQuery && <AfterSearch />}
        {!isSearching && !searchQuery && <BeforeSearch />}
      </div>
    </section>
  );
}
