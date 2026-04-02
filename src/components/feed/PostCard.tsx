import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { timeAgo, formatCount } from "../../utils/index.js";
import type { Post } from "../../types/index.js";

interface Props { post: Post; onLike: () => void; onBookmark: () => void; onComment: () => void; onProfile: () => void; }

export function PostCard({ post, onLike, onBookmark, onComment, onProfile }: Props) {
  return (
    <View style={styles.container}>
      {/* Header */}
      <TouchableOpacity style={styles.header} onPress={onProfile}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{post.author.avatarUrl}</Text></View>
        <View style={styles.headerInfo}>
          <View style={styles.nameRow}>
            <Text style={styles.username}>{post.author.username}</Text>
            {post.author.isVerified && <Text style={styles.verified}>✓</Text>}
          </View>
          {post.location && <Text style={styles.location}>{post.location}</Text>}
        </View>
        <TouchableOpacity><Text style={styles.moreBtn}>•••</Text></TouchableOpacity>
      </TouchableOpacity>

      {/* Image placeholder */}
      {post.images.length > 0 && (
        <View style={styles.imagePlaceholder}>
          <Text style={styles.imageEmoji}>{post.images.length > 1 ? `📸 ${post.images.length} photos` : "📸"}</Text>
        </View>
      )}

      {/* Actions */}
      <View style={styles.actions}>
        <View style={styles.leftActions}>
          <TouchableOpacity onPress={onLike} style={styles.actionBtn}>
            <Text style={[styles.actionIcon, post.isLiked && { color: colors.heart }]}>{post.isLiked ? "❤️" : "🤍"}</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={onComment} style={styles.actionBtn}>
            <Text style={styles.actionIcon}>💬</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionBtn}>
            <Text style={styles.actionIcon}>📤</Text>
          </TouchableOpacity>
        </View>
        <TouchableOpacity onPress={onBookmark}>
          <Text style={styles.actionIcon}>{post.isBookmarked ? "🔖" : "🏷️"}</Text>
        </TouchableOpacity>
      </View>

      {/* Likes */}
      <Text style={styles.likes}>{formatCount(post.likes)} likes</Text>

      {/* Content */}
      <View style={styles.contentRow}>
        <Text style={styles.content}>
          <Text style={styles.contentUsername}>{post.author.username} </Text>
          {post.content}
        </Text>
      </View>

      {/* Comments */}
      {post.comments > 0 && (
        <TouchableOpacity onPress={onComment}>
          <Text style={styles.viewComments}>View all {formatCount(post.comments)} comments</Text>
        </TouchableOpacity>
      )}

      <Text style={styles.time}>{timeAgo(post.createdAt)}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { backgroundColor: colors.surface, borderBottomWidth: 1, borderBottomColor: colors.border },
  header: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  avatar: { width: 36, height: 36, borderRadius: 18, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 18 },
  headerInfo: { flex: 1, marginLeft: spacing.sm },
  nameRow: { flexDirection: "row", alignItems: "center" },
  username: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  verified: { marginLeft: 4, fontSize: fontSize.sm, color: colors.secondary },
  location: { fontSize: fontSize.sm, color: colors.textSecondary },
  moreBtn: { fontSize: fontSize.lg, color: colors.text, paddingHorizontal: spacing.sm },
  imagePlaceholder: { width: "100%", aspectRatio: 1, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  imageEmoji: { fontSize: 32, color: colors.textSecondary },
  actions: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
  leftActions: { flexDirection: "row", gap: spacing.md },
  actionBtn: { padding: 2 },
  actionIcon: { fontSize: 24 },
  likes: { fontSize: fontSize.md, fontWeight: "600", color: colors.text, paddingHorizontal: spacing.md },
  contentRow: { paddingHorizontal: spacing.md, marginTop: spacing.xs },
  content: { fontSize: fontSize.md, color: colors.text, lineHeight: 20 },
  contentUsername: { fontWeight: "600" },
  viewComments: { fontSize: fontSize.md, color: colors.textSecondary, paddingHorizontal: spacing.md, marginTop: spacing.xs },
  time: { fontSize: fontSize.xs, color: colors.textMuted, paddingHorizontal: spacing.md, marginTop: spacing.xs, marginBottom: spacing.md },
});
