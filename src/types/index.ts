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
