"use client";

import Loading from "@/components/Loading";
import Navbar from "@/components/Navbar";
import TopCard from "@/components/TopCard";
import fetchAPI from "@/lib/fetchAPI";
import { TopMovie } from "@/types/movies";
import { Activity } from "lucide-react";
import { useEffect, useState } from "react";

export default function Home() {
  const [topMovies, setTopMovies] = useState<TopMovie[] | null>(null);

  useEffect(() => {
    const fetchTopMovies = async () => {
      try {
        const response = await fetchAPI("top");
        const data = response as TopMovie[];
        setTopMovies(data);
      } catch (error) {
        console.error("Error fetching top movies:", error);
      }
    };
    fetchTopMovies();
  }, []);
  return (
    <main className="w-full flex flex-col items-center justify-center text-white">
      <div className="bg-gray-700 h-[0.5px] w-full" />
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
          {!topMovies ? (
            <Loading />
          ) : (
            topMovies?.map((movie) => <TopCard {...movie} key={movie.id} />)
          )}
        </div>
      </section>
    </main>
  );
}
