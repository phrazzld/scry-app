import { create } from 'zustand';
import { Card, Memo } from '../types';
import { mockCards } from '../api/mocks';
import { generateSimpleUUID } from '../utils/uuid';

interface ReviewState {
  cards: Card[];
  currentIndex: number;
  currentCard: Card | null;
  isDeckComplete: boolean;
  showMemoModal: boolean;
  showEditModal: boolean;
  memos: Memo[];

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
  memos: [],

  // Core store actions
  initializeDeck: () => {
    set({
      cards: [...mockCards],
      currentIndex: 0,
      isDeckComplete: false,
      memos: [],
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
    if (!text.trim()) return;

    const newMemo: Memo = {
      id: generateSimpleUUID(),
      text: text.trim(),
      createdAt: new Date().toISOString(),
    };

    set(state => ({
      memos: [...state.memos, newMemo],
      showMemoModal: false,
    }));
  },

  editCard: (cardId, newQuestion) => {
    if (!newQuestion.trim()) return;

    set(state => ({
      cards: state.cards.map(card =>
        card.id === cardId ? { ...card, question: newQuestion.trim() } : card
      ),
      showEditModal: false,
    }));
  },

  deleteCard: cardId => {
    set(state => {
      const updatedCards = state.cards.filter(card => card.id !== cardId);

      // Adjust current index if needed
      let newIndex = state.currentIndex;
      if (newIndex >= updatedCards.length) {
        newIndex = Math.max(0, updatedCards.length - 1);
      }

      const isDeckComplete = updatedCards.length === 0;

      return {
        cards: updatedCards,
        currentIndex: newIndex,
        isDeckComplete,
      };
    });
  },

  postponeCard: cardId => {
    set(state => {
      const currentCard = state.cards.find(card => card.id === cardId);
      if (!currentCard) return {};

      // Remove the current card from the deck
      const remainingCards = state.cards.filter(card => card.id !== cardId);

      // Add the card to the end of the deck
      const updatedCards = [...remainingCards, currentCard];

      return {
        cards: updatedCards,
        // Move to the next card (which is now at the current index since we removed the current card)
        currentIndex: state.currentIndex >= remainingCards.length ? 0 : state.currentIndex,
      };
    });
  },
}));
