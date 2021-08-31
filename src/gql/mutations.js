import { gql } from '@apollo/client';

export const SIGN_IN = gql`
  mutation($credentials:AuthorizeInput!){
    authorize(
      credentials: $credentials,
    ){accessToken}
  }`;

export const CREATE_REVIEW = gql`
  mutation($input: CreateReviewInput!) {
    createReview(review: $input ){
        repositoryId,
    }
  }
`;
