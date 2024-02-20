import { Switch } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledSwitch = ({ ...props }) => {
  const { process, isEnabled } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <Switch
      value={isEnabled}
      onValueChange={process}
      thumbColor={isEnabled ? activeColors.accent : activeColors.tertiary}
      trackColor={{
        false: activeColors.primary,
        true: activeColors.tertiary,
      }}
      ios_backgroundColor={activeColors.primary}
    />
  );
};

export default StyledSwitch;
