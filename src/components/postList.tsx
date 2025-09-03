"use client";
import { useEffect, useRef } from "react";
import { Post } from "@/components";
import { IGetPostsResponse } from "@/types";
import { usePostStore } from "@/lib/stores/postStore";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useSearchParams } from "next/navigation";

export const PostList = () => {
  const posts = usePostStore((store) => store.posts);
  const setPosts = usePostStore((store) => store.setPosts);
  const skeletonPostRef = useRef<HTMLDivElement | null>(null);
  const searchParams = useSearchParams();
  const {
    data: newPosts,
    refetch,
    isFetching,
  } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get<IGetPostsResponse>("/api/posts").then((res) => res.data);
      return res.data.posts;
    },
  });

  useEffect(() => {
    if (newPosts && newPosts.length > 0) {
      setPosts([...posts, ...newPosts]);
    }
  }, [newPosts]);

  useEffect(() => {
    if (!skeletonPostRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !isFetching) {
          refetch();
        }
      },
      { threshold: 0.2 }
    );

    observer.observe(skeletonPostRef.current);
    return () => observer.disconnect();
  }, [isFetching, refetch]);

  useEffect(() => {
    setPosts([]);
    refetch();
  }, [searchParams]);

  return (
    <>
      {/* Posts */}
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}

      {/* Skeleton */}
      <div ref={skeletonPostRef} className="skeleton h-[800px]"></div>
    </>
  );
};
