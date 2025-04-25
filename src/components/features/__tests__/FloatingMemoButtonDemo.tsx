import React from 'react';
import { View, Text, StyleSheet, Alert } from 'react-native';
import { ThemeProvider } from '../../../theme';
import FloatingMemoButton from '../FloatingMemoButton';

/**
 * Demo component for FloatingMemoButton
 * Shows the button in context with a simple alert on press
 */
export default function FloatingMemoButtonDemo() {
  // Handler for the button press
  const handlePress = () => {
    Alert.alert('Button Pressed', 'You pressed the floating memo button!');
  };

  return (
    <ThemeProvider>
      <View style={styles.container}>
        <Text style={styles.title}>FloatingMemoButton Demo</Text>
        <Text style={styles.instructions}>
          The floating button should appear in the bottom-right corner.
          Tap it to see the action.
        </Text>

        {/* Content area to demonstrate the button appearing over content */}
        <View style={styles.contentArea}>
          <Text style={styles.contentText}>
            This is the main content area of the app.
            The floating button should appear over this content.
          </Text>
        </View>

        {/* The FloatingMemoButton component */}
        <FloatingMemoButton onPress={handlePress} />
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
  instructions: {
    fontSize: 16,
    marginBottom: 20,
    color: '#666',
  },
  contentArea: {
    flex: 1,
    backgroundColor: '#f0f0f0',
    padding: 20,
    borderRadius: 10,
    justifyContent: 'center',
  },
  contentText: {
    fontSize: 16,
    textAlign: 'center',
  },
});