import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
  query ($searchKeyword:String, $orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection){
    repositories(searchKeyword:$searchKeyword, orderBy:$orderBy, orderDirection:$orderDirection){
      edges{
        node{
          id,
          name,
          ownerName,
          createdAt,
          fullName,
          reviewCount,
          ratingAverage,
          forksCount,
          stargazersCount,
          description,
          language,
          ownerAvatarUrl,
          url
        },
        cursor
      }
    }
  }
`;

export const AUTHORIZED_USER = gql`
  query{
    authorizedUser{
      id,
      username,
    }
  }
`;

export const GET_REPOSITORY = gql`
query($id:ID!){
  repository(id:$id){
    id,
        name,
        ownerName,
        createdAt,
        fullName,
        reviewCount,
        ratingAverage,
        forksCount,
        stargazersCount,
        description,
				language,
        ownerAvatarUrl,
        url,
         reviews {
          edges {
            node {
              id
              text
              rating
              createdAt
              user {
                id
                username
              }
            }
          }
        }
  }
}
`;
