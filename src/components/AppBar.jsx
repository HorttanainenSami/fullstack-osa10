import React from 'react';
import { View, Pressable, StyleSheet, ScrollView } from 'react-native';
import Text from './Text';
import Constants from 'expo-constants';
import theme from '../theme';
import { Link } from 'react-router-native';
import { AUTHORIZED_USER } from '../gql/queries';
import { useQuery } from '@apollo/client';
import AuthStorageContext from '../contexts/AuthStorageContext';
import { useApolloClient } from '@apollo/client';
import AppBarTabButton from './AppBarTabButton';

const styles = StyleSheet.create({
    container: { 
      paddingTop: Constants.statusBarHeight,
      backgroundColor: theme.colors.appbarbackgroundPrimary,
      height: 100,
      flexDirection: 'row',
      alignItems: 'center',
      padding: 10,
    },
    pressable:{
      margin: 5,
      cursor:'pointer',
    }
});
const Repositories = () => (
    <AppBarTabButton >
      <Link to ='/'>
        <Text color='textWhite'>
            Repositories
        </Text>
      </Link>
    </AppBarTabButton>
);
const CreateReview = () => (
    <AppBarTabButton to='/review' >
      <Text color='textWhite'>
        Create a review
      </Text>
    </AppBarTabButton>
);
const Signin = () => (
    <AppBarTabButton to='/signin'>
      <Text color='textWhite'>
        Sign in
      </Text>
    </AppBarTabButton>
);
const SignUp = () => (
    <AppBarTabButton to='/signup'> 
      <Text  color='textWhite'>
        Sign up
      </Text>
    </AppBarTabButton>
);
const SignOut = ({setLogged }) => {
  const authStorage = React.useContext(AuthStorageContext);
  const apolloClient = useApolloClient();
  const handleSignout = () => {
      authStorage.removeAccessToken();
      apolloClient.resetStore();
      setLogged(false);
  };
  return(
    <AppBarTabButton to='/' onPress={handleSignout}>
      <Text color='textWhite'>
        Sign out
      </Text>
    </AppBarTabButton>
  );
};
const AppBar = () => {
  const {data} = useQuery(AUTHORIZED_USER);
  const [logged, setLogged] = React.useState(false);
  React.useEffect(()=> {
    if(data?.authorizedUser){
      setLogged(true);
    }
},[data]);

  return(
    <View style={styles.container}>
      <ScrollView horizontal>
        <Repositories />
        { logged && <CreateReview /> }
        { logged 
          ? <SignOut setLogged={setLogged} /> 
          : <Signin />
        }
        {!logged && <SignUp /> } 
      </ScrollView>
    </View>
  );
};

export default AppBar;
