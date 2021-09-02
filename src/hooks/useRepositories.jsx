import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORIES } from '../gql/queries';

const useRepositories = () => {
  const [getRepositories,{loading, data}] = useLazyQuery(GET_REPOSITORIES, {
    fetchPolicy: 'cache-and-network',
    });

  const fetchRepositories = async (props) => {
    console.log(props);
    let variables = '';
    switch(props.order){
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
    variables = props.value ? {...variables, searchKeyword: props.value} : variables;
    await getRepositories({variables: {orderBy:variables?.orderBy, orderDirection:variables?.orderDirection, searchKeyword: variables?.searchKeyword}});
  };
  return{
    repositories: data?.repositories,
    fetchRepositories,
    loading
  };
};

export default useRepositories;
