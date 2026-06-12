import Link from "next/link";
import { Search, ShoppingCart, User } from "lucide-react";
import { Input } from "@/components/ui/input";
import Navbar from "./Navbar";

const Header = () => {
  return (
    <header className="border-b bg-white">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 lg:px-0">
        <Link
          href="/"
          className="text-2xl font-bold lg:text-3xl"
        >
          <span className="text-[#143447]">Shop</span>
          <span className="text-[#FF0763]">Sphere</span>
        </Link>

        <div className="hidden w-full max-w-xl items-center gap-2 md:flex">
          <div className="relative flex-1">
            <Search
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />

            <Input
              placeholder="Search products..."
              className="h-11 rounded-full border-gray-200 pl-10 pr-4 shadow-none focus-visible:ring-1 focus-visible:ring-[#FF0763]"
            />
          </div>

          <button className="flex h-11 items-center gap-2 rounded-full bg-[#FF0763] px-5 font-medium text-white transition hover:opacity-90">
            <Search size={18} />
            Search
          </button>
        </div>

        <div className="flex items-center gap-5">
          <button className="relative transition hover:text-[#FF0763]">
            <User size={24} />
          </button>

          <button className="relative transition hover:text-[#FF0763]">
            <ShoppingCart size={24} />

            <span className="absolute -right-2 -top-2 flex h-5 w-5 items-center justify-center rounded-full bg-[#FF0763] text-xs text-white">
              0
            </span>
          </button>
        </div>
          </div>
          <Navbar />
    </header>
  );
};

export default Header;