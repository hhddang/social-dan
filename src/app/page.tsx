"use client";
import { Avatar, Footer, FriendPanel, Header, PostDetail, PostList } from "@/components";
import { useAuthStore, usePostStore } from "@/lib/stores";

export default function HomePage() {
  const user = useAuthStore((store) => store.user);
  const postDetail = usePostStore((store) => store.postDetail);
  return (
    <>
      <Header />

      <main className="relative top-[var(--header-height)] w-screen h-[calc(100vh_-_var(--header-height))] overflow-y-auto bg-sky-100 scrollbar-thin">
        <div className="flex gap-x-6 px-5 items-start justify-center">
          <FriendPanel />

          <section className="w-full max-w-[700px] flex-1 py-6 space-y-5">
            {user && (
              <div className="bg-white rounded-lg p-4 ">
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-x-3">
                    <Avatar url={user.avatarUrl} />
                    <span>Welcome, {user.name}</span>
                  </div>
                  <button className="rounded-lg px-3 h-10 bg-sky-700 text-white cursor-pointer">Create Post</button>
                </div>
              </div>
            )}

            <PostList />
          </section>

          <Footer />
        </div>
      </main>

      {postDetail && <PostDetail />}
    </>
  );
}
