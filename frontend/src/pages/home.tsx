import { Activity } from "lucide-react";
import TopCard from "../components/TopCard";
import type { TopMovie } from "../types";
import { useEffect, useState } from "react";
import api from "../lib/api";

export default function HomePage() {
  const [topMovies, setTopMovies] = useState<TopMovie[] | null>(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await api("top");
        const data = response as TopMovie[];
        setTopMovies(data);
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    }
    fetchTopMovies();
  }, []);

  if (!topMovies) {
    return (
      <div className="flex items-center justify-center mt-32">
        <div className="flex space-x-2">
          <div className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"></div>
          <div
            className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-4 h-4 bg-gray-400 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    );
  }
  
  return (
    <section className="flex flex-col items-center w-full h-screen gap-4 py-4 mt-8">
      <div className="flex flex-col items-center w-full" id="start">
        <h1 className="text-amber-400 font-semibold text-5xl my-4">
          Top de Películas
        </h1>
        <p className="text-gray-400 text-lg font-light text-center max-w-2xl">
          Descubre las películas más populares calificadas por la audiencia.
        </p>
        <button className="flex flex-row gap-2 items-center px-4 py-2 rounded-xl bg-amber-500 my-8 cursor-pointer hover:scale-105 transition-transform duration-200">
          <Activity className="w-4 h-4" />
          Top Películas
        </button>
        {topMovies.map((movie) => (
          <TopCard {...movie} />
        ))}
      </div>
    </section>
  );
}
