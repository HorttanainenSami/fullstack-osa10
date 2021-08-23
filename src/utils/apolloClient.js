import { ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import Constants from 'expo-constants';


const httpLink = createHttpLink({
  uri: Constants.manifest.extra.apolloUrl,
});

const createApolloClient = (authStorage) => {
  const authLink = setContext(async (_, { headers }) =>{
    try{

      const token = await authStorage.getAccessToken();

      return{
      headers:{
        ...headers,
        authorization: token ? `Bearer ${token}` : '',
      },
      
      };
    }catch(e){
      console.log(e);
      return{
        headers,
      };
    }

  });
  
  
  return new ApolloClient({
    link: authLink.concat(httpLink),
    cache: new InMemoryCache(),
  });
};

export default createApolloClient;
