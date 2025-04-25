import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import { ThemeProvider } from '../../../theme';
import MemoInputModal from '../MemoInputModal';
import { useReviewStore } from '../../../store/reviewStore';

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

describe('MemoInputModal', () => {
  // Mock store implementation
  const mockSubmitMemo = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Setup store mock
    (useReviewStore as jest.Mock).mockReturnValue({
      submitMemo: mockSubmitMemo,
    });
  });

  it('renders correctly when visible', () => {
    const { getByText, getByPlaceholderText } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={() => {}} />
      </ThemeProvider>
    );

    // Check title and input elements
    expect(getByText('Add Memo')).toBeTruthy();
    expect(getByPlaceholderText('Type your memo here...')).toBeTruthy();

    // Check buttons
    expect(getByText('Cancel')).toBeTruthy();
    expect(getByText('Submit')).toBeTruthy();
  });

  it('does not render when not visible', () => {
    const { queryByText } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={false} onClose={() => {}} />
      </ThemeProvider>
    );

    // Modal should not be visible
    expect(queryByText('Add Memo')).toBeNull();
  });

  it('calls onClose when Cancel button is pressed', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={mockOnClose} />
      </ThemeProvider>
    );

    // Click the cancel button
    fireEvent.press(getByText('Cancel'));

    // Check if onClose was called
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('updates text input value when typing', () => {
    const { getByPlaceholderText } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={() => {}} />
      </ThemeProvider>
    );

    const input = getByPlaceholderText('Type your memo here...');
    fireEvent.changeText(input, 'Test memo');

    // Check if input value was updated
    expect(input.props.value).toBe('Test memo');
  });

  it('calls submitMemo and onClose when submitting non-empty text', () => {
    const mockOnClose = jest.fn();
    const { getByText, getByPlaceholderText } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={mockOnClose} />
      </ThemeProvider>
    );

    // Enter text and submit
    const input = getByPlaceholderText('Type your memo here...');
    fireEvent.changeText(input, 'Test memo');
    fireEvent.press(getByText('Submit'));

    // Check if store action and onClose were called
    expect(mockSubmitMemo).toHaveBeenCalledWith('Test memo');
    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it('does not call submitMemo when submitting empty text', () => {
    const mockOnClose = jest.fn();
    const { getByText } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={mockOnClose} />
      </ThemeProvider>
    );

    // Try to submit without entering text
    fireEvent.press(getByText('Submit'));

    // Verify no actions were taken
    expect(mockSubmitMemo).not.toHaveBeenCalled();
    expect(mockOnClose).not.toHaveBeenCalled();
  });

  it('clears text input when modal is closed and reopened', () => {
    const { getByPlaceholderText, rerender } = render(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={() => {}} />
      </ThemeProvider>
    );

    // Enter text
    const input = getByPlaceholderText('Type your memo here...');
    fireEvent.changeText(input, 'Test memo');

    // Close modal
    rerender(
      <ThemeProvider>
        <MemoInputModal isVisible={false} onClose={() => {}} />
      </ThemeProvider>
    );

    // Reopen modal
    rerender(
      <ThemeProvider>
        <MemoInputModal isVisible={true} onClose={() => {}} />
      </ThemeProvider>
    );

    // Check if input was cleared
    const reopenedInput = getByPlaceholderText('Type your memo here...');
    expect(reopenedInput.props.value).toBe('');
  });
});
