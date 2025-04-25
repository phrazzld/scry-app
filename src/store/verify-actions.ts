// Simple verification script for store actions
import { testInitializeDeck, testAnswerCard, testNextCard, testCompleteDeck } from './test-actions';

// Test initialization
console.warn('Testing initialization:');
console.warn(JSON.stringify(testInitializeDeck(), null, 2));

// Test answering a card correctly
console.warn('\nTesting answering a card correctly:');
console.warn(JSON.stringify(testAnswerCard(true), null, 2));

// Test answering a card incorrectly
console.warn('\nTesting answering a card incorrectly:');
console.warn(JSON.stringify(testAnswerCard(false), null, 2));

// Test moving to the next card
console.warn('\nTesting next card:');
console.warn(JSON.stringify(testNextCard(), null, 2));

// Test completing the deck
console.warn('\nTesting deck completion:');
console.warn(JSON.stringify(testCompleteDeck(), null, 2));