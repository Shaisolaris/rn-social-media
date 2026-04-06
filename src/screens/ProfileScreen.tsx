import React from "react";
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { formatCount } from "../utils/index.js";
import type { User } from "../types/index.js";

export function ProfileScreen({ route }: { route?: any }) {
  const currentUser = useAppStore((s) => s.currentUser);
  const posts = useAppStore((s) => s.posts);
  const userId = route?.params?.userId;
  const isOwnProfile = !userId || userId === "me";

  // In a real app, fetch user by ID
  const user: User = isOwnProfile ? currentUser : posts.find((p) => p.author.id === userId)?.author || currentUser;
  const userPosts = posts.filter((p) => p.author.id === user.id);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{user.avatarUrl}</Text></View>
        <View style={styles.stats}>
          <View style={styles.stat}><Text style={styles.statValue}>{user.posts}</Text><Text style={styles.statLabel}>Posts</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>{formatCount(user.followers)}</Text><Text style={styles.statLabel}>Followers</Text></View>
          <View style={styles.stat}><Text style={styles.statValue}>{formatCount(user.following)}</Text><Text style={styles.statLabel}>Following</Text></View>
        </View>
      </View>

      <View style={styles.bio}>
        <Text style={styles.displayName}>{user.displayName} {user.isVerified ? "✓" : ""}</Text>
        <Text style={styles.bioText}>{user.bio}</Text>
      </View>

      {isOwnProfile ? (
        <TouchableOpacity style={styles.editBtn}><Text style={styles.editBtnText}>Edit Profile</Text></TouchableOpacity>
      ) : (
        <View style={styles.actionRow}>
          <TouchableOpacity style={[styles.followBtn, user.isFollowing && styles.followingBtn]}>
            <Text style={[styles.followBtnText, user.isFollowing && styles.followingBtnText]}>{user.isFollowing ? "Following" : "Follow"}</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.messageBtn}><Text style={styles.messageBtnText}>Message</Text></TouchableOpacity>
        </View>
      )}

      <View style={styles.grid}>
        {userPosts.map((post) => (
          <View key={post.id} style={styles.gridItem}>
            <View style={styles.gridImage}><Text style={styles.gridEmoji}>{post.images.length > 0 ? "📸" : "📝"}</Text></View>
          </View>
        ))}
        {userPosts.length === 0 && <Text style={styles.noPosts}>No posts yet</Text>}
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", alignItems: "center", padding: spacing.md },
  avatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 36 },
  stats: { flex: 1, flexDirection: "row", justifyContent: "space-around", marginLeft: spacing.md },
  stat: { alignItems: "center" },
  statValue: { fontSize: fontSize.lg, fontWeight: "700", color: colors.text },
  statLabel: { fontSize: fontSize.sm, color: colors.textSecondary },
  bio: { paddingHorizontal: spacing.md },
  displayName: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  bioText: { fontSize: fontSize.md, color: colors.text, marginTop: spacing.xs, lineHeight: 20 },
  editBtn: { marginHorizontal: spacing.md, marginTop: spacing.md, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingVertical: spacing.sm, alignItems: "center" },
  editBtnText: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  actionRow: { flexDirection: "row", gap: spacing.sm, paddingHorizontal: spacing.md, marginTop: spacing.md },
  followBtn: { flex: 1, backgroundColor: colors.secondary, borderRadius: borderRadius.md, paddingVertical: spacing.sm, alignItems: "center" },
  followingBtn: { backgroundColor: colors.surface, borderWidth: 1, borderColor: colors.border },
  followBtnText: { color: "#fff", fontSize: fontSize.md, fontWeight: "600" },
  followingBtnText: { color: colors.text },
  messageBtn: { flex: 1, borderWidth: 1, borderColor: colors.border, borderRadius: borderRadius.md, paddingVertical: spacing.sm, alignItems: "center" },
  messageBtnText: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  grid: { flexDirection: "row", flexWrap: "wrap", marginTop: spacing.lg },
  gridItem: { width: "33.33%", aspectRatio: 1, padding: 1 },
  gridImage: { flex: 1, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  gridEmoji: { fontSize: 20 },
  noPosts: { textAlign: "center", color: colors.textMuted, width: "100%", paddingVertical: spacing.xxl },
});
