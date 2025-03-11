import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
import { BlurView } from 'expo-blur';
import { StyleSheet } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import theme from '../../app/theme/theme';

export default function BlurTabBarBackground() {
  return (
    <BlurView
      // System chrome material automatically adapts to the system's theme
      // and matches the native tab bar appearance on iOS.
      tint="dark"
      intensity={80}
      style={[
        StyleSheet.absoluteFill,
        {
          backgroundColor: `${theme.colors.background.primary}CC`,
          borderTopWidth: 1,
          borderTopColor: `${theme.colors.surface.tertiary}20`,
        }
      ]}
    />
  );
}

export function useBottomTabOverflow() {
  const tabHeight = useBottomTabBarHeight();
  const { bottom } = useSafeAreaInsets();
  return tabHeight - bottom;
}
