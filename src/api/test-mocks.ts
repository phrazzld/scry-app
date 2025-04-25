// This is a temporary file to test the mockCards import
import { mockCards } from './mocks';

// Simple function to access the mock data
export const getFirstCard = () => {
  if (mockCards.length > 0) {
    return mockCards[0];
  }
  return null;
};
