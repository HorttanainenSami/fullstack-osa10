import React from 'react';
import { Text as NativeText, StyleSheet } from 'react-native';
import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontWeight: theme.fontWeights.normal,
  },
  colorTextSecondary: {
    color: theme.colors.textSecondary,
  },
  colorTextPrimary: {
    color: theme.colors.primary,
  },
  fontSizeTextSecondary: {
    fontSize: theme.fontSizes.subheading,
  },
  fontBoldText: {
    fontWeight:  theme.fontWeights.bold,
  },
  colorTextWhite: {
    color: theme.colors.textWhite,
  }


});
const Text = ({color, fontSize, fontWeight, style, ...props}) => {
  const textStyle = [
    styles.text,
    color === 'textSecondary' && styles.colorTextSecondary,
    color === 'textPrimary' && styles.colorTextPrimary,
    color === 'textWhite' && styles.colorTextWhite,
    fontSize === 'subheading' && styles.fontSizeTextSecondary,
    fontWeight === 'bold' && styles.fontBoldText,

    style,
  ];
  return <NativeText style={textStyle} {...props} />;
};

export default Text;
