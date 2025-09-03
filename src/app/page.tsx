"use client";
import Image from "next/image";
import Link from "next/link";
import { Footer, FriendPanel, Header, PostDetail, PostList } from "@/components";
import { usePostStore } from "@/lib/stores";

export default function HomePage() {
  const postDetail = usePostStore((store) => store.postDetail);
  return (
    <>
      <Header />

      <main className="relative top-[var(--header-height)] w-screen h-[calc(100vh_-_var(--header-height))] overflow-y-auto bg-sky-100 scrollbar-thin">
        <div className="flex gap-x-6 px-5 items-start justify-center">
          <FriendPanel />

          <section className="max-w-[670px] flex-1 py-6 space-y-5">
            <div className="bg-white rounded-lg p-4 ">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Link href="#">
                    <Image src="https://avatar.iran.liara.run/public/10" width={48} height={48} alt="avatar" />
                  </Link>
                  <span>Welcome, Dan</span>
                </div>
                <button className="rounded-lg px-3 h-10 bg-sky-700 text-white cursor-pointer">Create Post</button>
              </div>
            </div>

            <PostList />
          </section>

          <Footer />
        </div>
      </main>

      {postDetail && <PostDetail />}
    </>
  );
}
