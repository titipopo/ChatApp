import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

// Auth
import { cloud_db } from '../../firebase/index';

// context
import {
  UseAuth,
  UseLan,
  GetLan,
} from '../../context/index';

// common
import { GetParsedDate } from '../../common/index';

// components
import {
  StyledKeyboardAvoidingView,
  StyledTextInput,
  StyledText,
  StyledTouchable,
  StyledView,
  StyledIcon,
  StyledFlatList,
  StyledSafeAreaView,
} from '../../components/index';

const ChatDetails = ({ ...props }) => {
  const { setShowChat, target } = props;
  const { user } = UseAuth();
  const { language } = UseLan();
  const lan = GetLan(language);

  const [messages, setMessages] = useState([]);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    const fetchMessagesByGroupId = (groupId) => {
      cloud_db.collection('message')
        .doc(groupId)
        .collection('messages')
        .orderBy('sentAt')
        .onSnapshot((querySnapshot) => {
          const allMessages = [];
          querySnapshot.forEach((doc) => {
            if (doc) allMessages.push(doc.data());
          });
          setMessages(allMessages.reverse());
        });
    };

    fetchMessagesByGroupId(target.id);
  }, [target.id]);

  const sendMessage = async () => {
    if (inputValue.trim()) {
      const message = {
        messageText: inputValue,
        sentAt: new Date(),
        sentBy: user.uid,
      };
      const group = {
        recentMessage: {
          recentMessageSentAt: new Date(),
          recentMessageSendBy: user.uid,
          messageText: inputValue,
        },
      };

      await cloud_db.collection('message')
        .doc(target.id)
        .collection('messages')
        .add(message)
        .then(function (docRef) {
          setInputValue('');
        })
        .catch(function (error) {
          console.log(error);
        });

      await cloud_db.collection('group')
        .doc(target.id)
        .update(group)
        .then(function (docRef) { })
        .catch(function (error) {
          // eslint-disable-next-line no-console
          console.error('Error writing document: ', error);
        });
    }
  };

  const GetDateTime = (seconds, nanoseconds) => {
    const fireBaseTime = new Date(seconds * 1000 + nanoseconds / 1000000);
    const date = fireBaseTime.toDateString();
    const atTime = fireBaseTime.toLocaleTimeString();

    return GetParsedDate(date + ' ' + atTime, 7);
  };

  const renderItem = ({ item }) => {
    return item.sentBy === user.uid ? (
      <StyledView
        style={{
          alignItems: 'flex-end',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        transparent>
        <StyledView
          style={{
            width: '80%',
            height: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          transparent>
          <StyledText
            style={{
              marginRight: 10,
            }}>
            {GetDateTime(item.sentAt.seconds, item.sentAt.nanoseconds)}
          </StyledText>
          <StyledText
            style={{
              backgroundColor: 'tomato',
              overflow: 'hidden',
              borderRadius: 20,
              padding: 10,
              flexShrink: 1,
            }}>
            {item.messageText}
          </StyledText>
        </StyledView>
      </StyledView>
    ) : (
      <StyledView
        style={{
          alignItems: 'flex-start',
          paddingHorizontal: 10,
          paddingVertical: 10,
        }}
        transparent>
        <StyledView
          style={{
            width: '80%',
            height: 'auto',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
          transparent>
          <StyledText
            style={{
              backgroundColor: '#9c9ea1',
              overflow: 'hidden',
              borderRadius: 20,
              padding: 10,
              marginRight: 10,
            }}>
            {item.messageText}
          </StyledText>
          <StyledText>
            {GetDateTime(item.sentAt.seconds, item.sentAt.nanoseconds)}
          </StyledText>
        </StyledView>
      </StyledView>
    );
  };

  return (
    <StyledSafeAreaView>
      <StyledView transparent>
        <StyledView
          style={[styles.circle, styles.type2, styles.circle1]}
          border
        />
        <StyledView style={[styles.circle, styles.type1]} border />
        <StyledView
          style={[
            styles.circle,
            styles.type2,
            styles.circle2,
            { alignItems: 'center', justifyContent: 'center' },
          ]}
          border>
          <StyledTouchable
            process={() => {
              setShowChat(false);
            }}
            transparent>
            <StyledIcon name={'hand-pointing-left'} size={50} />
          </StyledTouchable>
        </StyledView>
        <StyledView style={styles.nameContainer} transparent>
          <StyledText bold>{'Send Message To'}</StyledText>
          <StyledText big>{target.name}</StyledText>
        </StyledView>
      </StyledView>
      <StyledKeyboardAvoidingView border>
        <StyledFlatList data={messages} renderItem={renderItem} scrollToEnd />

        <StyledView
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            overflow: 'hidden',
            padding: 5,
          }}
          border>
          <StyledTouchable transparent>
            <StyledIcon name={'image'} size={30} />
          </StyledTouchable>
          <StyledTextInput
            multiline
            blurOnSubmit
            left
            maxLength
            placeholder="Type your message here..."
            onChangeText={(name) => setInputValue(name)}
            value={inputValue}
          />
          <StyledTouchable
            process={sendMessage}
            height={30}
            style={{ flexBasis: 70 }}
            transparent
            border>
            <StyledText style={styles.textUp} bold>
              {lan.forgot_password_screen.send}
            </StyledText>
          </StyledTouchable>
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default ChatDetails;

const styles = StyleSheet.create({
  textUp: {
    textTransform: 'uppercase',
  },
  circle: {
    borderRadius: 200,
  },
  type1: {
    position: 'absolute',
    top: -50,
    left: -50,
    width: 300,
    height: 300,
  },
  type2: {
    width: 100,
    height: 100,
  },
  circle1: {
    marginLeft: 200,
    marginTop: 50,
  },
  circle2: {
    left: -20,
    top: 20,
  },
  nameContainer: { position: 'absolute', top: 70, left: 50 },
});
