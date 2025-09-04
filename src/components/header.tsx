import Image from "next/image";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { GoBellFill, GoReply, GoSearch, GoX } from "react-icons/go";
import { useAuthStore } from "@/lib/stores";
import { useMutation } from "@tanstack/react-query";
import axios from "axios";
import Cookies from "js-cookie";
import { IUser } from "@/types";

export const Header = () => {
  const searchParams = useSearchParams();
  const [search, setSearch] = useState("");
  const [showMobileSearch, setShowMobileSearch] = useState(false);
  const user = useAuthStore((store) => store.user);
  const token = useAuthStore((store) => store.token);
  const login = useAuthStore((store) => store.login);
  const logout = useAuthStore((store) => store.logout);
  const searchRef = useRef<HTMLInputElement | null>(null);
  const router = useRouter();

  useEffect(() => {
    if (!user || !token) {
      const newToken = Cookies.get("token")!; // To access this page must have token
      // Extract user from token
      const getUser = (token: string): IUser => {
        return { id: "1", name: "admin", email: "admin@gmail.com", avatarUrl: "https://avatar.iran.liara.run/public/1" };
      };
      const newUser = getUser(newToken);
      login(newUser, newToken);
    }
  }, [user, token]);

  useEffect(() => {
    setSearch(searchParams.get("content") || "");
  }, [searchParams]);

  const updateSearch = (text: string) => {
    setSearch(text);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      searchPosts();
    }
  };

  const searchPosts = () => {
    const params = new URLSearchParams(searchParams.toString());
    if (search) {
      params.set("content", search);
    } else {
      params.delete("content");
    }
    router.push(`/search?${params.toString()}`);
  };

  const resetSearchText = () => {
    setSearch("");
    searchRef.current?.focus();
  };

  const logoutMutation = useMutation({
    mutationFn: async () => axios.post("/api/logout").then((res) => res.data),
  });

  const handleLogout = () => {
    logoutMutation.mutate();
    Cookies.remove("token");
    logout();
    router.push("/login");
  };

  const openMobileSearch = () => {
    setShowMobileSearch(true);
    requestAnimationFrame(() => {
      searchRef.current?.focus();
    });
  };

  return (
    <header className="bg-white w-screen h-[var(--header-height)] flex justify-center items-center px-5 gap-x-6 fixed shadow z-10">
      <div className={`max-w-[320px] grow ${showMobileSearch ? "hidden" : "block"} md:block`}>
        <Link href="/" className="font-bold text-2xl text-sky-700">
          SocialDan
        </Link>
      </div>

      <div className="max-w-[700px] flex-1 flex justify-center gap-x-3">
        <div className={`px-3 py-2 border rounded-lg border-neutral-300 focus-within:border-black flex-1 gap-2 items-center ${showMobileSearch ? "flex" : "hidden"} md:flex`}>
          <GoSearch />
          <input
            ref={searchRef}
            type="text"
            value={search}
            onChange={(e) => updateSearch(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Search content"
            className="outline-none flex-1 text-"
          />
          {search && (
            <button onClick={resetSearchText} className="bg-neutral-200 size-4 rounded-full grid place-items-center cursor-pointer">
              <GoX />
            </button>
          )}
        </div>
        {showMobileSearch && (
          <button onClick={() => setShowMobileSearch(false)} className="rounded-lg-full size-8 cursor-pointer md:hidden">
            <GoReply className="size-8 text-sky-700" />
          </button>
        )}
      </div>

      <div className={`max-w-[320px] grow gap-3 justify-end items-center ${showMobileSearch ? "hidden" : "flex"} md:flex`}>
        {!showMobileSearch && (
          <button onClick={() => openMobileSearch()} className="rounded-lg-full size-8 cursor-pointer md:hidden">
            <GoSearch className="size-8 text-sky-700" />
          </button>
        )}

        <button className="rounded-lg-full size-8 cursor-pointer">
          <GoBellFill className="size-8 text-sky-700" />
        </button>

        {user ? (
          <div className="dropdown dropdown-hover dropdown-bottom dropdown-end">
            <div tabIndex={0} className="p-0 border-transparent bg-transparent hover:bg-transparent active:bg-transparent focus:bg-transparent">
              <Image src={user?.avatarUrl ?? ""} width={32} height={32} alt="avatar" />
            </div>
            <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm">
              <li>
                <div onClick={handleLogout}>Lout out</div>
              </li>
            </ul>
          </div>
        ) : (
          <div className="size-8 rounded-full bg-neutral-300"></div>
        )}
      </div>
    </header>
  );
};
