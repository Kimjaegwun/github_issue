import React from 'react';
import {ActivityIndicator, StyleSheet, View} from 'react-native';

type Props = {
  color: string;
};

const Loading = ({color}: Props) => {
  return (
    <View style={styles.base}>
      <ActivityIndicator size={'small'} color={color} />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
