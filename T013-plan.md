# T013 · Feature · P2: implement modal and edit actions

## Context
- Implementing the remaining actions in the Zustand store for modals and card editing
- Based on PLAN.md Section 5, Zustand Store modal actions
- This builds on the core store actions from T012

## Approach
1. Replace the placeholder implementations for the following functions in the reviewStore.ts file:
   - `setShowMemoModal`: Toggle the memo modal visibility
   - `setShowEditModal`: Toggle the edit modal visibility
   - `submitMemo`: Create and add a memo
   - `editCard`: Update a card's question
   - `deleteCard`: Remove a card from the deck
   - `postponeCard`: Move a card to the end of the deck or implement a skip functionality

2. Update the state with proper handling:
   - Modal visibility state updates
   - Card modifications with correct immutable updates
   - State preservation during operations

## Implementation Details
1. `setShowMemoModal` and `setShowEditModal`: Simple state setters
2. `submitMemo`: Take the text and create a memo object (requires memo storage)
3. `editCard`: Find card by ID and update its question text
4. `deleteCard`: Filter out the card by ID and adjust current index if needed
5. `postponeCard`: Move card to end of deck or implement skipping logic

## Testing Plan
- Verify modal visibility can be toggled with the setters
- Ensure card edits persist in the store state 
- Test that deleting a card properly updates the index
- Validate that postponing a card moves it as expected