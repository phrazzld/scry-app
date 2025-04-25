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
