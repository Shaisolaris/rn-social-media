import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize } from "../../theme/index.js";
import { timeAgo } from "../../utils/index.js";
import type { Conversation } from "../../types/index.js";

export function ConversationRow({ conversation: c, onPress }: { conversation: Conversation; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.avatar}><Text style={styles.avatarText}>{c.participant.avatarUrl}</Text></View>
      <View style={styles.content}>
        <Text style={styles.name}>{c.participant.displayName}</Text>
        <Text style={[styles.message, c.unreadCount > 0 && styles.messageUnread]} numberOfLines={1}>{c.lastMessage}</Text>
      </View>
      <View style={styles.meta}>
        <Text style={styles.time}>{timeAgo(c.lastMessageAt)}</Text>
        {c.unreadCount > 0 && <View style={styles.badge}><Text style={styles.badgeText}>{c.unreadCount}</Text></View>}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center", paddingVertical: spacing.md, paddingHorizontal: spacing.md },
  avatar: { width: 52, height: 52, borderRadius: 26, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 26 },
  content: { flex: 1, marginLeft: spacing.md },
  name: { fontSize: fontSize.md, fontWeight: "600", color: colors.text },
  message: { fontSize: fontSize.md, color: colors.textSecondary, marginTop: 2 },
  messageUnread: { color: colors.text, fontWeight: "500" },
  meta: { alignItems: "flex-end" },
  time: { fontSize: fontSize.sm, color: colors.textMuted },
  badge: { backgroundColor: colors.primary, borderRadius: 10, minWidth: 20, height: 20, justifyContent: "center", alignItems: "center", marginTop: spacing.xs, paddingHorizontal: 6 },
  badgeText: { color: "#fff", fontSize: fontSize.xs, fontWeight: "700" },
});
