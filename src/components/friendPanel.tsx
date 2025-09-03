import Image from "next/image";
import { GoSearch } from "react-icons/go";

export const FriendPanel = () => {
  const friends = new Array(5).fill("Alexander Sam");
  return (
    <aside className="max-w-[320px] max-h-[calc(100vh_-_var(--header-height)_-_48px)] grow pt-[24px] sticky top-0 hidden md:block">
      <div className="flex max-h-[inherit] flex-col bg-white px-2 py-4 gap-3 rounded-lg">
        <div className="px-2 w-full flex justify-between items-center">
          <p className="font-bold">Find friend</p>
          <div className="flex- gap-3">
            <button className="size-8 rounded-lg bg-sky-700 grid place-items-center cursor-pointer">
              <GoSearch className="text-white size-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto scrollbar-thin">
          <div className="flex flex-col">
            {friends.map((friend, index) => (
              <div key={index} className="w-full h-12 rounded-lg cursor-pointer hover:bg-neutral-300 flex gap-2 items-center p-2">
                <div className="indicator">
                  <span className="indicator-item status status-success"></span>
                  <Image src="https://avatar.iran.liara.run/public/39" width={32} height={32} alt="avatar" />
                </div>
                <span>{friend}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </aside>
  );
};
