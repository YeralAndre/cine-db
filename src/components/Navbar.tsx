"use client";

import { ArrowLeft, Search } from "lucide-react";
import Image from "next/image";
import Logo from "@/assets/logo.png"
import { useEffect, useState } from "react";
import Link from "next/link";

export default function Navbar() {
  const [isHomePage, setIsHomePage] = useState<boolean>(false);

  useEffect(() => {
    const path = window.location.pathname;
    setIsHomePage(path === "/");
  }, []);

  const SearchInput = () => {
    return (
      <div className="bg-gray-900 px-4 py-2 flex flex-row items-center gap-2 rounded-lg text-gray-300 hover:bg-gray-800 transition-colors cursor-text">
        <Search className="w-4 h-4" />
        <Link
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
        </Link>
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
    <section className="fixed top-0 z-50 bg-gray-950/80 backdrop-blur-sm bg-opacity-95 w-full">
      <nav className="w-full p-4">
        <div className="container mx-auto flex justify-between items-center w-full">
          <a href={"/"}>
            <Image src={Logo} alt="logo" width={120} height={60}/>
          </a>
          <div className="flex flex-row items-center justify-between">
            {isHomePage ? <SearchInput /> : <BackHome />}
          </div>
        </div>
      </nav>
      <div className="bg-gray-700 h-[0.5px] w-full" />
    </section>
  );
}
