"use client";
import { useEffect, useRef } from "react";
import { Footer, Header, PostDetail, Filter, PostList } from "@/components";
import { useSearchParams } from "next/navigation";
import { usePostStore } from "@/lib/stores";

export default function SearchPage() {
  const postDetail = usePostStore((store) => store.postDetail);
  const mainRef = useRef<HTMLElement | null>(null);
  const searchParams = useSearchParams();

  useEffect(() => {
    mainRef.current?.scrollTo({ top: 0, behavior: "smooth" });
  }, [searchParams]);

  return (
    <>
      <Header />

      <main ref={mainRef} className="relative top-[var(--header-height)] w-screen h-[calc(100vh_-_var(--header-height))] overflow-y-auto bg-sky-100 scrollbar-thin focus:outline-none">
        <div className="flex gap-x-6 px-5 items-start justify-center flex-col md:flex-row">
          <Filter />

          <section className="w-full max-w-[700px] flex-1 py-6 space-y-5 scroll-mt-0">
            <PostList />
          </section>

          <Footer />
        </div>
      </main>
      {postDetail && <PostDetail />}
    </>
  );
}
