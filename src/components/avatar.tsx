import Image from "next/image";
import Link from "next/link";

export const Avatar = ({ url }: { url: string }) => {
  return (
    <Link href="#">
      <Image src={url} width={44} height={44} alt="avatar" />
    </Link>
  );
};
