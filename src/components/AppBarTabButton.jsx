import React from 'react';
import { Pressable, StyleSheet } from 'react-native';
import theme from '../theme';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
    pressable:{
      margin: 5,
      cursor:'pointer',
    }
});
const AppBarTabButton = ({onPress, children, to}) => {
  const history = useHistory();
  const handlePress = () => {
    if(to) history.push(to);
    if(onPress) onPress();
  };
    return(
      <Pressable 
        style={({pressed}) => [
          styles.pressable,
          { 
            backgroundColor: pressed ? 
            theme.colors.buttonPrimary :
            theme.colors.backGroundPrimary,
          },
          ]}
        onPress={handlePress}
      >
      {children}
      </Pressable>
    );


};

export default AppBarTabButton;
