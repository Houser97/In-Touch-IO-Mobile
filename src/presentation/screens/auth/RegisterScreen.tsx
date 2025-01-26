import { useState } from "react";
import { Alert, StyleSheet, useWindowDimensions, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, Text, TextInput } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore";

export const RegisterScreen = () => {

    const { register } = useAuthStore();
    const { height } = useWindowDimensions();

    const [form, setForm] = useState({
        email: '',
        password: '',
        repeatPassword: '',
        username: '',
    })

    const onRegister = async() => {
        if(form.email.length === 0 || form.password.length === 0 || form.password !== form.repeatPassword || form.username.length === 0) {
            return;
        }
        
       const isLogged = await register(form.email, form.password, form.username);
        if(isLogged) return;

        Alert.alert('Error', 'Email or password incorrect');
    };

  return (
    <View style={{flex: 1}}>
        {/*ScrollView ayuda a que el formulario sea desplazable cuando salga el teclado*/}
        <ScrollView style={{marginInline: 40}}>

            <View style={{paddingTop: height * 0.35}}>
                <Text style={{fontWeight: '500', fontSize: 40}}>Register</Text>
            </View>


            <View style={{gap: 20}}>
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
                    outlineStyle={style.textInput}
                    outlineColor="black"
                    onChangeText={text => setForm({...form, repeatPassword: text})}
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
            </View>
            
            <View style={{marginTop: 10}}>
                <Button 
                mode="contained"
                textColor="white"
                
                style={style.button}
                onPress={onRegister}>
                    Register
                </Button>
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
    }
})