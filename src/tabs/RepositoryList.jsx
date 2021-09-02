import React from 'react';
import { Pressable, Image, FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from '../components/Text';
import useRepositories from '../hooks/useRepositories';
import Button from '../components/Button';
import * as Linking from 'expo-linking';
import { useHistory } from 'react-router-dom';
import { Picker } from '@react-native-picker/picker';

const MyComponent = ({ setOrder, order}) => {
  return(
    <Picker
      selectedValue={order}
      onValueChange={(itemValue, ) => setOrder(itemValue)}>
        <Picker.Item label='Lastest Repositories' value='normal'/>
        <Picker.Item label='Highest rated repositories' value='highest'/>
        <Picker.Item label='Lowest rated repositories' value='lowest'/>

    </Picker>
  );
};
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: theme.colors.backgroundSecondary,
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

export const RenderItem = ({item, singleView}) => {
  const openInBrowser = () => {
    Linking.openURL(item.url);
  };
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
        <View>
        { singleView && <Button handlePress={openInBrowser} text='Open in GitHub' /> }
        </View>

      </View>
  );
};

export const RepositoryListContainer = ({repositories, order, setOrder}) => {
  const data = repositories ? 
    repositories.edges.map(edge => edge.node): [];

  const history = useHistory();
  const handlePress = (id) => {
    history.push(`/repository/${id}`);
  };
  const render = (props) => {
    return(
      <Pressable onPress={() => handlePress(props.item.id)} >
        <RenderItem {...props}/> 
      </Pressable>
    );
  };
  return(
    <FlatList
      data={data}
      ListHeaderComponent={()=><MyComponent order={order} setOrder={setOrder} />} 
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {(props) =>render(props)}
      keyExtractor = {(item) => item.id}
    />
  );
};

const RepositoryList = () => {
  const [order, setOrder] = React.useState();
  const {fetchRepositories, repositories} = useRepositories();
  React.useEffect(() => {
    fetchRepositories(order);
  },[order]);
  return ( <RepositoryListContainer order={order} setOrder={setOrder} repositories={repositories} />);
};

export default RepositoryList;
