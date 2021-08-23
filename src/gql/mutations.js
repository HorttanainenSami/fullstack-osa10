import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation($credentials:AuthorizeInput!){
    authorize(
      credentials: $credentials,
    ){accessToken}
  }`;
