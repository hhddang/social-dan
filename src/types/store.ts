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
