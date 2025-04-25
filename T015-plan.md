# T015 · Feature · P2: implement core Icon component

## Context
- We need to create a core Icon component as a wrapper around `@expo/vector-icons`
- This will provide a consistent interface for using icons throughout the app
- The component should support different icon sets, sizes, colors, and touch events

## Approach
1. Create `src/components/core/Icon.tsx` file
2. Import necessary icon sets from `@expo/vector-icons`
3. Create a type-safe interface for the Icon component props
4. Implement the Icon component with the following features:
   - Support for different icon sets (Ionicons, MaterialIcons, etc.)
   - Customizable size and color
   - Optional onPress handler for interactive icons
   - Default values for common properties
5. Add TypeScript types for all props and use theme values

## Implementation Details
- Use a single component that can render different icon sets based on a prop
- Support standard colors from our theme
- Make the component work with or without onPress functionality
- Include proper type definitions for icon names

## Testing Plan
- Create a basic test component to verify correct rendering
- Test that it correctly applies size, color, and onPress props
- Check that TypeScript correctly enforces the icon name validation