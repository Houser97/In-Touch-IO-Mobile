import { StyleProp, TextStyle, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

interface Props {
    iconName: string;
    size: number;
    style?: StyleProp<TextStyle> 
}

export const CustomIcon = ({iconName, size, style = {}}: Props) => {
    return (
        <Icon name={iconName} size={size} style={style}></Icon>
    )
}