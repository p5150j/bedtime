import { View } from 'react-native';
import React from 'react';
import theme from '../../app/theme/theme';

// This is a shim for web and Android where the tab bar is generally opaque.
export default function TabBarBackground() {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: theme.colors.background.primary,
        borderTopWidth: 1,
        borderTopColor: `${theme.colors.surface.tertiary}20`,
      }}
    />
  );
}

export function useBottomTabOverflow() {
  return 0;
}
