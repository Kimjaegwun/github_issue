import React from 'react';
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

type Props = {
  recent: string[];
  handleSearchWordInRecent: (e: string) => void;
  deleteRecentSearch: (idx: number) => void;
};

const RecentSearch = ({
  recent,
  handleSearchWordInRecent,
  deleteRecentSearch,
}: Props) => {
  return (
    <View
      style={[
        styles.wrapper,
        {display: recent.length === 0 ? 'none' : 'flex'},
      ]}>
      <ScrollView
        style={{height: 35, elevation: 0}}
        horizontal
        bounces={false}
        showsHorizontalScrollIndicator={false}>
        {recent.map((item, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => {
              handleSearchWordInRecent(item);
            }}>
            <View
              style={[
                styles.container,
                {marginRight: index === recent.length - 1 ? 10 : 0},
              ]}>
              <Text style={styles.text}>{item}</Text>
              <TouchableOpacity
                onPress={() => {
                  deleteRecentSearch(index);
                }}>
                <Image
                  source={require('../../asset/icons/close.png')}
                  style={styles.img}
                />
              </TouchableOpacity>
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

export default RecentSearch;

const styles = StyleSheet.create({
  wrapper: {
    flexDirection: 'row',
    marginTop: 10,
    borderBottomWidth: 0.4,
  },
  container: {
    borderWidth: 1,
    paddingHorizontal: 7,
    paddingVertical: 4,
    borderRadius: 10,
    borderColor: '#c3c3c3',
    marginLeft: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    fontSize: 13,
    marginRight: 10,
  },
  img: {
    width: 10,
    height: 10,
  },
});
