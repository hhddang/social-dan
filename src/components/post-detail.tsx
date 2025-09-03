import Image from "next/image";
import Link from "next/link";
import { useRef, useState } from "react";
import { GoKebabHorizontal, GoPaperAirplane } from "react-icons/go";
import { Post } from "./post";
import { usePostStore } from "@/lib/stores/postStore";
import { Avatar } from "./avatar";
import { IComment } from "@/types";

const COMMENT: IComment = {
  writer: { avatarUrl: "https://avatar.iran.liara.run/public/13", name: "Dan" },
  content: "New comment ~ ",
  lastModifier: "2d",
};

const randomComments = (n: number) => {
  const comments = [];
  for (let i = 0; i < n; i++) {
    const comment = { ...COMMENT, content: COMMENT.content + i };
    comments.push(comment);
  }
  return comments;
};

export const PostDetail = () => {
  const postDetail = usePostStore((store) => store.postDetail);
  const setPostDetail = usePostStore((store) => store.setPostDetail);
  const addComment = usePostStore((store) => store.addComment);
  const commentCount = postDetail?.commentCount ?? 0;
  const comments = postDetail?.comments ?? [];
  const yourCommentRef = useRef<HTMLTextAreaElement | null>(null);
  const latestCommentRef = useRef<HTMLDivElement | null>(null);
  const earliestCommentRef = useRef<HTMLDivElement | null>(null);
  const commentListRef = useRef<HTMLDivElement | null>(null);
  // const commentRef = (index:number) => {
  //   if(index === 0) {
  //     return latestCommentRef
  //   }
  //   if(index === comments.length - 1){
  //     return earliestCommentRef
  //   }
  //   return undefined
  // }
  const [yourComment, setYourComment] = useState("");

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
      writer: { avatarUrl: "", name: "Dan" },
      content: yourComment,
      lastModifier: "1d",
    });
    setYourComment("");
    commentListRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const viewMoreComments = () => {
    if (!postDetail) return;
    setPostDetail({ ...postDetail, comments: [...postDetail.comments, ...randomComments(5)] });
    requestAnimationFrame(() => {
      commentListRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    });
  };

  return (
    <>
      {postDetail && (
        <section onClick={() => setPostDetail(null)} className={`${postDetail ? "fixed" : "hidden"} inset-0 z-20 bg-[rgba(0,0,0,.3)]`}>
          <div className="w-fit h-full overflow-y-auto scrollbar-none py-5 mx-auto">
            <div onClick={(e) => e.stopPropagation()}>
              <Post post={postDetail} fullContent customClickComment={() => focusYourComment()}>
                <div className="flex gap-3">
                  <Link href="#">
                    <Image src="https://avatar.iran.liara.run/public/39" width={36} height={36} alt="avatar" />
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
                      <div ref={index === 0 ? latestCommentRef : index === comments.length - 1 ? earliestCommentRef : undefined} key={index} className={`flex gap-3 ${index === 0 ? "" : ""}`}>
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
      )}
    </>
  );
};
