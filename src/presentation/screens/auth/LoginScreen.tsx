import { useState } from "react";
import { Alert, StyleSheet, TouchableOpacity, View } from "react-native"
import { ScrollView } from "react-native-gesture-handler"
import { Button, Text, TextInput } from "react-native-paper"
import { useAuthStore } from "../../store/auth/useAuthStore";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { RootStackParams } from "../../navigator/StackNavigator";

export const LoginScreen = () => {

    const { login } = useAuthStore();

    const navigation = useNavigation<NavigationProp<RootStackParams>>();

    const [form, setForm] = useState({
        email: '',
        password: ''
    })

    const onLogin = async() => {
        if(form.email.length === 0 || form.password.length === 0) {
            return;
        }
        
       const isLogged = await login(form.email, form.password);
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
                    <Text style={{fontWeight: '500', fontSize: 40}}>Login</Text>
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


                <View>
                    <Button 
                    mode="contained"
                    textColor="white"
                    
                    style={style.button}
                    onPress={onLogin}>
                        Login
                    </Button>
                </View>

                <View style={style.register}>
                    <Text>Don't have an account yet?</Text>
                    <TouchableOpacity onPress={() => navigation.navigate('RegisterScreen')}>
                        <Text style={{fontWeight: 'bold'}}>
                            Sign up
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
    }
})