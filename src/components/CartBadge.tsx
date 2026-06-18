import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Colors, Spacing, BorderRadius, FontSize, FontWeight } from '@utils';

interface CartBadgeProps {
  count: number;
}

export const CartBadge: React.FC<CartBadgeProps> = ({ count }) => {
  if (count === 0) return null;

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{count > 99 ? '99+' : count}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: -8,
    right: -8,
    backgroundColor: Colors.error,
    borderRadius: BorderRadius.full,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: Colors.background,
  },
  text: {
    fontSize: FontSize.xs,
    fontWeight: FontWeight.bold,
    color: 'white',
  },
});