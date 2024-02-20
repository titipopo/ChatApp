import { useState } from 'react';
import { StyleSheet } from 'react-native';

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
  StyledKeyboardAvoidingView,
  CircelContainer,
} from '../../components/index';

const Login = ({ navigation }) => {
  const { language } = UseLan();
  const lan = GetLan(language);

  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [errortext, setErrortext] = useState('');

  function handleSubmitPress() {
    setErrortext('');
    if (!userEmail) {
      setErrortext(lan.login_screen.mail_error);
      return;
    }
    if (!userPassword) {
      setErrortext(lan.login_screen.pass_error);
      return;
    }
    SignIn(navigation, userEmail, userPassword, setErrortext);
  }

  return (
    <StyledSafeAreaView>
      <StyledKeyboardAvoidingView transparent>
        <CircelContainer
          greeting={lan.login_screen.greeting}
          title={lan.login_screen.title}
        />

        <StyledView style={styles.container} transparent>
          <StyledTextInput
            icon={Strings.icons.nomarl.at}
            placeholder={lan.login_screen.email_place_holder}
            onChangeText={(email) => setUserEmail(email)}
            border
            left
            pdR
            mgL
            mgR
            mgB
            style={{ height: 40 }}
          />
          <StyledTextInput
            icon={Strings.icons.out_line.lock}
            placeholder={lan.login_screen.pass_place_holder}
            password
            onChangeText={(pass) => setUserPassword(pass)}
            border
            left
            pdL
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
              {lan.login_screen.title}
            </StyledText>
          </StyledTouchable>
          <StyledTouchable
            style={styles.text}
            transparent
            process={() => {
              navigation.navigate(Strings.navigation_names.forgot_password);
            }}>
            <StyledText>{lan.login_screen.forgot_pass}</StyledText>
          </StyledTouchable>
          <StyledTouchable
            style={styles.text}
            transparent
            process={() => {
              navigation.navigate(Strings.navigation_names.register);
            }}>
            <StyledText>{lan.login_screen.new_here}</StyledText>
          </StyledTouchable>
        </StyledView>
      </StyledKeyboardAvoidingView>
    </StyledSafeAreaView>
  );
};

export default Login;

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
