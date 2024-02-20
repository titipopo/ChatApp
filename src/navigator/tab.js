import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// context
import {
  UseTheme,
  GetTheme
} from '../context/index';

// consts
import { Strings } from '../consts/index';

// components
import { StyledIcon } from '../components/index';

// screens
import {
  Settings,
  Home,
  Profiles,
  Chats,
  Musics,
} from '../screens/index';

const TabBottom = () => {
  const { theme } = UseTheme();
  let activeColors = GetTheme(theme);

  const Tab = createBottomTabNavigator();

  return (
    <Tab.Navigator
      initialRouteName={Strings.navigation_names.chats}
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarShowIcon: true,
        tabBarShowLabel: true,
        tabBarAccessibilityLabel: 'true',
        tabBarColor: activeColors.accent,
        tabBarActiveTintColor: activeColors.accent,
        tabBarInactiveTintColor: activeColors.tertiary,
        tabBarStyle: {
          backgroundColor: activeColors.secondary,
        },
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === Strings.navigation_names.home) {
            iconName = focused
              ? Strings.icons.nomarl.home
              : Strings.icons.out_line.home;
          } else if (route.name === Strings.navigation_names.musics) {
            iconName = focused
              ? Strings.icons.nomarl.music
              : Strings.icons.out_line.music;
          } else if (route.name === Strings.navigation_names.settings) {
            iconName = focused
              ? Strings.icons.nomarl.settings
              : Strings.icons.out_line.settings;
          } else if (route.name === Strings.navigation_names.profiles) {
            iconName = focused
              ? Strings.icons.nomarl.profiles
              : Strings.icons.out_line.profiles;
          } else if (route.name === Strings.navigation_names.chats) {
            iconName = focused
              ? Strings.icons.nomarl.chats
              : Strings.icons.out_line.chats;
          }
          return <StyledIcon name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name={Strings.navigation_names.home}
        component={Home}
        options={{ orientation: 'portrait' }}
      />
      <Tab.Screen
        name={Strings.navigation_names.musics}
        component={Musics}
        options={{ orientation: 'portrait' }}
      />
      <Tab.Screen
        name={Strings.navigation_names.chats}
        component={Chats}
        options={{ orientation: 'portrait' }}
      />
      <Tab.Screen
        name={Strings.navigation_names.settings}
        component={Settings}
        options={{ orientation: 'portrait' }}
      />
      <Tab.Screen
        name={Strings.navigation_names.profiles}
        component={Profiles}
        options={{ orientation: 'portrait' }}
      />
    </Tab.Navigator>
  );
};

export default TabBottom;
