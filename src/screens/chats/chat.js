import { useState, useEffect } from 'react';

// context
import {
  UseAuth,
  UseLan,
  GetLan,
} from '../../context/index';

// data
import { getByDoc, getCloudDatasWithCondition } from '../../firebase/index';

// component
import {
  ContentsContainers,
  StyledChatsList,
  StyledTouchable,
  StyledView,
  StyledIcon,
} from '../../components/index';

// screens
import { CreateGroup, CreatePrivateChat, ChatDetails } from '../../screens/index';

import { BottomSheet } from 'react-native-btr';

const Chats = ({ ...props }) => {
  const { user } = UseAuth();

  const { language } = UseLan();
  const lan = GetLan(language);

  const [listChats, setListChats] = useState([]);
  const [visible, setVisible] = useState(false);
  const [privateVisible, setPrivateVisible] = useState(false);
  const [showChat, setShowChat] = useState(false);
  const [target, setTarget] = useState([]);
  const [isLoad, setIsLoad] = useState(true);

  useEffect(() => {
    try {
      const fetchGroupByUserID = async (uid) => {
        const allGroups = [];
        getCloudDatasWithCondition('group', 'members', 'array-contains', uid)
          .then((querySnapshot) => {
            querySnapshot.forEach((doc) => {
              const data = doc.data();
              data.id = doc.id;
              allGroups.push(data);
            });
            setListChats(allGroups);
          })
          .catch((error) => {
          });
      };
      fetchGroupByUserID(user.uid);
    } catch (er) {
      console.log(er);
    }
  }, [user.uid, visible]);

  useEffect(() => {
    const checkType = () => {
      listChats.forEach(async (value) => {
        if (value.type === 1) {
          const id =
            value.createdBy === user.uid ? value.members[0] : value.members[1];

          getByDoc('user', id)
            .then((documentSnapshot) => {
              if (documentSnapshot.exists()) {
                var index = listChats.indexOf(value);
                if (index !== -1) {
                  listChats[index].name = documentSnapshot.data().displayName
                    ? documentSnapshot.data().displayName
                    : documentSnapshot.data().email;
                  listChats[index].imageUrl = documentSnapshot.data().photoURL
                    ? documentSnapshot.data().photoURL
                    : 'https://ui-avatars.com/api/?background=transparent&background=random&rounded=true&bold=true&name=' +
                    listChats[index].name;
                }
              }
              setListChats(listChats);
              if (isLoad) setIsLoad(false);
            })
            .catch((error) => {
            });
        }
      });
    };
    checkType();
  }, [listChats, user.uid, isLoad]);

  return (
    <ContentsContainers
      title={lan.chat_screen.header}
      stickToTopView={
        <StyledView
          style={{
            width: '100%',
            marginBottom: 10,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-around',
          }}
          transparent>
          <StyledTouchable
            process={() => {
              setPrivateVisible(true);
            }}
            style={{ width: 100 }}
            border
            transparent>
            <StyledView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              transparent>
              <StyledIcon name={'account'} size={30} />
              <StyledIcon name={'plus'} size={30} />
            </StyledView>
          </StyledTouchable>
          <StyledTouchable
            process={() => {
              setVisible(true);
            }}
            style={{ width: 100 }}
            border
            transparent>
            <StyledView
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
              transparent>
              <StyledIcon name={'account-group'} size={30} />
              <StyledIcon name={'plus'} size={30} />
            </StyledView>
          </StyledTouchable>
        </StyledView>
      }>
      <StyledChatsList
        data={listChats}
        setShowChat={setShowChat}
        setTarget={setTarget}
      />

      <BottomSheet visible={showChat}>
        <ChatDetails setShowChat={setShowChat} target={target} />
      </BottomSheet>

      <BottomSheet visible={visible}>
        <CreateGroup setVisible={setVisible} />
      </BottomSheet>

      <BottomSheet visible={privateVisible}>
        <CreatePrivateChat setVisible={setPrivateVisible} />
      </BottomSheet>
    </ContentsContainers>
  );
};

export default Chats;
