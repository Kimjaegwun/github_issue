import axiosInstance from '.';

interface QueryKeyType {
  pageParam: number;
  queryKey: [string, string];
}

export const searchApi = ({pageParam = 0, queryKey}: QueryKeyType) => {
  return axiosInstance.get(
    `/repos/facebook/${queryKey[1]}/issues?page=${pageParam + 1}`,
  );
};
