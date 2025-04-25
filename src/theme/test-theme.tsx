import React from 'react';
import styled from 'styled-components/native';
import ThemeProvider from './ThemeProvider';

// Example styled component using the theme
const StyledText = styled.Text`
  color: ${props => props.theme.colors.cobaltBlue};
  font-size: ${props => props.theme.typography.body}px;
  margin: ${props => props.theme.spacing(1)}px;
`;

// Example component that uses the ThemeProvider
export const TestTheme: React.FC = () => {
  return (
    <ThemeProvider>
      <StyledText>Test Theme</StyledText>
    </ThemeProvider>
  );
};

export default TestTheme;
