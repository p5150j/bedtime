import React from 'react';
import { View, Text, ScrollView, StyleSheet, Image } from 'react-native';
import { MotiView } from 'moti';
import theme from '../theme/theme';
import {
  Card,
  StoryContent,
  StoryAudioSection,
  Grid,
  StoryThumbnail,
  StoryCard,
  StoryMeta,
} from '../components/StyledComponents';
import AudioPlayer from '../components/AudioPlayer';

const ExploreScreen = () => {
  const stories = [
    {
      id: '1',
      title: 'The Magic Forest',
      description: 'A wonderful adventure awaits in the enchanted forest...',
      duration: '5 min',
      ageRange: '5-8',
      image: 'https://cdn.midjourney.com/55ace2e0-d376-4634-a888-2834ffb7a250/0_0.jpeg',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    },
    {
      id: '2',
      title: 'Space Adventures',
      description: 'Join Captain Star on an intergalactic journey...',
      duration: '8 min',
      ageRange: '7-10',
      image: 'https://cdn.midjourney.com/e05f5fd9-dbad-49eb-9586-803a5b4ecc04/0_1.jpeg',
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-2.mp3',
    },
  ];

  return (
    <ScrollView style={styles.container}>
      <MotiView
        from={{ opacity: 0, translateY: 20 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 600 }}
      >
        <Text style={styles.title}>Discover Stories</Text>
        <Grid>
          {stories.map((story) => (
            <StoryCard key={story.id}>
              <View style={styles.thumbnailContainer}>
                <Image
                  source={{ uri: story.image }}
                  style={styles.thumbnail}
                  resizeMode="cover"
                />
                <View style={styles.thumbnailOverlay} />
              </View>
              <StoryContent>
                <Text style={styles.storyTitle}>{story.title}</Text>
                <Text style={styles.storyDescription}>{story.description}</Text>
                <StoryMeta>
                  <Text style={styles.metaText}>{story.duration}</Text>
                  <Text style={styles.metaDot}>•</Text>
                  <Text style={styles.metaText}>Age {story.ageRange}</Text>
                </StoryMeta>
              </StoryContent>
              <StoryAudioSection>
                <AudioPlayer
                  audioUrl={story.audioUrl}
                  onPlaybackStatusUpdate={(status) => {
                    console.log('Playback status:', status);
                  }}
                />
              </StoryAudioSection>
            </StoryCard>
          ))}
        </Grid>
      </MotiView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: theme.colors.background.primary,
    padding: theme.spacing.lg,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.xl,
  },
  thumbnailContainer: {
    height: 200,
    width: '100%',
    position: 'relative',
  },
  thumbnail: {
    width: '100%',
    height: '100%',
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  thumbnailOverlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0, 0, 0, 0.2)',
    borderTopLeftRadius: theme.borderRadius.lg,
    borderTopRightRadius: theme.borderRadius.lg,
  },
  storyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: theme.colors.text.primary,
    marginBottom: theme.spacing.sm,
  },
  storyDescription: {
    fontSize: 16,
    color: theme.colors.text.secondary,
    marginBottom: theme.spacing.md,
  },
  metaText: {
    fontSize: 14,
    color: theme.colors.text.tertiary,
  },
  metaDot: {
    fontSize: 14,
    color: theme.colors.text.tertiary,
    marginHorizontal: theme.spacing.xs,
  },
});

export default ExploreScreen;
