/**
 * Home Screen
 * Main screen displaying daily content
 */

import React from 'react';
import {View, StyleSheet, ScrollView} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {Text, Card, Button} from '@components';
import {Colors, Sizes} from '@constants';

export const HomeScreen: React.FC = () => {
  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <Text variant="h1" color="primary">
            Welcome
          </Text>
          <Text variant="body" color="textSecondary" style={styles.subtitle}>
            Your daily spiritual companion
          </Text>
        </View>

        <Card style={styles.card}>
          <Text variant="h3" style={styles.cardTitle}>
            Daily Content
          </Text>
          <Text variant="body" color="textSecondary" style={styles.cardDescription}>
            Your personalized spiritual content will appear here
          </Text>
          <Button
            title="Get Started"
            onPress={() => {}}
            variant="primary"
            style={styles.button}
          />
        </Card>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    padding: Sizes.spacing.md,
  },
  header: {
    marginBottom: Sizes.spacing.xl,
  },
  subtitle: {
    marginTop: Sizes.spacing.xs,
  },
  card: {
    marginTop: Sizes.spacing.md,
  },
  cardTitle: {
    marginBottom: Sizes.spacing.sm,
  },
  cardDescription: {
    marginBottom: Sizes.spacing.md,
  },
  button: {
    marginTop: Sizes.spacing.sm,
  },
});
