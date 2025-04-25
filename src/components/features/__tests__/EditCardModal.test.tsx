import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../../theme';
import EditCardModal from '../EditCardModal';
import { useReviewStore } from '../../../store/reviewStore';
import { Card } from '../../../types';

// Mock the Zustand store
jest.mock('../../../store/reviewStore', () => ({
  useReviewStore: jest.fn(),
}));

// Mock the Modal component
jest.mock('react-native/Libraries/Modal/Modal', () => {
  const React = require('react');
  const mockComponent = ({ children, visible, ...props }) => {
    if (!visible) return null;
    return (
      <mock-modal testID="modal" {...props}>
        {children}
      </mock-modal>
    );
  };
  return mockComponent;
});

describe('EditCardModal', () => {
  // Mock store implementation
  const mockEditCard = jest.fn();
  
  // Mock card data
  const mockCard: Card = {
    id: '123',
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'What is the capital of France?',
    choices: [
      { id: 'a', text: 'Berlin', isCorrect: false },
      { id: 'b', text: 'Paris', isCorrect: true },
      { id: 'c', text: 'London', isCorrect: false },
      { id: 'd', text: 'Rome', isCorrect: false },
    ],
    createdAt: new Date().toISOString()
  };

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup store mock
    (useReviewStore as jest.Mock).mockReturnValue({
      editCard: mockEditCard,
    });
  });

  it('renders correctly when visible with card data', () => {
    const { getByText, getByDisplayValue } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );

    // Check title and input elements
    expect(getByText('Edit Card')).toBeTruthy();
    expect(getByDisplayValue('What is the capital of France?')).toBeTruthy();
    
    // Check buttons
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Save')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <EditCardModal isVisible={false} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );

    // Modal should not be visible
    expect(queryByText('Edit Card')).toBeNull();
  });

  it('does not render when card is null', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={null} />
      </ThemeProvider>
    );

    // Modal should not render with null card
    expect(queryByText('Edit Card')).toBeNull();
  });

  it('calls onClose when Cancel button is pressed', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={mockOnClose} card={mockCard} />
      </ThemeProvider>
    );

    // Click the cancel button
    fireEvent.press(getByText('Cancel'));
    
    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('updates text input value when typing', () => {
    const { getByDisplayValue } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );

    const input = getByDisplayValue('What is the capital of France?');
    fireEvent.changeText(input, 'What is the capital of Germany?');
    
    // Check if input value was updated
    expect(input.props.value).toBe('What is the capital of Germany?');
  });

  it('calls editCard and onClose when saving non-empty text', () => {
    const mockOnClose = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={mockOnClose} card={mockCard} />
      </ThemeProvider>
    );

    // Update the question text
    const input = getByDisplayValue('What is the capital of France?');
    fireEvent.changeText(input, 'What is the capital of Germany?');
    
    // Save the changes
    fireEvent.press(getByText('Save'));
    
    // Check if store action and onClose were called
    expect(mockEditCard).toHaveBeenCalledWith('123', 'What is the capital of Germany?');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call editCard when saving empty text', () => {
    const mockOnClose = jest.fn();
    const { getByText, getByDisplayValue } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={mockOnClose} card={mockCard} />
      </ThemeProvider>
    );

    // Set empty text
    const input = getByDisplayValue('What is the capital of France?');
    fireEvent.changeText(input, '   ');
    
    // Try to save
    fireEvent.press(getByText('Save'));
    
    // Verify no actions were taken
    expect(mockEditCard).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('resets text to original question when modal is closed and reopened', () => {
    const { getByDisplayValue, rerender } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );

    // Change the text
    const input = getByDisplayValue('What is the capital of France?');
    fireEvent.changeText(input, 'What is the capital of Germany?');
    
    // Close modal
    rerender(
      <ThemeProvider>
        <EditCardModal isVisible={false} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );
    
    // Reopen modal
    rerender(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );
    
    // Check if input was reset to original question
    expect(getByDisplayValue('What is the capital of France?')).toBeTruthy();
  });

  it('updates input when card prop changes', () => {
    const { getByDisplayValue, rerender } = render(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={mockCard} />
      </ThemeProvider>
    );

    // Initial value
    expect(getByDisplayValue('What is the capital of France?')).toBeTruthy();
    
    // New card data
    const newMockCard = {
      ...mockCard,
      id: '456',
      question: 'What is the capital of Germany?'
    };
    
    // Update with new card
    rerender(
      <ThemeProvider>
        <EditCardModal isVisible={true} onClose={() => {}} card={newMockCard} />
      </ThemeProvider>
    );
    
    // Check if input shows new card question
    expect(getByDisplayValue('What is the capital of Germany?')).toBeTruthy();
  });
});