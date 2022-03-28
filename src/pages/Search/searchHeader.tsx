import React from 'react';
import {Image, StyleSheet, TextInput, View} from 'react-native';

type Props = {
  searchWord: string;
  handleSearchWord: (e: string) => void;
  submitSearchWord: (e: string) => void;
};

const SearchHeader = ({
  searchWord,
  handleSearchWord,
  submitSearchWord,
}: Props) => {
  return (
    <View style={styles.searchWrapper}>
      <Image
        source={require('../../asset/icons/search.png')}
        style={styles.img}
      />
      <TextInput
        value={searchWord}
        onChangeText={handleSearchWord}
        style={styles.input}
        onSubmitEditing={e => {
          e ? submitSearchWord(e.nativeEvent.text) : null;
        }}
      />
    </View>
  );
};

export default SearchHeader;

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
    width: 20,
    height: 20,
    marginRight: 15,
  },
  input: {
    borderColor: 'black',
    borderWidth: 0.5,
    flex: 1,
    height: 30,
    borderRadius: 4,
    paddingHorizontal: 5,
    backgroundColor: '#FFFAF6',
  },
});
