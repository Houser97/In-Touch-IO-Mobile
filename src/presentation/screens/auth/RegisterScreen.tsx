import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, Text, TextInput } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";

export const RegisterScreen = () => {

    const { register } = useAuthStore();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [form, setForm] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        username: '',
    });

    const [passwordsMatch, setPasswordMatch] = useState(true);

    const onRegister = async() => {
        if(!passwordsMatch){
            Alert.alert('Error', 'Passwords must be identical');
        }

        if(form.email.length === 0 || form.password.length === 0 || form.repeatPassword.length === 0 || form.username.length === 0) {
            return;
        }
        
        const isLogged = await register(form.email, form.password, form.username);
        if(isLogged) return;

        Alert.alert('Error', 'Email or password incorrect');
    };

  return (
    <View style={{flex: 1}}>
        {/*ScrollView ayuda a que el formulario sea desplazable cuando salga el teclado*/}
        <ScrollView
            style={{paddingInline: 40}} 
            contentContainerStyle={{justifyContent: 'center', flexGrow: 1}}
        >
            <View style={{gap: 20}}>
                <View>
                    <Text style={{fontWeight: '500', fontSize: 40}}>Register</Text>
                </View>
                <TextInput 
                    label="Email"
                    value={form.email}
                    style={style.textInput}
                    mode="outlined"
                    outlineStyle={style.textInput}
                    outlineColor="black"
                    onChangeText={text => setForm({...form, email: text})}
                />

                <TextInput 
                    label="Password"
                    value={form.password}
                    secureTextEntry={true}
                    style={style.textInput}
                    mode="outlined"
                    outlineStyle={style.textInput}
                    outlineColor="black"
                    onChangeText={text => setForm({...form, password: text})}
                />

                <TextInput 
                    label="Repeat Password"
                    value={form.repeatPassword}
                    secureTextEntry={true}
                    style={style.textInput}
                    mode="outlined"
                    outlineStyle={[style.textInput, !passwordsMatch && style.invalidInput]}
                    outlineColor="black"
                    onChangeText={text => {
                        setForm({...form, repeatPassword: text})
                        setPasswordMatch(form.password === text)
                    }}
                />

                <TextInput 
                    label="Username"
                    value={form.username}
                    style={style.textInput}
                    mode="outlined"
                    outlineStyle={style.textInput}
                    outlineColor="black"
                    onChangeText={text => setForm({...form, username: text})}
                />

                <View style={{marginTop: 10}}>
                    <Button 
                    mode="contained"
                    textColor="white"
                    
                    style={style.button}
                    onPress={onRegister}>
                        Register
                    </Button>
                </View>

                <View style={style.register}>
                    <Text>Already have an account?</Text>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Text style={{fontWeight: 'bold'}}>
                            Sign in
                        </Text>
                    </TouchableOpacity>
                </View>
            </View>
        </ScrollView>
    </View>
  )
}


const style = StyleSheet.create({
    textInput: {
        borderColor: '#CACACA', 
        borderRadius: 5
    },
    button: {
        borderRadius: 5, 
        backgroundColor: '#24a0ed'
    },
    register: {
        flexDirection: 'row',
        marginHorizontal: 1,
        gap: 5,
    },
    invalidInput: {
        borderColor: '#CD5C5C',
    }
})