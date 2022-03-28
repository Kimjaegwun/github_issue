import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  refetch: () => void;
};

const Error = ({refetch}: Props) => {
  return (
    <View style={styles.base}>
      <Text style={[styles.text, {marginBottom: 10}]}>
        오류가 발생하였습니다.
      </Text>
      <TouchableOpacity onPress={() => refetch()}>
        <View style={styles.button}>
          <Text style={styles.btnText}>재시도</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default Error;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  button: {
    borderRadius: 4,
    paddingVertical: 5,
    paddingHorizontal: 10,
    backgroundColor: '#e0e0e0',
  },
  text: {
    color: '#a5a5a5',
  },
  btnText: {
    color: '#607a9b',
  },
});
