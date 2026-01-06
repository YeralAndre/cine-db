import { Calendar, Star } from "lucide-react";
import Image from "next/image";

export default function TopCard({
  id,
  top,
  poster,
  title,
  year,
  rating,
  genres,
  overview,
  adult,
}: {
  id?: string;
  top?: string;
  poster?: string;
  title?: string;
  year?: string;
  rating?: string;
  genres?: string[];
  overview?: string;
  adult?: boolean;
}) {
  const Genre = ({ genre }: { genre: string }) => {
    return (
      <span className="flex flex-row py-1 px-2 bg-transparent border rounded-xl border-gray-500 text-sm text-gray-300 font-medium hover:bg-yellow-400/20 hover:border-yellow-400 transition-all duration-200 cursor-default">
        {genre}
      </span>
    );
  };

  return (
    <div
      className="group flex flex-row bg-gray-900 rounded-lg w-full max-w-3xl shadow-lg overflow-hidden mb-4 items-center gap-4 border-[0.5px] border-gray-800 hover:border hover:border-yellow-400 hover:bg-gray-900/85 transition-all duration-250 p-6 cursor-pointer"
      onClick={() => (window.location.href = `/info/${id}`)}
    >
      <div className="flex flex-row items-center justify-center mr-4">
        <span className="text-amber-400 font-bold text-3xl">{top}</span>
      </div>
      <Image
        src={poster ? poster : "/placeholder.svg"}
        alt={`${title} poster`}
        className="object-cover rounded-l-lg"
        width={96}
        height={144}
      />
      <div className="flex flex-col justify-between p-4 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h3 className="group-hover:text-gradient text-white font-semibold text-xl transition-none">
            {title}
          </h3>
          <span className="font-semibold flex flex-row items-center gap-1 py-px px-2 bg-gray-950 rounded-lg text-xs">
            {!rating ? (
              <Star className="w-4 h4 text-gray-600 fill-gray-700" />
            ) : (
              <Star className="w-4 h4 text-yellow-300 fill-yellow-300" />
            )}
            {rating || "N/A"}
          </span>
        </div>
        {overview && (
          <p className="text-gray-400 my-1">{overview?.slice(0, 100)}...</p>
        )}
        <div className="flex flex-row items-center gap-4 my-3">
          <p className="text-gray-300 items-center text-sm font-semibold">
            <Calendar className="inline w-4 h-4 mr-1 mb-1" />
            {year}
          </p>
          {adult && (
            <span className="text-red-500 font-bold text-sm border border-red-500 px-2 py-1 rounded-lg">
              +18
            </span>
          )}
        </div>
        {genres && genres.length > 0 && (
          <div className="flex flex-row flex-wrap gap-2">
            {genres.map((genre, index) => (
              <Genre key={index} genre={genre} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
