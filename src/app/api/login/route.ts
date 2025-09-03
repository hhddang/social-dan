import { ILoginRequest, ILoginResponse, IUser } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { username, password } = (await req.json()) as ILoginRequest;

  if (username === "admin" && password === "admin") {
    const fakeToken = "fake-jwt-token";
    const user: IUser = { id: "1", name: "admin", email: "admin@gmail.com", avatarUrl: "https://avatar.iran.liara.run/public/1" };
    const response: ILoginResponse = {
      status: "ok",
      data: { token: fakeToken, user },
    };
    return NextResponse.json(response);
  }

  return NextResponse.json({ status: "fail" });
}
