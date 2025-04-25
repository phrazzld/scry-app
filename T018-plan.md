# T018 Implementation Plan: FloatingMemoButton Component

## Task Requirements
- Create `src/components/features/FloatingMemoButton.tsx` component
- Implement animated button with Moti
- Button should render with correct positioning
- Animation should work on mount

## Dependencies
- T010 (Theme system) ✅

## Implementation Approach

This is a simple component task that requires creating a styled floating action button with animation capabilities. The component will be positioned in the bottom-right corner of the screen and will animate on mount.

### Implementation Steps

1. **Component Structure**
   - Create a styled container with TouchableOpacity
   - Position it using absolute positioning at the bottom-right
   - Add shadow styling for elevation effect
   - Include Icon component for the button icon 
   - Wrap in MotiView for animation

2. **Animation Implementation**
   - Use Moti for animation capabilities
   - Implement entrance animation (fade-in and slide-up)
   - Define appropriate transition timing/easing

3. **Props and Types**
   - Define a simple props interface with onPress function
   - Ensure proper type safety throughout

## Specific Implementation Details

- Use styled-components for styling consistent with the app's theme
- Position the button at the bottom-right corner with adequate spacing from edges
- Use theme colors for consistency
- Use shadow properties for elevation effect
- Implement a simple fade-in and slide-up animation with Moti
- Use the Ionicons "add" icon from the Icon component

## Testing Strategy

1. Test component rendering
2. Test onPress callback
3. Verify Moti animation props are correctly set

## Files to Create
- `src/components/features/FloatingMemoButton.tsx` - Main component
- `src/components/features/__tests__/FloatingMemoButton.test.tsx` - Tests