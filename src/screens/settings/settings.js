import { useState } from 'react';
import { StyleSheet, FlatList } from 'react-native';
import { BottomSheet } from 'react-native-btr';

// consts
import { Strings } from '../../consts/index';

// context
import {
  UseLan,
  GetLan,
  UseTheme,
} from '../../context/index';

// common
import { StoreStringData } from '../../common/index';

// components
import {
  StyledText,
  ContentsContainers,
  ItemContainer,
  StyledSwitch,
  StyledView,
  StyledTouchable,
  StyledBarText,
} from '../../components/index';

const Settings = ({ ...props }) => {
  const listLanguage = Strings.languages;
  const [visible, setVisible] = useState(false);

  const { theme, updateTheme } = UseTheme();
  const [isEnabled, setIsEnabled] = useState(theme === 'dark' ? true : false);

  const { language, setLanguage } = UseLan();
  const lan = GetLan(language);

  for (var i = 0; i < listLanguage.length; i++) {
    listLanguage[i].title = lan.others_language_name[listLanguage[i].id];
  }

  const toggleSwitch = () => {
    updateTheme();
    setIsEnabled((previousState) => !previousState);
  };

  const renderItem = ({ item }) => {
    return (
      <StyledTouchable
        process={() => {
          setLanguage(item.id);
          StoreStringData(Strings.storage_key.language, item.id);
          toggleBottomNavigationView();
        }}
        transparent
        border>
        <StyledText>{item.title}</StyledText>
      </StyledTouchable>
    );
  };

  const toggleBottomNavigationView = () => {
    setVisible(!visible);
  };

  return (
    <ContentsContainers title={lan.settings_screen.header} isScrollEnable={false}>
      <StyledView style={styles.container} transparent>
        <StyledText bold>{lan.settings_screen.theme}</StyledText>
        <StyledView style={styles.section}>
          <ItemContainer lable={lan.settings_screen.theme_content}>
            <StyledSwitch process={toggleSwitch} isEnabled={isEnabled} />
          </ItemContainer>
        </StyledView>
      </StyledView>

      <StyledView style={styles.container} transparent>
        <StyledText bold>{lan.settings_screen.language}</StyledText>
        <StyledView style={styles.section}>
          <ItemContainer lable={lan.settings_screen.language_content}>
            <StyledTouchable process={toggleBottomNavigationView} transparent>
              <StyledText>{Strings.languages[lan.id].title + ' >'}</StyledText>
            </StyledTouchable>
          </ItemContainer>
        </StyledView>
      </StyledView>

      <StyledView style={styles.container} transparent>
        <StyledText bold>{lan.settings_screen.about}</StyledText>
        <StyledView style={styles.section}>
          <ItemContainer lable={lan.settings_screen.version}>
            <StyledText>{Strings.version}</StyledText>
          </ItemContainer>
          <StyledBarText />
          <ItemContainer lable={lan.settings_screen.auth}>
            <StyledText>{Strings.author}</StyledText>
          </ItemContainer>
        </StyledView>
      </StyledView>

      <BottomSheet
        visible={visible}
        onBackButtonPress={toggleBottomNavigationView}
        onBackdropPress={toggleBottomNavigationView}>
        <StyledView>
          <FlatList
            data={listLanguage}
            renderItem={renderItem}
            keyExtractor={(item) => item.id}
          />
          <StyledView style={{ marginBottom: 40 }}></StyledView>
        </StyledView>
      </BottomSheet>
    </ContentsContainers>
  );
};

export default Settings;

const styles = StyleSheet.create({
  container: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  section: {
    borderRadius: 25,
    overflow: 'hidden',
    marginTop: 10,
    marginBottom: 20,
  },
});
