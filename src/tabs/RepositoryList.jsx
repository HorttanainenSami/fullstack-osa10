import React from 'react';
import { Image, FlatList, View, StyleSheet } from 'react-native';
import theme from '../theme';
import Text from '../components/Text';
import CountAndDescription from '../components/CountAndDescription';
const styles = StyleSheet.create({
  separator: {
    height: 10,
    backgroundColor: 'grey',
  },
  item: {
    margin: 5,
  }
});


const repositories = [
  {
    id: 'jaredpalmer.formik',
    fullName: 'jaredpalmer/formik',
    description: 'Build forms in React, without the tears',
    language: 'TypeScript',
    forksCount: 1589,
    stargazersCount: 21553,
    ratingAverage: 88,
    reviewCount: 4,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/4060187?v=4',
  },
  {
    id: 'rails.rails',
    fullName: 'rails/rails',
    description: 'Ruby on Rails',
    language: 'Ruby',
    forksCount: 18349,
    stargazersCount: 45377,
    ratingAverage: 100,
    reviewCount: 2,
    ownerAvatarUrl: 'https://avatars1.githubusercontent.com/u/4223?v=4',
  },
  {
    id: 'django.django',
    fullName: 'django/django',
    description: 'The Web framework for perfectionists with deadlines.',
    language: 'Python',
    forksCount: 21015,
    stargazersCount: 48496,
    ratingAverage: 73,
    reviewCount: 5,
    ownerAvatarUrl: 'https://avatars2.githubusercontent.com/u/27804?v=4',
  },
  {
    id: 'reduxjs.redux',
    fullName: 'reduxjs/redux',
    description: 'Predictable state container for JavaScript apps',
    language: 'TypeScript',
    forksCount: 13902,
    stargazersCount: 52869,
    ratingAverage: 0,
    reviewCount: 0,
    ownerAvatarUrl: 'https://avatars3.githubusercontent.com/u/13142323?v=4',
  },
];
const ItemSeparator = () =>  <View style={styles.separator}/>;
const renderItem = ({item}) => {
  return(
    <View style = {styles.item}>
    <View style= {{display: 'flex', flexDirection: 'row'}}>
    <Image style = {{...theme.tinyLogo, flexGrow: 0 }} source = {{uri: item.ownerAvatarUrl}} />
    <View style= {{ margin:5, display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
    <Text fontWeight='bold' >{item.fullName} </Text>
    <Text color='textSecondary'>{item.description} </Text>
    <Text color='textWhite' style={{ flexGrow: 0, padding: 5, borderRadius:5,  backgroundColor: theme.colors.primary}}>{item.language} </Text>
        </View>
      </View>
    <View style = {{display: 'flex', flexDirection:'row', justifyContent:'space-between'}}>
      <CountAndDescription count={item.stargazersCount} text='stars' />
      <CountAndDescription count={item.forksCount} text='forks' />
      <CountAndDescription count={item.reviewCount} text='Reviews' />
      <CountAndDescription count={item.ratingAverage} text='Rating' />
      </View>
    </View>
  );
};

const RepositoryList = () => {
  return (
    <FlatList
      data={repositories}
      ItemSeparatorComponent={ItemSeparator}
      renderItem = {renderItem}
      keyExtractor = {(item) => item.id}
      // other props
    />
  );
};

export default RepositoryList;
