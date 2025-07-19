export default function SearchResultCard({
  poster,
  title,
  year,
  authors,
}: {
  poster: string;
  title: string;
  year: string;
  type: string;
  authors?: string[];
}) {
  return (
    <div className="bg-gray-800 p-4 rounded-lg flex flex-col gap-2">
      <img
        src={poster}
        alt={`${title} poster`}
        className="w-full h-auto rounded-lg"
      />
      <h3 className="text-lg font-semibold text-white">{title}</h3>
      <p className="text-sm text-gray-400">{year}</p>
      {authors && <p className="text-sm text-gray-500">{authors.join(", ")}</p>}
    </div>
  );
}
