import { useState } from 'react';
import { StyleSheet } from 'react-native';

// Auth
import { db } from '../../firebase/index';

// common
import { GetParsedDate } from '../../common/index';

// context
import {
  UpdateUser,
  SignOut,
  UseAuth,
  UseLan,
  GetLan,
  SaveUserToFirestore
} from '../../context/index';

// components
import {
  ContentsContainers,
  ItemContainer,
  StyledImage,
  StyledText,
  StyledTextInput,
  StyledView,
  StyledTouchable,
  StyledBarText,
} from '../../components/index';

import { launchCamera, launchImageLibrary } from 'react-native-image-picker';

const Profiles = ({ ...props }) => {
  const { user, setUser } = UseAuth();

  const { language } = UseLan();
  const lan = GetLan(language);

  const [image, setImage] = useState(user.photoURL);
  const [name, setName] = useState(user.displayName);

  const lastLogin = GetParsedDate(user.metadata.lastSignInTime);
  const cretedDate = GetParsedDate(user.metadata.creationTime);

  function logout() {
    SignOut();
    setUser(null);
  }

  function updUser() {
    const update = {
      displayName: name,
      email: user.email,
      uid: user.uid,
      photoURL: image,
      metadata: user.metadata,
    };
    UpdateUser(update);
    SaveUserToFirestore(update);
    setUser(update);
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    const result = await launchImageLibrary({
      mediaTypes: 'mixed',
      quality: 1,
    });

    if (!result.didCancel) {
      uploadImage(result.assets[0].uri);
    }
  };

  const uploadImage = async (value) => {
    const response = await fetch(value);

    const blob = await response.blob();
    const fileName = user.uid + '.png';
    var ref = db.ref('avatar').child(fileName).put(blob);
    try {
      await ref;
      getAvatarUrl(fileName);
    } catch (e) {
      console.log(e);
    }
  };

  const getAvatarUrl = async (fileName) => {
    await db.ref('avatar')
      .child(fileName)
      .getDownloadURL()
      .then((url) => {
        setImage(url);
        return true;
      })
      .catch((error) => {
        console.log(error);
        return false;
      });
  };

  return (
    <ContentsContainers
      title={lan.profiles_screen.header}
      isScrollEnable={false}>
      <StyledView style={styles.container} transparent>
        <StyledView transparent>
          <StyledImage
            imgUri={
              image
                ? image
                : 'https://ui-avatars.com/api/?background=random&rounded=true&bold=true&name=' +
                user.email
            }
            resizeMode="cover"
            style={styles.image}
            border
          />
          <StyledTouchable process={pickImage} style={styles.editButton}>
            <StyledText bold>{lan.profiles_screen.edit}</StyledText>
          </StyledTouchable>
        </StyledView>

        <StyledView style={styles.section}>
          <ItemContainer lable={lan.profiles_screen.name} bold>
            <StyledTextInput
              icon="pencil"
              onChangeText={(value) => setName(value)}
              value={name}
            />
          </ItemContainer>

          <StyledBarText />

          <ItemContainer lable={lan.profiles_screen.email} bold>
            <StyledText>{user.email}</StyledText>
          </ItemContainer>

          <StyledBarText />

          <ItemContainer lable={lan.profiles_screen.uid} bold>
            <StyledText>{user.uid}</StyledText>
          </ItemContainer>

          <StyledBarText />

          <ItemContainer lable={lan.profiles_screen.last_login} bold>
            <StyledText>{lastLogin}</StyledText>
          </ItemContainer>

          <StyledBarText />

          <ItemContainer lable={lan.profiles_screen.joined_on} bold>
            <StyledText>{cretedDate}</StyledText>
          </ItemContainer>
        </StyledView>
      </StyledView>

      <StyledTouchable process={updUser}>
        <StyledText style={styles.textUp} bold>
          {lan.profiles_screen.update}
        </StyledText>
      </StyledTouchable>

      <StyledTouchable process={logout}>
        <StyledText style={styles.textUp} bold>
          {lan.profiles_screen.logout}
        </StyledText>
      </StyledTouchable>
    </ContentsContainers>
  );
};

export default Profiles;

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  editButton: {
    position: 'absolute',
    top: 110,
    left: 120,
    width: 100,
  },
  section: {
    borderRadius: 20,
    overflow: 'hidden',
    marginTop: -20,
    width: '90%',
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 200,
  },
  textUp: {
    textTransform: 'uppercase',
  },
});
