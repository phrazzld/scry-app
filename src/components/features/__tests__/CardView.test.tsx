import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import CardView from '../CardView';
import { ThemeProvider } from '../../../theme';
import { v4 as uuidv4 } from 'uuid';
import { Card } from '../../../types';
import { useReviewStore } from '../../../store/reviewStore';

// Mock the useReviewStore hook
jest.mock('../../../store/reviewStore', () => ({
  useReviewStore: jest.fn(),
}));

// Mock MotiView as a simple View to avoid animation-related test issues
jest.mock('moti', () => {
  const { View } = require('react-native');
  return {
    MotiView: View,
  };
});

describe('CardView', () => {
  // Sample card data for testing
  const mockCard: Card = {
    id: uuidv4(),
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'Test question?',
    choices: [
      { id: 'a', text: 'Option A', isCorrect: false },
      { id: 'b', text: 'Option B', isCorrect: true },
      { id: 'c', text: 'Option C', isCorrect: false },
    ],
    createdAt: new Date().toISOString(),
  };

  // Mock store implementation
  const mockAnswerCard = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    (useReviewStore as jest.Mock).mockReturnValue({
      answerCard: mockAnswerCard,
    });
  });

  it('renders card question and choices correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CardView card={mockCard} />
      </ThemeProvider>
    );

    // Check question
    expect(getByText('Test question?')).toBeTruthy();
    
    // Check choices
    expect(getByText('Option A')).toBeTruthy();
    expect(getByText('Option B')).toBeTruthy();
    expect(getByText('Option C')).toBeTruthy();
  });

  it('handles choice selection correctly', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CardView card={mockCard} />
      </ThemeProvider>
    );

    // Select an answer
    fireEvent.press(getByText('Option A'));

    // Check if answerCard was called with the right parameters
    expect(mockAnswerCard).toHaveBeenCalledWith(mockCard.id, 'a');
  });

  it('disables choices after selection', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CardView card={mockCard} />
      </ThemeProvider>
    );

    // First, all options should be pressable
    const optionA = getByText('Option A');
    const optionB = getByText('Option B');
    
    // Select option A
    fireEvent.press(optionA);
    
    // Try to select option B (should not trigger another call to answerCard)
    fireEvent.press(optionB);
    
    // Verify answerCard was only called once
    expect(mockAnswerCard).toHaveBeenCalledTimes(1);
  });
});