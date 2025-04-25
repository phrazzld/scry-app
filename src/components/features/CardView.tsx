import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import { Card } from '../../types';
import ChoiceButton, { ButtonState } from './ChoiceButton';
import { MotiView } from 'moti';
import { useReviewStore } from '../../store/reviewStore';

const CardContainer = styled(MotiView)`
  background: ${({ theme }) => theme.colors.chalkWhite};
  border: 1px solid ${({ theme }) => theme.colors.silverGray};
  border-radius: 12px;
  padding: ${({ theme }) => theme.spacing(4)}px;
  shadow-opacity: 0.15;
  shadow-radius: 6px;
  shadow-offset: 0px 3px;
  shadow-color: #000;
  width: 100%;
  elevation: 4;
`;

const QuestionContainer = styled(MotiView)`
  margin-bottom: ${({ theme }) => theme.spacing(3)}px;
`;

const QuestionText = styled.Text`
  color: ${({ theme }) => theme.colors.inkBlack};
  font-size: ${({ theme }) => theme.typography.heading}px;
`;

interface CardViewProps {
  card: Card;
}

/**
 * CardView component for displaying card questions and choices
 * Enhanced with animations for card transitions and interactions
 */
export default function CardView({ card }: CardViewProps) {
  const { answerCard } = useReviewStore();
  const [selectedChoice, setSelectedChoice] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<'correct' | 'incorrect' | null>(null);
  const [exitCard, setExitCard] = useState(false);

  // Reset state when card changes
  useEffect(() => {
    setSelectedChoice(null);
    setFeedback(null);
    setExitCard(false);
  }, [card.id]);

  const handleChoiceSelect = (choiceId: string) => {
    setSelectedChoice(choiceId);

    // Check if correct
    const choice = card.choices.find(c => c.id === choiceId);
    const isCorrect = choice?.isCorrect || false;

    // Show feedback
    setFeedback(isCorrect ? 'correct' : 'incorrect');

    // Trigger exit animation after a brief delay
    setTimeout(() => {
      setExitCard(true);
    }, 1000);

    // Tell store after showing feedback
    answerCard(card.id, choiceId);
  };

  // Determine button state based on selection and feedback
  const getButtonState = (choiceId: string): ButtonState => {
    if (selectedChoice === choiceId) {
      return feedback || 'selected';
    }
    
    // If user has made a selection and this wasn't the choice
    if (selectedChoice !== null) {
      // If this is the correct answer, highlight it
      const isCorrectAnswer = card.choices.find(c => c.id === choiceId)?.isCorrect;
      if (isCorrectAnswer && feedback === 'incorrect') {
        return 'correct';
      }
    }
    
    return 'default';
  };

  // Instead of using AnimatePresence which is causing issues,
  // we'll just use MotiView directly for animations
  return (
    <CardContainer
      key={card.id} // Key ensures proper remounting when card changes
      from={{ 
        opacity: 0, 
        translateY: 20,
        scale: 0.95,
        rotate: '0.5deg',
      }}
      animate={{ 
        opacity: exitCard ? 0 : 1, 
        translateY: exitCard ? -20 : 0,
        scale: exitCard ? 0.95 : 1,
        rotate: exitCard ? '-0.5deg' : '0deg',
      }}
      transition={{ 
        type: 'spring',
        damping: 15,
        mass: 1,
        stiffness: 120,
      }}
    >
      <QuestionContainer
        from={{ opacity: 0, translateY: 10 }}
        animate={{ opacity: 1, translateY: 0 }}
        transition={{ type: 'timing', duration: 300, delay: 150 }}
      >
        <QuestionText>{card.question}</QuestionText>
      </QuestionContainer>

      {card.choices.map((choice, index) => (
        <ChoiceButton
          key={choice.id}
          text={choice.text}
          onPress={() => handleChoiceSelect(choice.id)}
          state={getButtonState(choice.id)}
          disabled={selectedChoice !== null}
          index={index} // Pass index for staggered animation
        />
      ))}
    </CardContainer>
  );
}