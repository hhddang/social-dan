import { IPost } from "./post";
import { IUser } from "./user";

interface IBaseResponse<T> {
  status: "ok";
  data: T;
}

export type ILoginResponse = IBaseResponse<{
  token: string;
  user: IUser;
}>;

export type ISignUpResponse = IBaseResponse<null>;

export type IGetPostsResponse = IBaseResponse<{
  posts: IPost[];
}>;
