# Scry App Frontend Demo - Technical Development Plan

This comprehensive technical plan synthesizes the best approaches for building the Scry app frontend demo with hardcoded data, no persistence, and a focus on UI/UX, animations, and component structure.

## 1. Project Setup

```bash
# Initialize project with TypeScript template
npx create-expo-app scry-app --template expo-template-blank-typescript
cd scry-app

# Install core dependencies
npm install @react-navigation/native @react-navigation/stack
npx expo install react-native-screens react-native-safe-area-context
npm install zustand
npx expo install react-native-reanimated react-native-gesture-handler
npm install @expo/vector-icons
npm install styled-components @types/styled-components
npm install moti
npm install date-fns

# Optional: UUID for mock data
npm install uuid @types/uuid

# Setup ESLint & Prettier (Dev dependencies)
npm install -D eslint prettier eslint-config-prettier eslint-plugin-react-hooks @typescript-eslint/parser @typescript-eslint/eslint-plugin
```

### Configure Reanimated

In `babel.config.js`:

```javascript
module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: ['react-native-reanimated/plugin'],
  };
};
```

### Update App Entry Point

In `App.tsx` (import at the very top):

```typescript
import 'react-native-gesture-handler';
```

## 2. Folder Structure

```
scry-app/
├── assets/                # icons, fonts, etc.
├── src/
│   ├── api/               # mock API interfaces
│   │   └── mocks.ts
│   ├── components/        # reusable UI pieces
│   │   ├── core/          # basic building blocks
│   │   │   ├── Button.tsx
│   │   │   ├── Icon.tsx
│   │   │   └── StyledText.tsx
│   │   └── features/      # complex components
│   │       ├── CardView.tsx
│   │       ├── ChoiceButton.tsx
│   │       ├── FloatingMemoButton.tsx
│   │       ├── MemoInputModal.tsx
│   │       └── EditCardModal.tsx
│   ├── hooks/             # custom hooks
│   │   └── useStore.ts
│   ├── navigation/        # navigation setup
│   │   └── AppNavigator.tsx
│   ├── screens/           # top-level screens
│   │   └── ReviewScreen.tsx
│   ├── store/             # Zustand state management
│   │   └── reviewStore.ts
│   ├── theme/             # styling & theming
│   │   ├── colors.ts
│   │   ├── spacing.ts
│   │   ├── typography.ts
│   │   └── index.ts
│   └── types/             # TypeScript types/interfaces
│       └── index.ts
├── .eslintrc.js
├── .prettierrc
└── tsconfig.json
```

## 3. TypeScript Types & Mock Data

### Types (`src/types/index.ts`)

```typescript
export type CardType = 'MULTIPLE_CHOICE';

export interface Choice {
  id: string;
  text: string;
  isCorrect: boolean;
}

export interface Card {
  id: string;
  type: CardType;
  status: 'new' | 'answered_correct' | 'answered_incorrect';
  question: string;
  choices: Choice[];
  createdAt: string; // ISO date string
  lastReviewedAt?: string;
}

export interface Memo {
  id: string;
  text: string;
  createdAt: string;
}
```

### Mock Data (`src/api/mocks.ts`)

```typescript
import { Card } from '../types';
import { v4 as uuidv4 } from 'uuid';

// Helper for ISO dates
const createIsoDate = (offsetDays = 0): string => {
  const date = new Date();
  date.setDate(date.getDate() + offsetDays);
  return date.toISOString();
};

export const mockCards: Card[] = [
  {
    id: uuidv4(),
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'What is the primary color used for action highlights in Scry?',
    choices: [
      { id: 'a', text: 'Signal Green', isCorrect: false },
      { id: 'b', text: 'Cobalt Blue', isCorrect: true },
      { id: 'c', text: 'Warm Amber', isCorrect: false },
      { id: 'd', text: 'Slate Gray', isCorrect: false },
    ],
    createdAt: createIsoDate(-5),
    lastReviewedAt: createIsoDate(-2),
  },
  {
    id: uuidv4(),
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: 'Which design principle emphasizes "Form is function"?',
    choices: [
      { id: 'a', text: 'Visual Silence', isCorrect: false },
      { id: 'b', text: 'Clarity Above All', isCorrect: false },
      { id: 'c', text: 'High Modernism', isCorrect: true },
      { id: 'd', text: 'Trust the Grid', isCorrect: false },
    ],
    createdAt: createIsoDate(-10),
  },
  {
    id: uuidv4(),
    type: 'MULTIPLE_CHOICE',
    status: 'new',
    question: "What is the recommended base grid size in Scry's layout?",
    choices: [
      { id: 'a', text: '4pt', isCorrect: false },
      { id: 'b', text: '16pt', isCorrect: false },
      { id: 'c', text: '8pt', isCorrect: true },
      { id: 'd', text: '12pt', isCorrect: false },
    ],
    createdAt: createIsoDate(-3),
  },
];
```

## 4. Theme and Styling

### Theme Definition (`src/theme/`)

```typescript
// colors.ts
export const colors = {
  inkBlack: '#121212',
  chalkWhite: '#FAFAFA',
  cobaltBlue: '#0047AB',
  slateGray: '#757575',
  silverGray: '#E0E0E0',
  signalGreen: '#00A676',
  warmAmber: '#F2A900'
};

// spacing.ts - 8pt grid
export const spacing = (factor: number) => factor * 8;

// typography.ts
export const typography = {
  heading: 20,
  body: 16,
  small: 14
};

// index.ts
import { colors } from './colors';
import { spacing } from './spacing';
import { typography } from './typography';

export const theme = {
  colors,
  spacing,
  typography,
};

// Optional: Theme Provider for styled-components
import React from 'react';
import { ThemeProvider as SCProvider } from 'styled-components/native';

export const ThemeProvider: React.FC<{children: React.ReactNode}> = ({ children }) => (
  <SCProvider theme={theme}>{children}</SCProvider>
);
```

## 5. State Management

### Zustand Store (`src/store/reviewStore.ts`)

```typescript
import { create } from 'zustand';
import { Card } from '../types';
import { mockCards } from '../api/mocks';

interface ReviewState {
  cards: Card[];
  currentIndex: number;
  currentCard: Card | null;
  isDeckComplete: boolean;
  showMemoModal: boolean;
  showEditModal: boolean;

  // Actions
  initializeDeck: () => void;
  answerCard: (cardId: string, choiceId: string) => void;
  nextCard: () => void;
  setShowMemoModal: (show: boolean) => void;
  setShowEditModal: (show: boolean) => void;
  submitMemo: (text: string) => void;
  editCard: (cardId: string, newQuestion: string) => void;
  deleteCard: (cardId: string) => void;
  postponeCard: (cardId: string) => void;
}

export const useReviewStore = create<ReviewState>((set, get) => ({
  cards: [...mockCards],
  currentIndex: 0,
  get currentCard() {
    const { cards, currentIndex } = get();
    return cards[currentIndex] || null;
  },
  isDeckComplete: false,
  showMemoModal: false,
  showEditModal: false,

  initializeDeck: () => {
    set({
      cards: [...mockCards],
      currentIndex: 0,
      isDeckComplete: false,
    });
  },

  answerCard: (cardId, choiceId) => {
    // Check if answer is correct
    const { cards, currentIndex } = get();
    const card = cards[currentIndex];
    const isCorrect = card.choices.find(c => c.id === choiceId)?.isCorrect || false;

    // Update card status
    set(state => ({
      cards: state.cards.map(c =>
        c.id === cardId
          ? { ...c, status: isCorrect ? 'answered_correct' : 'answered_incorrect' }
          : c
      ),
    }));

    // Advance to next card after a delay
    setTimeout(() => {
      get().nextCard();
    }, 1000);
  },

  nextCard: () => {
    set(state => {
      const nextIndex = state.currentIndex + 1;
      if (nextIndex >= state.cards.length) {
        return { isDeckComplete: true };
      }
      return { currentIndex: nextIndex };
    });
  },

  setShowMemoModal: show => set({ showMemoModal: show }),
  setShowEditModal: show => set({ showEditModal: show }),

  submitMemo: text => {
    console.log('DEMO: Submitting memo:', text);
    set({ showMemoModal: false });
    // In real app, this would make an API call
  },

  editCard: (cardId, newQuestion) => {
    set(state => ({
      cards: state.cards.map(c => (c.id === cardId ? { ...c, question: newQuestion } : c)),
      showEditModal: false,
    }));
  },

  deleteCard: cardId => {
    set(state => ({
      cards: state.cards.filter(c => c.id !== cardId),
    }));
    get().nextCard();
  },

  postponeCard: cardId => {
    // For demo, just move to next card
    get().nextCard();
  },
}));
```

## 6. Navigation

### Navigator Setup (`src/navigation/AppNavigator.tsx`)

```typescript
import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ReviewScreen from '../screens/ReviewScreen';
import { theme } from '../theme';

export type RootStackParamList = {
  Review: undefined;
};

const Stack = createStackNavigator<RootStackParamList>();

export const AppNavigator = () => (
  <NavigationContainer>
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        cardStyle: { backgroundColor: theme.colors.chalkWhite }
      }}
    >
      <Stack.Screen name="Review" component={ReviewScreen} />
    </Stack.Navigator>
  </NavigationContainer>
);

export default AppNavigator;
```

## 7. Core Components Implementation

### CardView Component (`src/components/features/CardView.tsx`)

```typescript
import React, { useState } from 'react';
import styled from 'styled-components/native';
import { Card } from '../../types';
import ChoiceButton from './ChoiceButton';
import { MotiView } from 'moti';
import { useReviewStore } from '../../store/reviewStore';

const CardContainer = styled(MotiView)`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border: 1px solid ${({ theme }) => theme.colors.silverGray};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(4)}px;
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  width: 100%;
`;

const QuestionText = styled.Text`
  color: ${({ theme }) => theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.heading}px;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

interface CardViewProps {
  card: Card;
}

export default function CardView({ card }: CardViewProps) {
  const { answerCard } = useReviewStore();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);

    // Check if correct
    const choice = card.choices.find(c => c.id === choiceId);
    const isCorrect = choice?.isCorrect || false;

    // Show feedback
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Tell store
    answerCard(card.id, choiceId);
  };

  return (
    <CardContainer
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 300 }}
    >
      <QuestionText>{card.question}</QuestionText>

      {card.choices.map(choice => (
        <ChoiceButton
          key={choice.id}
          text={choice.text}
          onPress={() => handleChoiceSelect(choice.id)}
          state={
            selectedChoice === choice.id
              ? feedback
                ? feedback
                : 'selected'
              : 'default'
          }
          disabled={selectedChoice !== null}
        />
      ))}
    </CardContainer>
  );
}
```

### ChoiceButton Component (`src/components/features/ChoiceButton.tsx`)

```typescript
import React from 'react';
import styled from 'styled-components/native';

type ButtonState = 'default' | 'selected' | 'correct' | 'incorrect';

const Btn = styled.TouchableOpacity<{ state: ButtonState }>`
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(1)}px;
  border: 1px solid
    ${({ theme, state }) =>
      state === 'default'
        ? theme.colors.silverGray
        : state === 'selected'
        ? theme.colors.cobaltBlue
        : state === 'correct'
        ? theme.colors.signalGreen
        : theme.colors.warmAmber};
  border-radius: 8px;
  background: ${({ theme, state }) =>
    state === 'selected'
      ? `${theme.colors.cobaltBlue}10`
      : state === 'correct'
      ? `${theme.colors.signalGreen}10`
      : state === 'incorrect'
      ? `${theme.colors.warmAmber}10`
      : 'transparent'};
`;

const Label = styled.Text<{ state: ButtonState }>`
  color: ${({ theme, state }) =>
    state === 'default' ? theme.colors.inkBlack : theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.body}px;
`;

interface ChoiceButtonProps {
  text: string;
  onPress: () => void;
  state: ButtonState;
  disabled?: boolean;
}

export default function ChoiceButton({
  text,
  onPress,
  state = 'default',
  disabled = false
}: ChoiceButtonProps) {
  return (
    <Btn onPress={onPress} state={state} disabled={disabled}>
      <Label state={state}>{text}</Label>
    </Btn>
  );
}
```

### ReviewScreen Component (`src/screens/ReviewScreen.tsx`)

```typescript
import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useReviewStore } from '../store/reviewStore';
import CardView from '../components/features/CardView';
import FloatingMemoButton from '../components/features/FloatingMemoButton';
import MemoInputModal from '../components/features/MemoInputModal';
import EditCardModal from '../components/features/EditCardModal';
import Icon from '../components/core/Icon';
import styled from 'styled-components/native';

const Container = styled.SafeAreaView`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.chalkWhite};
  padding: ${({ theme }) => theme.spacing(3)}px;
`;

const ActionsRow = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-top: ${({ theme }) => theme.spacing(2)}px;
`;

const EmptyStateContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(4)}px;
`;

const EmptyStateText = styled.Text`
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.slateGray};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const ActionButton = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.cobaltBlue};
  padding: ${({ theme }) => theme.spacing(2)}px;
  border-radius: 8px;
  align-items: center;
`;

const ActionButtonText = styled.Text`
  color: ${({ theme }) => theme.colors.chalkWhite};
  font-size: ${({ theme }) => theme.typography.body}px;
`;

export default function ReviewScreen() {
  const {
    currentCard,
    isDeckComplete,
    initializeDeck,
    setShowMemoModal,
    setShowEditModal,
    deleteCard,
    postponeCard,
    showMemoModal,
    showEditModal
  } = useReviewStore();

  useEffect(() => {
    // Make sure we have cards on first load
    if (!currentCard && !isDeckComplete) {
      initializeDeck();
    }
  }, []);

  if (isDeckComplete) {
    return (
      <Container>
        <EmptyStateContainer>
          <EmptyStateText>
            You've completed all cards for now.
          </EmptyStateText>
          <ActionButton onPress={initializeDeck}>
            <ActionButtonText>Restart Demo</ActionButtonText>
          </ActionButton>
        </EmptyStateContainer>
      </Container>
    );
  }

  return (
    <Container>
      {currentCard && (
        <>
          <CardView card={currentCard} />
          <ActionsRow>
            <Icon name="edit" onPress={() => setShowEditModal(true)} />
            <Icon name="trash" onPress={() => deleteCard(currentCard.id)} />
            <Icon name="clock" onPress={() => postponeCard(currentCard.id)} />
          </ActionsRow>
        </>
      )}

      <FloatingMemoButton onPress={() => setShowMemoModal(true)} />

      {/* Modals */}
      <MemoInputModal
        isVisible={showMemoModal}
        onClose={() => setShowMemoModal(false)}
      />

      <EditCardModal
        isVisible={showEditModal}
        onClose={() => setShowEditModal(false)}
        card={currentCard}
      />
    </Container>
  );
}
```

### FloatingMemoButton Component (`src/components/features/FloatingMemoButton.tsx`)

```typescript
import React from 'react';
import styled from 'styled-components/native';
import { Ionicons } from '@expo/vector-icons';
import { MotiView } from 'moti';

const Touchable = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.cobaltBlue};
  padding: ${({ theme }) => theme.spacing(2)}px;
  border-radius: 999px;
  elevation: 4;
  shadow-opacity: 0.2;
  shadow-radius: 3px;
  shadow-offset: 0px 2px;
`;

interface FloatingMemoButtonProps {
  onPress: () => void;
}

export default function FloatingMemoButton({ onPress }: FloatingMemoButtonProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: 20 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 400 }}
      style={{
        position: 'absolute',
        bottom: 32,
        right: 32,
      }}
    >
      <Touchable onPress={onPress}>
        <Ionicons name="add" size={24} color="#fff" />
      </Touchable>
    </MotiView>
  );
}
```

### MemoInputModal Component (`src/components/features/MemoInputModal.tsx`)

```typescript
import React, { useState } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { useReviewStore } from '../../store/reviewStore';

const ModalContainer = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const ModalContent = styled.View`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 90%;
  max-width: 400px;
`;

const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.inkBlack};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const TextInput = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.silverGray};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  min-height: 100px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing(1.5)}px ${({ theme }) => theme.spacing(3)}px;
  background: ${({ theme, primary }: { theme: any; primary?: boolean }) =>
    primary ? theme.colors.cobaltBlue : 'transparent'};
  border-radius: 6px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`;

const ButtonText = styled.Text`
  color: ${({ theme, primary }: { theme: any; primary?: boolean }) =>
    primary ? theme.colors.chalkWhite : theme.colors.inkBlack};
`;

interface MemoInputModalProps {
  isVisible: boolean;
  onClose: () => void;
}

export default function MemoInputModal({ isVisible, onClose }: MemoInputModalProps) {
  const [text, setText] = useState('');
  const { submitMemo } = useReviewStore();

  const handleSubmit = () => {
    if (text.trim()) {
      submitMemo(text);
      setText('');
      onClose();
    }
  };

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Add Memo</ModalTitle>
          <TextInput
            placeholder="Type your memo here..."
            multiline
            value={text}
            onChangeText={setText}
            autoFocus
          />
          <ButtonRow>
            <Button onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button primary onPress={handleSubmit}>
              <ButtonText primary>Submit</ButtonText>
            </Button>
          </ButtonRow>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
```

### EditCardModal Component (`src/components/features/EditCardModal.tsx`)

```typescript
import React, { useState, useEffect } from 'react';
import { Modal } from 'react-native';
import styled from 'styled-components/native';
import { Card } from '../../types';
import { useReviewStore } from '../../store/reviewStore';

const ModalContainer = styled.View`
  flex: 1;
  background: rgba(0, 0, 0, 0.5);
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing(2)}px;
`;

const ModalContent = styled.View`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(3)}px;
  width: 90%;
  max-width: 400px;
`;

const ModalTitle = styled.Text`
  font-size: ${({ theme }) => theme.typography.heading}px;
  color: ${({ theme }) => theme.colors.inkBlack};
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const TextInput = styled.TextInput`
  border: 1px solid ${({ theme }) => theme.colors.silverGray};
  border-radius: 8px;
  padding: ${({ theme }) => theme.spacing(2)}px;
  margin-bottom: ${({ theme }) => theme.spacing(2)}px;
`;

const ButtonRow = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

const Button = styled.TouchableOpacity`
  padding: ${({ theme }) => theme.spacing(1.5)}px ${({ theme }) => theme.spacing(3)}px;
  background: ${({ theme, primary }: { theme: any; primary?: boolean }) =>
    primary ? theme.colors.cobaltBlue : 'transparent'};
  border-radius: 6px;
  margin-left: ${({ theme }) => theme.spacing(1)}px;
`;

const ButtonText = styled.Text`
  color: ${({ theme, primary }: { theme: any; primary?: boolean }) =>
    primary ? theme.colors.chalkWhite : theme.colors.inkBlack};
`;

interface EditCardModalProps {
  isVisible: boolean;
  onClose: () => void;
  card: Card | null;
}

export default function EditCardModal({ isVisible, onClose, card }: EditCardModalProps) {
  const [questionText, setQuestionText] = useState('');
  const { editCard } = useReviewStore();

  // Update the input when card changes
  useEffect(() => {
    if (card) {
      setQuestionText(card.question);
    }
  }, [card]);

  const handleSave = () => {
    if (card && questionText.trim()) {
      editCard(card.id, questionText);
      onClose();
    }
  };

  if (!card) return null;

  return (
    <Modal
      visible={isVisible}
      transparent
      animationType="fade"
      onRequestClose={onClose}
    >
      <ModalContainer>
        <ModalContent>
          <ModalTitle>Edit Card</ModalTitle>
          <TextInput
            value={questionText}
            onChangeText={setQuestionText}
            autoFocus
          />
          <ButtonRow>
            <Button onPress={onClose}>
              <ButtonText>Cancel</ButtonText>
            </Button>
            <Button primary onPress={handleSave}>
              <ButtonText primary>Save</ButtonText>
            </Button>
          </ButtonRow>
        </ModalContent>
      </ModalContainer>
    </Modal>
  );
}
```

## 8. App Entry Point

```typescript
import 'react-native-gesture-handler'; // Must be first import
import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from './src/theme';
import AppNavigator from './src/navigation/AppNavigator';
import { useReviewStore } from './src/store/reviewStore';

export default function App() {
  // Initialize the deck on app launch
  React.useEffect(() => {
    useReviewStore.getState().initializeDeck();
  }, []);

  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <StatusBar style="dark" />
        <AppNavigator />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}
```

## 9. Animation Strategy

1. **Card Transitions**: Use Moti (wrapper around Reanimated) for entrance/exit animations
2. **Feedback States**: Immediate visual feedback on answer selection through color/style changes
3. **Button Presses**: Small scale/opacity animations for tactile feedback
4. **Modal Transitions**: Smooth fade-in/out for modals

### Implementation Notes:

- Use the `key` prop to force remounting and trigger animations when changing cards
- For multi-step animations, chain animations using `useAnimatedStyle` from Reanimated
- Keep animations subtle and aligned with the modernist aesthetic (clean, purposeful movement)

## 10. Running the Demo

```bash
# Start the development server
expo start

# To run on iOS simulator
expo run:ios

# To run on Android simulator
expo run:android
```

This comprehensive plan provides a complete foundation for building the Scry app frontend demo with a focus on UI/UX, animations, and proper component architecture. It implements a clean, modern aesthetic using the 8pt grid system and follows best practices for React Native development.
