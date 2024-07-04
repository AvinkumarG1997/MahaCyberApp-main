/* eslint-disable prettier/prettier */
/* eslint-disable prettier/prettier */
import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';

const ButtonColor = ({ onPress, text, disabled }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button} disabled={disabled}>
      <LinearGradient
        colors={['#1CF9FA', '#518BEB', '#9DBEF8']}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 0 }}
        style={styles.linearGradient}
      >
        <Text style={styles.buttonText}>{text}</Text>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    marginTop:'1%',
  },
  linearGradient: {
    paddingVertical: '1%',
    height:45,
    width:'50%',
    paddingHorizontal: '1%',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default ButtonColor;
