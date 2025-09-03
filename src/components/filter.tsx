import { usePostStore } from "@/lib/stores";
import { IPost } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

const DATE_OPTIONS = [
  { label: "Today", value: "today" },
  { label: "Yesterday", value: "yesterday" },
  { label: "Last 7 Days", value: "last7days" },
];

const COMMENT_COUNT_OPTIONS = [
  { label: "Less Than 10", value: "lt10" },
  { label: "From 10 And More", value: "gte10" },
];

const POST: IPost = {
  id: "post",
  creator: {
    avatarUrl: "https://avatar.iran.liara.run/public/39",
    name: "adam_sumia",
  },
  lastModifier: "1d",
  title: "My First Hike in the Alps",
  summaryTexts: ["I started my journey early in the morning and reached the base camp around 7 AM.", "The trail was steep but manageable, and the scenery made every step worth it."],
  fullTexts: [
    "I started my journey early in the morning and reached the base camp around 7 AM.",
    "The trail was steep but manageable, and the scenery made every step worth it.",
    "I met fellow hikers along the way and shared stories about our travels.",
    "After a few hours of climbing, I reached the summit — the view was unforgettable.",
  ],
  media: ["login-background.svg", "login-background.svg"],
  likeCount: 120,
  commentCount: 45,
  liked: false,
  comments: [
    {
      writer: { avatarUrl: "https://avatar.iran.liara.run/public/29", name: "sovia" },
      content: "Cool",
      lastModifier: "1h",
    },
    {
      writer: { avatarUrl: "https://avatar.iran.liara.run/public/23", name: "whin" },
      content: "Awesome bro",
      lastModifier: "3h",
    },
  ],
};

const randomPosts = (n: number) => {
  const posts = [];
  for (let i = 0; i < n; i++) {
    const post = { ...POST, id: Math.round(Math.random() * 10000).toString() };
    posts.push(post);
  }
  return posts;
};

export const Filter = () => {
  const setPosts = usePostStore((store) => store.setPosts);
  const searchParams = useSearchParams();
  const [dates, setDates] = useState<string[]>([]);
  const [commentCount, setCommentCount] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const urlDates = searchParams.get("dates")?.split(",") || [];
    const urlComment = searchParams.get("commentCount") || null;

    setDates(urlDates);
    setCommentCount(urlComment);

    
  }, [searchParams]);

  const updateURL = (newDates: string[], newComment: string | null) => {
    const params = new URLSearchParams(searchParams.toString());

    if (newDates.length > 0) {
      params.set("dates", newDates.join(","));
    } else {
      params.delete("dates");
    }

    if (newComment) {
      params.set("commentCount", newComment);
    } else {
      params.delete("commentCount");
    }

    router.push(`/search?${params.toString()}`);

    setPosts(randomPosts(2));
  };

  const selectDate = (value: string) => {
    const newDates = dates.includes(value) ? dates.filter((d) => d !== value) : [...dates, value];

    setDates(newDates);
    updateURL(newDates, commentCount);
  };

  const selectComment = (value: string) => {
    const newValue = commentCount === value ? null : value;
    setCommentCount(newValue);
    updateURL(dates, newValue);
  };

  return (
    <aside className="max-w-[320px] h-[calc(100vh_-_var(--header-height)_-_48px)] grow pt-[24px] sticky top-0 hidden md:block">
      <div className="flex h-full  flex-col bg-white p-4 gap-3 rounded-lg">
        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="space-y-5">
            {/* Date filter */}
            <div className="w-full space-y-3">
              <div className="font-bold text-lg">Date</div>
              <div className="flex flex-col gap-2">
                {DATE_OPTIONS.map((option) => (
                  <button key={option.value} onClick={() => selectDate(option.value)} className="flex items-center gap-x-3 cursor-pointer w-max">
                    <input type="checkbox" checked={dates.includes(option.value)} readOnly className="checkbox text-sky-500 checked:bg-white" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>

            {/* Comment count filter */}
            <div className="w-full space-y-3">
              <div className="font-bold text-lg">Comment Count</div>
              <div className="flex flex-col gap-2">
                {COMMENT_COUNT_OPTIONS.map((option) => (
                  <button key={option.value} onClick={() => selectComment(option.value)} className="flex items-center gap-x-3">
                    <input type="checkbox" checked={commentCount === option.value} readOnly className="checkbox text-sky-500 checked:bg-white" />
                    <span>{option.label}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </aside>
  );
};
