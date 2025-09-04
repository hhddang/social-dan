import { IComment, IPost } from "./post";
import { IUser } from "./user";

export interface IPostStore {
  posts: IPost[];
  postDetail: IPost | null;
  showPostDetail: boolean;
  setPosts: (posts: IPost[]) => void;
  setPostDetail: (post: IPost | null) => void;
  setShowPostDetail: (value: boolean) => void;
  likePost: (postId: string) => void;
  unlikePost: (postId: string) => void;
  sendComment: (postId: string, comment: IComment) => void;
  loadComments: (postId: string, comments: IComment[]) => void;
}

export interface IAuthStore {
  user: IUser | null;
  token: string | null;
  login: (user: IUser, token: string) => void;
  logout: () => void;
}
