/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import { Card, TextInput } from 'react-native-paper';
import ButtonColor from '../Components/ButtonColor';
import ReCaptcha from '../Components/ReCatpcha';

const TrackComplaint = () => {
    const [selectedOption, setSelectedOption] = useState('complaintId');
    const [number, setNumber] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [email, setEmail] = useState('');
    const [errNumber, setErrNumber] = useState(false);
    const [errormobileNumber, setErrormobileNumber] = useState(false);
    const [erroremail, setErroremail] = useState(false);
    const [isLoginDisabled, setIsLoginDisabled] = useState(true);
    // const [textInputHolder, setTextInputHolder] = useState('');
    // const [errorcatpMessage, setErrorcatpMessage] = useState('');
    // const [captchaText, setCaptchaText] = useState('');

    const handleOptionChange = (option) => {
        setSelectedOption(option);
        setNumber('');
        setMobileNumber('');
        setEmail('');
        setErrNumber(false);
        setErrormobileNumber(false);
        setErroremail(false);
    };

    // const handleCaptchaChange = (newCaptchaText) => {
    //     setCaptchaText(newCaptchaText);
    // };

    // const validateCaptchaCode = () => {
    //     if (textInputHolder === captchaText) {
    //         setErrorcatpMessage('');
    //         setIsLoginDisabled(false);
    //     } else {
    //         setErrorcatpMessage('Please enter a valid Captcha');
    //         setIsLoginDisabled(true);
    //     }
    // };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <Card.Content>
                    <View>
                        <Text style={styles.headertext}>Track Your Complaint</Text>
                    </View>
                    <View style={styles.innercard}>
                        <View>
                            <Text style={styles.subtext}>Search By</Text>
                        </View>
                        <View style={styles.toggleContainer}>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    selectedOption === 'complaintId' && styles.selectedButton,
                                ]}
                                onPress={() => handleOptionChange('complaintId')}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        selectedOption === 'complaintId' && styles.selectedButtonText,
                                    ]}
                                >
                                    Complaint ID
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    selectedOption === 'mobileNumber' && styles.selectedButton,
                                ]}
                                onPress={() => handleOptionChange('mobileNumber')}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        selectedOption === 'mobileNumber' && styles.selectedButtonText,
                                    ]}
                                >
                                    Mobile Number
                                </Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[
                                    styles.toggleButton,
                                    selectedOption === 'email' && styles.selectedButton,
                                ]}
                                onPress={() => handleOptionChange('email')}
                            >
                                <Text
                                    style={[
                                        styles.toggleButtonText,
                                        selectedOption === 'email' && styles.selectedButtonText,
                                    ]}
                                >
                                    Email
                                </Text>
                            </TouchableOpacity>
                        </View>
                        {selectedOption === 'complaintId' && (
                            <View style={styles.inputContainer}>
                                <TextInput
                                    mode="outlined"
                                    value={number}
                                    keyboardType="default"
                                    label={'Complaint Id*'}
                                    style={styles.form}
                                    placeholderTextColor="#000000"
                                    onChangeText={text => {
                                        const regex = /^[0-9]*$/;
                                        setNumber(text);
                                        if (regex.test(text)) {
                                            setErrNumber(false);
                                        } else {
                                            setErrNumber(true);
                                        }
                                    }}
                                    maxLength={10}
                                    error={errNumber}
                                    theme={{
                                        colors: {
                                            primary: '#1CF9F9',
                                        },
                                        roundness: 25,
                                    }}
                                />
                            </View>
                        )}
                        {errNumber &&
                            <Text style={styles.errorMsg}>{'Please enter correct Number'}</Text>
                        }
                        {selectedOption === 'mobileNumber' && (
                            <View style={styles.inputContainer}>
                                <Text style={styles.countryCode}>  +91</Text>
                                <TextInput
                                    mode="outlined"
                                    value={mobileNumber}
                                    keyboardType="numeric"
                                    label={'Mobile Number*'}
                                    style={[styles.form]}
                                    placeholderTextColor="#000000"
                                    onChangeText={text => {
                                        const regex =
                                            /^(?:(?:\+|0{0,2})91(\s*|[ -])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
                                        setMobileNumber(text);
                                        if (regex.test(text)) {
                                            setErrormobileNumber(false);
                                        } else {
                                            setErrormobileNumber(true);
                                        }
                                    }}
                                    maxLength={10}
                                    error={errormobileNumber}
                                    theme={{
                                        colors: {
                                            primary: '#1CF9F9',
                                        },
                                        roundness: 25,
                                    }}
                                />
                            </View>
                        )}
                        {errormobileNumber &&
                            <Text style={styles.errorMsg}>{'Please enter 10 digit Mobile Number'}</Text>
                        }
                        {selectedOption === 'email' && (
                            <View style={styles.inputContainer}>
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
                                        roundness: 25,
                                    }}
                                />
                            </View>
                        )}
                        {erroremail &&
                            <Text style={styles.errorMsg}>{'Please enter a valid email address'}</Text>
                        }


                        {/* <View style={styles.inputContainer1}>
                            <Text style={styles.subtext}>Verify</Text>
                            <View>
                                <ReCaptcha onCaptchaChange={handleCaptchaChange} />
                            </View>


                        </View>
                        <View style={styles.inputContainererr}>
                            <TextInput
                                label={'Captcha*'}
                                value={textInputHolder}
                                mode="outlined"
                                multiline={false}
                                numberOfLines={1}
                                onChangeText={(text) => setTextInputHolder(text)}
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
                        </View>
                        {errorcatpMessage !== '' &&
                                <Text style={styles.errorMsg}>{errorcatpMessage}</Text>
                            } */}

                        <View style={styles.inputContainer}>
                            <ButtonColor onPress={() => { }} text="Search" disabled={isLoginDisabled} />
                        </View>


                    </View>
                </Card.Content >
            </View >
        </SafeAreaView >
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
        marginTop: '10%',
    },
    card: {
        margin: '1%',
        backgroundColor: '#d4fcff',
        borderRadius: 20,
        paddingBottom: '5%',
    },
    innercard: {
        marginTop: '5%',
        backgroundColor: '#fff',
        borderRadius: 10,
        paddingBottom: '2%',
    },
    headertext: {
        fontSize: 18,
        color: '#000',
        textAlign: 'center',
        fontWeight: 'bold',
    },
    subtext: {
        fontSize: 16,
        color: 'gray',
        textAlign: 'left',
        fontWeight: '500',
        marginHorizontal: '3%',
        marginTop: '5%',
    },
    toggleContainer: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        marginVertical: '5%',
    },
    toggleButton: {
        paddingVertical: 10,
        paddingHorizontal: 15,
        borderRadius: 20,
        borderWidth: 1.4,
        borderColor: '#1CF9F9',
    },
    toggleButtonText: {
        color: 'gray',
    },
    selectedButton: {
        backgroundColor: '#5d8cf0',
        borderColor: '#1CF9F9',
    },
    selectedButtonText: {
        color: 'white',
    },
    inputContainer1: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '8%',
        marginTop: '5%',
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginTop: '8%',
    },
    inputContainererr: {
        flexDirection:'row-reverse',
        alignItems: 'center',
        marginHorizontal: '3%',
        marginTop: '8%',
    },
    countryCode: {
        marginRight: '8%',
        fontSize: 16,
        color: 'gray',
    },
    form: {
        flex: 1,
    },
    errorMsg: {
        color: 'red',
        textAlign: 'center',
        marginTop: '1%',
    },
});

export default TrackComplaint;
