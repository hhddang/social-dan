"use client";
import { useEffect, useRef } from "react";
import { Footer, Header, Filter, PostList } from "@/components";
import { useSearchParams } from "next/navigation";

export default function SearchPage() {
  const mainRef = useRef<HTMLElement | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "instant" });
  }, [searchParams]);

  return (
    <>
      <Header />

      <main ref={mainRef} className="relative top-[var(--header-height)] w-screen h-[calc(100vh_-_var(--header-height))] overflow-y-auto bg-sky-100 scrollbar-thin focus:outline-none">
        <div className="flex gap-x-6 px-2 items-start justify-center flex-col md:flex-row">
          <Filter />

          <section className="w-full max-w-[700px] flex-1 py-6 space-y-5 scroll-mt-0">
            <PostList />
          </section>

          <Footer />
        </div>
      </main>
    </>
  );
}
