import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = () => {
  const [getRepositories,{loading, data}] = useLazyQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    });

  const fetchRepositories = async (props) => {
    let variables = '';
    switch(props){
      case 'normal':
        variables={};
        break;
      case 'lowest':
        variables={
          "orderBy": "RATING_AVERAGE",
          "orderDirection": "ASC"
        };
        break;
      case 'highest':
        variables={
          "orderBy": "RATING_AVERAGE",
          "orderDirection": "DESC",
        };
        break;
    }
    await getRepositories({variables: {orderBy:variables?.orderBy, orderDirection:variables?.orderDirection}});
  };
  return{
    repositories: data?.repositories,
    fetchRepositories,
    loading
  };
};

export default useRepositories;
