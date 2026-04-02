import React from "react";
import { View, Text, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize } from "../theme/index.js";
import { useAppStore } from "../store/index.js";
import { ConversationRow } from "../components/messages/ConversationRow.js";

export function MessagesScreen({ navigation }: { navigation: any }) {
  const conversations = useAppStore((s) => s.conversations);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Messages</Text>
        <TouchableOpacity><Text style={styles.newBtn}>✏️</Text></TouchableOpacity>
      </View>
      <FlatList
        data={conversations}
        keyExtractor={(c) => c.id}
        renderItem={({ item }) => <ConversationRow conversation={item} onPress={() => navigation.navigate("Chat", { conversationId: item.id })} />}
        ListEmptyComponent={<Text style={styles.empty}>No messages yet</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  header: { flexDirection: "row", justifyContent: "space-between", alignItems: "center", paddingHorizontal: spacing.md, paddingVertical: spacing.md, borderBottomWidth: 1, borderBottomColor: colors.border },
  title: { fontSize: fontSize.xxl, fontWeight: "700", color: colors.text },
  newBtn: { fontSize: 24 },
  empty: { textAlign: "center", color: colors.textMuted, marginTop: spacing.xxl },
});
