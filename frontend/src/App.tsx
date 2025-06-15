import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar";
import Home from "./pages/home";
import SearchPage from "./pages/search";
import InfoPage from "./pages/info";

export default function App() {
  return (
    <main className="w-full flex flex-col items-center justify-center text-white">
      <Navbar />
      <div className="bg-gray-700 h-[0.5px] w-full" />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/info/:id" element={<InfoPage />} />
      </Routes>
    </main>
  );
}
