import { render, screen } from "@testing-library/react";
import { Post } from "@/components";
import { IPost } from "@/types";

const post: IPost = {
  id: "1",
  creator: {
    id: "2",
    email: "adam@gmail.com",
    name: "Adam",
    avatarUrl: "https://avatar.iran.liara.run/public/2",
  },
  lastModifier: "2h",
  title: `My 1st post. Check it out~`,
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

describe("Render a post", () => {
  it("has title", () => {
    render(<Post post={post} />);
    expect(screen.getByText(post.title)).toBeInTheDocument();
  });
});
