import { ArrowLeft, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Navbar() {
  const [isHomePage, setIsHomePage] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsHomePage(path === "/");
  }, []);

  const SearchInput = () => {
    return (
      <div className="bg-gray-900 px-4 py-2 flex flex-row items-center gap-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors">
        <Search className="w-4 h-4" />
        <a
          href={"/search"}
          className="pointer-none"
          onClick={() => setIsHomePage(false)}
        >
          <input
            type="text"
            placeholder="Buscar película..."
            className="bg-transparent outline-none text-sm placeholder-gray-500"
            aria-label="Search"
          />
        </a>
      </div>
    );
  };

  const BackHome = () => {
    return (
      <a
        href={"/"}
        className="text-gray-400 hover:text-amber-400 transition-colors flex flex-row gap-2"
        aria-label="Back to home"
      >
        <ArrowLeft className="w-6 h-6" />
        <p>Regresar al inicio</p>
      </a>
    );
  };
  return (
    <nav className="w-full p-4">
      <div className="container mx-auto flex justify-between items-center w-full">
        <Link to={"/"} className="text-amber-400 text-lg font-bold">
          CineDB
        </Link>
        <div className="flex flex-row items-center justify-between">
          {isHomePage ? <SearchInput /> : <BackHome />}
        </div>
      </div>
    </nav>
  );
}
