import { ISignUpRequest, ISignUpResponse } from "@/types";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  const { email, username } = (await req.json()) as ISignUpRequest;

  if (email === "admin@gmail.com" || username === "admin") {
    return NextResponse.json({ status: "fail" });
  }

  const response: ISignUpResponse = {
    status: "ok",
    data: null,
  };
  return NextResponse.json(response);
}
