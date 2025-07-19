import { ArrowDown, ArrowUp, Calendar, Clock, Minus, Star } from "lucide-react";
import type { JSX } from "react";

export default function TopCard({
  id,
  top,
  poster,
  status,
  title,
  year,
  duration,
  category,
  rating,
}: {
  id?: string;
  top?: string;
  poster?: string;
  status?: {
    info?: string;
    number?: string | null;
  };
  title?: string;
  year?: string;
  duration?: string;
  category?: string;
  rating?: string;
}) {
  const statusColor: {
    [x: string]: string;
  } = {
    up: "#22c55e",
    down: "#ef4444",
    none: "#9ca3af",
  };
  const statusIcon: {
    [x: string]: JSX.Element;
  } = {
    up: <ArrowUp className="w-2 h-2 text-green-500" />,
    down: <ArrowDown className="w-2 h-2 text-red-500" />,
    none: <Minus className="w-2 h-2 text-gray-500" />,
  };
  return (
    <div
      className="flex flex-row bg-gray-900 rounded-lg w-full max-w-3xl shadow-lg overflow-hidden mb-4 items-center gap-4 hover:scale-105 transition-transform duration-200 p-6 cursor-pointer"
      onClick={() => (window.location.href = `/info/${id}`)}
    >
      <div className="flex flex-row items-center justify-center gap-2 mr-4">
        <span className="text-amber-400 font-semibold text-lg">{top}</span>
        <div
          className="flex flex-row items-center gap-1 text-xs"
          style={{ color: statusColor[status?.info as string] }}
        >
          {statusIcon[status?.info as string]}
          {status?.info !== "none" && status?.number}
        </div>
      </div>
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-24 h-36 object-cover rounded-l-lg"
      />
      <div className="flex flex-col justify-between p-4 w-full">
        <div className="flex flex-row items-center justify-between w-full">
          <h3 className="text-white font-semibold text-lg">{title}</h3>
          <span className="font-semibold flex flex-row items-center gap-1 py-[1px] px-2 bg-gray-950 rounded-lg text-xs">
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
          <p className="text-gray-300 items-center text-sm">
            <Clock className="inline w-4 h-4 mr-1 mb-1" />
            {duration}
          </p>
          <p className="text-orange-400 items-center text-sm py-[1px] px-2 bg-orange-400/20 rounded-lg border border-orange-400/30">
            {category}
          </p>
        </div>
      </div>
    </div>
  );
}
