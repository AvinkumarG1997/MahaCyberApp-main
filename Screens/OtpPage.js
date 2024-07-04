/* eslint-disable react-native/no-inline-styles */
/* eslint-disable prettier/prettier */
import React, { useEffect, useRef, useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Image, Dimensions, TouchableOpacity } from 'react-native';
import { Button, TextInput } from 'react-native-paper';
import ButtonColor from '../Components/ButtonColor';
import IonIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';
import OTPTextInput from 'react-native-otp-textinput';

const { width, height } = Dimensions.get('window');

const OtpPage = () => {
  const navigation = useNavigation();
  const [receivedPhoneEmail, setReceivedPhoneEmail] = useState('example123@gmail.com');
  const [otpValue, setOtpValue] = useState('');
  const [timeRemaining, setTimeRemaining] = useState(60);
  const [errorvalue, setErrorvalue] = useState('');
  const otpInput = useRef(null);
  useEffect(() => {
    if (timeRemaining > 0) {
      const timer = setTimeout(() => setTimeRemaining(time => time - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeRemaining]);

  const clearText = () => {
    otpInput.current.reset();
    setOtpValue('');
  };

  const handleotpsubmit = () => {
    console.log(otpValue, 'otp value in submit');
    if (otpValue.length < 6) {
      setErrorvalue(true);
    }
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <SafeAreaView>
        <View style={styles.logoContainer}>
          <Image
            source={require('../Assets/logo/maha.jpg')}
            style={styles.logo}
          />
        </View>
        <View style={styles.subText}>
          <Text style={styles.subText}>Login with OTP</Text>
        </View>
        <View style={styles.subcontainer}>
          <View style={styles.inputcontainer}>
            <View>
              <TextInput
                mode="outlined"
                keyboardType="email-address"
                type="text"
                autoCapitalize="none"
                label={'Mobile Number / Email*'}
                value={receivedPhoneEmail}
                style={styles.form}
                placeholderTextColor="#81ffd7"
                editable={false}
                theme={{
                  colors: {
                    primary: '#1CF9F9',
                  },
                  roundness: 25, // Change the border radius here
                }}
              />
              <View style={styles.iconContainerEnd}>
                <IonIcon name="circle-edit-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => navigation.navigate('Login')} />
              </View>
            </View>
          </View>
          <View style={styles.subText}>
            <Text style={styles.subTextotp}>
              Enter OTP
            </Text>
          </View>
          <View
            style={{
              alignItems: 'center',
              marginVertical: '2%',
            }}>
            <OTPTextInput
              inputCount={6}
              handleTextChange={text => setOtpValue(text)}
              containerStyle={{ marginTop: '2%' }}
              textInputStyle={styles.otptext}
              offTintColor="#1CF9F9"
              tintColor="#2715F9"
              keyboardType="numeric"
              ref={otpInput}
              onKeyUp={event => {
                if (event.keyCode === 8) {
                  clearText();
                }
              }}
            />
            {errorvalue ? (
              <Text style={styles.errorMsg}>
                {'InvalidOTP'}
              </Text>
            ) : null}
          </View>
          <View style={styles.timebtn}>
            <TouchableOpacity
              onPress={() => {
                setTimeRemaining(60);
                // post();
              }}
              style={styles.btnrds}
              disabled={timeRemaining > 0}>
              <View style={styles.buttonContent}>
                <Text style={{ color: '#000', textAlign: 'center' }}>
                  {timeRemaining > 0
                    ? `Resend OTP in ${timeRemaining} seconds`
                    : 'Resend OTP'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>


          <View style={styles.inputcontainer}>
            <ButtonColor onPress={handleotpsubmit} text="Login" />
          </View>
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  subcontainer: {
    marginTop: '3%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '4%',
  },
  btnrds: {
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#1CF9F9',
    justifyContent: 'center',
    backgroundColor: '#EAFCFB',
    alignItems: 'center',
    // paddingVertical:'1%',
    paddingHorizontal:'4%',
  },
  logo: {
    height: height * 0.12,
    width: width * 0.1,
    aspectRatio: 1,
  },
  inputcontainer: {
    marginHorizontal: '3%',
    marginVertical: '3%',
  },
  otptext: {
    borderWidth: 1,
    borderColor: '#1CF9F9',
    backgroundColor: '#EAFCFB',
    height: height * 0.06,
    width: height * 0.06, // Ensure it's a square
    fontSize: 20,
    padding: '1%',
    marginBottom: '1%',
    textAlign: 'center',
    borderRadius: height * 0.03, // Make it circular
  },
  timebtn: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: '2%',
    marginHorizontal: '5%',
    alignItems: 'center',

  },
  buttonContent: {
    height: height * 0.035,
    justifyContent: 'center', 
    alignItems: 'center', 
  },
  errorMsg: {
    color: 'red',
    marginLeft: '5%',
    marginTop: '2%',
  },
  subText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'blue',
    alignItems: 'center',
  },
  subTextotp: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'grey',
    alignItems: 'center',
    marginTop: '5%',
  },
  form: {
    width: '100%',
    height: 45,
    backgroundColor: '#fff',
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

export default OtpPage;
