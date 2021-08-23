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
    }
});
const AppBar = () => {
  const {data} = useQuery(AUTHORIZED_USER);
  const authStorage = React.useContext(AuthStorageContext);
  const [logged, setLogged] = React.useState(false);
  const apolloClient = useApolloClient();
  React.useEffect(()=> {
    if(data?.authorizedUser){
      setLogged(true);
    }
},[data]);
  const onPress = () => {
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

        <Pressable 
          onPress ={ logged && onPress}
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
            </Text> 
          : <Link to='/signin' >
              <Text color='textWhite'>
              Sign in
              </Text>
            </Link>
          }
        </Pressable>

      </ScrollView>
    </View>
  );
};

export default AppBar;
