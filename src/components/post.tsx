import { IPost } from "@/types";
import Image from "next/image";
import { useState } from "react";
import { GoKebabHorizontal, GoThumbsup, GoComment } from "react-icons/go";
import { Avatar } from "./avatar";
import { usePostStore } from "@/lib/stores/postStore";

export interface IPostProps {
  post: IPost;
  fullContent?: boolean;
  customClickComment?: () => void;
  children?: React.ReactNode;
}

export const Post = ({ post, fullContent, customClickComment, children }: IPostProps) => {
  const { id, creator, lastModifier, title, summaryTexts, fullTexts, media, likeCount, commentCount, liked } = post;
  const [showFullContent, setShowFullContent] = useState(fullContent ?? false);
  const likePost = usePostStore((store) => store.likePost);
  const unlikePost = usePostStore((store) => store.unlikePost);
  const setPostDetail = usePostStore((store) => store.setPostDetail);
  const handleLikePost = () => {
    if (liked === true) {
      unlikePost(id);
    } else {
      likePost(id);
    }
  };

  return (
    <div className="max-w-[700px] bg-white rounded-lg p-5 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-3">
          <Avatar url={creator.avatarUrl} />
          <span className="font-bold text-xl text-sky-700">{creator.name}</span>
        </div>

        <div className="flex items-center gap-x-1">
          <span>{lastModifier}</span>
          <button className="cursor-pointer size-6 grid place-items-center">
            <GoKebabHorizontal />
          </button>
        </div>
      </div>

      {/* Texts */}
      <div className="flex flex-col gap-2">
        <strong className="text-lg">{title}</strong>
        {showFullContent ? (
          <>
            {fullTexts.map((text, index) => (
              <p key={index} className="text-base">
                {text}
              </p>
            ))}
          </>
        ) : (
          <>
            {summaryTexts.map((text, index) => (
              <p key={index} className="text-base">
                {text}
              </p>
            ))}
            <span onClick={() => setShowFullContent(true)} className="cursor-pointer ml-auto">
              ... see more
            </span>
          </>
        )}
      </div>

      {/* Media */}
      <div>
        <Image src="login-background.svg" alt="image" width={100} height={100} className="w-full" />
      </div>

      {/* Reaction & command */}
      <div className="flex gap-x-4">
        <div className="flex gap-1 items-center">
          <GoThumbsup className="size-6" /> {likeCount}
        </div>
        <div className="flex gap-1 items-center">
          <GoComment className="size-6" /> {commentCount}
        </div>
      </div>

      {/* Actions */}
      <div className="flex border-t border-t-neutral-300 py-1">
        <button onClick={() => handleLikePost()} className="grow flex justify-center items-center gap-x-2 cursor-pointer py-2 rounded hover:bg-neutral-100 font-bold">
          <GoThumbsup className="size-6" />
          Likes
        </button>

        <button
          onClick={() => (customClickComment ? customClickComment() : setPostDetail(post))}
          className="grow flex justify-center items-center gap-x-2 cursor-pointer py-2 rounded hover:bg-neutral-100 font-bold">
          <GoComment className="size-6" />
          Comment
        </button>
      </div>

      {/* Custom */}
      {children}
    </div>
  );
};
