/* eslint-disable prettier/prettier */

import React, { useState } from 'react';
import { View, Text, SafeAreaView, TouchableOpacity, Image, Dimensions, StyleSheet, ScrollView } from 'react-native';
import LoginEmailPage from './LoginEmailPage';
import Signup from './Signup';
import SocialLogin from '../Components/SocialLogin';
import LoginwithOtpPage from './LoginwithOtpPage';
import { Divider } from 'react-native-paper';

const { width, height } = Dimensions.get('window');

const LoginPage = () => {
    const [pageLogin, setPageLogin] = useState(true);

    return (
        <ScrollView>
        <SafeAreaView style={styles.container}>
            <View style={styles.logoContainer}>
                <Image
                    source={require('../Assets/logo/maha.jpg')}
                    style={styles.logo}
                />
            </View>

            <View style={styles.optionsContainer}>
                <TouchableOpacity
                    onPress={() => setPageLogin(true)}
                    style={[styles.optionButton, pageLogin && styles.activeOptionButton]}
                >
                    <Text style={[styles.optionText, pageLogin && styles.activeOptionText]}>
                        Log In
                    </Text>
                </TouchableOpacity>

                <Text style={styles.separator}>   | </Text>

                <TouchableOpacity
                    onPress={() => setPageLogin(false)}
                    style={[styles.optionButton, !pageLogin && styles.activeOptionButton]}
                >
                    <Text style={[styles.optionText, !pageLogin && styles.activeOptionText]}>
                        Sign Up
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.contentContainer}>
                {pageLogin ? (<View>
                    <LoginEmailPage />
                    {/* <View style={{marginLeft:30}}> */}
                    <View style={styles.dividerContainer}>
                        <Divider style={styles.divider} />
                        <Text style={styles.orText}>OR</Text>
                        <Divider style={styles.divider} />
                    {/* </View> */}
                    </View>
                    <LoginwithOtpPage />
                    <SocialLogin />

                </View>
                ) : (
                    <View>
                        <Signup />
                        <SocialLogin />
                    </View>
                )}
            </View>
        </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingHorizontal: '3%',
    },
    logoContainer: {
        alignItems: 'center',
        marginTop: '1%',
    },
    logo: {
        height: height * 0.07,
        width: width * 0.1,
        aspectRatio: 1,
        marginTop:'3%',
    },
    optionsContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: '3%',
    },
    optionButton: {
        marginHorizontal: '16%',
    },
    activeOptionButton: {
        borderBottomWidth: 6,
        borderColor: '#1CF9F9',
    },
    optionText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'grey',
    },
    activeOptionText: {
        color: 'blue',
    },
    separator: {
        fontSize: 24,
        fontWeight: 'bold',
        color: 'grey',
        // textAlign:'center',
        alignItems:'center',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft:'5%',
        width: '90%',
        marginVertical: '1%',
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
    contentContainer: {
        marginTop: '3%',
    },
});

export default LoginPage;
