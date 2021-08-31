import React from 'react';
import { TextInput as NativeTextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  text: {
    padding: 5,
    margin: 5,
    borderWidth:1,
  },
  error:{
    borderColor:'red',
  },
});

const TextInput = ({style, error, ...props}) => {
  const [state, setState] = React.useState({height: 0});
  let TextInputStyles =[
    styles.text,
    style,
    error  && styles.error,
    {height: Math.max(35, state.height)}
];
  return(
    <NativeTextInput
      style={TextInputStyles}
      onContentSizeChange={(event) => {
        setState({height: event.nativeEvent.contentSize.height});
        }}
      {...props}
    />
  );

};


export default TextInput;
