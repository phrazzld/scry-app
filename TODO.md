# Design Improvements TODO

## Typography & Spacing

- [x] **D001 · Design · P1: refine typography hierarchy**

  - **Context:** Create clear visual hierarchy through font sizes and weights
  - **Action:**
    1. Update typography.ts to include weight variants (regular, medium, bold)
    2. Add font size variants (xs, sm, base, lg, xl, xxl)
    3. Apply consistent typography across all text elements
  - **Done‑when:**
    1. Typography system is consistent and scalable
    2. Question text stands out with proper emphasis
    3. Answer choices have consistent text styling

- [ ] **D002 · Design · P2: improve card and content spacing**
  - **Context:** Implement more balanced whitespace distribution
  - **Action:**
    1. Increase padding between card edges and content
    2. Add more vertical space between question and first answer choice
    3. Adjust spacing between choice options
    4. Refine inner padding of choice buttons
  - **Done‑when:**
    1. Content feels less cramped, more breathable
    2. Visual hierarchy is enhanced through spacing
    3. Improved readability through whitespace

## Visual Elements & Feedback

- [ ] **D003 · Design · P1: enhance choice button styling**

  - **Context:** Make buttons more tactile and interactive
  - **Action:**
    1. Add subtle background color to unselected choices
    2. Implement subtle shadow to increase depth perception
    3. Improve border radius for more modern appearance
    4. Design hover and active states for web version
  - **Done‑when:**
    1. Buttons appear more clickable and interactive
    2. Visual feedback is clear on all interaction states
    3. Touch targets feel deliberate

- [ ] **D004 · Design · P2: implement richer feedback animations**

  - **Context:** Enhance visual feedback when answering questions
  - **Action:**
    1. Design animated checkmark/x-mark for correct/incorrect answers
    2. Add subtle scale/bounce animation on selection
    3. Implement smooth color transition for selection
    4. Add success/error animation when advancing to next card
  - **Done‑when:**
    1. Selection feels responsive and satisfying
    2. Feedback is immediate and clear
    3. Animations are smooth but not distracting

- [ ] **D005 · Design · P3: design card completion celebration**
  - **Context:** Acknowledge user progress with micro-celebrations
  - **Action:**
    1. Create subtle confetti animation for correct answers
    2. Design encouraging message after completing cards
    3. Add progress indicator showing completion status
  - **Done‑when:**
    1. Users receive positive reinforcement
    2. Completion feels rewarding
    3. Progress is visualized effectively

## Action Buttons & Navigation

- [ ] **D006 · Design · P1: improve bottom action buttons**

  - **Context:** Make Edit, Delete, and Postpone buttons more refined
  - **Action:**
    1. Design consistent icon style for all actions
    2. Add subtle background to icons for better tap targets
    3. Implement micro-interactions on press
    4. Ensure proper spacing between action buttons
  - **Done‑when:**
    1. Action buttons have clear visual hierarchy
    2. Touch targets are appropriately sized
    3. Icons clearly communicate their function

- [ ] **D007 · Design · P2: redesign floating action button**
  - **Context:** Make the FAB more integrated with the design language
  - **Action:**
    1. Refine size and positioning of floating action button
    2. Add subtle shadow and elevation effect
    3. Design pressed state with appropriate feedback
    4. Implement smooth entrance/exit animation
  - **Done‑when:**
    1. FAB is properly positioned and sized
    2. Button appears to float above content
    3. Interaction feels satisfying

## Layout & Responsiveness

- [ ] **D008 · Design · P1: optimize layout for different screen sizes**

  - **Context:** Ensure comfortable reading experience across devices
  - **Action:**
    1. Create responsive card width constraints for larger screens
    2. Adjust typography scale for different screen sizes
    3. Optimize touch targets for different device types
  - **Done‑when:**
    1. Content maintains optimal line length on all devices
    2. Interface scales appropriately across screen sizes
    3. All elements remain accessible and usable

- [ ] **D009 · Design · P2: implement dark mode theme**
  - **Context:** Support system dark mode for better usability
  - **Action:**
    1. Create dark color palette in theme system
    2. Add theme context with light/dark mode toggle
    3. Implement all component styles with theme awareness
    4. Test contrast and readability in both modes
  - **Done‑when:**
    1. App responds to system dark/light preference
    2. All components render correctly in both modes
    3. Text maintains readability in dark mode

## Branding & Identity

- [ ] **D010 · Design · P2: refine app color scheme**

  - **Context:** Create a more cohesive and distinctive color palette
  - **Action:**
    1. Review and refine primary, secondary, and accent colors
    2. Implement a systematic approach to color usage
    3. Ensure all colors meet accessibility standards
    4. Define semantic color usage (success, error, info, etc.)
  - **Done‑when:**
    1. Color palette feels cohesive and distinctive
    2. Colors have clear purpose and hierarchy
    3. All text meets WCAG AA contrast requirements

- [ ] **D011 · Design · P3: design app icon and splash screen**
  - **Context:** Create brand identity through visual assets
  - **Action:**
    1. Design distinctive app icon that represents Scry's purpose
    2. Create branded splash screen with logo animation
    3. Ensure assets are properly sized for all platforms
  - **Done‑when:**
    1. App has recognizable icon and identity
    2. Launch experience feels polished and branded
    3. Visual identity is consistent across touchpoints

## Experience Enhancements

- [ ] **D012 · UX · P2: improve card transitions**

  - **Context:** Make transitions between cards feel more natural
  - **Action:**
    1. Design card exit animation when moving to next card
    2. Implement entrance animation for new card
    3. Add subtle gesture-based card navigation (optional swipe)
  - **Done‑when:**
    1. Card transitions feel smooth and intuitive
    2. Interface feels responsive and dynamic
    3. Navigation between cards is delightful

- [ ] **D013 · UX · P2: add subtle haptic feedback**

  - **Context:** Enhance touch interactions with appropriate haptics
  - **Action:**
    1. Add light haptic on answer selection
    2. Implement success/error haptic patterns
    3. Add subtle feedback on button presses
  - **Done‑when:**
    1. Interactions feel more tangible and responsive
    2. Feedback is multimodal (visual + haptic)
    3. Haptics are subtle and not overused

- [ ] **D014 · UX · P3: implement onboarding guidance**
  - **Context:** Help first-time users understand the interface
  - **Action:**
    1. Design minimalist tooltips for key actions
    2. Create subtle first-time user guidance
    3. Implement skip option for experienced users
  - **Done‑when:**
    1. New users understand how to use the app
    2. Guidance is helpful without being intrusive
    3. Experience feels supportive but not condescending

## Accessibility & Inclusion

- [ ] **D015 · A11y · P1: improve accessibility**

  - **Context:** Ensure app is usable by people with diverse abilities
  - **Action:**
    1. Add proper semantic roles to all interactive elements
    2. Implement proper focus states for keyboard navigation
    3. Ensure color is not the only indicator of state
    4. Review text contrast for readability
  - **Done‑when:**
    1. App is navigable via screen readers
    2. Interactive elements have clear focus states
    3. App meets WCAG AA accessibility guidelines

- [ ] **D016 · A11y · P2: optimize content scaling**
  - **Context:** Support users who need larger text
  - **Action:**
    1. Implement dynamic text sizing based on system settings
    2. Test layout with larger font sizes
    3. Ensure no content is cut off at larger text sizes
  - **Done‑when:**
    1. Text responds to system font size settings
    2. Layout remains usable with large text
    3. No content becomes inaccessible
