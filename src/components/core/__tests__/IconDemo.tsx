import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import Icon from '../Icon';
import { colors } from '../../../theme';

/**
 * A demo component to visually check different Icon configurations
 * This is not used in the actual app, but can be used for manual testing
 */
const IconDemo = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.heading}>Icon Component Demo</Text>

      <View style={styles.section}>
        <Text style={styles.subheading}>Default Ionicons:</Text>
        <View style={styles.row}>
          <Icon name="home" />
          <Icon name="settings" />
          <Icon name="trash" />
          <Icon name="add" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Different Icon Sets:</Text>
        <View style={styles.row}>
          <Icon name="home" set="ionicons" />
          <Icon name="home" set="material" />
          <Icon name="home" set="fontawesome" />
          <Icon name="home" set="feather" />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Custom Sizes:</Text>
        <View style={styles.row}>
          <Icon name="star" size={16} />
          <Icon name="star" size={24} />
          <Icon name="star" size={32} />
          <Icon name="star" size={40} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>Custom Colors:</Text>
        <View style={styles.row}>
          <Icon name="heart" color={colors.inkBlack} />
          <Icon name="heart" color={colors.cobaltBlue} />
          <Icon name="heart" color={colors.signalGreen} />
          <Icon name="heart" color={colors.warmAmber} />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subheading}>With onPress (Touchable):</Text>
        <View style={styles.row}>
          <Icon name="edit" onPress={() => console.log('Edit pressed')} />
          <Icon
            name="trash"
            onPress={() => console.log('Delete pressed')}
            color={colors.warmAmber}
          />
          <Icon
            name="add-circle"
            onPress={() => console.log('Add pressed')}
            color={colors.signalGreen}
            size={32}
          />
          <Icon name="close-circle" onPress={() => console.log('Close pressed')} disabled={true} />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: colors.chalkWhite,
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: colors.inkBlack,
  },
  section: {
    marginBottom: 24,
  },
  subheading: {
    fontSize: 18,
    marginBottom: 8,
    color: colors.inkBlack,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: colors.silverGray + '20', // 20% opacity
    padding: 16,
    borderRadius: 8,
  },
});

export default IconDemo;
