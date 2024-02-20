import { Text } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledBarText = ({ ...props }) => {
  const { children, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <Text
      style={[
        {
          backgroundColor: activeColors.accent,
          height: 1,
          marginLeft: 15,
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default StyledBarText;
