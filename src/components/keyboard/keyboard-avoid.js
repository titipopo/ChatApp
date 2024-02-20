import { KeyboardAvoidingView, Platform } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledKeyboardAvoidingView = ({ ...props }) => {
  const { children, border, transparent, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={[
        {
          flex: 1,
          backgroundColor: transparent
            ? activeColors.transparent
            : activeColors.secondary,
          borderColor: border ? activeColors.accent : activeColors.transparent,
          borderWidth: border ? 1 : 0,
          borderRadius: border ? 10 : 0,
        },
        style,
      ]}>
      {children}
    </KeyboardAvoidingView>
  );
};

export default StyledKeyboardAvoidingView;
