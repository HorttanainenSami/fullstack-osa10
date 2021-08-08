import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Redirect } from 'react-router-native';
import RepositoryList from './RepositoryList';
import AppBar from './AppBar';
import SignIn from '../tabs/SignInView';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});
const Main = () =>{
  return(
      <View >
      <AppBar />
        <Switch>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Route path='/signin' exact>
            <SignIn />
          </Route>
          <Redirect to='/' />
        </Switch>
      </View>
  );

};
export default Main;

