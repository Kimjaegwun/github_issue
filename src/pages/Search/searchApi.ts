import {IssueResult} from './../../types/index';
import {AxiosError, AxiosResponse} from 'axios';
import {useInfiniteQuery} from 'react-query';
import {searchApi} from '../../api/api';

const useSearchApi = (query: string, page: number = 0) => {
  return useInfiniteQuery<AxiosResponse<Array<IssueResult>>, AxiosError>(
    ['search', query],
    searchApi as any,
    {
      getNextPageParam: () => {
        return page;
      },
      enabled: Boolean(query),
    },
  );
};

export default useSearchApi;
