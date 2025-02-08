import { GestureResponderEvent, StyleSheet, TouchableOpacity, View } from "react-native"
import { CustomIcon } from "./CustomIcon"
import { TextInput } from "react-native-paper"

export enum InputModeEnum {
    flat = "flat",
    outlined = "outlined"
}

interface Props {
    value: string;
    inputMode: InputModeEnum;
    placeholder: string;

    onChange: ((text: string) => void);
    onPress: ((event: GestureResponderEvent) => void) | undefined
}

export const TextInputIcon = ({ value, inputMode, placeholder, onChange, onPress }: Props) => {
    return (
        <View style={style.container}>
            <TextInput
                placeholder={placeholder}
                placeholderTextColor='#909090'
                value={value}
                onChangeText={onChange}
                mode={inputMode}
                style={{ flex: 1 }}
                outlineColor="black"
                textAlign="center"
                textAlignVertical="center"
                outlineStyle={{
                    borderWidth: 0,
                    paddingHorizontal: 18,
                }}
            />

            <TouchableOpacity onPress={onPress} style={style.buttonContainer}>
                <CustomIcon iconName="search" size={25} />
            </TouchableOpacity>
        </View>
    )
}

const style = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flex: 0,
        overflow: 'hidden',
        borderWidth: 1,
        borderRadius: 10,
        paddingVertical: 0,
        borderColor: 'black',
    },
    buttonContainer: {
        justifyContent: 'center',
        paddingHorizontal: 10,
    }
})