import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StatusBar,
  SafeAreaView,
  Button,
  TextInput
} from 'react-native';
import auth, { firebase } from '@react-native-firebase/auth';
import Routes from './src/routes'


function App() {
  // Set an initializing state whilst Firebase connects
  // const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    console.log(user)
    setUser(user);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  //   if (initializing) return null;

  //   if (!user) {
  //     return (
  //       <View>
  //         <Text>Login</Text>
  //       </View>
  //     );
  //   }

  //   return (
  //     <View>
  //       <Text>Welcome {user.email}</Text>
  //     </View>
  //   );
  // }

  // function PhoneSignIn() {
  //   // If null, no SMS has been sent
  //   const [confirm, setConfirm] = useState(null);

  //   const [code, setCode] = useState('');

  //   const settings = firebase.auth().settings

  //   settings.appVerificationDisabledForTesting = true

  //   validatePhoneNumber = (phoneNumber) => {
  //     var regexp = /^\+[0-9]?()[0-9](\s|\S)(\d[0-9]{8,16})$/
  //     return regexp.test(phoneNumber)
  //   }

  //   // Handle the button press
  //   async function signInWithPhoneNumber(phoneNumber) {
  //     if (validatePhoneNumber(phoneNumber)) {
  //       const confirmation = await auth().signInWithPhoneNumber(phoneNumber, settings);
  //       alert(confirm)
  //       setConfirm(confirmation);
  //     }
  //   }

  //   async function confirmCode() {
  //     try {
  //       await confirm.confirm(code);
  //       alert('Success code')
  //     } catch (error) {
  //       alert('Invalid code.');
  //     }
  //   }

  //   if (!confirm) {
  //     return (
  //       <Button
  //         title="Phone Number Sign In"
  //         onPress={() => signInWithPhoneNumber('+351938560732')}
  //       />
  //     );
  //   }

  //   return (
  //     <>
  //       <TextInput value={code} onChangeText={text => setCode(text)} />
  //       <Button title="Confirm Code" onPress={() => confirmCode()} />
  //     </>
  //   );
  // }

  // const App: () => React$Node = () => {

  //   function handleCreateUser() {
  //     auth()
  //       .signInWithEmailAndPassword('jane.doe@example.com', 'SuperSecretPassword!')
  //       .then(() => {
  //         console.log('User account created & signed in!');
  //       })
  //       .catch(error => {
  //         if (error.code === 'auth/email-already-in-use') {
  //           console.log('That email address is already in use!');
  //         }

  //         if (error.code === 'auth/invalid-email') {
  //           console.log('That email address is invalid!');
  //         }

  //         console.error(error);
  //       });
  //   }

  //   function handleLogout() {
  //     auth()
  //       .signOut()
  //       .then(() => console.log('User signed out!'));
  //   }

  return (
    <>
      <Routes />
    </>
  );
};


export default App;
