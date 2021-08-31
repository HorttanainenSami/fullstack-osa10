import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Redirect} from 'react-router-native';
import RepositoryList from '../tabs/RepositoryList';
import AppBar from './AppBar';
import SignIn from '../tabs/SignInView';
import Repository from '../tabs/Repository';
import CreateReview from '../tabs/CreateReview';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});
const Main = () =>{
  return(
      <View style={styles}>
      <AppBar />
        <Switch >
          <Route path='/signin' exact>
            <SignIn />
          </Route>
          <Route path='/review' exact>
            <CreateReview />
          </Route>
          <Route path="/repository/:id" exact>
            <Repository  />
          </Route>
          <Route path='/' exact>
            <RepositoryList />
          </Route>
          <Redirect to='/' />
        </Switch>
      </View>
  );

};
export default Main;

