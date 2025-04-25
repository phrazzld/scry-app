import React, { useState } from 'react';
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
  shadow-opacity: 0.1;
  shadow-radius: 4px;
  shadow-offset: 0px 2px;
  shadow-color: #000;
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
          state={getButtonState(choice.id)}
          disabled={selectedChoice !== null}
        />
      ))}
    </CardContainer>
  );
}