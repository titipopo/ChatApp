import { StyleSheet } from 'react-native';

// component
import {
  StyledTouchable,
  StyledText,
  StyledView,
  StyledImage,
} from '../../components/index';

const StyeledMusicItems = ({ ...props }) => {
  const { setMp3, process, title, artist } = props;
  return (
    <StyledTouchable
      process={() => {
        setMp3(props);
        process();
      }}
      style={styles.container}
      transparent>
      <StyledView style={styles.container} transparent>
        <StyledView transparent>
          <StyledImage
            imgUri={'https://picsum.photos/200'}
            style={styles.avatar}
            border
          />
        </StyledView>
        <StyledView style={[styles.box, styles.author]} transparent>
          <StyledText numberOfLines={1} bold>
            {title}
          </StyledText>
          <StyledText numberOfLines={1} small>
            {artist}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchable>
  );
};

export default StyeledMusicItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 60,
    width: '100%',
    borderWidth: 1,
    borderRadius: 0,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 200,
    marginLeft: 10,
    marginRight: 10,
  },
  box: {
    flex: 1,
    height: 50,
    width: 50,
  },
  author: {
    flexDirection: 'col',
    flexBasis: 250,
  },
});
