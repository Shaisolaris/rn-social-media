export const DEMO_USER = { id: "u1", username: "sarahchen", name: "Sarah Chen", bio: "Full-stack developer. Coffee enthusiast.", avatar: null, followers: 1243, following: 856, posts: 47 };
export const DEMO_FEED = [
  { id: "p1", user: { username: "jameswilson", name: "James Wilson", avatar: null }, content: "Just deployed our new microservices architecture. 10x faster response times!", likes: 42, comments: 8, time: "2h ago" },
  { id: "p2", user: { username: "emilypark", name: "Emily Park", avatar: null }, content: "Working on a new React Native app this weekend. The new Expo SDK is amazing!", likes: 28, comments: 5, time: "4h ago" },
  { id: "p3", user: { username: "alexkim", name: "Alex Kim", avatar: null }, content: "TIL: You can use Prisma with SQLite for rapid prototyping. Game changer for hackathons.", likes: 67, comments: 12, time: "6h ago" },
];
export const DEMO_NOTIFICATIONS = [
  { id: "n1", type: "like", user: "James Wilson", target: "your post", time: "1h ago" },
  { id: "n2", type: "follow", user: "Emily Park", target: null, time: "3h ago" },
  { id: "n3", type: "comment", user: "Alex Kim", target: "your post", time: "5h ago" },
];
