import React from 'react';
import {StyleSheet, Text, View} from 'react-native';

const ClipHeader = () => {
  return (
    <View style={styles.wrapper}>
      <Text style={styles.text}>Clip</Text>
    </View>
  );
};

export default ClipHeader;

const styles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    borderBottomWidth: 1,
    borderColor: '#edf0f5',
    paddingVertical: 10,
    paddingHorizontal: 20,
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});
