import { Text } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledText = ({ ...props }) => {
  const { children, small, big, bold, error, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <Text
      style={[
        {
          color: error ? activeColors.error : activeColors.tint,
          fontSize: small ? 14 : big ? 24 : 16,
          fontWeight: bold || big ? 'bold' : 'normal',
        },
        style,
      ]}>
      {children}
    </Text>
  );
};

export default StyledText;
