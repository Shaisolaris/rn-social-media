export interface User {
  id: string;
  username: string;
  displayName: string;
  avatarUrl: string;
  bio: string;
  followers: number;
  following: number;
  posts: number;
  isFollowing: boolean;
  isVerified: boolean;
}

export interface Post {
  id: string;
  author: User;
  content: string;
  images: string[];
  likes: number;
  comments: number;
  shares: number;
  isLiked: boolean;
  isBookmarked: boolean;
  createdAt: string;
  location?: string;
}

export interface Comment {
  id: string;
  author: User;
  text: string;
  likes: number;
  isLiked: boolean;
  createdAt: string;
  replies?: Comment[];
}

export interface Story {
  id: string;
  user: User;
  items: StoryItem[];
  seen: boolean;
}

export interface StoryItem {
  id: string;
  type: "image" | "video";
  url: string;
  duration: number;
  createdAt: string;
}

export interface Notification {
  id: string;
  type: "like" | "comment" | "follow" | "mention" | "repost";
  actor: User;
  postId?: string;
  text: string;
  read: boolean;
  createdAt: string;
}

export interface Conversation {
  id: string;
  participant: User;
  lastMessage: string;
  lastMessageAt: string;
  unreadCount: number;
}

export interface Message {
  id: string;
  senderId: string;
  text: string;
  createdAt: string;
  read: boolean;
}

export type RootStackParamList = {
  Main: undefined;
  PostDetail: { id: string };
  Profile: { userId: string };
  Notifications: undefined;
  Messages: undefined;
  Chat: { conversationId: string };
  CreatePost: undefined;
  StoryViewer: { userId: string };
};

export type MainTabParamList = {
  Feed: undefined;
  Search: undefined;
  Create: undefined;
  Activity: undefined;
  MyProfile: undefined;
};
