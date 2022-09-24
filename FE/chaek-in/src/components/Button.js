import { TouchableOpacity, Text } from 'react-native';
import React from 'react';
import styles from './styles';

const Button = ({ onPress, text, style }) => {
  return (
    <TouchableOpacity style={[styles.button, style]} onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
    </TouchableOpacity>
  );
};

export default Button;
