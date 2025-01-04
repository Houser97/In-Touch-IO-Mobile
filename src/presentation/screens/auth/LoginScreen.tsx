import { useState } from "react";
import { Alert, StyleSheet, useWindowDimensions, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, Text, TextInput } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore";

export const LoginScreen = () => {

    const { login } = useAuthStore();
    const { height } = useWindowDimensions();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onLogin = async() => {
        if(form.email.length === 0 || form.password.length === 0) {
            return;
        }

        console.log('todo bien')

        const isLogged = await login(form.email, form.password);
        console.log('mmmm')
        if(isLogged) return;

        Alert.alert('Error', 'Email or password incorrect');
    };

  return (
    <View style={{flex: 1}}>
        {/*ScrollView ayuda a que el formulario sea desplazable cuando salga el teclado*/}
        <ScrollView style={{marginInline: 40}}>

            <View style={{paddingTop: height * 0.35}}>
                <Text style={{fontWeight: '500', fontSize: 40}}>Login</Text>
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
            </View>
            
            <View style={{marginTop: 10}}>
                <Button 
                mode="contained"
                textColor="white"
                
                style={style.button}
                onPress={onLogin}>
                    Login
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