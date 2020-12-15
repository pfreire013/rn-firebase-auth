import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth'
// import { Container } from './styles';

const Home = () => {
  const [isVerify, setIsVerify] = useState(false)
  const [phone, setPhone] = useState('')

  async function verifyPhoneNumber() {
    const confirmation = await auth().verifyPhoneNumber('+351938560732');
    console.log(confirmation)
    setConfirm(confirmation);
  }

  function sendVerificationEmail() {
    const user = firebase.auth().currentUser

    user.sendEmailVerification().then(res => {
      console.log('res', res);
    }).catch(e => {
      console.log('e', e);
    })
  }

  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 40 }}>
      <TextInput
        placeholder='Phone number'
        onChangeText={text => setPhone(text)}
        value={phone}
        style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
      />
      <Button title='Verify Phone Number' onPress={verifyPhoneNumber} />
      <Button title='Verify Email' onPress={sendVerificationEmail} />
    </View>
  )
}

export default Home;