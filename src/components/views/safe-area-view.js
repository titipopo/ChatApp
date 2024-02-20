import {
  SafeAreaView,
  TouchableWithoutFeedback,
  Keyboard,
  Platform,
} from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledSafeAreaView = ({ ...props }) => {
  const { children, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <TouchableWithoutFeedback onPress={() => {}} accessible={false}>
      <SafeAreaView
        style={[{ flex: 1, backgroundColor: activeColors.primary }, style]}>
        {children}
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default StyledSafeAreaView;
