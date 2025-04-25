import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import CardView from '../CardView';
import { ThemeProvider } from '../../../theme';
import { Card } from '../../../types';

/**
 * Demo component to showcase CardView functionality
 */
export default function CardViewDemo() {
  // Sample card for demonstration
  const demoCard: Card = {
    id: 'demo-card-1',
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'What is the primary color used for action highlights in Scry?',
    choices: [
      { id: 'a', text: 'Signal Green', isCorrect: false },
      { id: 'b', text: 'Cobalt Blue', isCorrect: true },
      { id: 'c', text: 'Warm Amber', isCorrect: false },
      { id: 'd', text: 'Slate Gray', isCorrect: false },
    ],
    createdAt: new Date().toISOString(),
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>CardView Demo</Text>
        <Text style={styles.subtitle}>Try selecting an answer to see the feedback</Text>
        <View style={styles.cardContainer}>
          <CardView card={demoCard} />
        </View>
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 24,
    color: '#757575',
  },
  cardContainer: {
    width: '100%',
  },
});
