import { Image } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledImage = ({ ...props }) => {
  const { imgUri, resizeMode, border, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);
  return (
    <Image
      source={{ uri: imgUri }}
      resizeMode={resizeMode}
      style={[
        {
          borderColor: border ? activeColors.accent : activeColors.transparent,
          borderWidth: border ? 2 : 0,
        },
        style,
      ]}
    />
  );
};

export default StyledImage;
