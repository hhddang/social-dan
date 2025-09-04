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

export const Filter = () => {
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
    <aside className="w-full md:h-[calc(100vh_-_var(--header-height)_-_48px)] md:grow pt-[24px] md:sticky md:top-0 md:max-w-[320px]">
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
