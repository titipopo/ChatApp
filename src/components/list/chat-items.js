import { useEffect } from 'react';
import { StyleSheet } from 'react-native';

// component
import {
  StyledTouchable,
  StyledText,
  StyledView,
  StyledImage,
} from '../../components/index';

// component
import { GetFromDate } from '../../common/index';

const StyeledChatItems = ({ ...props }) => {
  const { imageUrl, recentMessage, name, id, setShowChat, setTarget } = props;
  var lastTime;
  useEffect(() => {
    var fireBaseTime = new Date(recentMessage.recentMessageSentAt.seconds * 1000 + recentMessage.recentMessageSentAt.nanoseconds / 1000000);
    lastTime = GetFromDate(fireBaseTime, 7);
  }, []);

  return (
    <StyledTouchable
      style={styles.container}
      process={() => {
        setShowChat(true);
        const target = { id: id, name: name };
        setTarget(target);
      }}
      transparent>
      <StyledView style={styles.container} border>
        <StyledView transparent>
          <StyledImage imgUri={imageUrl} style={styles.avatar} border />
        </StyledView>
        <StyledView style={[styles.box, styles.author]} transparent>
          <StyledText numberOfLines={1} big>
            {name}
          </StyledText>
          <StyledText numberOfLines={1} small>
            {recentMessage.messageText}
          </StyledText>
        </StyledView>
        <StyledView style={[styles.box, styles.date]} transparent>
          <StyledText numberOfLines={1} bold>
            {lastTime}
          </StyledText>
        </StyledView>
      </StyledView>
    </StyledTouchable>
  );
};

export default StyeledChatItems;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    height: 70,
    width: '100%',
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
    justifyContent: 'center',
    flexBasis: 250,
  },
  date: {
    flexBasis: 60,
    justifyContent: 'center',
  },
});
