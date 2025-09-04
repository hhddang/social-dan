"use client";
import { useEffect, useRef, useState } from "react";
import { Post } from "@/components";
import { IGetPostsResponse } from "@/types";
import { usePostStore } from "@/lib/stores/postStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export const PostList = () => {
  const posts = usePostStore((store) => store.posts);
  const setPosts = usePostStore((store) => store.setPosts);
  const loadingRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const contentSearch = searchParams.get("content") || "";
  const datesFilter = searchParams.get("dates") || "";
  const commentCountFilter = searchParams.get("commentCount") || "";
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const { data: newPosts, isFetching } = useQuery({
    queryKey: ["posts", offset],
    queryFn: async () => {
      const res = await axios
        .get<IGetPostsResponse>(`/api/posts?content=${contentSearch}&dates=${datesFilter}&commentCount=${commentCountFilter}&offset=${offset}&limit=${limit}`)
        .then((res) => res.data);
      return res.data.posts;
    },
  });

  useEffect(() => {
    if (newPosts && newPosts.length > 0) {
      setPosts([...posts, ...newPosts]);
    }
  }, [newPosts]);

  useEffect(() => {
    if (!loadingRef.current) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          setOffset((prev) => prev + limit);
        }
      },
      { threshold: 0 }
    );
    observer.observe(loadingRef.current);
    return () => observer.disconnect();
  }, [isFetching]);

  useEffect(() => {
    setPosts([]);
    setOffset(0);
  }, [searchParams]);

  return (
    <>
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      <div ref={loadingRef} className="w-full text-center">
        <span className="loading loading-spinner loading-xl"></span>
      </div>
    </>
  );
};
