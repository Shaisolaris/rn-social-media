import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import { timeAgo } from "../../utils/index.js";
import type { Notification } from "../../types/index.js";

export function NotificationRow({ notification: n }: { notification: Notification }) {
  return (
    <TouchableOpacity style={[styles.container, !n.read && styles.unread]}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{n.actor.avatarUrl}</Text></View>
      <View style={styles.content}>
        <Text style={styles.text}>
          <Text style={styles.username}>{n.actor.username}</Text> {n.text}
        </Text>
        <Text style={styles.time}>{timeAgo(n.createdAt)}</Text>
      </View>
      {n.type === "follow" && (
        <TouchableOpacity style={styles.followBtn}><Text style={styles.followText}>Follow</Text></TouchableOpacity>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  unread: { backgroundColor: colors.secondary + "08" },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 22 },
  content: { flex: 1, marginLeft: spacing.md },
  text: { fontSize: fontSize.md, color: colors.text, lineHeight: 20 },
  username: { fontWeight: "600" },
  time: { fontSize: fontSize.sm, color: colors.textMuted, marginTop: 2 },
  followBtn: { backgroundColor: colors.secondary, paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.md },
  followText: { color: "#fff", fontSize: fontSize.sm, fontWeight: "600" },
});
