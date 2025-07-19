"use client";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import * as APIInterfaces from "@/types/movies";
import placeholder from "@/assets/placeholder.png";
import fetchAPI from "@/lib/fetchAPI";
import Image from "next/image";
import Loading from "@/components/Loading";

export default function SearchPage() {
  const [inputValue, setInputValue] = useState<string>("");
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [isSearching, setIsSearching] = useState<boolean>(false);
  const [searchResults, setSearchResults] = useState<
    APIInterfaces.QueryMovie[]
  >([]);

  const search = async (query: string) => {
    if (!query.trim()) {
      alert("Por favor, ingresa una película para buscar.");
      return;
    }
    console.log(`Buscando películas para: ${query}`);
    fetchAPI("search", query)
      .then(
        (
          response:
            | APIInterfaces.TopMovie[]
            | APIInterfaces.QueryMovie[]
            | APIInterfaces.InfoMovie
        ) => {
          console.log("Respuesta de la API:", response);
          if (Array.isArray(response) && response.length > 0) {
            console.log("Películas encontradas:", response);
            setSearchResults(response as APIInterfaces.QueryMovie[]);
          } else {
            alert("No se encontraron películas para tu búsqueda.");
          }
        }
      )
      .catch((error) => {
        console.error("Error al buscar películas:", error);
        alert(
          "Ocurrió un error al buscar películas. Por favor, inténtalo de nuevo."
        );
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
          Por ejemplo: &quot;Inception&quot;, &quot;The Matrix&quot;, etc.
        </p>
      </>
    );
  };

  const AfterSearch = () => {
    return (
      <div className="flex flex-col items-center justify-center w-full max-w-6xl">
        <p className="text-gray-400 text-lg font-light text-center max-w-2xl my-8">
          Mostrando resultados para:{" "}
          <span className="text-amber-400">{searchQuery}</span>
        </p>{" "}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-3 w-full max-w-6xl">
          {searchResults.map((movie) => (
            <div
              key={movie.id}
              className="flex flex-col items-center p-2 bg-gray-800 rounded-lg cursor-pointer hover:-translate-y-1 transition-transform duration-200"
              onClick={() => (window.location.href = `/info/${movie.id}`)}
              aria-label={`Ver información de ${movie.title}`}
            >
              <Image
                src={movie.poster ? movie.poster : placeholder}
                alt={`${movie.title} poster`}
                className="object-cover rounded-lg mb-2"
                width={100}
                height={150}
              />
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
    }
  };

  useEffect(() => {
    if (searchQuery !== "") {
      search(searchQuery);
    }
  }, [searchQuery]);

  return (
    <section className="flex flex-col items-center w-full h-screen gap-4 py-4 mt-8">
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
        {isSearching && <Loading />}
        {!isSearching && searchQuery && <AfterSearch />}
        {!isSearching && !searchQuery && <BeforeSearch />}
      </div>
    </section>
  );
}