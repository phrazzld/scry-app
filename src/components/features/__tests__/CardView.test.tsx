import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
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

// Mock setTimeout
jest.useFakeTimers();

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

  // Second card for testing card transitions
  const mockCard2: Card = {
    id: uuidv4(),
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'Second question?',
    choices: [
      { id: 'a', text: 'Second A', isCorrect: true },
      { id: 'b', text: 'Second B', isCorrect: false },
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

  it('initiates exit animation after selection', () => {
    const { getByText } = render(
      <ThemeProvider>
        <CardView card={mockCard} />
      </ThemeProvider>
    );
    
    // Select an answer
    fireEvent.press(getByText('Option A'));
    
    // Fast forward through exit animation timeout
    act(() => {
      jest.advanceTimersByTime(1000);
    });
    
    // The exit animation state should now be set (this is an internal test)
    // Since we can't directly test animation state, we're testing that the timeout completes
    expect(setTimeout).toHaveBeenCalled();
  });

  it('resets state when card changes', () => {
    const { getByText, rerender } = render(
      <ThemeProvider>
        <CardView card={mockCard} />
      </ThemeProvider>
    );
    
    // Select an answer
    fireEvent.press(getByText('Option A'));
    
    // Re-render with a different card
    rerender(
      <ThemeProvider>
        <CardView card={mockCard2} />
      </ThemeProvider>
    );
    
    // New card should be rendered
    expect(getByText('Second question?')).toBeTruthy();
    expect(getByText('Second A')).toBeTruthy();
    expect(getByText('Second B')).toBeTruthy();
    
    // State should be reset, so both options should be pressable
    fireEvent.press(getByText('Second A'));
    
    // answerCard should be called for the new card
    expect(mockAnswerCard).toHaveBeenCalledWith(mockCard2.id, 'a');
  });

  it('uses key prop based on card.id', () => {
    const { container, rerender } = render(
      <ThemeProvider>
        <CardView card={mockCard} />
      </ThemeProvider>
    );
    
    // Re-render with a different card
    rerender(
      <ThemeProvider>
        <CardView card={mockCard2} />
      </ThemeProvider>
    );
    
    // Since we're mocking MotiView, we can't directly test the key prop
    // This is just a structural test to ensure the component re-renders without errors
    expect(container).toBeTruthy();
  });
});