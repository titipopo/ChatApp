import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// context
import { UseAuth } from '../context/index';

// consts
import { Strings } from '../consts/index';

// navigator
import { AuthStack, TabBottom } from '../navigator/index';

const RootStack = () => {
  const { user } = UseAuth();
  const Stack = createNativeStackNavigator();

  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={() => ({
          headerShown: false,
        })}>
        {user ? (
          <Stack.Screen
            name={Strings.navigation_names.main}
            component={TabBottom}
          />
        ) : (
          <Stack.Screen
            name={Strings.navigation_names.auth}
            component={AuthStack}
          />
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootStack;
