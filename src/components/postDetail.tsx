import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { GoKebabHorizontal, GoPaperAirplane, GoX } from "react-icons/go";
import { Post } from "./post";
import { usePostStore } from "@/lib/stores/postStore";
import { Avatar } from "./avatar";
import { IGetCommentsResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { useAuthStore } from "@/lib/stores";

export const PostDetail = () => {
  const user = useAuthStore((store) => store.user);
  const postDetail = usePostStore((store) => store.postDetail);
  const showPostDetail = usePostStore((store) => store.showPostDetail);
  const setShowPostDetail = usePostStore((store) => store.setShowPostDetail);
  const sendComment = usePostStore((store) => store.sendComment);
  const loadComments = usePostStore((store) => store.loadComments);
  const [yourComment, setYourComment] = useState("");
  const yourCommentRef = useRef<HTMLTextAreaElement | null>(null);
  const [offset, setOffset] = useState(0);
  const [visitedPostIds, setVisitedPostIds] = useState<string[]>([]);
  const limit = 5;

  const { data: loadedComments } = useQuery({
    queryKey: ["comments", postDetail?.id, offset],
    queryFn: async () => {
      if (!postDetail) return [];
      const res = await axios.get<IGetCommentsResponse>(`/api/comments?postId=${postDetail?.id ?? ""}&offset=${offset}&limit=${limit}`).then((res) => res.data);
      return res.data.comments;
    },
  });

  useEffect(() => {
    setOffset(0);
  }, [postDetail]);

  useEffect(() => {
    if (!postDetail) return;
    if (visitedPostIds.includes(postDetail.id) && offset === 0) return;
    if (loadedComments && loadedComments.length > 0) {
      loadComments(postDetail.id, loadedComments);
      setVisitedPostIds((prev) => [...prev, postDetail.id]);
    }
  }, [loadedComments]);

  useEffect(() => {}, [showPostDetail]);

  const focusYourComment = () => {
    yourCommentRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendComment();
    }
  };

  const handleSendComment = () => {
    if (!postDetail || !yourComment.trim()) return;
    sendComment(postDetail.id, {
      writer: user!,
      content: yourComment,
      lastModifier: "1m",
    });
    setYourComment("");
  };

  const viewMoreComments = async () => {
    setOffset((prev) => prev + limit);
  };

  return (
    <>
      {showPostDetail && (
        <>
          <section onClick={() => setShowPostDetail(false)} className="fixed inset-0 z-20 bg-white m-0">
            <div className="w-fit h-full overflow-y-auto scrollbar-none py-5 mx-auto">
              <div onClick={(e) => e.stopPropagation()}>
                {postDetail && (
                  <Post post={postDetail} fullContent customClickComment={() => focusYourComment()}>
                    {user && (
                      <div className="flex gap-3">
                        <Avatar url={user.avatarUrl} />
                        <div className="flex-1 flex items-start gap-3 border border-neutral-300 focus-within:border-black rounded-xl px-3 py-2">
                          <textarea
                            ref={yourCommentRef}
                            value={yourComment}
                            onChange={(e) => setYourComment(e.target.value)}
                            onKeyDown={handleKeyDown}
                            placeholder="Write something"
                            className="flex-1 outline-none scrollbar-none resize-none field-sizing-content break-all"
                          />
                          <button onClick={() => handleSendComment()} className="cursor-pointer">
                            <GoPaperAirplane className="size-6" />
                          </button>
                        </div>
                      </div>
                    )}
                    {postDetail.comments.length > 0 && (
                      <div className="space-y-4 scroll-mb-0">
                        {postDetail.comments.map(({ writer, content, lastModifier }, index) => (
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
                            {postDetail.comments.length} of {postDetail.commentCount}
                          </div>
                          {postDetail.comments.length < postDetail.commentCount && (
                            <div onClick={() => viewMoreComments()} className="font-bold cursor-pointer scroll-mb-4">
                              View more comments
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </Post>
                )}
              </div>
            </div>
          </section>
          <button onClick={() => setShowPostDetail(false)} className="md:hidden fixed top-2 right-2 z-30 shadow rounded-full p-2 bg-neutral-100">
            <GoX className="size-5" />
          </button>
        </>
      )}
    </>
  );
};
