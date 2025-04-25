import React from 'react';
import { Ionicons, MaterialIcons, FontAwesome, Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native';
import { colors } from '../../theme';

// Define the icon sets we want to support
type IconSet = 'ionicons' | 'material' | 'fontawesome' | 'feather';

interface IconProps {
  // Icon props
  name: string;
  set?: IconSet;
  size?: number;
  color?: string;

  // Touchable props
  onPress?: () => void;
  disabled?: boolean;
  accessibilityLabel?: string;
}

const Icon: React.FC<IconProps> = ({
  name,
  set = 'ionicons',
  size = 24,
  color = colors.inkBlack,
  onPress,
  disabled = false,
  accessibilityLabel,
}) => {
  // Component to render based on the icon set
  const IconComponent = getIconComponent(set);

  // If onPress is provided, wrap in TouchableOpacity, otherwise just render the icon
  if (onPress) {
    return (
      <TouchableOpacity
        onPress={onPress}
        disabled={disabled}
        accessibilityLabel={accessibilityLabel}
        accessibilityRole="button"
        hitSlop={{ top: 10, right: 10, bottom: 10, left: 10 }}
      >
        <IconComponent
          name={name as any}
          size={size}
          color={disabled ? colors.silverGray : color}
        />
      </TouchableOpacity>
    );
  }

  // Just render the icon without touchable wrapper
  return (
    <IconComponent
      name={name as any}
      size={size}
      color={color}
      accessibilityLabel={accessibilityLabel}
    />
  );
};

// Helper function to get the correct icon component based on the set
function getIconComponent(set: IconSet) {
  switch (set) {
    case 'ionicons':
      return Ionicons;
    case 'material':
      return MaterialIcons;
    case 'fontawesome':
      return FontAwesome;
    case 'feather':
      return Feather;
    default:
      return Ionicons;
  }
}

export default Icon;
