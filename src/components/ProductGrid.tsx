import React from 'react';
import {
  View,
  FlatList,
  StyleSheet,
  Text,
  ActivityIndicator,
} from 'react-native';
import { ProgramCard } from './ProgramCard';
import { Program } from '@types';
import { Colors, Spacing, FontSize } from '@utils';

interface ProductGridProps {
  programs: Program[];
  isLoading?: boolean;
  onProgramPress: (program: Program) => void;
  onAddToCart: (program: Program) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  programs,
  isLoading = false,
  onProgramPress,
  onAddToCart,
}) => {
  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={styles.loadingText}>Memuat program...</Text>
      </View>
    );
  }

  if (programs.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.emptyTitle}>Tidak ada program</Text>
        <Text style={styles.emptyDescription}>
          Coba ubah filter atau cari dengan kata kunci lain
        </Text>
      </View>
    );
  }

  return (
    <FlatList
      data={programs}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <ProgramCard
          program={item}
          onPress={() => onProgramPress(item)}
          onAddToCart={() => onAddToCart(item)}
        />
      )}
      scrollEnabled={false}
      nestedScrollEnabled={false}
      contentContainerStyle={styles.container}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    paddingVertical: Spacing.lg,
  },
  loadingContainer: {
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    marginTop: Spacing.lg,
    fontSize: FontSize.base,
    color: Colors.textSecondary,
  },
  emptyContainer: {
    height: 300,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: Spacing.lg,
  },
  emptyTitle: {
    fontSize: FontSize.lg,
    fontWeight: '600',
    color: Colors.text,
    marginBottom: Spacing.md,
    textAlign: 'center',
  },
  emptyDescription: {
    fontSize: FontSize.sm,
    color: Colors.textSecondary,
    textAlign: 'center',
    lineHeight: 20,
  },
});