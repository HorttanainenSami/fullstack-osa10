import React from 'react';
import { Image, FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from '../components/Text';
import useRepositories from '../hooks/useRepositories';
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'grey',
  },
  item: {
    margin: 5,
  }
});

function abbreviateNumber(number){

    var tier = number/1000;
    // if zero, we don't need a suffix
    if(Math.floor(tier) === 0) return number;

    // format number and add suffix
    return Number(tier.toFixed(1)) + 'k';
}

const ItemSeparator = () =>  <View style={styles.separator}/>;
const renderItem = ({item}) => {
  return(
    <View style = {styles.item} testID='item'>
      <View style= {{display: 'flex', flexDirection: 'row'}}>
        <Image style = {{...theme.tinyLogo, flexGrow: 0 }} source = {{uri: item.ownerAvatarUrl}} />
        <View style= {{ margin:5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
          <Text fontWeight='bold' >{item.fullName} </Text>
          <Text color='textSecondary'>{item.description} </Text>
          <Text color='textWhite' style={{ flexGrow: 0, padding: 5, borderRadius:5,  backgroundColor: theme.colors.primary}}>{item.language} </Text>
        </View>
      </View>
      <View testID='stats' style = {{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
        <View style = {{alignItems: 'center'}}>
          <Text>{abbreviateNumber(item.stargazersCount)}</Text>
          <Text> stars </Text> 
        </View>
        <View style = {{alignItems: 'center'}}>
          <Text>{abbreviateNumber(item.forksCount)}</Text>
          <Text> forks </Text> 
        </View>
        <View style = {{alignItems: 'center'}}>
          <Text>{abbreviateNumber(item.reviewCount)}</Text>
          <Text> Reviews </Text> 
        </View>
        <View style = {{alignItems: 'center'}}>
          <Text>{abbreviateNumber(item.ratingAverage)}</Text>
          <Text> Rating </Text> 
        </View>
      </View>
    </View>
  );
};

export const RepositoryListContainer = ({repositories}) => {
  const data = repositories ? 
    repositories.edges.map(edge => edge.node): [];

  return(
    <FlatList
      data={data}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {renderItem}
      keyExtractor = {(item) => item.id}
      // other props
    />
  );
};

const RepositoryList = () => {
  const {repositories} = useRepositories();
  return ( <RepositoryListContainer repositories={repositories} />);
};

export default RepositoryList;
