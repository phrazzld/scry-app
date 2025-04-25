import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeProvider } from '../../../theme';
import EditCardModal from '../EditCardModal';
import { Card } from '../../../types';
import { useReviewStore } from '../../../store/reviewStore';

/**
 * Demo component to showcase EditCardModal
 */
export default function EditCardModalDemo() {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);

  // Mock card for demonstration
  const [demoCard, setDemoCard] = useState<Card>({
    id: '123',
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
  });

  // Mock the edit card action
  const mockEditCard = (cardId: string, newQuestion: string) => {
    setDemoCard(prevCard => ({
      ...prevCard,
      question: newQuestion,
    }));
  };

  // Replace the real store with our mock version
  jest.mock('../../../store/reviewStore', () => ({
    useReviewStore: () => ({
      editCard: mockEditCard,
    }),
  }));

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>EditCardModal Demo</Text>
        <Text style={styles.subtitle}>
          This demo shows the EditCardModal component for editing card questions.
        </Text>

        <View style={styles.cardPreview}>
          <Text style={styles.cardTitle}>Current Card:</Text>
          <View style={styles.card}>
            <Text style={styles.cardQuestion}>{demoCard.question}</Text>
            <ScrollView style={styles.choicesList}>
              {demoCard.choices.map(choice => (
                <View
                  key={choice.id}
                  style={[styles.choice, choice.isCorrect ? styles.correctChoice : null]}
                >
                  <Text style={styles.choiceText}>
                    {choice.id}. {choice.text}
                    {choice.isCorrect ? ' ✓' : ''}
                  </Text>
                </View>
              ))}
            </ScrollView>
          </View>
        </View>

        <TouchableOpacity style={styles.button} onPress={() => setShowModal(true)}>
          <Text style={styles.buttonText}>Edit Question</Text>
        </TouchableOpacity>

        {/* The EditCardModal component */}
        <EditCardModal isVisible={showModal} onClose={() => setShowModal(false)} card={demoCard} />
      </View>
    </ThemeProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fafafa',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  cardPreview: {
    marginBottom: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 10,
  },
  card: {
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    shadowOpacity: 0.1,
    shadowRadius: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    elevation: 2,
  },
  cardQuestion: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 16,
    color: '#121212',
  },
  choicesList: {
    maxHeight: 200,
  },
  choice: {
    padding: 12,
    borderRadius: 8,
    marginBottom: 8,
    backgroundColor: '#f5f5f5',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  correctChoice: {
    borderColor: '#00A676',
    backgroundColor: 'rgba(0, 166, 118, 0.1)',
  },
  choiceText: {
    fontSize: 16,
    color: '#121212',
  },
  button: {
    backgroundColor: '#0047AB', // cobaltBlue
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
});
