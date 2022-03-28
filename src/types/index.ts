export interface IssueResult {
  id: string;
  title: string;
  comments: number;
  html_url: string;
  clip: boolean;
  created_at: string;
}

export type RootStackParamList = {
  Issues: {html_url: string};
  Clip: undefined;
};
