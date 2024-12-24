import { createStackNavigator } from '@react-navigation/stack';
import { HomeScreen } from '../screens/HomeScreen';

export type RootStackParams = {
    HomeScreen: undefined;
}

const Stack = createStackNavigator<RootStackParams>();

export const StackNavigator = () => {
    return(
        <Stack.Navigator>
            <Stack.Screen name='HomeScreen' component={HomeScreen} />
        </Stack.Navigator>
    )
} 