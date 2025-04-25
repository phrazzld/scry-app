# Todo

## Project Setup & Configuration

- [x] **T001 · Chore · P1: initialize expo project**

  - **Context:** PLAN.md Section 1, Project Setup
  - **Action:**
    1. Run `npx create-expo-app scry-app --template expo-template-blank-typescript`
    2. Navigate into the `scry-app` directory
  - **Done‑when:**
    1. Expo project structure created successfully
    2. `package.json` exists with basic Expo setup
  - **Depends‑on:** none

- [x] **T002-A · Chore · P1: clean dependency installation state**

  - **Context:** Prevent dependency conflicts by starting fresh
  - **Action:**
    1. Run `rm -rf node_modules package-lock.json`
  - **Done‑when:**
    1. `node_modules` directory and `package-lock.json` file are removed
  - **Depends‑on:** [T001]

- [x] **T002-B · Chore · P1: reinstall base dependencies**

  - **Context:** Restore the base project dependencies
  - **Action:**
    1. Run `npm install`
  - **Done‑when:**
    1. Base dependencies (expo, react, react-native) are reinstalled
    2. No errors appear during installation
  - **Depends‑on:** [T002-A]

- [x] **T002-C · Chore · P1: install expo native dependencies**

  - **Context:** Install native dependencies using expo's installer for compatibility
  - **Action:**
    1. Run `npx expo install react-native-screens react-native-safe-area-context react-native-reanimated react-native-gesture-handler @expo/vector-icons`
  - **Done‑when:**
    1. All native dependencies added to `package.json` with Expo-compatible versions
    2. No dependency conflict warnings shown
  - **Depends‑on:** [T002-B]

- [x] **T002-D · Chore · P1: install JavaScript dependencies**

  - **Context:** Install navigation, state management, animation, and utility libraries
  - **Action:**
    1. Run `npm install @react-navigation/native @react-navigation/stack zustand moti date-fns uuid`
    2. Run `npm install --save-dev @types/uuid`
  - **Done‑when:**
    1. All packages added to `package.json`
    2. No peer dependency conflicts appear
  - **Depends‑on:** [T002-C]

- [x] **T002-E · Chore · P1: install styled-components with compatibility fix**

  - **Context:** Install compatible version of styled-components to avoid React 19.x conflict
  - **Action:**
    1. Run `npm install styled-components@^5.3.0`
    2. Run `npm install --save-dev @types/styled-components`
    3. Run `npm install react-dom@18.3.1`
  - **Done‑when:**
    1. `styled-components` v5.x is added to dependencies
    2. `@types/styled-components` is added to devDependencies
    3. `react-dom@18.3.1` (matching React version) is installed
  - **Depends‑on:** [T002-D]

- [x] **T002-F · Chore · P1: verify installation and mark T002 complete**

  - **Context:** Verify all dependencies installed correctly without conflicts
  - **Action:**
    1. Run `npm ls react react-dom styled-components` to check versions
    2. Test with `npx expo start` to confirm no dependency errors
    3. Mark T002 as complete in TODO.md
  - **Done‑when:**
    1. `npm ls` shows no unresolved conflicts
    2. `expo start` launches without package errors
    3. All required dependencies successfully installed
  - **Depends‑on:** [T002-E]

- [x] **T003 · Chore · P1: install dev dependencies**

  - **Context:** PLAN.md Section 1, Project Setup
  - **Action:**
    1. Run `npm install -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin`
  - **Done‑when:**
    1. All dev dependencies added to `package.json`
  - **Depends‑on:** [T001]

- [x] **T004 · Chore · P1: configure reanimated plugin**

  - **Context:** PLAN.md Section 1, Configure Reanimated
  - **Action:**
    1. Create/update `babel.config.js` to include `react-native-reanimated/plugin`
  - **Done‑when:**
    1. `babel.config.js` matches the configuration in PLAN.md
  - **Depends‑on:** [T002]

- [x] **T005 · Chore · P1: update app entry point for gesture handler**

  - **Context:** PLAN.md Section 1, Update App Entry Point
  - **Action:**
    1. Add `import 'react-native-gesture-handler';` as the first line in `App.tsx`
  - **Done‑when:**
    1. Import statement appears at top of `App.tsx`
  - **Depends‑on:** [T002]

- [x] **T006 · Chore · P2: create project folder structure**

  - **Context:** PLAN.md Section 2, Folder Structure
  - **Action:**
    1. Create all directories as specified in the plan
    2. Add placeholder empty files to ensure Git tracks directories
  - **Done‑when:**
    1. All directories and placeholder files exist
  - **Depends‑on:** [T001]

- [x] **T007 · Chore · P3: configure eslint and prettier**
  - **Context:** PLAN.md Section 2, `.eslintrc.js` and `.prettierrc`
  - **Action:**
    1. Create `eslint.config.js` with React Native TypeScript rules
    2. Create `.prettierrc` with basic formatting rules
  - **Done‑when:**
    1. Linting and formatting can be run without errors
  - **Depends‑on:** [T003]

## Types & Mock Data

- [x] **T008 · Feature · P1: implement TypeScript types**

  - **Context:** PLAN.md Section 3, Types (`src/types/index.ts`)
  - **Action:**
    1. Create `src/types/index.ts`
    2. Define `CardType`, `Choice`, `Card`, and `Memo` interfaces/types
  - **Done‑when:**
    1. Types are defined and export correctly
    2. TypeScript compiler recognizes the types
  - **Depends‑on:** [T006]

- [ ] **T009 · Feature · P1: implement mock card data**
  - **Context:** PLAN.md Section 3, Mock Data (`src/api/mocks.ts`)
  - **Action:**
    1. Create `src/api/mocks.ts`
    2. Implement the `createIsoDate` helper function
    3. Create the `mockCards` array with sample cards
  - **Done‑when:**
    1. Mock data can be imported and used in the app
  - **Depends‑on:** [T008]

## Theme & Styling

- [ ] **T010 · Feature · P1: implement theme system**
  - **Context:** PLAN.md Section 4, Theme Definition
  - **Action:**
    1. Create `colors.ts`, `spacing.ts`, `typography.ts`, and `index.ts` in `src/theme/`
    2. Implement styled-components ThemeProvider
  - **Done‑when:**
    1. Theme values can be imported and used in styled components
    2. ThemeProvider can wrap components
  - **Depends‑on:** [T006]

## State Management

- [ ] **T011 · Feature · P1: implement zustand store structure**

  - **Context:** PLAN.md Section 5, Zustand Store
  - **Action:**
    1. Create `src/store/reviewStore.ts`
    2. Define the `ReviewState` interface
    3. Create basic store with initial state
  - **Done‑when:**
    1. Store can be imported and accessed
  - **Depends‑on:** [T008, T009]

- [ ] **T012 · Feature · P2: implement core store actions**

  - **Context:** PLAN.md Section 5, Zustand Store actions
  - **Action:**
    1. Implement `initializeDeck`, `answerCard`, and `nextCard` actions
  - **Done‑when:**
    1. Actions modify store state correctly
    2. Card deck can be initialized and traversed
  - **Depends‑on:** [T011]

- [ ] **T013 · Feature · P2: implement modal and edit actions**
  - **Context:** PLAN.md Section 5, Zustand Store modal actions
  - **Action:**
    1. Implement `setShowMemoModal`, `setShowEditModal`, `submitMemo`, `editCard`, `deleteCard`, and `postponeCard` actions
  - **Done‑when:**
    1. Modal visibility can be toggled
    2. Card edits persist in store state
  - **Depends‑on:** [T012]

## Navigation

- [ ] **T014 · Feature · P1: implement app navigation**
  - **Context:** PLAN.md Section 6, Navigation
  - **Action:**
    1. Create `src/navigation/AppNavigator.tsx`
    2. Set up `NavigationContainer` and stack navigator
    3. Configure `Review` screen route
  - **Done‑when:**
    1. Navigator compiles without errors
    2. Screen configuration applies correctly
  - **Depends‑on:** [T006, T010]

## Components

- [ ] **T015 · Feature · P2: implement core Icon component**

  - **Context:** PLAN.md Section 2, core components
  - **Action:**
    1. Create `src/components/core/Icon.tsx`
    2. Create a wrapper around `@expo/vector-icons`
  - **Done‑when:**
    1. Component renders icons with name, size, color props
    2. Handles onPress events correctly
  - **Depends‑on:** [T010]

- [ ] **T016 · Feature · P2: implement ChoiceButton component**

  - **Context:** PLAN.md Section 7, ChoiceButton Component
  - **Action:**
    1. Create `src/components/features/ChoiceButton.tsx`
    2. Implement state-based styling for different button states
  - **Done‑when:**
    1. Button renders with correct styles based on state
    2. Props are properly typed and handled
  - **Depends‑on:** [T010]

- [ ] **T017 · Feature · P1: implement CardView component**

  - **Context:** PLAN.md Section 7, CardView Component
  - **Action:**
    1. Create `src/components/features/CardView.tsx`
    2. Implement card container, question text, and choice mapping
    3. Add selection and feedback state logic
  - **Done‑when:**
    1. Component renders card data with choices
    2. Selection logic works correctly
    3. Feedback states show correctly
  - **Depends‑on:** [T016, T013]

- [ ] **T018 · Feature · P2: implement FloatingMemoButton component**

  - **Context:** PLAN.md Section 7, FloatingMemoButton Component
  - **Action:**
    1. Create `src/components/features/FloatingMemoButton.tsx`
    2. Implement animated button with Moti
  - **Done‑when:**
    1. Button renders with correct positioning
    2. Animation works on mount
  - **Depends‑on:** [T010]

- [ ] **T019 · Feature · P2: implement MemoInputModal component**

  - **Context:** PLAN.md Section 7, MemoInputModal Component
  - **Action:**
    1. Create `src/components/features/MemoInputModal.tsx`
    2. Implement modal with text input and submit button
  - **Done‑when:**
    1. Modal shows/hides based on props
    2. Submit action works correctly
  - **Depends‑on:** [T013]

- [ ] **T020 · Feature · P2: implement EditCardModal component**
  - **Context:** PLAN.md Section 7, EditCardModal Component
  - **Action:**
    1. Create `src/components/features/EditCardModal.tsx`
    2. Implement modal with card question editing
  - **Done‑when:**
    1. Modal shows current card question
    2. Save action updates card in store
  - **Depends‑on:** [T013]

## Screens

- [ ] **T021 · Feature · P1: implement ReviewScreen component**
  - **Context:** PLAN.md Section 7, ReviewScreen Component
  - **Action:**
    1. Create `src/screens/ReviewScreen.tsx`
    2. Implement main layout with CardView
    3. Add action buttons and empty state handling
  - **Done‑when:**
    1. Screen renders current card from store
    2. Shows empty state when deck complete
    3. Action buttons function correctly
  - **Depends‑on:** [T017, T018, T019, T020]

## App Integration

- [ ] **T022 · Feature · P1: implement main App.tsx**

  - **Context:** PLAN.md Section 8, App Entry Point
  - **Action:**
    1. Update `App.tsx` with gesture-handler import
    2. Wrap app with providers: SafeAreaProvider, ThemeProvider
    3. Initialize deck in useEffect
  - **Done‑when:**
    1. App boots without errors
    2. Navigation and theme apply correctly
    3. Store initializes on launch
  - **Depends‑on:** [T005, T010, T012, T014, T021]

- [ ] **T023 · Feature · P2: implement card animations**

  - **Context:** PLAN.md Section 9, Animation Strategy
  - **Action:**
    1. Add entrance animations to CardView using Moti
    2. Ensure transitions between cards are smooth
  - **Done‑when:**
    1. Cards animate in smoothly
    2. State changes (selection, feedback) have visual transitions
  - **Depends‑on:** [T017]

- [ ] **T024 · Chore · P3: create README with running instructions**
  - **Context:** PLAN.md Section 10, Running the Demo
  - **Action:**
    1. Create README.md with project description
    2. Add instructions for running the demo
  - **Done‑when:**
    1. README contains clear instructions for running the app
  - **Depends‑on:** [T022]

### Clarifications & Assumptions

- [ ] **Issue:** Core components Button.tsx and StyledText.tsx lack implementation details

  - **Context:** PLAN.md Section 2 mentions these files but doesn't provide code
  - **Blocking?:** no

- [ ] **Issue:** Missing test implementation in development plan
  - **Context:** DEVELOPMENT_PHILOSOPHY.md mentions testing, but PLAN.md has no test setup
  - **Blocking?:** no
