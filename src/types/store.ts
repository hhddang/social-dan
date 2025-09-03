import { IComment, IPost } from "./post";

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
  user: {
    id: string;
    name: string;
    avatarUrl: string;
  } | null;
  token: string | null;
  login: (email: string, password: string) => boolean;
  signUp: (email: string, username: string, password: string, repeatPassword: string) => boolean;
  logout: () => void;
}
