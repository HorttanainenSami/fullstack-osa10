import React from 'react';
import { StyleSheet, View } from 'react-native';
import { Switch, Route, Redirect} from 'react-router-native';
import RepositoryList from '../tabs/RepositoryList';
import AppBar from './AppBar';
import SignIn from '../tabs/SignInView';
import Repository from '../tabs/Repository';
import { useHistory } from 'react-router-dom';

const styles = StyleSheet.create({
    container: {
      flexGrow: 1,
      flexShrink: 1,
    }
});
const Main = () =>{
  const history = useHistory();
  console.log(history.location);
  return(
      <View >
      <AppBar />
        <Switch>
          <Route path='/signin' exact>
            <SignIn />
          </Route>
          <Route path="/repository/:id">
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

