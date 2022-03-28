import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const IssueHeader = () => {
  const navigation = useNavigation();

  return (
    <View style={styles.searchWrapper}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Image
          source={require('../../asset/icons/previous.png')}
          style={styles.img}
        />
      </TouchableOpacity>
      <View style={styles.titleWrapper}>
        <Text style={styles.title}>Issue</Text>
      </View>
      <View style={styles.box} />
    </View>
  );
};

export default IssueHeader;

const styles = StyleSheet.create({
  searchWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#edf0f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  img: {
    width: 23,
    height: 23,
    marginRight: 15,
  },
  titleWrapper: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  box: {
    width: 38,
  },
});
