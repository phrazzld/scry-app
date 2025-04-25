import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import ChoiceButton from '../ChoiceButton';
import { colors } from '../../../theme';

/**
 * A demo component to visually check different ChoiceButton states
 * This is not used in the actual app, but can be used for manual testing
 */
const ChoiceButtonDemo = () => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleChoiceSelect = (choiceId: string, isCorrect: boolean) => {
    setSelectedOption(choiceId);
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Reset after 2 seconds
    setTimeout(() => {
      setSelectedOption(null);
      setFeedback(null);
    }, 2000);
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.heading}>ChoiceButton Component Demo</Text>

      <View style={styles.section}>
        <Text style={styles.subheading}>Default State Buttons:</Text>
        <ChoiceButton
          text="Option A"
          onPress={() => handleChoiceSelect('A', true)}
          state="default"
        />
        <ChoiceButton
          text="Option B"
          onPress={() => handleChoiceSelect('B', false)}
          state="default"
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>All Button States:</Text>
        <ChoiceButton text="Default State" onPress={() => {}} state="default" />
        <ChoiceButton text="Selected State" onPress={() => {}} state="selected" />
        <ChoiceButton text="Correct State" onPress={() => {}} state="correct" />
        <ChoiceButton text="Incorrect State" onPress={() => {}} state="incorrect" />
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Interactive Example:</Text>
        <Text style={styles.instructions}>
          Select an option below. The correct answer is "Paris".
        </Text>

        <ChoiceButton
          text="London"
          onPress={() => handleChoiceSelect('London', false)}
          state={
            selectedOption === 'London'
              ? feedback === 'correct'
                ? 'correct'
                : 'incorrect'
              : selectedOption === null
                ? 'default'
                : 'default'
          }
          disabled={selectedOption !== null}
        />

        <ChoiceButton
          text="Paris"
          onPress={() => handleChoiceSelect('Paris', true)}
          state={
            selectedOption === 'Paris'
              ? feedback === 'correct'
                ? 'correct'
                : 'incorrect'
              : selectedOption === null
                ? 'default'
                : 'default'
          }
          disabled={selectedOption !== null}
        />

        <ChoiceButton
          text="Berlin"
          onPress={() => handleChoiceSelect('Berlin', false)}
          state={
            selectedOption === 'Berlin'
              ? feedback === 'correct'
                ? 'correct'
                : 'incorrect'
              : selectedOption === null
                ? 'default'
                : 'default'
          }
          disabled={selectedOption !== null}
        />

        <ChoiceButton
          text="Rome"
          onPress={() => handleChoiceSelect('Rome', false)}
          state={
            selectedOption === 'Rome'
              ? feedback === 'correct'
                ? 'correct'
                : 'incorrect'
              : selectedOption === null
                ? 'default'
                : 'default'
          }
          disabled={selectedOption !== null}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Disabled Buttons:</Text>
        <ChoiceButton
          text="Disabled Default Button"
          onPress={() => console.warn("This shouldn't execute")}
          state="default"
          disabled={true}
        />
        <ChoiceButton
          text="Disabled Selected Button"
          onPress={() => {}}
          state="selected"
          disabled={true}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.chalkWhite,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.inkBlack,
  },
  section: {
    marginBottom: 24,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.inkBlack,
  },
  instructions: {
    marginBottom: 16,
    color: colors.slateGray,
    fontStyle: 'italic',
  },
});

export default ChoiceButtonDemo;
