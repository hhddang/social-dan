import { IGetPostsResponse, IPost } from "@/types";
import { NextResponse } from "next/server";

const generatePosts = (no: number): IPost[] => {
  const posts = [];
  for (let i = 0; i < no; i++) {
    const id = Math.round(Math.random() * 100000).toString();
    const post: IPost = {
      id,
      creator: {
        id: "2",
        email: "adam@gmail.com",
        name: "Adam",
        avatarUrl: "https://avatar.iran.liara.run/public/2",
      },
      lastModifier: "2h",
      title: `My #${id} post. Check it out~`,
      summaryTexts: ["I started my journey early in the morning and reached the base camp around 7 AM.", "The trail was steep but manageable, and the scenery made every step worth it."],
      fullTexts: [
        "I started my journey early in the morning and reached the base camp around 7 AM.",
        "The trail was steep but manageable, and the scenery made every step worth it.",
        "I met fellow hikers along the way and shared stories about our travels.",
        "After a few hours of climbing, I reached the summit — the view was unforgettable.",
      ],
      media: ["login-background.svg"],
      likeCount: 20,
      commentCount: 30,
      liked: false,
      comments: [],
    };
    posts.push(post);
  }
  return posts;
};

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  // const content = searchParams.get("content") || "";
  // const dates = searchParams.get("dates")?.split(",") || [];
  // const commentCount = parseInt(searchParams.get("commentCount") || "0");
  // const offset = parseInt(searchParams.get("offset") || "0");
  // const limit = parseInt(searchParams.get("limit") || "0");

  const response: IGetPostsResponse = {
    status: "ok",
    data: {
      posts: generatePosts(10),
    },
  };
  return NextResponse.json(response);
}
