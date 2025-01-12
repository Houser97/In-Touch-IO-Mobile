import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/home/HomeScreen';
import { LoginScreen } from '../screens/auth/LoginScreen';
import { LoadingScreen } from '../screens/loading/LoadingScreen';
import { ChatScreen } from '../screens/chat/ChatScreen';
import { SearchScreen } from '../screens/search/SearchScreen';
import { UserScreen } from '../screens/settings/UserScreen';

export type RootStackParams = {
    HomeScreen: undefined;
    LoginScreen: undefined;
    LoadingScreen: undefined;
    ChatScreen: undefined;
    SearchScreen: undefined;
    UserScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return(
        <Stack.Navigator 
        initialRouteName='LoadingScreen'
        screenOptions={{
            headerShown: false,
            headerStyle: {height: 60, }
        }}>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
            <Stack.Screen name='LoginScreen' component={LoginScreen} />
            <Stack.Screen name='LoadingScreen' component={LoadingScreen} />
            <Stack.Screen name='ChatScreen' component={ChatScreen} />
            <Stack.Screen name='SearchScreen' component={SearchScreen} />
            <Stack.Screen name='UserScreen' component={UserScreen} />
        </Stack.Navigator>
    )
} 