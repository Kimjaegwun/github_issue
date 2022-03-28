import React from 'react';
import {WebView as Web} from 'react-native-webview';

type Props = {
  web_url: string;
};

const WebView = ({web_url}: Props) => {
  console.log(web_url);
  return (
    <Web
      originWhitelist={['*']}
      source={{uri: web_url}}
      startInLoadingState={true}
    />
  );
};

export default WebView;
