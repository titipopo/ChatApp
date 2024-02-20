import { createNativeStackNavigator } from '@react-navigation/native-stack';

// consts
import { Strings } from '../consts/index';

// screen
import {
  Login,
  Register,
  ForgotPassword,
} from '../screens/index';

const AuthStack = () => {
  const Stack = createNativeStackNavigator();

  return (
    <Stack.Navigator
      initialRouteName={Strings.navigation_names.login}
      screenOptions={() => ({
        headerShown: false,
      })}>
      <Stack.Screen
        name={Strings.navigation_names.login}
        component={Login}
        options={{ orientation: 'portrait' }}
      />
      <Stack.Screen
        name={Strings.navigation_names.register}
        component={Register}
        options={{ orientation: 'portrait' }}
      />
      <Stack.Screen
        name={Strings.navigation_names.forgot_password}
        component={ForgotPassword}
        options={{ orientation: 'portrait' }}
      />
    </Stack.Navigator>
  );
};

export default AuthStack;
