import type { User, Post, Story, Notification, Conversation, Comment } from "../types/index.js";

const now = Date.now();
const hoursAgo = (h: number) => new Date(now - h * 3600000).toISOString();

export const currentUser: User = {
  id: "me", username: "alexmorgan", displayName: "Alex Morgan", avatarUrl: "👤",
  bio: "Software developer & photographer 📸\nSan Francisco, CA", followers: 1247, following: 583, posts: 89, isFollowing: false, isVerified: true,
};

export const mockUsers: User[] = [
  { id: "u1", username: "sarah.designs", displayName: "Sarah Chen", avatarUrl: "👩‍🎨", bio: "UI/UX Designer", followers: 8432, following: 312, posts: 245, isFollowing: true, isVerified: true },
  { id: "u2", username: "mike.photo", displayName: "Mike Johnson", avatarUrl: "📷", bio: "Photographer", followers: 15200, following: 890, posts: 512, isFollowing: true, isVerified: false },
  { id: "u3", username: "emma.travel", displayName: "Emma Wilson", avatarUrl: "✈️", bio: "Travel blogger", followers: 42100, following: 234, posts: 678, isFollowing: false, isVerified: true },
  { id: "u4", username: "dev.james", displayName: "James Lee", avatarUrl: "💻", bio: "Full-stack dev", followers: 3210, following: 445, posts: 134, isFollowing: true, isVerified: false },
  { id: "u5", username: "foodie.ana", displayName: "Ana Garcia", avatarUrl: "🍳", bio: "Food & recipe creator", followers: 28500, following: 167, posts: 892, isFollowing: false, isVerified: true },
  { id: "u6", username: "fitness.tom", displayName: "Tom Davis", avatarUrl: "💪", bio: "Personal trainer", followers: 9870, following: 523, posts: 345, isFollowing: true, isVerified: false },
];

export const mockPosts: Post[] = [
  { id: "p1", author: mockUsers[0]!, content: "Just finished this new dashboard design! Really happy with how the dark mode turned out. What do you think? 🎨✨ #uidesign #darkmode", images: ["design1"], likes: 342, comments: 28, shares: 15, isLiked: false, isBookmarked: false, createdAt: hoursAgo(2), location: "San Francisco, CA" },
  { id: "p2", author: mockUsers[1]!, content: "Golden hour at the beach never disappoints 🌅", images: ["sunset1", "sunset2"], likes: 1205, comments: 67, shares: 43, isLiked: true, isBookmarked: true, createdAt: hoursAgo(5) },
  { id: "p3", author: mockUsers[2]!, content: "Day 15 in Tokyo! The street food here is absolutely incredible. This ramen spot in Shinjuku has a 2-hour wait but it's SO worth it 🍜🇯🇵 #tokyo #traveljapan #streetfood", images: ["tokyo1"], likes: 4521, comments: 234, shares: 89, isLiked: false, isBookmarked: false, createdAt: hoursAgo(8), location: "Tokyo, Japan" },
  { id: "p4", author: mockUsers[3]!, content: "Finally deployed my side project after 3 months! Built with React Native + Supabase. Link in bio if you want to check it out 🚀", images: [], likes: 189, comments: 42, shares: 12, isLiked: true, isBookmarked: false, createdAt: hoursAgo(12) },
  { id: "p5", author: mockUsers[4]!, content: "Made this from scratch today — homemade pasta with truffle cream sauce and crispy prosciutto. Recipe coming to the blog tomorrow! 🍝", images: ["food1", "food2", "food3"], likes: 2890, comments: 156, shares: 67, isLiked: false, isBookmarked: true, createdAt: hoursAgo(16), location: "Los Angeles, CA" },
  { id: "p6", author: mockUsers[5]!, content: "Morning workout done ✅ 5AM club represent! Remember: consistency > intensity. Show up every day and the results will follow 💪", images: ["gym1"], likes: 567, comments: 34, shares: 23, isLiked: false, isBookmarked: false, createdAt: hoursAgo(20) },
  { id: "p7", author: mockUsers[0]!, content: "New component library is live! 15 accessible, headless components for React. All TypeScript, all tested. Check it out 👇", images: [], likes: 723, comments: 89, shares: 45, isLiked: true, isBookmarked: false, createdAt: hoursAgo(28) },
  { id: "p8", author: mockUsers[2]!, content: "Kyoto temples are breathtaking in the morning light. Woke up at 5AM to beat the crowds and it was absolutely worth it 🏯⛩️", images: ["kyoto1", "kyoto2"], likes: 6210, comments: 312, shares: 134, isLiked: false, isBookmarked: false, createdAt: hoursAgo(36), location: "Kyoto, Japan" },
];

export const mockStories: Story[] = [
  { id: "s0", user: currentUser, items: [{ id: "si0", type: "image", url: "my_story", duration: 5, createdAt: hoursAgo(1) }], seen: false },
  { id: "s1", user: mockUsers[0]!, items: [{ id: "si1", type: "image", url: "story1", duration: 5, createdAt: hoursAgo(3) }], seen: false },
  { id: "s2", user: mockUsers[1]!, items: [{ id: "si2", type: "image", url: "story2", duration: 5, createdAt: hoursAgo(4) }, { id: "si3", type: "image", url: "story3", duration: 5, createdAt: hoursAgo(3) }], seen: false },
  { id: "s3", user: mockUsers[2]!, items: [{ id: "si4", type: "image", url: "story4", duration: 5, createdAt: hoursAgo(6) }], seen: true },
  { id: "s4", user: mockUsers[4]!, items: [{ id: "si5", type: "image", url: "story5", duration: 5, createdAt: hoursAgo(8) }], seen: true },
  { id: "s5", user: mockUsers[5]!, items: [{ id: "si6", type: "image", url: "story6", duration: 5, createdAt: hoursAgo(10) }], seen: true },
];

export const mockNotifications: Notification[] = [
  { id: "n1", type: "like", actor: mockUsers[0]!, postId: "p4", text: "liked your post", read: false, createdAt: hoursAgo(1) },
  { id: "n2", type: "follow", actor: mockUsers[2]!, text: "started following you", read: false, createdAt: hoursAgo(3) },
  { id: "n3", type: "comment", actor: mockUsers[1]!, postId: "p4", text: 'commented: "This looks amazing!"', read: false, createdAt: hoursAgo(5) },
  { id: "n4", type: "mention", actor: mockUsers[3]!, postId: "p7", text: "mentioned you in a comment", read: true, createdAt: hoursAgo(12) },
  { id: "n5", type: "like", actor: mockUsers[4]!, postId: "p4", text: "liked your post", read: true, createdAt: hoursAgo(18) },
  { id: "n6", type: "follow", actor: mockUsers[5]!, text: "started following you", read: true, createdAt: hoursAgo(24) },
  { id: "n7", type: "repost", actor: mockUsers[0]!, postId: "p4", text: "shared your post", read: true, createdAt: hoursAgo(36) },
];

export const mockConversations: Conversation[] = [
  { id: "c1", participant: mockUsers[0]!, lastMessage: "Love the new design! Can you share the Figma?", lastMessageAt: hoursAgo(1), unreadCount: 2 },
  { id: "c2", participant: mockUsers[3]!, lastMessage: "Let's pair program on that API tomorrow", lastMessageAt: hoursAgo(4), unreadCount: 0 },
  { id: "c3", participant: mockUsers[2]!, lastMessage: "The photos from Tokyo are incredible!", lastMessageAt: hoursAgo(12), unreadCount: 1 },
  { id: "c4", participant: mockUsers[1]!, lastMessage: "Thanks for the camera recommendation 📷", lastMessageAt: hoursAgo(24), unreadCount: 0 },
];

export const mockComments: Comment[] = [
  { id: "cm1", author: mockUsers[1]!, text: "This is incredible work! The attention to detail is next level 🔥", likes: 24, isLiked: false, createdAt: hoursAgo(1) },
  { id: "cm2", author: mockUsers[3]!, text: "What tools did you use for this?", likes: 8, isLiked: true, createdAt: hoursAgo(2) },
  { id: "cm3", author: mockUsers[4]!, text: "Love the color palette choice! So clean.", likes: 15, isLiked: false, createdAt: hoursAgo(3) },
  { id: "cm4", author: mockUsers[5]!, text: "Shared this with my team. Great inspiration!", likes: 6, isLiked: false, createdAt: hoursAgo(5) },
];
