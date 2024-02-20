import { useState } from 'react';
import { StyleSheet, KeyboardAvoidingView, Platform } from 'react-native';

// context
import {
  SignIn,
  UseLan,
  GetLan,
} from '../../context/index';

// consts
import { Strings } from '../../consts/index';

// components
import {
  StyledSafeAreaView,
  StyledTextInput,
  StyledText,
  StyledTouchable,
  StyledView,
  CircelContainer,
} from '../../components/index';

const ForgotPassword = ({ navigation }) => {
  const { language } = UseLan();
  const lan = GetLan(language);

  const [userEmail, setUserEmail] = useState('');
  const [errortext, setErrortext] = useState('');

  function handleSubmitPress() {
    setErrortext('');
    if (!userEmail) {
      setErrortext(lan.forgot_password_screen.mail_error);
      return;
    }
    SignIn(navigation, userEmail, userPassword, setErrortext);
  }

  return (
    <StyledSafeAreaView>
      <KeyboardAvoidingView transparent>
        <CircelContainer
          greeting={lan.forgot_password_screen.greeting}
          title={lan.forgot_password_screen.title}
        />

        <StyledView style={styles.container} transparent>
          <StyledTextInput
            icon={Strings.icons.nomarl.at}
            placeholder={lan.forgot_password_screen.email_place_holder}
            onChangeText={(email) => setUserEmail(email)}
            border
            left
            pdR
            mgL
            mgR
            mgB
            style={{ height: 40 }}
          />
          {errortext != '' ? (
            <StyledText numberOfLines={1} style={styles.text} error>
              {errortext}
            </StyledText>
          ) : null}
          <StyledTouchable process={handleSubmitPress}>
            <StyledText style={styles.textUp} bold>
              {lan.forgot_password_screen.send}
            </StyledText>
          </StyledTouchable>
          <StyledTouchable
            style={styles.text}
            transparent
            process={() => {
              navigation.navigate(Strings.navigation_names.login);
            }}>
            <StyledText>{lan.forgot_password_screen.back}</StyledText>
          </StyledTouchable>
        </StyledView>
      </KeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default ForgotPassword;

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
  },
  text: {
    textAlign: 'center',
    alignSelf: 'center',
    padding: 10,
  },
  textUp: {
    textTransform: 'uppercase',
  },
});
