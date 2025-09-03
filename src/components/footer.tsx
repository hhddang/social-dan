import Link from "next/link";

export const Footer = () => {
  return (
    <aside className="max-w-[320px] max-h-[calc(100vh_-_var(--header-height)_-_48px)] grow pt-[24px] sticky top-0 hidden xl:block">
      <div className="max-h-[inherit] overflow-y-auto space-y-4 scrollbar-none">
        <div className="h-[300px] bg-neutral-100 grid place-items-center">Some Ad</div>
        <div className="h-[300px] bg-neutral-100 grid place-items-center">Some Ad</div>
        <footer className="space-y-1">
          <div>
            <Link href="#" className="underline">
              About Us
            </Link>
          </div>
          <div>
            <Link href="#" className="underline">
              Help Center
            </Link>
          </div>
          <p>A demo social website</p>
        </footer>
      </div>
    </aside>
  );
};
