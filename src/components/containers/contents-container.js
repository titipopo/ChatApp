import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  RefreshControl,
  StatusBar,
  View,
  Platform,
} from 'react-native';

// context
import { UseTheme, GetTheme } from '../../context/index';

// consts
import { Strings } from '../../consts/index';

// component
import { ScreenNameContainer } from '../../components/index';

const APPBAR_HEIGHT = Platform.OS === 'ios' ? 44 : 56;

const ContentsContainers = ({ ...props }) => {
  const {
    style,
    children,
    isReload,
    reLoad,
    isScrollEnable,
    title,
    isShowTitle,
    stickToBottomView,
    stickToTopView,
  } = props;
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  return (
    <>
      {Platform.OS === 'ios' && (
        <View
          style={[
            styles.statusBar,
            {
              backgroundColor: activeColors.primary,
            },
          ]}
        />
      )}
      <SafeAreaView
        style={[{ backgroundColor: activeColors.primary }, styles.container]}>
        <StatusBar
          barStyle={
            theme === Strings.themes.dark_mode
              ? Strings.themes.light_content
              : Strings.themes.dark_content
          }
        />
        {!isShowTitle && <ScreenNameContainer name={title} />}
        {stickToTopView ? stickToTopView : null}
        <ScrollView
          refreshControl={
            <RefreshControl refreshing={isReload} onRefresh={reLoad} />
          }
          style={[{ backgroundColor: activeColors.primary }, style]}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          scrollEnabled={isScrollEnable}>
          {children}
        </ScrollView>
        {stickToBottomView ? stickToBottomView : null}
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    overflow: 'hidden',
  },
  statusBar: {
    width: '100%',
    height: '100%', // For all devices, even X, XS Max
    position: 'absolute',
    top: 0,
    left: 0,
  },
});

export default ContentsContainers;
