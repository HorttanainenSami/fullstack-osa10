import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    padding: 5,
    margin: 5,
    borderWidth:1,
  }
});

const TextInput = ({style, ...props}) => {
  const TextInputStyles =[styles.text, style];

  return(
    <NativeTextInput
      style={TextInputStyles}
      {...props}
    />
  );

};


export default TextInput;
