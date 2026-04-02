import React, { useEffect } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { colors, spacing, fontSize } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { NotificationRow } from "../components/common/NotificationRow.js";

export function NotificationsScreen() {
  const notifications = useAppStore((s) => s.notifications);
  const markRead = useAppStore((s) => s.markNotificationsRead);

  useEffect(() => { markRead(); }, [markRead]);

  const today = notifications.filter((n) => Date.now() - new Date(n.createdAt).getTime() < 86400000);
  const earlier = notifications.filter((n) => Date.now() - new Date(n.createdAt).getTime() >= 86400000);

  return (
    <View style={styles.container}>
      <FlatList
        data={[...today, ...earlier]}
        keyExtractor={(n) => n.id}
        ListHeaderComponent={today.length > 0 ? <Text style={styles.sectionTitle}>Today</Text> : null}
        renderItem={({ item, index }) => (
          <>
            {index === today.length && earlier.length > 0 && <Text style={styles.sectionTitle}>Earlier</Text>}
            <NotificationRow notification={item} />
          </>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  sectionTitle: { fontSize: fontSize.lg, fontWeight: "600", color: colors.text, paddingHorizontal: spacing.md, paddingVertical: spacing.sm },
});
