import { Calendar, Star } from "lucide-react";
import Image from "next/image";
import type { JSX } from "react";

export default function TopCard({
  id,
  top,
  poster,
  title,
  year,
  rating,
}: {
  id?: string;
  top?: string;
  poster?: string;
  title?: string;
  year?: string;
  rating?: string;
}) {
  return (
    <div
      className="flex flex-row bg-gray-900 rounded-lg w-full max-w-3xl shadow-lg overflow-hidden mb-4 items-center gap-4 hover:scale-105 transition-transform duration-200 p-6 cursor-pointer"
      onClick={() => (window.location.href = `/info/${id}`)}
    >
      <div className="flex flex-row items-center justify-center mr-4">
        <span className="text-amber-400 font-semibold text-lg">{top}</span>
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
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <span className="font-semibold flex flex-row items-center gap-1 py-px px-2 bg-gray-950 rounded-lg text-xs">
            {!rating ? (
              <Star className="w-4 h4 text-gray-600 fill-gray-700" />
            ) : (
              <Star className="w-4 h4 text-yellow-300 fill-yellow-300" />
            )}
            {rating || "N/A"}
          </span>
        </div>
        <div className="flex flex-row items-center gap-4">
          <p className="text-gray-300 items-center text-sm">
            <Calendar className="inline w-4 h-4 mr-1 mb-1" />
            {year}
          </p>
        </div>
      </div>
    </div>
  );
}
