import React from 'react';
import { FlatList, View, StyleSheet } from 'react-native';
import { useParams } from 'react-router-dom';
import { RenderItem } from './RepositoryList';
import { useLazyQuery } from '@apollo/client';
import { GET_REPOSITORY } from '../gql/queries';
import Text  from '../components/Text';
import theme from '../theme';
import { format } from 'date-fns';

const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
  },
  item: {
    margin: 5,
    flexDirection:'row',
  },
  reviewNumberContainer:{
    display:'flex',
    justifyContent:'center',
    alignItems:'center',
    borderRadius:25,
    border:'solid',
    width:50,
    height:50,
    color:theme.colors.primary,
    margin: 5,
  },
  reviewContent:{
    margin:5,
  }
  
});
const Repository = () => {
  //item ja signleView = true
  //fetch reviewItems

  let { id } = useParams();
  const [getRepository, {loading, data}] = useLazyQuery(GET_REPOSITORY);
  const [ reviews, setReviews] = React.useState([]);
  React.useEffect( () => {
    getRepository({variables: {id: id}}); 
  },[id]);
  
  React.useEffect(() => {
    if(!loading && data){
      setReviews( data.repository.reviews.length !== 0 ? data.repository.reviews.edges.map(edge => edge.node): []);
    }
  }, [loading]);
  return(
    <FlatList
      data={reviews}
      renderItem={({item}) => <ReviewItem item={item} />}
      ListHeaderComponent={() => <RepositoryInfo repository={data?.repository}/>}
      keyExtractor={({id}) => id}
      ItemSeparatorComponent={separator}
    />
  );
};
const separator = () =>  <View style={styles.separator}/> ;

const RepositoryInfo = ({ repository }) => {
  if(!repository){
    return(
      <Text> loading</Text>
    );
  }
  return(
    <RenderItem
      item={repository}
      singleView={true}
    />);
};
const ReviewItem = ({item}) => {
  console.log(item);
  // fetch reviews
  return(
    <View style={styles.item}>
    <View style={styles.reviewNumberContainer}>
    <Text color='textPrimary'>{item.rating} </Text>
      </View>
    <View style={{display:'flex', flexShrink:1}}>
      <Text style={styles.reviewContent} fontWeight='bold'> {item.user.username} </Text>
      <Text style={styles.reviewContent}> {format( new Date(item.createdAt), 'dd.MM.yyyy')} </Text>
      <Text style={styles.reviewContent}> {item.text} </Text>

      </View>
    </View>);
  
};


export default Repository;
