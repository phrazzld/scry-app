# T016 · Feature · P2: implement ChoiceButton component

## Context
- We need to create a ChoiceButton component that will be used in the CardView to display multiple-choice options
- The button needs different visual states: default, selected, correct, and incorrect
- The styling should use the theme system from T010

## Approach
1. Create `src/components/features/ChoiceButton.tsx` file
2. Define the ButtonState type with the four states: default, selected, correct, incorrect
3. Create styled components for the button and label using styled-components
4. Define the ChoiceButtonProps interface with text, onPress, state, and disabled properties
5. Implement the component with conditional styling based on its state

## Implementation Details
- Use the theme colors for different states:
  - Default: silverGray border, transparent background
  - Selected: cobaltBlue border, light cobaltBlue background
  - Correct: signalGreen border, light signalGreen background
  - Incorrect: warmAmber border, light warmAmber background
- Apply proper spacing using the theme spacing function
- Use the typography sizes for consistent text rendering
- Handle disabled state appropriately

## Testing Plan
- Create a test component to verify the different button states render correctly
- Verify that the onPress handler is called correctly
- Ensure TypeScript types work as expected