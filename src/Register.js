import React, { useState } from 'react';
import { View, TextInput, Button } from 'react-native';
import auth from '@react-native-firebase/auth'
import { useNavigation } from '@react-navigation/native';
import Routes from './routes';

// import { Container } from './styles';

const Register = () => {
  const [user, setUser] = useState()
  const [password, setPassword] = useState()

  const navigation = useNavigation()

  async function sendAuthEmail() {
    const isSend = await auth().fetchSignInMethodsForEmail(user)
  }

  function handleRegister() {
    auth()
      .createUserWithEmailAndPassword(user, password)
      .then(() => {
        console.log('User account created & signed in!');
        sendAuthEmail()
        navigation.navigate('Home')

      })
      .catch(error => {
        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }

        console.error(error);
      });
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>
      <TextInput
        value={user}
        onChangeText={text => setUser(text)}
        placeholder='Email'
        style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
        autoCapitalize='none'
      />
      <TextInput
        value={password}
        onChangeText={text => setPassword(text)}
        placeholder='Senha'
        style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
      />
      <Button title='Confirm Register' onPress={handleRegister} />
    </View>
  )
}

export default Register;