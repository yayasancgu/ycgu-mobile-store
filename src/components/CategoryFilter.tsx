import React from 'react';
import {
  ScrollView,
  TouchableOpacity,
  Text,
  StyleSheet,
  View,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '@utils';
import { Category } from '@types';

interface CategoryFilterProps {
  categories: Category[];
  selected: string | null;
  onSelectCategory: (categoryId: string) => void;
}

export const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  selected,
  onSelectCategory,
}) => {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={styles.container}
      contentContainerStyle={styles.contentContainer}
    >
      {/* All Categories */}
      <TouchableOpacity
        style={[
          styles.chip,
          selected === 'all' && styles.chipActive,
        ]}
        onPress={() => onSelectCategory('all')}
        activeOpacity={0.7}
      >
        <Ionicons
          name="apps"
          size={16}
          color={selected === 'all' ? 'white' : Colors.textSecondary}
        />
        <Text
          style={[
            styles.chipText,
            selected === 'all' && styles.chipTextActive,
          ]}
        >
          Semua
        </Text>
      </TouchableOpacity>

      {/* Category Chips */}
      {categories.map((category) => (
        <TouchableOpacity
          key={category.id}
          style={[
            styles.chip,
            selected === category.id && styles.chipActive,
          ]}
          onPress={() => onSelectCategory(category.id)}
          activeOpacity={0.7}
        >
          <Ionicons
            name={category.icon as any}
            size={16}
            color={selected === category.id ? 'white' : Colors.textSecondary}
          />
          <Text
            style={[
              styles.chipText,
              selected === category.id && styles.chipTextActive,
            ]}
          >
            {category.name}
          </Text>
          <View
            style={[
              styles.badge,
              selected === category.id && styles.badgeActive,
            ]}
          >
            <Text
              style={[
                styles.badgeText,
                selected === category.id && styles.badgeTextActive,
              ]}
            >
              {category.count}
            </Text>
          </View>
        </TouchableOpacity>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    marginVertical: Spacing.md,
  },
  contentContainer: {
    paddingHorizontal: Spacing.lg,
    gap: Spacing.md,
  },
  chip: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: Spacing.sm,
    paddingVertical: Spacing.md,
    paddingHorizontal: Spacing.lg,
    backgroundColor: Colors.backgroundLight,
    borderRadius: BorderRadius.xl,
    borderWidth: 1,
    borderColor: Colors.border,
  },
  chipActive: {
    backgroundColor: Colors.primary,
    borderColor: Colors.primary,
  },
  chipText: {
    fontSize: FontSize.sm,
    fontWeight: FontWeight.semibold,
    color: Colors.textSecondary,
  },
  chipTextActive: {
    color: 'white',
  },
  badge: {
    backgroundColor: Colors.accent,
    paddingVertical: 2,
    paddingHorizontal: Spacing.sm,
    borderRadius: BorderRadius.full,
  },
  badgeActive: {
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
  },
  badgeText: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: Colors.text,
  },
  badgeTextActive: {
    color: 'white',
  },
});