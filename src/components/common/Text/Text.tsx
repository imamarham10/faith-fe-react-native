/**
 * Text Component
 * Custom text component with typography variants
 */

import React from 'react';
import {Text as RNText, StyleSheet, TextStyle, TextProps as RNTextProps} from 'react-native';
import {Colors, Sizes} from '@constants';
import {BaseComponentProps} from '@types';

export interface TextProps extends RNTextProps, BaseComponentProps {
  variant?: 'h1' | 'h2' | 'h3' | 'body' | 'caption' | 'label';
  color?: keyof typeof Colors;
  align?: 'left' | 'center' | 'right';
  bold?: boolean;
}

export const Text: React.FC<TextProps> = ({
  children,
  variant = 'body',
  color = 'text',
  align = 'left',
  bold = false,
  style,
  testID,
  ...props
}) => {
  const textStyle: TextStyle[] = [
    styles.text,
    styles[`text_${variant}`],
    {color: Colors[color]},
    {textAlign: align},
    bold && styles.textBold,
    style as TextStyle,
  ];

  return (
    <RNText style={textStyle} testID={testID} {...props}>
      {children}
    </RNText>
  );
};

const styles = StyleSheet.create({
  text: {
    color: Colors.text,
  },
  text_h1: {
    fontSize: Sizes.fontSize.xxxl,
    fontWeight: '700',
    lineHeight: 40,
  },
  text_h2: {
    fontSize: Sizes.fontSize.xxl,
    fontWeight: '700',
    lineHeight: 32,
  },
  text_h3: {
    fontSize: Sizes.fontSize.xl,
    fontWeight: '600',
    lineHeight: 28,
  },
  text_body: {
    fontSize: Sizes.fontSize.md,
    lineHeight: 24,
  },
  text_caption: {
    fontSize: Sizes.fontSize.sm,
    lineHeight: 20,
  },
  text_label: {
    fontSize: Sizes.fontSize.sm,
    fontWeight: '600',
    lineHeight: 20,
  },
  textBold: {
    fontWeight: '700',
  },
});
