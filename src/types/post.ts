import { IUser } from "./user";

export interface IComment {
  writer: IUser;
  content: string;
  lastModifier: string;
}

export interface IPost {
  id: string;
  creator: IUser;
  lastModifier: string;
  title: string;
  summaryTexts: string[];
  fullTexts: string[];
  media: string[];
  likeCount: number;
  commentCount: number;
  liked: boolean;
  comments: IComment[];
}
