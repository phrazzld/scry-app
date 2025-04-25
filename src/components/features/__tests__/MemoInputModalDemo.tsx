import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { ThemeProvider } from '../../../theme';
import MemoInputModal from '../MemoInputModal';
import { useReviewStore } from '../../../store/reviewStore';

/**
 * Demo component to showcase MemoInputModal
 */
export default function MemoInputModalDemo() {
  // State to control modal visibility
  const [showModal, setShowModal] = useState(false);
  
  // Simplified submitMemo implementation for the demo
  const [memos, setMemos] = useState<Array<{ id: string; text: string; createdAt: string }>>([]);
  
  // Mock the store submitMemo action
  const mockSubmitMemo = (text: string) => {
    const newMemo = {
      id: Date.now().toString(),
      text,
      createdAt: new Date().toISOString(),
    };
    setMemos(prevMemos => [...prevMemos, newMemo]);
  };

  // Replace the real store with our mock version
  jest.mock('../../../store/reviewStore', () => ({
    useReviewStore: () => ({
      submitMemo: mockSubmitMemo,
    }),
  }));

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>MemoInputModal Demo</Text>
        <Text style={styles.subtitle}>
          This demo shows the MemoInputModal component for adding text memos.
        </Text>

        <TouchableOpacity 
          style={styles.button} 
          onPress={() => setShowModal(true)}
        >
          <Text style={styles.buttonText}>Open Modal</Text>
        </TouchableOpacity>

        {/* Display submitted memos */}
        <View style={styles.memosContainer}>
          <Text style={styles.memosTitle}>Submitted Memos:</Text>
          <ScrollView style={styles.memosList}>
            {memos.length === 0 ? (
              <Text style={styles.noMemosText}>No memos yet. Try adding one!</Text>
            ) : (
              memos.map(memo => (
                <View key={memo.id} style={styles.memoItem}>
                  <Text style={styles.memoText}>{memo.text}</Text>
                  <Text style={styles.memoDate}>
                    {new Date(memo.createdAt).toLocaleString()}
                  </Text>
                </View>
              ))
            )}
          </ScrollView>
        </View>

        {/* The MemoInputModal component */}
        <MemoInputModal 
          isVisible={showModal}
          onClose={() => setShowModal(false)}
        />
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
  button: {
    backgroundColor: '#0047AB', // cobaltBlue
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500',
  },
  memosContainer: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 16,
    borderRadius: 10,
  },
  memosTitle: {
    fontSize: 18,
    fontWeight: '500',
    marginBottom: 12,
  },
  memosList: {
    flex: 1,
  },
  memoItem: {
    backgroundColor: 'white',
    padding: 12,
    borderRadius: 8,
    marginBottom: 10,
    borderLeftWidth: 3,
    borderLeftColor: '#0047AB',
  },
  memoText: {
    fontSize: 16,
    marginBottom: 8,
  },
  memoDate: {
    fontSize: 12,
    color: '#999',
    textAlign: 'right',
  },
  noMemosText: {
    fontSize: 14,
    color: '#999',
    fontStyle: 'italic',
    textAlign: 'center',
    marginTop: 20,
  },
});