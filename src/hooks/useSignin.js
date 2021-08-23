import { useMutation, useApolloClient } from '@apollo/client';
import { SIGN_IN } from '../gql/mutations';
import useAuthStorage from './useAuthStorage';
import { useHistory } from 'react-router-dom';

const useSignin = () => {
  const [mutate, result] = useMutation(SIGN_IN);
  const history = useHistory();
  const authStorage = useAuthStorage();

  const signIn = async (credentials) => {
    const response = await mutate({variables :{credentials}}); 
    const apolloClient = useApolloClient();
    try{
      await authStorage.setAccessToken(response.data.authorize.accesstoken);
      apolloClient.resetStorage();
      history.push('/');
    }catch(e){
      console.log(e);
    }

    return response;
  };

  return [signIn, result];
};

export default useSignin;
