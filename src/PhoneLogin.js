import React, { useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';

// import { Container } from './styles';

const PhoneLogin = () => {
  // If null, no SMS has been sent
  const [confirm, setConfirm] = useState(null);
  const [phone, setPhone] = useState('')
  const [code, setCode] = useState('');
  const navigation = useNavigation()

  // const settings = firebase.auth().settings

  // settings.appVerificationDisabledForTesting = false

  const validatePhoneNumber = (phoneNumber) => {
    var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
    return regexp.test(phoneNumber)
  }

  // Handle the button press
  async function signInWithPhoneNumber() {
    if (validatePhoneNumber(phone)) {
      const confirmation = await auth().signInWithPhoneNumber(phone);
      setConfirm(confirmation);
      navigation.navigate('ConfirmOTP', { confirmation: confirmation })
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>
      <TextInput
        value={phone}
        onChangeText={text => setPhone(text)}
        placeholder='Phone number'
        style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
      />
      <Button title='Login with Phone number' onPress={signInWithPhoneNumber} />
    </View>
  );
}

export default PhoneLogin;