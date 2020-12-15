import { useNavigation, useRoute } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';

// import { Container } from './styles';

const ConfirmOTP = () => {
  const navigation = useNavigation()
  const route = useRoute()
  const { confirmation } = route.params
  const [code, setCode] = useState()


  async function confirmCode() {
    try {
      console.log(confirmation);
      await confirmation.confirm(code);
      alert('Success code')
    } catch (error) {
      alert('Invalid code.');
    }
  }

  return (
    <View style={{ flex: 1, justifyContent: "center", paddingHorizontal: 30 }}>
      <TextInput
        value={code}
        onChangeText={text => setCode(text)}
        placeholder='OTP Code'
        style={{ backgroundColor: '#FFF', height: 50, paddingHorizontal: 20, borderRadius: 10, marginBottom: 20 }}
      />
      <Button title='Login with Phone number' onPress={confirmCode} />
    </View>
  )
}

export default ConfirmOTP;