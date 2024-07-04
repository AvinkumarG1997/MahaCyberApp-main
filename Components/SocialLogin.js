/* eslint-disable prettier/prettier */
import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, Dimensions, Linking,Alert } from 'react-native';
import { Divider } from 'react-native-paper';
import { GoogleSignin } from '@react-native-google-signin/google-signin';
const { width, height } = Dimensions.get('window');

const SocialLogin = () => {

  const handleSignin = async () => {
    try {
      await GoogleSignin.hasPlayServices();

      const userInfo = await GoogleSignin.signIn();
      console.log('User Info:', userInfo);
      
      Alert.alert("successfull",userInfo.idToken)
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      Alert.alert("Sign In Error", error.message);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Text style={styles.orText}>OR</Text>
        <Divider style={styles.divider} />
      </View>
      <View style={styles.iconContainer}>
        <TouchableOpacity style={styles.iconButton} onPress={handleSignin}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../Assets/images/google.png')}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../Assets/images/facebook.png')}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity>
        {/* <TouchableOpacity style={styles.iconButton}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../Assets/images/apple.png')}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity> */}
        <TouchableOpacity style={styles.iconButton}>
          <View style={styles.logoContainer}>
            <Image
              source={require('../Assets/images/twitter.png')}
              style={styles.logo}
            />
          </View>
        </TouchableOpacity>
      </View>
      <View style={styles.dividerContainer}>
        <Divider style={styles.divider} />
        <Divider style={styles.divider} />
      </View>

      <TouchableOpacity
        onPress={() =>
          Linking.openURL(
            'https://cybercrime.gov.in/Webform/privacy_policy.aspx',
          )
        }>
        <Text
          style={styles.ppterm}>
          Privacy Policy | Terms of Use
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    // marginVertical: 20,
  },
  dividerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '90%',
    // marginVertical: '1%',
  },
  logoContainer: {
    alignItems: 'center',
    marginTop: '4%',
  },
  logo: {
    height: height * 0.04,
    width: width * 0.04,
    aspectRatio: 1,
  },
  divider: {
    flex: 1,
    backgroundColor: 'grey',
  },
  orText: {
    marginHorizontal: '3%',
    fontSize: 14,
    color: 'grey',
  },
  iconContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '90%',
    marginVertical: '4%',
  },
  iconButton: {
    padding: 10,
  },
  ppterm: {
    color: '#28419e',
    fontSize: 13,
    fontWeight: 'bold',
    alignSelf: 'center',
    marginTop: '1%',
  },
});

export default SocialLogin;
