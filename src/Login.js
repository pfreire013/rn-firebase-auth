import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Text, TextInput, View, Button } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth'

const Login = () => {
  const [user, setUser] = useState()
  const [password, setPassword] = useState()

  const navigation = useNavigation()

  function handleLogin() {
    auth()
      .signInWithEmailAndPassword(user, password)
      .then(() => {
        console.log('User account created & signed in!');
        auth().currentUser.sendEmailVerification({
          android: {
            packageName: 'com.firebaseauth',
            installApp: true,
            minimumVersion: undefined,
          },
          handleCodeInApp: true,
          iOS: {
            bundleId: 'org.reactjs.native.example.FirebaseAuth'
          },
          url: 'https://firebaseauth9823928498.page.link',
        })
        //navigation.navigate('Home')
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
    <>
      <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>
        <TextInput
          value={user}
          autoCapitalize='none'
          onChangeText={text => setUser(text)}
          placeholder='Email'
          style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
        />
        <TextInput
          value={password}
          onChangeText={text => setPassword(text)}
          placeholder='Senha'
          style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
        />
        <Button title='Login with email and password' onPress={handleLogin} />
        <Button
          onPress={() => navigation.navigate('PhoneLogin')}
          color='green'
          title='Login with Phone number' />
      </View>
      <Button
        onPress={() => navigation.navigate('Register')}
        title='Register'
        color='red' />
    </>
  )
}

export default Login;