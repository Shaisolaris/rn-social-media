import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity, ScrollView } from "react-native";
import { colors, spacing, fontSize } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { PostCard } from "../components/feed/PostCard.js";
import { StoryCircle } from "../components/stories/StoryCircle.js";

export function FeedScreen({ navigation }: { navigation: any }) {
  const posts = useAppStore((s) => s.posts);
  const stories = useAppStore((s) => s.stories);
  const toggleLike = useAppStore((s) => s.toggleLike);
  const toggleBookmark = useAppStore((s) => s.toggleBookmark);
  const unreadMessages = useAppStore((s) => s.unreadMessages);

  const renderHeader = () => (
    <>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.storiesRow}>
        {stories.map((story, i) => (
          <StoryCircle key={story.id} story={story} isCurrentUser={i === 0} onPress={() => navigation.navigate("StoryViewer", { userId: story.user.id })} />
        ))}
      </ScrollView>
      <View style={styles.divider} />
    </>
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.logo}>SocialApp</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity onPress={() => navigation.navigate("Notifications")} style={styles.headerBtn}>
            <Text style={styles.headerIcon}>❤️</Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate("Messages")} style={styles.headerBtn}>
            <Text style={styles.headerIcon}>✉️</Text>
            {unreadMessages > 0 && <View style={styles.unreadDot} />}
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={posts}
        keyExtractor={(p) => p.id}
        ListHeaderComponent={renderHeader}
        renderItem={({ item }) => (
          <PostCard
            post={item}
            onLike={() => toggleLike(item.id)}
            onBookmark={() => toggleBookmark(item.id)}
            onComment={() => navigation.navigate("PostDetail", { id: item.id })}
            onProfile={() => navigation.navigate("Profile", { userId: item.author.id })}
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderBottomWidth: 1, borderBottomColor: colors.border, backgroundColor: colors.surface },
  logo: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text, fontStyle: "italic" },
  headerActions: { flexDirection: "row", gap: spacing.md },
  headerBtn: { position: "relative" },
  headerIcon: { fontSize: 24 },
  unreadDot: { position: "absolute", top: -2, right: -2, width: 8, height: 8, borderRadius: 4, backgroundColor: colors.danger },
  storiesRow: { paddingVertical: spacing.sm, paddingLeft: spacing.md },
  divider: { height: 1, backgroundColor: colors.border },
});
