jest.mock("next/server", () => {
  return {
    NextRequest: class {
      url: string;
      nextUrl: { pathname: string };
      cookies: {
        get: (key: string) => { value?: string } | undefined;
      };
      constructor(url: string, cookies: Record<string, string> = {}) {
        this.url = url;
        this.nextUrl = new URL(url);
        this.nextUrl.pathname = new URL(url).pathname;
        this.cookies = {
          get: (key: string) => {
            if (key in cookies) return { value: cookies[key] };
            return undefined;
          },
        };
      }
    },
    NextResponse: {
      redirect(url: URL) {
        return { redirect: url.toString() };
      },
      next() {
        return { next: true };
      },
    },
  };
});

// Import middleware after the mock to use the mocked NextRequest/Response
import { middleware } from "../middleware";

describe("middleware tests", () => {
  it("redirects to /login if no token present", () => {
    const { NextRequest } = require("next/server");
    const req = new NextRequest("https://example.com/");
    const res = middleware(req);
    expect(res).toEqual({ redirect: "https://example.com/login" });
  });
});
