import * as React from 'react';
import { theme } from '../../theme';
import { Button } from 'react-native-paper';
import { StyleSheet } from 'react-native';

const ReusableButton = ({
  buttonStyle = {},
  handleLoader = false,
  disabled = false,
  mode,
  onPress,
  title,
  labelStyle = {},
  color
}) => (
  <Button
    style={
      !disabled ? { ...styles.button, ...buttonStyle } : styles.disabledButton
    }
    loading={handleLoader}
    disabled={disabled}
    labelStyle={{ ...styles.ButtonLabelStyle, ...labelStyle }}
    onPress={onPress}
    mode={mode}
    color={color}
  >
    {title}
  </Button>
);

const styles = StyleSheet.create({
  button: {
    padding: theme.spacing.padding,
    backgroundColor: theme.colors.background,
    borderRadius: theme.roundness,
  },
  disabledButton: {
    padding: 5,
    backgroundColor: theme.colors.disabled,
    borderRadius: theme.roundness,
    width: '96%',
    alignSelf: 'center',
  },
});

export default ReusableButton;
