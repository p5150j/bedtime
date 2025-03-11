import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet, Text, Pressable } from 'react-native';
import { Audio } from 'expo-av';
import { MotiView } from 'moti';
import { LinearGradient } from 'expo-linear-gradient';
import theme from '../theme/theme';
import { IconSymbol } from '@/components/ui/IconSymbol';

interface AudioPlayerProps {
  audioUrl: string;
  onPlaybackStatusUpdate?: (status: any) => void;
}

const AudioPlayer = ({ audioUrl, onPlaybackStatusUpdate }: AudioPlayerProps) => {
  const [sound, setSound] = useState<Audio.Sound | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [position, setPosition] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isScrubbing, setIsScrubbing] = useState(false);

  useEffect(() => {
    return sound
      ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, [sound]);

  const loadAudio = async () => {
    try {
      const { sound: newSound } = await Audio.Sound.createAsync(
        { uri: audioUrl },
        { shouldPlay: false },
        (status) => {
          if (status.isLoaded) {
            setPosition(status.positionMillis);
            setDuration(status.durationMillis || 0);
            setIsPlaying(status.isPlaying);
          }
          onPlaybackStatusUpdate?.(status);
        }
      );
      
      await Audio.setAudioModeAsync({
        playsInSilentModeIOS: true,
        staysActiveInBackground: true,
        shouldDuckAndroid: true,
      });
      
      setSound(newSound);
    } catch (error) {
      console.error('Error loading audio:', error);
    }
  };

  useEffect(() => {
    loadAudio();
  }, [audioUrl]);

  const playPauseAudio = async () => {
    if (!sound) return;

    try {
      if (isPlaying) {
        await sound.pauseAsync();
      } else {
        await sound.playAsync();
      }
    } catch (error) {
      console.error('Error playing/pausing audio:', error);
    }
  };

  const handleScrubbing = async (event: any) => {
    if (!sound || !duration) return;

    const { locationX } = event.nativeEvent;
    const progressBarWidth = event.currentTarget.getBoundingClientRect().width;
    const percentage = locationX / progressBarWidth;
    const newPosition = Math.max(0, Math.min(duration, duration * percentage));

    setPosition(newPosition);
    if (!isScrubbing) {
      try {
        await sound.setPositionAsync(newPosition);
      } catch (error) {
        console.error('Error seeking audio:', error);
      }
    }
  };

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000);
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={styles.playButtonContainer}
        onPress={playPauseAudio}
      >
        <LinearGradient
          colors={[
            theme.colors.gradients.primary.start,
            theme.colors.gradients.primary.middle,
            theme.colors.gradients.primary.end,
          ]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.playButton}
        >
          <MotiView
            animate={{
              scale: isPlaying ? [1, 1.1, 1] : 1,
            }}
            transition={{
              loop: isPlaying,
              duration: 1000,
            }}
          >
            <IconSymbol
              size={24}
              name={isPlaying ? "pause.fill" : "play.fill"}
              color={theme.colors.text.primary}
            />
          </MotiView>
        </LinearGradient>
      </TouchableOpacity>

      <View style={styles.progressContainer}>
        <Pressable 
          style={styles.progressBar}
          onTouchStart={() => setIsScrubbing(true)}
          onTouchEnd={() => setIsScrubbing(false)}
          onTouchMove={handleScrubbing}
        >
          <LinearGradient
            colors={[
              theme.colors.gradients.secondary.start,
              theme.colors.gradients.secondary.middle,
              theme.colors.gradients.secondary.end,
            ]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={[
              styles.progressFill,
              { width: `${(position / (duration || 1)) * 100}%` }
            ]}
          />
        </Pressable>
        <View style={styles.timeContainer}>
          <Text style={styles.timeText}>{formatTime(position)}</Text>
          <Text style={styles.timeText}>{formatTime(duration)}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: theme.spacing.md,
    backgroundColor: theme.colors.background.secondary,
    borderRadius: theme.borderRadius.lg,
  },
  playButtonContainer: {
    marginRight: theme.spacing.md,
    borderRadius: 24,
    overflow: 'hidden',
  },
  playButton: {
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  progressContainer: {
    flex: 1,
  },
  progressBar: {
    height: 4,
    backgroundColor: theme.colors.surface.tertiary,
    borderRadius: 2,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    borderRadius: 2,
  },
  timeContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: theme.spacing.xs,
  },
  timeText: {
    fontSize: 12,
    color: theme.colors.text.secondary,
  },
});

export default AudioPlayer; 