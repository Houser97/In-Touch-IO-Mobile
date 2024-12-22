import { SafeAreaView, Text } from "react-native"
import { HomeScreen } from "./presentation/screens/HomeScreen"

export const App = () => {
  return(
    <SafeAreaView style={{flex: 1}}>
      <HomeScreen></HomeScreen>
    </SafeAreaView>
  )
}