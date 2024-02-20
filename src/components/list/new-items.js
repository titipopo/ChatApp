import { StyleSheet } from 'react-native';

// component
import {
  StyledTouchable,
  StyledText,
  StyledView,
  StyledImage,
} from '../../components/index';

const StyeledListItem = ({ ...props }) => {
  const { download_url, height, author } = props;
  return (
    <StyledTouchable transparent style={styles.container}>
      <StyledImage
        imgUri={download_url}
        resizeMode="cover"
        style={styles.image}
      />
      <StyledView style={styles.secsionTitle}>
        <StyledText numberOfLines={3} bold>
          {author}
        </StyledText>
        <StyledView style={styles.authorRow}>
          <StyledView style={styles.author}>
            <StyledImage imgUri={download_url} style={styles.avatar} border />
            <StyledText numberOfLines={1} bold>
              {author.length <= 8 ? author : `${author.substring(0, 6)}...`}
            </StyledText>
          </StyledView>
          <StyledText style={styles.date} small>
            {height}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchable>
  );
};

export default StyeledListItem;

const styles = StyleSheet.create({
  container: {
    height: 370,
    width: 300,
    borderRadius: 25,
    marginRight: 20,
    borderWidth: 1,
  },
  image: {
    width: '100%',
    height: 190,
    borderTopRightRadius: 25,
    borderTopLeftRadius: 25,
  },
  secsionTitle: {
    width: '100%',
    flex: 1,
    padding: 25,
    justifyContent: 'space-between',
    borderRadius: 25,
  },
  avatar: {
    width: 30,
    height: 30,
    borderRadius: 15,
    marginRight: 10,
  },
  authorRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  author: {
    flex: 3,
    flexDirection: 'row',
    alignItems: 'center',
    marginRight: 25,
  },
  date: {
    flex: 2,
    textAlign: 'right',
  },
});
