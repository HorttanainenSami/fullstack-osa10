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
import { useHistory } from 'react-router-dom';

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
const AppBar = () => {
  const {data} = useQuery(AUTHORIZED_USER);
  const authStorage = React.useContext(AuthStorageContext);
  const [logged, setLogged] = React.useState(false);
  const apolloClient = useApolloClient();
  const history = useHistory();
  React.useEffect(()=> {
    if(data?.authorizedUser){
      setLogged(true);
    }
},[data]);
  const handleSign = () => {
    if(!logged) {
      history.push('/signin');
      return;
    }
    authStorage.removeAccessToken();
    apolloClient.resetStore();
    setLogged(false);
  };

  return(
    <View style={styles.container}>
      <ScrollView horizontal>

        <Pressable style={({pressed}) => [
          styles.pressable,
          { 
            backgroundColor: pressed ? 
            theme.colors.buttonPrimary :
            theme.colors.backGroundPrimary,
          },
          ]
        }>
          <Link to ='/'>
            <Text color='textWhite'>
                Repositories
            </Text>
          </Link>
        </Pressable>
    {logged && <Pressable style={({pressed}) => [
          styles.pressable,
          { 
            backgroundColor: pressed ? 
            theme.colors.buttonPrimary :
            theme.colors.backGroundPrimary,
          },
          ]
        }>
        <Link to ='/review' >
          <Text color='textWhite'>
            Create a review
          </Text>
        </Link>
        </Pressable>}

        <Pressable 
          onPress ={handleSign}
          style={({pressed}) => [
            styles.pressable,
            { 
              backgroundColor: pressed ? 
              theme.colors.buttonPrimary :
              theme.colors.backGroundPrimary,
              zIndex: 0.5,
            }
          ]
        }>
          
          { logged ? 
            <Text color='textWhite'>
              Sign out
            </Text>  :
            <Text color='textWhite'>
              Sign in
            </Text>
          }
        </Pressable>

      </ScrollView>
    </View>
  );
};

export default AppBar;
