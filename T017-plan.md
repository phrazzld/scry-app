# T017 Implementation Plan: CardView Component

## Task Requirements
- Create `src/components/features/CardView.tsx` component
- Implement card container, question text, and choice mapping
- Add selection and feedback state logic
- Component should render card data with choices
- Selection logic should work correctly
- Feedback states should show correctly

## Dependencies
- T016 (ChoiceButton component) ✅
- T013 (Modal and edit actions in store) ✅

## Implementation Approach

1. Create the CardView component with the following structure:
   - Styled container with MotiView for animations
   - Styled question text component
   - Map through and render choices using the ChoiceButton component
   - Track selection state and feedback state locally

2. Add the following functionality:
   - Handle choice selection
   - Show visual feedback for correct/incorrect answers
   - Use the store to inform about user selection
   - Implement animations using Moti

3. Write tests to verify:
   - Component renders card data correctly
   - Selection triggers correct state changes
   - Feedback is displayed correctly
   - Store methods are called properly

## Specific Implementation Details

- Use styled-components for styling consistent with the app's theme
- Use MotiView for animations as specified in the plan
- Use useState hooks to manage local component state
- Connect to useReviewStore to access the store actions
- Follow the mock-up from PLAN.md for visual implementation
- Ensure the component is fully typed according to TypeScript standards

## Testing Strategy

1. Test rendering with basic props
2. Test user interaction (choice selection)
3. Test state changes after selection
4. Test that store methods are called correctly

## Files to Create
- `src/components/features/CardView.tsx` - Main component
- `src/components/features/__tests__/CardView.test.tsx` - Tests
- `src/components/features/__demos__/CardViewDemo.tsx` - Demo component (optional)