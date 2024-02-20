import { View } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledView = ({ ...props }) => {
  const { children, border, transparent, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <View
      style={[
        {
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
    </View>
  );
};

export default StyledView;
