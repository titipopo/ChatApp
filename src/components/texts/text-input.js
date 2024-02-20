import { useState } from 'react';
import { StyleSheet, TextInput, Keyboard, View, Pressable } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

// consts
import { Strings } from '../../consts/index';

// component
import { StyledIcon } from '../../components/index';

const StyledTextInput = ({ ...props }) => {
  const [showPass, setshowPass] = useState(false);
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  const {
    icon,
    keyboardType,
    placeholder,
    onChangeText,
    onEndEditing,
    onBlur,
    onChange,
    maxLength,
    password,
    editable,
    value,
    border,
    multiline,
    blurOnSubmit,
    left,
    mgL,
    mgR,
    mgB,
    pdL,
    pdR,
    style,
  } = props;
  return (
    <View
      style={[
        {
          borderColor: activeColors.accent,
          borderWidth: border ? 1 : 0,
          marginLeft: mgL ? 30 : 0,
          marginRight: mgR ? 30 : 0,
          marginBottom: mgB ? 10 : 0,
        },
        styles.container,
      ]}>
      {icon ? (
        <View
          style={[
            {
              backgroundColor: activeColors.transparent,
            },
            styles.icon,
          ]}>
          <StyledIcon name={icon} size={25} color={activeColors.accent} />
        </View>
      ) : null}
      <TextInput
        style={[
          {
            color: activeColors.tint,
            textAlign: left ? 'left' : 'right',
            paddingRight: pdR ? 15 : 0,
            paddingLeft: pdL ? 25 : 0,
            flexBasis: 290,
          },
          style,
        ]}
        value={value}
        editable={!editable}
        multiline={multiline}
        maxLength={password ? 16 : maxLength ? 1000 : 50}
        onChangeText={onChangeText}
        onBlur={onBlur}
        onChange={onChange}
        onEndEditing={onEndEditing}
        placeholder={placeholder}
        placeholderTextColor={activeColors.placeholderTextColor}
        keyboardType={keyboardType ? 'default' : 'email-address'}
        autoCorrect={false}
        clearTextOnFocus={false}
        autoCapitalize="none"
        onSubmitEditing={Keyboard.dismiss}
        blurOnSubmit={blurOnSubmit}
        secureTextEntry={password && !showPass}
        underlineColorAndroid={activeColors.secondary}
        returnKeyType="next"
      />
      {password ? (
        <Pressable
          onPress={() => {
            setshowPass(!showPass);
          }}
          style={[
            {
              backgroundColor: activeColors.transparent,
            },
            styles.showPassword,
          ]}>
          <StyledIcon
            name={
              showPass
                ? Strings.icons.nomarl.eye
                : Strings.icons.out_line.eye_off
            }
            size={25}
            color={activeColors.accent}
          />
        </Pressable>
      ) : null}
    </View>
  );
};

export default StyledTextInput;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderRadius: 30,
  },
  icon: {
    marginLeft: 10,
  },
  showPassword: {
    left: -10,
  },
});
