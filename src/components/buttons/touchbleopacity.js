import { TouchableOpacity } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledTouchable = ({ ...props }) => {
  const { children, process, transparent, border, height, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <TouchableOpacity
      style={[
        {
          borderWidth: border ? 1 : 0,
          borderRadius: 30,
          borderColor: activeColors.accent,
          height: height ? height : 50,
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: transparent ? 0 : 30,
          marginRight: transparent ? 0 : 30,
          marginTop: transparent ? 0 : 20,
          marginBottom: transparent ? 0 : 10,
          padding: transparent ? 0 : 10,
          backgroundColor: transparent
            ? activeColors.transparent
            : activeColors.secondary,
        },
        style,
      ]}
      onPress={process}>
      {children}
    </TouchableOpacity>
  );
};

export default StyledTouchable;
