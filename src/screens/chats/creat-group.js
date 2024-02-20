import { useState, useEffect } from 'react';
import { StyleSheet } from 'react-native';

// context
import {
  UseAuth,
  UseLan,
  GetLan,
} from '../../context/index';

// data
import { addByDoc, getByDoc, getCloudDatas } from '../../firebase/index';

// consts
import { Strings } from '../../consts/index';

// components
import {
  StyledSafeAreaView,
  StyledTextInput,
  StyledText,
  StyledTouchable,
  StyledView,
  StyledFlatList,
  StyledIcon,
  StyledKeyboardAvoidingView,
} from '../../components/index';

const CreateGroup = ({ ...props }) => {
  const { setVisible } = props;
  const { user } = UseAuth();
  const { language } = UseLan();
  const lan = GetLan(language);

  const [groupName, setGroupName] = useState('');
  const [errortext, setErrortext] = useState('');
  const [checkedItems, setCheckedItems] = useState([]);
  const [users, setUsers] = useState([]);
  const [filteredData, setFilteredData] = useState(users);
  const [filter, setFilter] = useState('');

  useEffect(() => {
    const filteredData = filter
      ? users.filter((x) =>
        String(x.email.toLowerCase()).includes(filter.toLowerCase())
      )
      : users;
    setFilteredData(filteredData);
  }, [filter, users]);

  useEffect(() => {
    const fetchUsers = async () => {
      const allUsers = [];
      getCloudDatas('user')
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            const users = doc.data();
            if (user.uid !== users.uid) {
              allUsers.push(users);
            }
          });
          setUsers(allUsers);
        })
        .catch((error) => {
        });
    };
    fetchUsers();
  }, [user.uid]);

  function handleSubmitPress() {
    setErrortext('');
    if (!groupName) {
      setErrortext('fill group name');
      return;
    }
    checkedItems.push(user.uid);
    createGroup(checkedItems, user.uid, groupName);
  }

  const createGroup = async (userArray, createdBy, name) => {
    let userName = name;
    if (userArray.length <= 2) {
      getByDoc('user', userArray[0])
        .then((documentSnapshot) => {
          if (documentSnapshot.exists) {
            userName = documentSnapshot.data().displayName
              ? documentSnapshot.data().displayName
              : documentSnapshot.data().email;
          }
        })
        .catch((error) => {
        });
    }

    const group = {
      id: '',
      imageUrl: name
        ? 'https://ui-avatars.com/api/?background=transparent&background=random&rounded=true&bold=true&name=' +
        name
        : '',
      createdAt: new Date(),
      createdBy: createdBy,
      members: userArray,
      recentMessage: {
        recentMessageSentAt: new Date(),
        recentMessageSendBy: '',
        messageText: '',
      },
      name: userArray.length > 2 ? name : userName,
      type: userArray.length > 2 ? 2 : 1,
    };

    addByDoc('group', group).then(() => {
      setVisible(false);
    })
  };

  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const renderItem = ({ item }) => {
    return (
      <StyledTouchable
        process={() => {
          toggleItem(item.uid);
        }}
        transparent
        border>
        <StyledView
          style={{
            width: '100%',
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 20,
            paddingVertical: 10,
          }}
          transparent>
          <StyledIcon
            name={
              isChecked(item.uid)
                ? 'checkbox-blank-circle'
                : 'checkbox-blank-circle-outline'
            }
            size={30}
          />
          <StyledText>
            {item.displayName ? item.displayName : item.email}
          </StyledText>
        </StyledView>
      </StyledTouchable>
    );
  };

  const toggleItem = (uid) => {
    if (isChecked(uid)) {
      setCheckedItems(checkedItems.filter((id) => id !== uid));
    } else {
      setCheckedItems([...checkedItems, uid]);
    }
  };

  return (
    <StyledSafeAreaView>
      <StyledKeyboardAvoidingView transparent>
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
                setVisible(false);
              }}
              transparent>
              <StyledIcon name={'hand-pointing-left'} size={50} />
            </StyledTouchable>
          </StyledView>
          <StyledView style={styles.nameContainer} transparent>
            <StyledText bold>{'Start~~~'}</StyledText>
            <StyledText big>{'Create Group'}</StyledText>
          </StyledView>
        </StyledView>

        <StyledView style={styles.container} transparent>
          <StyledTextInput
            icon={'account-group'}
            placeholder={'Enter Group Name'}
            onChangeText={(name) => setGroupName(name)}
            border
            left
            pdR
            style={{ height: 40 }}
          />
          {errortext != '' ? (
            <StyledText numberOfLines={1} style={styles.text} error>
              {errortext}
            </StyledText>
          ) : null}
          <StyledTouchable process={handleSubmitPress}>
            <StyledText style={styles.textUp} bold>
              {'Create'}
            </StyledText>
          </StyledTouchable>
        </StyledView>

        <StyledTextInput
          icon={Strings.icons.nomarl.magnify}
          placeholder={'Search Friend'}
          onChangeText={(val) => setFilter(val)}
          border
          left
          pdR
          style={{ height: 40 }}
        />
        <StyledView style={{ flex: 1, marginTop: 10 }} transparent>
          <StyledFlatList
            data={filter ? filteredData : users}
            renderItem={renderItem}
          />
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default CreateGroup;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
  },
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
