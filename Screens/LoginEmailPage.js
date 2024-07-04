/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonColor from '../Components/ButtonColor';
import IonIcon from 'react-native-vector-icons/Ionicons';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import { useNavigation } from '@react-navigation/native';
import ReCaptcha from '../Components/ReCatpcha';
const LoginEmailPage = () => {
  const [email, setEmail] = useState('');
  const [erroremail, setErroremail] = useState(false);
  const [password, setPassword] = useState('');
  const [errorpassword, setErrorpassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [textInputHolder, setTextInputHolder] = useState('');
  const [errorcatpMessage, setErrorcatpMessage] = useState('');
  const [captchaText, setCaptchaText] = useState('');
  const [isLoginDisabled, setIsLoginDisabled] = useState(true);
  const navigation = useNavigation();


  const handleCaptchaChange = (newCaptchaText) => {
    setCaptchaText(newCaptchaText);
    setTextInputHolder('');
  };

  const handleCharacterSpoken = (char) => {
    setTextInputHolder(prev => prev + char); 
  };

  const validateCaptchaCode = () => {
    if (textInputHolder === captchaText) {
      setErrorcatpMessage('');
      setIsLoginDisabled(false);
    } else {
      setErrorcatpMessage('Please enter a valid Catpcha');
      setIsLoginDisabled(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.scrollViewContent}>
      <SafeAreaView style={styles.container}>
        <View style={styles.subcontainer}>
          <View style={styles.inputcontainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="mail-outline" size={20} color="gray" style={styles.iconStyle} />
              <TextInput
                mode="outlined"
                keyboardType="email-address"
                type="text"
                autoCapitalize="none"
                label={'Email*'}
                value={email}
                style={styles.form}
                placeholderTextColor="#81ffd7"
                onChangeText={text => {
                  setEmail(text);
                  const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                  setErroremail(!reg.test(text));
                }}
                error={erroremail}
                theme={{
                  colors: {
                    primary: '#1CF9F9',
                  },
                  roundness: 25, // Change the border radius here
                }}
              />
              {/* <View style={styles.iconContainerStart}>
                <IonIcon name="eye-sharp" size={24} color="#a9a9a9" style={styles.iconContainerStart} />
              </View> */}

              {erroremail &&
                <Text style={styles.errorMsg}>{'Please enter a valid email address'}</Text>
              }
            </View>

          </View>

          <View style={styles.inputcontainer}>
            <View style={[styles.inputWrapper, { flexDirection: 'row' }]}>
              <Ionicons name="mail-lock" size={20} color="gray" style={styles.iconStyle} />
              <TextInput
                mode="outlined"
                type="text"
                autoCapitalize="none"
                label={'Password*'}
                value={password}
                style={styles.form}
                placeholderTextColor="#a9a9a9"
                secureTextEntry={!showPassword}
                onChangeText={text => {

                  setPassword(text);
                  var regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@#$%^&+=!])(?=.{8,20}).*$/;
                  setErrorpassword(!regex.test(text));

                }}
                error={errorpassword}
                theme={{
                  colors: {
                    primary: '#1CF9F9',
                  },
                  roundness: 25,
                }}
              />
              <View style={styles.iconContainerEnd}>
                {showPassword && (
                  <IonIcon name="eye-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setShowPassword(false)} />
                )}
                {!showPassword && (
                  <IonIcon name="eye-off-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setShowPassword(true)} />
                )}
              </View>
            </View>
            {errorpassword &&
              <Text style={styles.errorMsg}>{'A minimum 8 characters password contains a combination of uppercase and lowercase letter and number are required'}</Text>
            }
          </View>
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'flex-end',
              // marginTop: '2%',
              width: '90%',
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('physicalFir')}>
              <Text
                style={{
                  color: '#28419e',
                  fontWeight: 'bold',
                }}>
                {'Forgot Password ?'}
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            {/* <ReCaptcha onCaptchaChange={handleCaptchaChange} />
             */}
             <ReCaptcha onCaptchaChange={handleCaptchaChange} onCharacterSpoken={handleCharacterSpoken} />
          </View>
          <View style={styles.inputcontainer}>
            <View style={styles.inputWrapper}>
              <Ionicons name="verified-user" size={20} color="gray" style={styles.iconStyle} />
              <TextInput
                label={'Captcha*'}
                value={textInputHolder}
                mode="outlined"
                multiline={false}
                numberOfLines={1}
                onChangeText={setTextInputHolder}
                editable={true}
                style={styles.form}
                placeholderTextColor="#a9a9a9"
                theme={{
                  colors: {
                    primary: '#1CF9F9',
                  },
                  roundness: 25,
                }}
                error={errorcatpMessage}
                onBlur={validateCaptchaCode}
              />
              {errorcatpMessage === '' &&
                <Text style={styles.errorMsg}>{errorcatpMessage}</Text>
              }
            </View>
          </View>
          <View style={styles.inputcontainer1}>
            <ButtonColor onPress={() => navigation.navigate('profileDetails')} text="Login" disabled={isLoginDisabled} />
          </View>

        </View>
      </SafeAreaView>
    </ScrollView >

  );
};

const styles = StyleSheet.create({

  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },

  subcontainer: {
    marginTop: '3%',
  },
  inputcontainer: {
    marginHorizontal: '3%',
    marginVertical: '2%',
  },
  inputcontainer1: {
    marginHorizontal: '3%',
    marginBottom: '1%',
  },
  errorMsg: {
    color: 'red',
    marginLeft: '5%',
    marginTop: '2%',
  },
  inputWrapper: {
    position: 'relative',
    justifyContent: 'center',
  },
  iconStyle: {
    position: 'absolute',
    left: 15,
    top: 20,
    zIndex: 1,
  },
  form: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
    paddingLeft: 30,
    // borderRadius:'1%',

  },
  iconContainerStart: {
    position: 'absolute',
    left: '4%',
    top: '35%',
  },
  iconContainerEnd: {
    position: 'absolute',
    right: '8%',
    top: '35%',
  },
});

export default LoginEmailPage;
