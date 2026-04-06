import React, { useState } from "react";
import { View, Text, TextInput, FlatList, StyleSheet, TouchableOpacity } from "react-native";
import { colors, spacing, fontSize, borderRadius } from "../theme/index.js";
import { useAppStore } from "../store/index.js";

const CATEGORIES = ["For You", "Trending", "Design", "Travel", "Food", "Fitness", "Tech"];

export function SearchScreen({ navigation }: { navigation: any }) {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("For You");
  const posts = useAppStore((s) => s.posts);

  const filtered = query ? posts.filter((p) => p.content.toLowerCase().includes(query.toLowerCase()) || p.author.username.includes(query.toLowerCase())) : posts;

  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <Text style={styles.searchIcon}>🔍</Text>
        <TextInput style={styles.searchInput} placeholder="Search" placeholderTextColor={colors.textMuted} value={query} onChangeText={setQuery} />
      </View>

      <ScrollableCategories categories={CATEGORIES} selected={selectedCategory} onSelect={setSelectedCategory} />

      <FlatList
        data={filtered}
        keyExtractor={(p) => p.id}
        numColumns={3}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.gridItem} onPress={() => navigation.navigate("PostDetail", { id: item.id })}>
            <View style={styles.gridImage}><Text style={styles.gridEmoji}>{item.images.length > 0 ? "📸" : "📝"}</Text></View>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}

function ScrollableCategories({ categories, selected, onSelect }: { categories: string[]; selected: string; onSelect: (c: string) => void }) {
  return (
    <FlatList
      horizontal
      data={categories}
      keyExtractor={(c) => c}
      showsHorizontalScrollIndicator={false}
      style={styles.categoriesRow}
      renderItem={({ item }) => (
        <TouchableOpacity style={[styles.categoryChip, selected === item && styles.categoryActive]} onPress={() => onSelect(item)}>
          <Text style={[styles.categoryText, selected === item && styles.categoryTextActive]}>{item}</Text>
        </TouchableOpacity>
      )}
    />
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.background },
  searchBar: { flexDirection: "row", alignItems: "center", backgroundColor: colors.surfaceDark, margin: spacing.md, borderRadius: borderRadius.md, paddingHorizontal: spacing.md },
  searchIcon: { marginRight: spacing.sm },
  searchInput: { flex: 1, paddingVertical: spacing.sm, fontSize: fontSize.md, color: colors.text },
  categoriesRow: { paddingHorizontal: spacing.md, marginBottom: spacing.sm, maxHeight: 40 },
  categoryChip: { paddingHorizontal: spacing.md, paddingVertical: spacing.sm, borderRadius: borderRadius.full, backgroundColor: colors.surfaceDark, marginRight: spacing.sm },
  categoryActive: { backgroundColor: colors.text },
  categoryText: { fontSize: fontSize.sm, color: colors.text, fontWeight: "500" },
  categoryTextActive: { color: colors.surface },
  gridItem: { flex: 1/3, aspectRatio: 1, padding: 1 },
  gridImage: { flex: 1, backgroundColor: colors.surfaceDark, justifyContent: "center", alignItems: "center" },
  gridEmoji: { fontSize: 20 },
});
