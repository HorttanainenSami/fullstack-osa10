import React from 'react';
import { View, Pressable, Text, StyleSheet } from 'react-native';
import Constants from 'expo-constants';
import theme from '../theme';

const styles = StyleSheet.create({
    container: { 
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.backGroundPrimary,
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
    }
});
const AppBar = () => (
  <View style={styles.container}>
    <Pressable style={({pressed}) => [
      { 
        margin: 10,
        backgroundColor: pressed ? 
        theme.colors.buttonPrimary :
        theme.colors.backGroundPrimary}]} >
      <Text style={{color: 'white'}} >
        Repositories
      </Text>
    </Pressable>
    </View>
);

export default AppBar;
