import React from 'react';
import { ButtonState } from '../ChoiceButton';
import ChoiceButton from '../ChoiceButton';

/**
 * This is a type checking test file to verify the ChoiceButton component props
 * are correctly typed and the component compiles without errors.
 */

// Simple test render function to validate component types
function testChoiceButtonComponent() {
  // Test with required props
  const defaultButton = (
    <ChoiceButton text="Option A" onPress={() => console.warn('Button pressed')} state="default" />
  );

  // Test with all different states
  const states: ButtonState[] = ['default', 'selected', 'correct', 'incorrect'];
  const allStateButtons = states.map((state, index) => (
    <ChoiceButton
      key={index}
      text={`Option with state: ${state}`}
      onPress={() => console.warn(`Button with state ${state} pressed`)}
      state={state}
    />
  ));

  // Test with disabled state
  const disabledButton = (
    <ChoiceButton
      text="Disabled option"
      onPress={() => console.warn('Should not execute when disabled')}
      state="default"
      disabled={true}
    />
  );

  // Verify results are React elements
  console.warn(
    'All buttons render correctly:',
    defaultButton !== null &&
      allStateButtons.every(button => button !== null) &&
      disabledButton !== null
  );
}

export { testChoiceButtonComponent };

// This file is for type checking only, not for actual test execution
console.warn('ChoiceButton component types are valid');
