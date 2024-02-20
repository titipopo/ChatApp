import { useRef } from 'react';
import { ScrollView, RefreshControl } from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

const StyledScrollView = ({ ...props }) => {
  const { children, isReload, reLoad, isScrollEnable, border, style } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  const scrollViewRef = useRef();
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={isReload} onRefresh={reLoad} />
      }
      style={[
        {
          backgroundColor: activeColors.secondary,
          borderColor: border ? activeColors.accent : activeColors.transparent,
          borderWidth: border ? 1 : 0,
        },
        style,
      ]}
      showsVerticalScrollIndicator={false}
      showsHorizontalScrollIndicator={false}
      scrollEnabled={isScrollEnable}
      ref={scrollViewRef}
      onContentSizeChange={(contentWidth, contentHeight) => {
        scrollViewRef.current.scrollToEnd({ animated: true });
      }}>
      {children}
    </ScrollView>
  );
};

export default StyledScrollView;
