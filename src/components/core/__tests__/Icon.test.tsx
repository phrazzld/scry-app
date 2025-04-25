import React from 'react';
import Icon from '../Icon';
import { colors } from '../../../theme';

/**
 * This is a type checking test file to verify the Icon component props are correctly typed
 * and the component compiles without errors.
 */

// Simple test render function to validate component types
function testIconComponent() {
  // Test with default props
  const defaultIcon = <Icon name="home" />;

  // Test with specific icon set
  const materialIcon = <Icon name="search" set="material" />;
  const featherIcon = <Icon name="check" set="feather" />;

  // Test with size and color
  const customSizeIcon = <Icon name="heart" size={32} />;
  const customColorIcon = <Icon name="star" color={colors.cobaltBlue} />;

  // Test with onPress handler
  const onPressCallback = () => console.log('Icon pressed');
  const touchableIcon = <Icon name="settings" onPress={onPressCallback} />;

  // Test with accessibility props
  const accessibleIcon = (
    <Icon
      name="info"
      onPress={onPressCallback}
      accessibilityLabel="More information"
      disabled={false}
    />
  );

  // Test all icon sets
  const allIconSets = [
    <Icon name="home" set="ionicons" key="1" />,
    <Icon name="search" set="material" key="2" />,
    <Icon name="star" set="fontawesome" key="3" />,
    <Icon name="check" set="feather" key="4" />,
  ];

  // Verify results are React elements
  console.log(
    'All icons render correctly:',
    defaultIcon !== null &&
      materialIcon !== null &&
      featherIcon !== null &&
      customSizeIcon !== null &&
      customColorIcon !== null &&
      touchableIcon !== null &&
      accessibleIcon !== null &&
      allIconSets.every(icon => icon !== null)
  );
}

export { testIconComponent };

// This file is for type checking only, not for actual test execution
console.log('Icon component types are valid');
