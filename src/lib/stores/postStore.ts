import { IPostStore } from "@/types/store";
import { create } from "zustand";

export const usePostStore = create<IPostStore>((set) => ({
  posts: [],
  postDetail: null,
  showPostDetail: false,

  setPosts: (posts) => set({ posts }),

  setPostDetail: (post) =>
    set((state) => ({
      postDetail: post,
      posts: post && state.posts.some((p) => p.id === post.id) ? state.posts.map((p) => (p.id === post.id ? post : p)) : state.posts,
    })),

  setShowPostDetail: (value) => set({ showPostDetail: value }),

  likePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, liked: true, likeCount: post.likeCount + 1 } : post)),
      postDetail: state.postDetail?.id === postId ? { ...state.postDetail, liked: true, likeCount: state.postDetail.likeCount + 1 } : state.postDetail,
    })),

  unlikePost: (postId) =>
    set((state) => ({
      posts: state.posts.map((post) => (post.id === postId ? { ...post, liked: false, likeCount: post.likeCount - 1 } : post)),
      postDetail: state.postDetail?.id === postId ? { ...state.postDetail, liked: false, likeCount: state.postDetail.likeCount - 1 } : state.postDetail,
    })),

  sendComment: (postId, comment) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              commentCount: post.commentCount + 1,
              comments: [comment, ...(post.comments || [])],
            }
          : post
      ),
      postDetail:
        state.postDetail?.id === postId
          ? {
              ...state.postDetail,
              commentCount: state.postDetail.commentCount + 1,
              comments: [comment, ...(state.postDetail.comments || [])],
            }
          : state.postDetail,
    })),

  loadComments: (postId, comments) =>
    set((state) => ({
      posts: state.posts.map((post) =>
        post.id === postId
          ? {
              ...post,
              comments: [...(post.comments || []), ...comments],
            }
          : post
      ),
      postDetail:
        state.postDetail?.id === postId
          ? {
              ...state.postDetail,
              comments: [...(state.postDetail.comments || []), ...comments],
            }
          : state.postDetail,
    })),
}));
