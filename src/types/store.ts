import { IComment, IPost } from "./post";
import { IUser } from "./user";

export interface IPostStore {
  unlikePost: (postId: string) => void;
  postDetail: IPost | null;
  posts: IPost[];
  setPostDetail: (post: IPost | null) => void;
  setPosts: (posts: IPost[]) => void;
  likePost: (postId: string) => void;
  addComment: (postId: string, comment: IComment) => void;
}

export interface IAuthStore {
  user: IUser | null;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}
