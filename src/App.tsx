import 'react-native-gesture-handler';

import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';

export const App = () => {
  return(
      <ThemeContextProvider>
        <StackNavigator />
      </ThemeContextProvider>
  )
}