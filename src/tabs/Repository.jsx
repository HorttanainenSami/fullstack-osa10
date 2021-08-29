import React from 'react';
import { useParams } from 'react-router-dom';
import { RenderItem } from './RepositoryList';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../gql/queries';
const Repository = () => {
  let { id } = useParams();
  const [getRepository, result] = useLazyQuery(GET_REPOSITORY);
  React.useEffect( () => {
    getRepository({variables: {id: id}}); 
  },[id]);
  if(!result.data?.repository) return(<div> loading</div>);
  //item ja signleView = true
  return(<RenderItem item={result.data?.repository} singleView={true} />);
};


export default Repository;
