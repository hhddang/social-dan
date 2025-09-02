"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GoBellFill, GoSearch } from "react-icons/go";
import { Post, PostDetail } from "@/components";
import { IComment, IPost } from "@/types";
import { usePostStore } from "@/lib/stores/store";

const POST: IPost = {
  id: "post",
  creator: {
    avatarUrl: "https://avatar.iran.liara.run/public/39",
    name: "adam_sumia",
  },
  lastModifier: "1d",
  title: "My First Hike in the Alps",
  summaryTexts: ["I started my journey early in the morning and reached the base camp around 7 AM.", "The trail was steep but manageable, and the scenery made every step worth it."],
  fullTexts: [
    "I started my journey early in the morning and reached the base camp around 7 AM.",
    "The trail was steep but manageable, and the scenery made every step worth it.",
    "I met fellow hikers along the way and shared stories about our travels.",
    "After a few hours of climbing, I reached the summit — the view was unforgettable.",
  ],
  media: ["login-background.svg", "login-background.svg"],
  likeCount: 120,
  commentCount: 45,
  liked: false,
  comments: [
    {
      writer: { avatarUrl: "https://avatar.iran.liara.run/public/29", name: "sovia" },
      content: "Cool",
      lastModifier: "1h",
    },
    {
      writer: { avatarUrl: "https://avatar.iran.liara.run/public/23", name: "whin" },
      content: "Awesome bro",
      lastModifier: "3h",
    },
  ],
};

const randomPosts = (n: number) => {
  const posts = [];
  for (let i = 0; i < n; i++) {
    const post = { ...POST, id: Math.round(Math.random() * 10000).toString() };
    posts.push(post);
  }
  return posts;
};

export default function HomePage() {
  const posts = usePostStore((store) => store.posts);
  const setPosts = usePostStore((store) => store.setPosts);
  const skeletonPostRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!skeletonPostRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPosts([...posts, ...randomPosts(5)]);
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(skeletonPostRef.current);
    return () => observer.disconnect();
  }, [posts]);

  return (
    <>
      <header className="bg-white w-screen h-[var(--header-height)] flex justify-center items-center px-5 gap-x-6 fixed shadow z-10">
        <div className="max-w-[320px] grow">
          <Link href="/" className="font-bold text-2xl text-sky-700">
            SocialDan
          </Link>
        </div>

        <div className="max-w-[670px] flex-1 flex justify-center">
          <div className="px-3 py-2 border rounded-lg border-neutral-300 focus-within:border-black min-w-[400px] flex gap-2 items-center">
            <GoSearch />
            <input type="text" placeholder="Search content" className="outline-none flex-1 text-" />
          </div>
        </div>

        <div className="max-w-[320px] grow flex gap-3 justify-end">
          <button className="rounded-lg-full size-8 cursor-pointer">
            <GoBellFill className="size-8 text-sky-700" />
          </button>
          <button>
            <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
          </button>
        </div>
      </header>

      <main className="relative top-[var(--header-height)] w-screen h-[calc(100vh_-_var(--header-height))] overflow-y-auto bg-sky-100 scrollbar-thin">
        <div className="flex gap-x-6 px-5 items-start justify-center">
          <aside className="max-w-[320px] max-h-[calc(100vh_-_var(--header-height)_-_48px)] grow pt-[24px] sticky top-0">
            <div className="flex max-h-[inherit] flex-col bg-white px-2 py-4 gap-3 rounded-lg">
              <div className="px-2 w-full flex justify-between items-center">
                <p className="font-bold">Find friend</p>
                <div className="flex- gap-3">
                  <button className="size-8 rounded-lg bg-sky-700 grid place-items-center cursor-pointer">
                    <GoSearch className="text-white size-5" />
                  </button>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto scrollbar-thin">
                <div className="flex flex-col">
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                  <div className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                    <div className="indicator">
                      <span className="indicator-item status status-success"></span>
                      <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                    </div>
                    <span>Adam</span>
                  </div>
                </div>
              </div>
            </div>
          </aside>

          <section className="max-w-[670px] flex-1 py-6 space-y-5">
            <div className="bg-white rounded-lg p-4 ">
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-x-3">
                  <Link href="#">
                    <Image src="https://avatar.iran.liara.run/public/39" width={48} height={48} alt="avatar" />
                  </Link>
                  <span>Welcome, Dan</span>
                </div>
                <button className="rounded-lg px-3 h-10 bg-sky-700 text-white cursor-pointer">Create Post</button>
              </div>
            </div>

            {/* A post */}
            {posts.map((post) => (
              <Post key={post.id} post={post} />
            ))}

            {/* Skeleton */}
            <div ref={skeletonPostRef} className="skeleton h-[800px]"></div>
          </section>

          <aside className="max-w-[320px] max-h-[calc(100vh_-_var(--header-height)_-_48px)] grow pt-[24px] sticky top-0">
            <div className="max-h-[inherit] overflow-y-auto space-y-4 scrollbar-none">
              <div className="h-[300px] bg-neutral-300 grid place-items-center">Some Ad</div>
              <div className="h-[300px] bg-neutral-300 grid place-items-center">Some Ad</div>
              <footer className="space-y-1">
                <div>
                  <Link href="#" className="underline">
                    About Us
                  </Link>
                </div>
                <div>
                  <Link href="#" className="underline">
                    Help Center
                  </Link>
                </div>
                <p>A demo social website</p>
              </footer>
            </div>
          </aside>
        </div>
      </main>

      <PostDetail />
    </>
  );
}
