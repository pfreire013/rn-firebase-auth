import React, { useEffect, useState } from 'react';
import { Button, TextInput, View } from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth'
import TouchID from 'react-native-touch-id';
import FingerprintScanner from 'react-native-fingerprint-scanner';

const Home = () => {
  const [isVerify, setIsVerify] = useState(false)
  const [phone, setPhone] = useState('')
  const [sms, setSms] = useState('')

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

  async function handleUpdatePhoneNumber() {
    const newPhone = '+351966008278'

    const newPhoneVerificationId = await new Promise((resolve, reject) => {
      firebase.auth().verifyPhoneNumber(newPhone).on('state_changed', phoneAuthSnapshot => {
        if (phoneAuthSnapshot.error) {
          console.log(phoneAuthSnapshot.error);
        } else {
          console.log(phoneAuthSnapshot.verificationId);
        }
      });
    })

    const credential = await firebase.auth.PhoneAuthProvider.credential(
      newPhoneVerificationId,
      sms,
    );

    await firebase
      .auth()
      .currentUser.updatePhoneNumber(credential)
      .then($ => $);

    // await firebase.auth().currentUser.updatePhoneNumber(credetial)

    alert('Phone number updated success!!')
  }

  function handleFaceAndTouchId() {

    FingerprintScanner.authenticate({ description: 'Scan your fingerprint on the device scanner to continue' })
      .then((res) => {
        console.log('res', res)
      }).catch((error) => {
        console.log('Authentication error is => ', error)
      });
  }


  return (
    <View style={{ paddingHorizontal: 30, paddingTop: 40 }}>
      <Button title='Verify Phone Number' onPress={verifyPhoneNumber} />
      <Button title='Verify Email' onPress={sendVerificationEmail} />
      <Button title='Update PhoneNumber' onPress={handleUpdatePhoneNumber} />
      <TextInput
        placeholder='Update PhoneNumber Code'
        onChangeText={(text) => setSms(text)}
      />
      <Button title='Authenticate with Touch ID' onPress={handleFaceAndTouchId} />
    </View>
  )
}

export default Home;