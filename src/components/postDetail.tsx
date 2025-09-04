import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { GoKebabHorizontal, GoPaperAirplane, GoX } from "react-icons/go";
import { Post } from "./post";
import { usePostStore } from "@/lib/stores/postStore";
import { Avatar } from "./avatar";
import { IComment, IGetCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { useAuthStore } from "@/lib/stores/authStore";

export const PostDetail = () => {
  const user = useAuthStore((store) => store.user)!;
  const postDetail = usePostStore((store) => store.postDetail)!;
  const setPostDetail = usePostStore((store) => store.setPostDetail);
  const addComment = usePostStore((store) => store.addComment);
  const { commentCount, comments } = postDetail;
  const yourCommentRef = useRef<HTMLTextAreaElement | null>(null);
  const commentListRef = useRef<HTMLDivElement | null>(null);
  const [yourComment, setYourComment] = useState("");
  const [offset, setOffset] = useState(0);

  const { data: newComments, refetch } = useQuery({
    queryKey: ["comments", offset],
    queryFn: async () => {
      const res = await axios.get<IGetCommentsResponse>("/api/comments").then((res) => res.data);
      return res.data.comments;
    },
  });

  useEffect(() => {
    if (newComments && newComments.length > 0) {
      setPostDetail({ ...postDetail, comments: [...postDetail.comments, ...newComments] });
      requestAnimationFrame(() => {
        commentListRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
      });
    }
  }, [newComments]);

  const focusYourComment = () => {
    yourCommentRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendComment();
    }
  };

  const sendComment = () => {
    if (!postDetail || !yourComment.trim()) return;

    addComment(postDetail.id, {
      writer: user!,
      content: yourComment,
      lastModifier: "1m",
    });
    setYourComment("");
    commentListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const viewMoreComments = async () => {
    setOffset((prev) => prev + 10);
    refetch();
  };

  return (
    <>
      <section onClick={() => setPostDetail(null)} className="fixed inset-0 z-20 bg-[rgba(0,0,0,.3)]">
        <div className="w-fit h-full overflow-y-auto scrollbar-none py-5 mx-auto">
          <div onClick={(e) => e.stopPropagation()}>
            <Post post={postDetail} fullContent customClickComment={() => focusYourComment()}>
              <div className="flex gap-3">
                <Link href="#">
                  <Image src={user.avatarUrl} width={36} height={36} alt="avatar" />
                </Link>
                <div className="flex-1 flex items-start gap-3 border border-neutral-300 focus-within:border-black rounded-xl px-3 py-2">
                  <textarea
                    ref={yourCommentRef}
                    value={yourComment}
                    onChange={(e) => setYourComment(e.target.value)}
                    onKeyDown={handleKeyDown}
                    placeholder="Write something"
                    className="flex-1 outline-none scrollbar-none resize-none field-sizing-content break-all"
                  />
                  <button onClick={() => sendComment()} className="cursor-pointer">
                    <GoPaperAirplane className="size-6" />
                  </button>
                </div>
              </div>

              {comments.length > 0 && (
                <div ref={commentListRef} className="space-y-4 scroll-mt-[calc(100vh/2)] scroll-mb-6">
                  {comments.map(({ writer, content, lastModifier }, index) => (
                    <div key={index} className={`flex gap-3 ${index === 0 ? "" : ""}`}>
                      <Avatar url={writer.avatarUrl} />
                      <div className="flex-1 flex flex-col gap-1 rounded-xl px-3 py-2 bg-neutral-100">
                        <div className="w-full flex justify-between items-center">
                          <span className="font-bold">{writer.name}</span>
                          <div className="flex items-center gap-1">
                            <span>{lastModifier}</span>
                            <button className="cursor-pointer size-6 grid place-items-center">
                              <GoKebabHorizontal />
                            </button>
                          </div>
                        </div>
                        <div>{content}</div>
                      </div>
                    </div>
                  ))}

                  <div className="flex flex-row-reverse justify-between">
                    <div>
                      {comments.length} of {commentCount}
                    </div>
                    {comments.length < commentCount && (
                      <div onClick={() => viewMoreComments()} className="font-bold cursor-pointer">
                        View more comments
                      </div>
                    )}
                  </div>
                </div>
              )}
            </Post>
          </div>
        </div>
      </section>
      <button onClick={() => setPostDetail(null)} className="md:hidden fixed top-2 right-2 z-30 shadow rounded-full p-2 bg-neutral-100">
        <GoX className="size-5" />
      </button>
    </>
  );
};
