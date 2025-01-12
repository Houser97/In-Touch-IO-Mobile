import { View } from "react-native"
import { ActivityIndicator } from "react-native-paper"

export const LoadingScreen = () => {
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
        <ActivityIndicator></ActivityIndicator>
    </View>
  )
}
