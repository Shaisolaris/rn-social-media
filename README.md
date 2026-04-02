# rn-social-media

React Native social media app built with Expo featuring an Instagram-style feed with stories, posts with likes/comments/bookmarks, user profiles with follower stats, notifications, direct messages, and search/explore functionality. Uses Zustand for state management and TypeScript throughout.

## Stack

- **Framework:** React Native 0.74 with Expo SDK 51
- **Language:** TypeScript 5 strict mode
- **Navigation:** React Navigation 6 (native stack + bottom tabs)
- **State:** Zustand
- **Styling:** StyleSheet API with Instagram-inspired theme

## Features

### Feed
- Stories row with ring indicators (unseen = gradient, seen = gray)
- Your Story with add button
- Post cards with author info, image placeholder, actions (like, comment, share, bookmark)
- Like count, content with username prefix, comment count, relative timestamp
- Pull-to-refresh ready

### Stories
- Horizontal scrollable story circles
- Seen/unseen state tracking in store
- Current user story at position 0

### Posts
- Like toggle with heart animation color
- Bookmark toggle
- Comment count with "View all" link
- Location tags
- Multi-image indicator
- Verified badge on authors
- Relative time display (just now, 2h, 3d, 1w)

### Profiles
- Avatar, display name, bio, verified badge
- Stats row: posts, followers, following with compact formatting
- Post grid (3-column)
- Follow/Unfollow toggle
- Message button for other profiles
- Edit Profile button for own profile

### Notifications
- Grouped by Today / Earlier
- Types: like, comment, follow, mention, repost
- Unread highlight (blue tint)
- Follow button on follow notifications
- Actor avatar and relative time

### Messages
- Conversation list with last message preview
- Unread count badges
- Participant avatars
- Relative timestamps

### Search/Explore
- Search bar with real-time filtering
- Category chips (For You, Trending, Design, Travel, etc.)
- 3-column grid layout

## Architecture

```
src/
├── App.tsx
├── navigation/AppNavigator.tsx       # Stack + 5-tab bottom navigation
├── screens/
│   ├── FeedScreen.tsx                # Stories + post feed with header actions
│   ├── SearchScreen.tsx              # Search bar, categories, explore grid
│   ├── ProfileScreen.tsx             # Stats, bio, post grid, follow/edit actions
│   ├── NotificationsScreen.tsx       # Today/Earlier grouped notifications
│   └── MessagesScreen.tsx            # Conversation list
├── components/
│   ├── feed/PostCard.tsx             # Full post with actions, likes, content, time
│   ├── stories/StoryCircle.tsx       # Ring + avatar + username
│   ├── common/NotificationRow.tsx    # Actor + action text + follow CTA
│   └── messages/ConversationRow.tsx  # Avatar + name + last message + unread badge
├── store/index.ts                    # Zustand: posts, stories, notifications, conversations
├── services/mockData.ts             # 6 users, 8 posts, 6 stories, 7 notifications, 4 conversations
├── theme/index.ts                   # Instagram-inspired colors (pink/purple gradients)
├── types/index.ts                   # User, Post, Story, Notification, Conversation, Message
└── utils/index.ts                   # timeAgo, formatCount, generateId
```

## Mock Data

- **6 users** across design, photography, travel, dev, food, fitness niches
- **8 posts** with varied content types (text-only, single image, multi-image), locations, and engagement levels
- **6 stories** with seen/unseen states
- **7 notifications** across all types (like, comment, follow, mention, repost)
- **4 conversations** with unread counts

## Setup

```bash
git clone https://github.com/Shaisolaris/rn-social-media.git
cd rn-social-media
npm install
npx expo start
```

## Key Design Decisions

**Instagram-style feed architecture.** The feed uses FlatList with ListHeaderComponent for stories, matching the pattern used by production social apps. Posts render as self-contained cards with all interactions handled via store actions.

**Relative time everywhere.** The `timeAgo` utility shows "just now", "2h", "3d", "1w" format. No absolute dates in the feed — this matches how social apps display temporal information.

**Optimistic UI for likes/bookmarks.** Toggle actions update the store immediately without waiting for a server response. The like count increments/decrements in sync with the heart icon state change.

**Notification grouping.** Notifications split into Today and Earlier sections based on 24-hour threshold. Unread notifications get a subtle blue background tint. The screen marks all as read on mount.

**Compact number formatting.** Follower/like counts use K/M suffixes (e.g., 42.1K, 1.2M) to keep the UI clean. Raw numbers are only shown below 1,000.

## License

MIT
