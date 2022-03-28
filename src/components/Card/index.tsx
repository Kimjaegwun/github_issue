import React from 'react';
import {Image, StyleSheet, Text, TouchableOpacity, View} from 'react-native';

type Props = {
  date: string;
  repo: string;
  title: string;
  clip: boolean;
  handleClip: any;
  index: number;
  id: string;
  html_url: string;
  nav: string;
};

const Card = ({
  date,
  repo,
  title,
  clip,
  handleClip,
  index,
  id,
  html_url,
  nav,
}: Props) => {
  return (
    <View style={styles.contentContainer}>
      <View style={styles.headerContainer}>
        <Text style={styles.tag} allowFontScaling={false} numberOfLines={1}>
          # {date.slice(0, 10)}
        </Text>
        <View style={styles.bookmarkContainer}>
          <TouchableOpacity
            onPress={() => {
              nav === 'search'
                ? handleClip(index, id, title, date, html_url)
                : handleClip(index);
            }}>
            <View style={styles.heartWarpper}>
              <Image
                source={
                  clip
                    ? require('../../asset/icons/active-heart.png')
                    : require('../../asset/icons/heart.png')
                }
                style={styles.heart}
              />
            </View>
          </TouchableOpacity>
        </View>
      </View>

      <Text style={styles.repo} allowFontScaling={false} numberOfLines={2}>
        [{repo}]
      </Text>

      <Text style={styles.title} allowFontScaling={false} numberOfLines={2}>
        {title}
      </Text>
    </View>
  );
};

export default React.memo(Card);

const styles = StyleSheet.create({
  contentContainer: {
    flex: 3,
    padding: 10,
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 4,
    height: 110,
    marginBottom: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  tag: {
    fontSize: 11,
    color: 'gray',
    paddingTop: 3,
  },
  bookmarkContainer: {
    flex: 1,
    alignItems: 'flex-end',
  },
  heartWarpper: {
    backgroundColor: '#e2e2e2',
    borderRadius: 50,
    padding: 6,
  },
  heart: {
    width: 12,
    height: 12,
  },
  title: {
    fontSize: 13,
    fontWeight: 'bold',
    height: 35,
  },
  repo: {
    fontSize: 13,
    marginBottom: 10,
  },
});
