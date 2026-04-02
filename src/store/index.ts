import { create } from "zustand";
import type { User, Post, Story, Notification, Conversation } from "../types/index.js";
import { currentUser, mockPosts, mockStories, mockNotifications, mockConversations } from "../services/mockData.js";
import { generateId } from "../utils/index.js";

interface AppStore {
  currentUser: User;
  posts: Post[];
  stories: Story[];
  notifications: Notification[];
  conversations: Conversation[];
  unreadNotifications: number;
  unreadMessages: number;

  toggleLike: (postId: string) => void;
  toggleBookmark: (postId: string) => void;
  toggleFollow: (userId: string) => void;
  addPost: (content: string, images: string[]) => void;
  markStoryAsSeen: (storyId: string) => void;
  markNotificationsRead: () => void;
}

export const useAppStore = create<AppStore>((set, get) => ({
  currentUser,
  posts: mockPosts,
  stories: mockStories,
  notifications: mockNotifications,
  conversations: mockConversations,
  unreadNotifications: mockNotifications.filter((n) => !n.read).length,
  unreadMessages: mockConversations.reduce((sum, c) => sum + c.unreadCount, 0),

  toggleLike: (postId) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === postId ? { ...p, isLiked: !p.isLiked, likes: p.isLiked ? p.likes - 1 : p.likes + 1 } : p,
      ),
    })),

  toggleBookmark: (postId) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.id === postId ? { ...p, isBookmarked: !p.isBookmarked } : p,
      ),
    })),

  toggleFollow: (userId) =>
    set((s) => ({
      posts: s.posts.map((p) =>
        p.author.id === userId ? { ...p, author: { ...p.author, isFollowing: !p.author.isFollowing } } : p,
      ),
    })),

  addPost: (content, images) => {
    const post: Post = {
      id: generateId(),
      author: get().currentUser,
      content,
      images,
      likes: 0,
      comments: 0,
      shares: 0,
      isLiked: false,
      isBookmarked: false,
      createdAt: new Date().toISOString(),
    };
    set((s) => ({ posts: [post, ...s.posts] }));
  },

  markStoryAsSeen: (storyId) =>
    set((s) => ({
      stories: s.stories.map((st) => (st.id === storyId ? { ...st, seen: true } : st)),
    })),

  markNotificationsRead: () =>
    set((s) => ({
      notifications: s.notifications.map((n) => ({ ...n, read: true })),
      unreadNotifications: 0,
    })),
}));
