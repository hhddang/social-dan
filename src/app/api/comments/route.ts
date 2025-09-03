import { IComment, IGetCommentsResponse } from "@/types";
import { NextResponse } from "next/server";

const generateComments = (no: number): IComment[] => {
  const comments = [];
  for (let i = 0; i < no; i++) {
    const comment: IComment = {
      writer: {
        id: "3",
        email: "commenter@gmail.com",
        name: "Commenter",
        avatarUrl: "https://avatar.iran.liara.run/public/6",
      },
      content: "Wow, this is grate!",
      lastModifier: "1h",
    };
    comments.push(comment);
  }
  return comments;
};

export async function GET(req: Request) {
  const response: IGetCommentsResponse = {
    status: "ok",
    data: {
      comments: generateComments(5),
    },
  };
  return NextResponse.json(response);
}
