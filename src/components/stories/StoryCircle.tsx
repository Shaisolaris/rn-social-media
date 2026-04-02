import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../../theme/index.js";
import type { Story } from "../../types/index.js";

interface Props { story: Story; onPress: () => void; isCurrentUser?: boolean; }

export function StoryCircle({ story, onPress, isCurrentUser }: Props) {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={[styles.ring, story.seen && styles.ringSeen]}>
        <View style={styles.avatar}><Text style={styles.avatarText}>{story.user.avatarUrl}</Text></View>
      </View>
      {isCurrentUser && !story.items.length && <View style={styles.addBadge}><Text style={styles.addIcon}>+</Text></View>}
      <Text style={styles.username} numberOfLines={1}>{isCurrentUser ? "Your story" : story.user.username.split(".")[0]}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", width: 76, marginRight: spacing.sm },
  ring: { width: 68, height: 68, borderRadius: 34, borderWidth: 2.5, borderColor: colors.primary, padding: 2, justifyContent: "center", alignItems: "center" },
  ringSeen: { borderColor: colors.textMuted },
  avatar: { width: 58, height: 58, borderRadius: 29, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  avatarText: { fontSize: 28 },
  addBadge: { position: "absolute", bottom: 18, right: 8, width: 20, height: 20, borderRadius: 10, backgroundColor: colors.secondary, justifyContent: "center", alignItems: "center", borderWidth: 2, borderColor: colors.surface },
  addIcon: { color: "#fff", fontSize: 14, fontWeight: "700", lineHeight: 16 },
  username: { fontSize: fontSize.xs, color: colors.text, marginTop: spacing.xs, textAlign: "center" },
});
