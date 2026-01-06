import Image from "next/image";
import placeholder from "@/assets/placeholder.png";
import { Star } from "lucide-react";

export default function MoviesCard({
  id,
  poster,
  title,
  year,
  rating,
  genres,
  adult,
}: {
  id?: string;
  poster?: string;
  title?: string;
  year?: string;
  rating?: string;
  genres?: string[];
  adult?: boolean;
}) {
  const Genre = ({ genre }: { genre: string }) => {
    return (
      <span className="flex flex-row py-1 px-2 bg-transparent border rounded-xl border-gray-500 text-xs text-gray-300 font-medium hover:bg-yellow-400/20 hover:border-yellow-400 transition-all duration-200 cursor-default">
        {genre}
      </span>
    );
  };

  return (
    <div
      className="group flex flex-col relative items-start justify-start shrink-0 border bg-gray-900 border-gray-900 rounded-lg w-55 h-115 hover:border hover:border-yellow-400 hover:bg-gray-900/85 transition-all duration-250 cursor-pointer"
      onClick={() => (window.location.href = `/info/${id}`)}
    >
      <Image
        src={poster ? poster : placeholder}
        alt={`${title} poster.`}
        className="object-cover rounded-lg w-55 h-75"
        width={500}
        height={750}
      />
      <div className="flex flex-col w-full py-4 px-3">
        <h3 className="font-bold text-lg group-hover:text-gradient">
          {title && title.length > 30 ? `${title.substring(0, 30)}...` : title}
        </h3>
        <div className="flex flex-row gap-4">
          <p className="my-1 text-gray-400">{year}</p>
          {adult && (
            <span className="text-red-500 font-bold text-xs border border-red-500 px-2 py-1 rounded-lg text-center self-center">
              +18
            </span>
          )}
        </div>
        {genres && genres.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2 my-2">
            {genres.slice(0, 2).map((genre, index) => (
              <Genre key={index} genre={genre} />
            ))}
          </div>
        )}
        <span className="absolute top-2 right-2 font-semibold flex flex-row items-center gap-1 py-px px-2 bg-gray-950 rounded-lg text-xs w-fit">
          {!rating ? (
            <Star className="w-4 h4 text-gray-600 fill-gray-700" />
          ) : (
            <Star className="w-4 h4 text-yellow-300 fill-yellow-300" />
          )}
          {rating || "N/A"}
        </span>
      </div>
    </div>
  );
}
