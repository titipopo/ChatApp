import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledIcon = ({ ...props }) => {
  const { name, size, color } = props;

  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <MaterialCommunityIcons
      name={name}
      size={size}
      color={color ? color : activeColors.accent}
    />
  );
};

export default StyledIcon;
