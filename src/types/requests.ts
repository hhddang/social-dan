export interface ILoginRequest {
  username: string;
  password: string;
}

export interface ISignUpRequest {
  email: string;
  username: string;
  password: string;
}

export interface IGetCommentRequest {
  postId: string;
  offset: number;
  limit: number;
}
