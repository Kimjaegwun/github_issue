import React from 'react';
import {StyleSheet, View} from 'react-native';
import WebView from '../../components/WebView';
import IssueHeader from './issueHeader';

type Props = {
  route: {
    params: {
      html_url: string;
    };
  };
};

const WebPage = ({route}: Props) => {
  return (
    <View style={styles.base}>
      <IssueHeader />
      <WebView web_url={route.params.html_url} />
    </View>
  );
};

export default WebPage;

const styles = StyleSheet.create({
  base: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
});
