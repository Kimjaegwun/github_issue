import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import React, {useEffect, useState} from 'react';
import {FlatList, StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import Card from '../../components/Card';
import {RootStackParamList} from '../../types';
import ClipHeader from './clipHeader';

type Item = {
  _id: string;
  headline: string;
  pub_date: string;
  html_url: string;
  repo: string;
};

type RenderProps = {
  item: Item;
  index: number;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const Clip = ({navigation}: Props) => {
  const [clipList, setClipList] = useState<Array<Item>>([]);

  // 저장되어 있던 clip 가져오기
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      async function getClipList() {
        const getItem = await AsyncStorage.getItem('clip');
        setClipList(JSON.parse(getItem || '[]'));
      }

      getClipList();
    });
    return unsubscribe;
  }, [navigation]);

  // unclip 함수
  const handleClipList = async (idx: number) => {
    setClipList(prev => {
      const setClip = prev.filter((_, index) => index !== idx);
      setAsync(setClip);
      return setClip;
    });

    async function setAsync(setClip: Array<Item>) {
      await AsyncStorage.setItem('clip', JSON.stringify(setClip));
    }
  };

  const _renderItem = ({item, index}: RenderProps) => {
    console.log(item.html_url);
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Issues', {html_url: item.html_url});
        }}>
        <Card
          date={item.pub_date}
          repo={item.repo}
          title={item.headline}
          clip={true}
          handleClip={handleClipList}
          index={index}
          id={item._id}
          html_url={item.html_url}
          nav={''}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.base}>
      <ClipHeader />
      {clipList.length > 0 ? (
        <FlatList
          data={clipList}
          renderItem={_renderItem}
          keyExtractor={item => `${item._id}_${item.pub_date}`}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
        />
      ) : (
        <View
          style={[
            styles.base,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Text style={styles.text}>클립한 뉴스 항목이 없습니다.</Text>
        </View>
      )}
    </View>
  );
};

export default Clip;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#a5a5a5',
  },
});
