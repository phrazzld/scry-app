# T014 · Feature · P1: implement app navigation

## Context
- We need to set up the app navigation using React Navigation
- Based on PLAN.md Section 6: Navigation
- The app will have a simple stack navigator with one screen initially (Review)

## Approach
1. Create `src/navigation/AppNavigator.tsx` file
2. Set up a `NavigationContainer` from @react-navigation/native
3. Implement a stack navigator using createStackNavigator from @react-navigation/stack
4. Define the navigation types for type safety
5. Configure the Review screen route with appropriate styling

## Implementation Details
- Create the RootStackParamList type to define the available routes
- Set up the navigator with headerShown: false for a clean UI
- Apply the theme colors from our theme system to the card style
- Create placeholder for the ReviewScreen component (which will be implemented later)

## Testing Plan
- Verify that the navigator compiles without errors
- Check that the type system correctly enforces the navigation parameter types