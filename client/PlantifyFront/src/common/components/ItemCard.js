import React from 'react';
import {View, StyleSheet, Image, Text, TouchableOpacity} from 'react-native';

const ItemCard = ({item, navigation, screenName, onUserDelete}) => {
  let name = '';
  if (!item.username) {
    name = `${item.name} (ID: ${item._id})`;
  } else name = `${item.username} (ID: ${item._id})`;

  const handlePress = () => {
    navigation.navigate(screenName, {item: item, onUserDelete: onUserDelete});
  };

  return (
    <TouchableOpacity
      activeOpacity={0.7}
      onPress={handlePress}
      style={styles.container}>
      <View style={styles.card}>
        {item.imageUrl && item.imageUrl.trim() !== '' && (
          <Image source={{uri: item.imageUrl}} style={styles.image} />
        )}
        <Text style={styles.name}>{name}</Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  card: {
    backgroundColor: 'white',
    flexDirection: 'row',
    justifyContent: 'space-between', // Adjusted from 'space-evenly'
    alignItems: 'center',
    borderRadius: 10,
    width: '95%',
    height: 100,
    marginVertical: 10,
    paddingHorizontal: 20, // Adjusted from 30
    paddingVertical: 20,
    shadowColor: '#75DF0',
    shadowOffset: {
      width: 0,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.5,
    elevation: 5,
  },
  image: {
    borderRadius: 10,
    width: 80, // Adjusted from 100
    height: 80,
    resizeMode: 'cover',
  },
  name: {
    color: '#363636',
    fontFamily: 'Roboto-Regular',
    fontSize: 16,
    flexShrink: 1, // This allows the text to shrink if there's not enough space

    marginLeft: 10, // Added some margin for spacing
  },
});

export default ItemCard;
