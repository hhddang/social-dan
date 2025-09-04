import { IComment, IGetCommentsResponse } from "@/types";
import { NextResponse } from "next/server";

const generateComments = (postId: string, offset: number, no: number): IComment[] => {
  const comments = [];
  for (let i = 0; i < no; i++) {
    const order = offset + i + 1;
    const comment: IComment = {
      writer: {
        id: `${postId}-${order}`,
        email: "commenter@gmail.com",
        name: "Commenter",
        avatarUrl: "https://avatar.iran.liara.run/public/6",
      },
      content: `Comment #${order} on post #${postId}`,
      lastModifier: "1h",
    };
    comments.push(comment);
  }
  return comments;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const postId = searchParams.get("postId") || "";
  const limit = parseInt(searchParams.get("limit") || "0");
  const offset = parseInt(searchParams.get("offset") || "0");
  const max = 30;

  const response: IGetCommentsResponse = {
    status: "ok",
    data: {
      comments: generateComments(postId, offset, Math.min(limit, max - offset)),
    },
  };
  return NextResponse.json(response);
}
