import { Dispatch, SetStateAction } from "react";

export default function GenreFilterCard({
  name,
  selected,
  setSelectedFilter,
}: {
  name: string;
  selected: boolean;
  setSelectedFilter: Dispatch<SetStateAction<string>>;
}) {
  const stylesSelected = selected
    ? `border-transparent bg-linear-to-r from-amber-400 to-amber-600 text-black`
    : `border-gray-500 text-gray-300 hover:bg-gray-700 hover:text-gray-100`;
  return (
    <div
      className={`flex items-center px-3 py-2 bg-transparent border rounded-md font-semibold transition-colors duration-200 whitespace-nowrap cursor-pointer ${stylesSelected}`}
      onClick={() => setSelectedFilter(name)}
    >
      {name}
    </div>
  );
}
