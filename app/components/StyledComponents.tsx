import { View, Text, TextInput, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, StyleProp } from 'react-native';
import { MotiView } from 'moti';
import { AnimatePresence } from 'framer-motion';
import theme from '../theme/theme';

interface BaseProps {
  children?: React.ReactNode;
  style?: StyleProp<ViewStyle>;
}

interface ButtonProps extends BaseProps {
  variant?: 'primary' | 'secondary';
  size?: 'default' | 'large';
  onPress?: () => void;
}

interface BadgeProps extends BaseProps {
  variant?: 'primary' | 'secondary' | 'accent' | 'error' | 'success' | 'warning';
}

// Base Components
export const Card = ({ children, style, ...props }: BaseProps) => (
  <MotiView
    style={[styles.card, style as StyleProp<ViewStyle>]}
    from={{ scale: 0.9, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.9, opacity: 0 }}
    {...props}
  >
    {children}
  </MotiView>
);

// Story Components
export const StoryContent = ({ children, style, ...props }: BaseProps) => (
  <View style={[styles.storyContent, style as StyleProp<ViewStyle>]} {...props}>
    {children}
  </View>
);

export const StoryAudioSection = ({ children, style, ...props }: BaseProps) => (
  <View style={[styles.storyAudioSection, style as StyleProp<ViewStyle>]} {...props}>
    {children}
  </View>
);

export const Grid = ({ children, style, ...props }: BaseProps) => (
  <View style={[styles.grid, style as StyleProp<ViewStyle>]} {...props}>
    {children}
  </View>
);

export const StoryThumbnail = ({ style, ...props }: Omit<BaseProps, 'children'>) => (
  <View style={[styles.storyThumbnail, style as StyleProp<ViewStyle>]} {...props} />
);

export const StoryCard = ({ children, style, ...props }: BaseProps) => (
  <MotiView
    style={[styles.storyCard, style as StyleProp<ViewStyle>]}
    from={{ scale: 0.95, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    exit={{ scale: 0.95, opacity: 0 }}
    {...props}
  >
    {children}
  </MotiView>
);

export const StoryMeta = ({ children, style, ...props }: BaseProps) => (
  <View style={[styles.storyMeta, style as StyleProp<ViewStyle>]} {...props}>
    {children}
  </View>
);

export const Button = ({ children, variant = 'primary', size = 'default', style, onPress, ...props }: ButtonProps) => (
  <TouchableOpacity
    style={[
      styles.button,
      variant === 'secondary' && styles.buttonSecondary,
      size === 'large' && styles.buttonLarge,
      style as StyleProp<ViewStyle>,
    ]}
    onPress={onPress}
    {...props}
  >
    <Text style={styles.buttonText}>{children}</Text>
  </TouchableOpacity>
);

export const Input = ({ style, ...props }: TextInput['props']) => (
  <TextInput
    style={[styles.input, style as StyleProp<TextStyle>]}
    placeholderTextColor={theme.colors.text.tertiary}
    {...props}
  />
);

export const Badge = ({ children, variant = 'primary', style, ...props }: BadgeProps) => (
  <View
    style={[
      styles.badge,
      { backgroundColor: theme.colors[variant] || theme.colors.primary },
      style as StyleProp<ViewStyle>,
    ]}
    {...props}
  >
    <Text style={styles.badgeText}>{children}</Text>
  </View>
);

const styles = StyleSheet.create({
  card: {
    backgroundColor: theme.colors.surface.primary,
    padding: theme.spacing.xl,
    borderRadius: theme.borderRadius.lg,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    margin: 0,
  },
  storyContent: {
    padding: theme.spacing.lg,
    width: '100%',
  },
  storyAudioSection: {
    padding: theme.spacing.md,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
    borderTopWidth: 1,
    borderTopColor: 'rgba(255, 255, 255, 0.1)',
    width: '100%',
  },
  grid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginHorizontal: -theme.spacing.md,
    marginVertical: theme.spacing.xl,
  },
  storyThumbnail: {
    height: 200,
    backgroundColor: theme.colors.gray[200],
    width: '100%',
  },
  storyCard: {
    width: '100%',
    backgroundColor: theme.colors.surface.primary,
    borderRadius: theme.borderRadius.lg,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    marginBottom: theme.spacing.xl,
  },
  storyMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    flexWrap: 'wrap',
    marginTop: theme.spacing.sm,
  },
  button: {
    backgroundColor: theme.colors.primary,
    paddingVertical: theme.spacing.md,
    paddingHorizontal: theme.spacing.lg,
    borderRadius: theme.borderRadius.md,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonSecondary: {
    backgroundColor: theme.colors.secondary,
  },
  buttonLarge: {
    paddingVertical: theme.spacing.lg,
    paddingHorizontal: theme.spacing.xl,
  },
  buttonText: {
    color: 'white',
    fontWeight: '600',
  },
  input: {
    width: '100%',
    padding: theme.spacing.md,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: theme.borderRadius.md,
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.md,
  },
  badge: {
    paddingVertical: theme.spacing.xs,
    paddingHorizontal: theme.spacing.sm,
    borderRadius: theme.borderRadius.full,
    margin: theme.spacing.xs,
  },
  badgeText: {
    color: 'white',
    fontSize: theme.typography.fontSize.sm,
  },
}) as const;

export default {
  Card,
  StoryContent,
  StoryAudioSection,
  Grid,
  StoryThumbnail,
  StoryCard,
  StoryMeta,
  Button,
  Input,
  Badge,
}; 