import 'react-native-gesture-handler';

import { StackNavigator } from './presentation/navigator/StackNavigator';
import { ThemeContextProvider } from './presentation/context/ThemeContext';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from './presentation/providers/AuthProvider';
import { SocketProvider } from './presentation/providers/SocketProvider';

const queryClient = new QueryClient();

export const App = () => {
  return(
    <QueryClientProvider client={queryClient}>
      <ThemeContextProvider>
        <AuthProvider>
          <SocketProvider>
            <StackNavigator />
          </SocketProvider>
        </AuthProvider>
      </ThemeContextProvider>
    </QueryClientProvider>
  )
}