"use client";

import { Movie } from "@/types/movies";
import Loading from "./Loading";
import MoviesCard from "./MoviesCard";

export default function MoviesInfoSections({
  title,
  subtitle,
  data,
  loading,
  classNameItems,
}: {
  title: string;
  subtitle?: string;
  data: Movie[];
  loading: boolean;
  classNameItems?: string;
}) {
  return (
    <div className="w-full max-w-5xl my-4">
      <h2 className="text-3xl font-semibold text-amber-400">{title}</h2>
      {subtitle && <p className="text-gray-300 mt-1">{subtitle}</p>}
      <div
        className={`flex flex-row flex-nowrap gap-4 items-center overflow-x-scroll custom-scrollbar w-full py-4 ${
          classNameItems ? classNameItems : ""
        }`}
      >
        {loading ? (
          <Loading />
        ) : (
          data?.map((x, index) => <MoviesCard key={index} {...x} />)
        )}
      </div>
    </div>
  );
}
