"use client";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Footer, Header, Post, PostDetail, Filter } from "@/components";
import { IPost } from "@/types";
import { usePostStore } from "@/lib/stores/postStore";
import { useSearchParams } from "next/navigation";

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

export default function SearchPage() {
  const posts = usePostStore((store) => store.posts);
  const setPosts = usePostStore((store) => store.setPosts);
  const postListRef = useRef<HTMLDivElement | null>(null);
  const skeletonPostRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();

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

  useEffect(() => {
    postListRef.current?.scrollIntoView({ behavior: "instant" });
  }, [searchParams]);

  return (
    <>
      <Header />

      <main className="relative top-[var(--header-height)] w-screen h-[calc(100vh_-_var(--header-height))] overflow-y-auto bg-sky-100 scrollbar-thin focus:outline-none">
        <div className="flex gap-x-6 px-5 items-start justify-center">
          <Filter />

          <section ref={postListRef} className="max-w-[670px] flex-1 py-6 space-y-5 scroll-mt-0">
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

          <Footer />
        </div>
      </main>
      <PostDetail />
    </>
  );
}
