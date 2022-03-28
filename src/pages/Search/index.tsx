import AsyncStorage from '@react-native-async-storage/async-storage';
import produce from 'immer';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import Card from '../../components/Card';
import Loading from '../../components/Loading';
import useSearchApi from './searchApi';
import SearchHeader from './searchHeader';
import {IssueResult, RootStackParamList} from '../../types';
import RecentSearch from './recentSearch';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import Error from '../../components/Error';

type RenderProps = {
  item: IssueResult;
  index: number;
};

type Props = NativeStackScreenProps<RootStackParamList, 'Issues'>;

const Search = ({navigation}: Props) => {
  const [searchWord, setSearchWord] = useState('');
  const [page, setPage] = useState(0);
  const [end, setEnd] = useState(false);

  // 검색어 변경시 검색관련 기능 초기화
  const handleSearchWord = (e: string) => {
    setPage(0), setSearchData([]), setSearchWord(e), setEnd(false);
  };

  // 기존 검색했던 이력 가져오기
  const [recentSearch, setRecentSearch] = useState<Array<string>>([]);
  useEffect(() => {
    async function getSearchWord() {
      const getItem = await AsyncStorage.getItem('search');
      if (getItem) {
        const array = getItem.split(',').slice(0, 8);
        setRecentSearch(array);
        await AsyncStorage.setItem('search', array.join(','));
      }
    }
    getSearchWord();
  }, []);

  // 검색어 입력
  const handleSearchWordInRecent = (e: string) => {
    setSearchWord(e);
  };

  // 검색어 삭제
  const deleteRecentSearch = async (idx: number) => {
    setRecentSearch(
      produce((draft: any) => {
        draft.splice(idx, 1);
      }),
    );

    const newArray = recentSearch.filter((_, index) => index !== idx);
    await AsyncStorage.setItem('search', newArray.join(','));
  };

  // 입력 후 리턴시 검색기록 저장
  const submitSearchWord = async (e: string) => {
    const getItem = await AsyncStorage.getItem('search');

    await AsyncStorage.setItem('search', getItem ? `${e},${getItem}` : `${e}`);

    setRecentSearch(
      produce((draft: any) => {
        draft.unshift(e);
      }),
    );
  };

  // 뉴스 데이터 가져오기
  const [searchData, setSearchData] = useState<Array<IssueResult>>([]);
  const {data, isLoading, fetchNextPage, error, refetch} = useSearchApi(
    searchWord,
    page,
  );

  useEffect(() => {
    if (data) {
      const searchList = data?.pages.map(item => item.data).flat();
      // asyncstorage에 저장된 뉴스 리스트와 비교하여 clip 구성
      const sortSearchList = async () => {
        const getStorageList = await AsyncStorage.getItem('clip');
        if (getStorageList) {
          const parseStorageList = JSON.parse(
            getStorageList,
          ) as Array<IssueResult>;
          const checkClipList = searchList.map(item => {
            const findIndex = parseStorageList.findIndex(
              list => list.id === item.id,
            );
            return findIndex !== -1
              ? {...item, clip: true}
              : {...item, clip: false};
          });
          return checkClipList;
        } else {
          return searchList;
        }
      };
      sortSearchList().then(res => setSearchData(res));
      setPage(prev => prev + 1);
    }
  }, [data]);

  // home 화면 foucs시 clip 확인
  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', async () => {
      await AsyncStorage.getItem('clip').then(getStorageList => {
        setSearchData(prev => {
          const parse = JSON.parse(getStorageList || '[]');
          const checkClipList = prev.slice().map(item => {
            const findIndex = parse?.findIndex(
              (list: IssueResult) => list.id === item.id,
            );
            return findIndex !== -1
              ? {...item, clip: true}
              : {...item, clip: false};
          });
          return checkClipList;
        });
      });
    });
    return unsubscribe;
  }, [navigation]);

  // 뉴스 clip 또는 unclip시 asyncstorage 변경
  const handleClip = useCallback(
    async (
      index: number,
      id: string,
      headline: string,
      pub_date: string,
      html_url: string,
    ) => {
      const getItem = await AsyncStorage.getItem('clip');

      setSearchData(
        produce((draft: IssueResult[]) => {
          const getClip = JSON.parse(getItem || '[]');
          draft[index].clip = getClip.length === 4 ? false : !draft[index].clip;
        }),
      );

      if (getItem) {
        const getClip = JSON.parse(getItem);
        const filterClip = getClip.filter(
          (item: IssueResult) => item.id !== id,
        );

        if (filterClip.length === 4) {
          Alert.alert('최대 4개까지 클립 가능합니다.');
        } else if (filterClip.length !== getClip.length) {
          await AsyncStorage.setItem('clip', JSON.stringify(filterClip));
        } else {
          await AsyncStorage.setItem(
            'clip',
            JSON.stringify([
              ...JSON.parse(getItem),
              {
                id,
                headline,
                pub_date,
                html_url,
                repo: searchWord,
              },
            ]),
          );
        }
      } else {
        await AsyncStorage.setItem(
          'clip',
          JSON.stringify([
            {id, headline, pub_date, html_url, repo: searchWord},
          ]),
        );
      }
    },
    [searchWord],
  );

  const _renderItem = ({item, index}: RenderProps) => {
    return (
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('Issues', {html_url: item.html_url});
        }}>
        <Card
          date={item.created_at}
          repo={searchWord}
          title={item.title}
          clip={item.clip}
          handleClip={handleClip}
          index={index}
          id={item.id}
          html_url={item.html_url}
          nav={'search'}
        />
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.base}>
      <SearchHeader
        searchWord={searchWord}
        handleSearchWord={handleSearchWord}
        submitSearchWord={submitSearchWord}
      />

      <RecentSearch
        recent={recentSearch.slice(0, 8)}
        handleSearchWordInRecent={handleSearchWordInRecent}
        deleteRecentSearch={deleteRecentSearch}
      />

      {error ? (
        <Error refetch={refetch} />
      ) : isLoading ? (
        <Loading color="#0000ff" />
      ) : searchData.length > 0 ? (
        <FlatList
          data={searchData}
          renderItem={_renderItem}
          keyExtractor={item => `${item.id}`}
          contentContainerStyle={{paddingHorizontal: 20, paddingTop: 10}}
          onEndReached={() => {
            searchData.length % 10 === 0
              ? [fetchNextPage(), setEnd(true)]
              : setEnd(false);
          }}
          ListFooterComponent={() =>
            end && page <= 100 ? (
              <View style={{marginTop: 10}}>
                <Loading color="#00ff00" />
              </View>
            ) : null
          }
          removeClippedSubviews={true}
          getItemLayout={(_, index) => ({
            length: 110,
            offset: 110 * index,
            index,
          })}
        />
      ) : (
        <View
          style={[
            styles.base,
            {alignItems: 'center', justifyContent: 'center'},
          ]}>
          <Text style={styles.text}>검색어를 입력해주세요.</Text>
        </View>
      )}
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  text: {
    color: '#a5a5a5',
  },
});
