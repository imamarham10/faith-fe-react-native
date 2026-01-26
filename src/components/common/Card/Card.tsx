/**
 * Card Component
 * Reusable card container component
 */

import React from 'react';
import {View, StyleSheet, ViewStyle} from 'react-native';
import {Colors, Sizes} from '@constants';
import {BaseComponentProps} from '@types';

export interface CardProps extends BaseComponentProps {
  children: React.ReactNode;
  style?: ViewStyle;
  elevated?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  style,
  elevated = true,
  testID,
}) => {
  const cardStyle: ViewStyle[] = [
    styles.card,
    elevated && styles.cardElevated,
    style,
  ];

  return (
    <View style={cardStyle} testID={testID}>
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.white,
    borderRadius: Sizes.borderRadius.lg,
    padding: Sizes.spacing.md,
  },
  cardElevated: {
    shadowColor: Colors.black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
});
