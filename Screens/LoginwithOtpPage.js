/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { TextInput } from 'react-native-paper';
import ButtonColor from '../Components/ButtonColor';
import { useNavigation } from '@react-navigation/native';
import Ionicons from 'react-native-vector-icons/MaterialIcons';

const LoginwithOtpPage = () => {
    const navigation = useNavigation();
    const [phone_email, setPhoneEmail] = useState('');
    const [errorphone_email, setErrorPhoneemail] = useState(false);
    const handleLoginwithOtpPress = () => {
        navigation.navigate('OtpPage', { phone_email });
    };

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={styles.inputcontainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="send-to-mobile" size={20} color="gray" style={styles.iconStyle} />
                            <TextInput
                                mode="outlined"
                                keyboardType="email-address"
                                type="text"
                                autoCapitalize="none"
                                label={'Mobile Number / Email*'}
                                value={phone_email}
                                style={styles.form}
                                placeholderTextColor="#81ffd7"
                                onChangeText={text => {
                                    setPhoneEmail(text);
                                    const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                                    const phoneReg = /^\d{10}$/;

                                    if (text === '' || text === undefined) {
                                        setErrorPhoneemail('Please enter a valid email address or Mobile Number');
                                    } else if (!isNaN(text)) {
                                        if (!phoneReg.test(text)) {
                                            setErrorPhoneemail('Please enter a valid Mobile Number');
                                        } else {
                                            setErrorPhoneemail('');
                                        }
                                    } else {
                                        if (!emailReg.test(text)) {
                                            setErrorPhoneemail('Please enter a valid email address');
                                        } else {
                                            setErrorPhoneemail('');
                                        }
                                    }
                                }}
                                error={errorphone_email}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, // Change the border radius here
                                }}
                            />
                            {errorphone_email !== '' &&
                                <Text style={styles.errorMsg}>{errorphone_email}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.inputcontainers}>
                        <ButtonColor onPress={handleLoginwithOtpPress} text="Login with OTP" />
                    </View>
                </View>
            </SafeAreaView>
        </ScrollView>
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
    },
    inputcontainers: {
        marginHorizontal: '3%',
        marginBottom: '3%',
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
    },
    errorMsg: {
        color: 'red',
        marginLeft: '5%',
        marginTop: '2%',
    },
});

export default LoginwithOtpPage;



// /* eslint-disable react-native/no-inline-styles */
// /* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import ButtonColor from '../Components/ButtonColor';
// import { useNavigation } from '@react-navigation/native';
// // import IonIcon from 'react-native-vector-icons/Ionicons';
// const LoginwithOtpPage = () => {
//     const navigation = useNavigation();
//     const [phone_email, setPhoneEmail] = useState('');
//     const [errorphone_email, setErrorPhoneemail] = useState(false);
//     const handleLoginwithOtpPress = () => {
//         navigation.navigate('OtpPage', { phone_email });
//     };

//     return (
//         <ScrollView >
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.subcontainer}>
//                     <View style={styles.inputcontainer}>
//                         <View>

//                             <TextInput
//                                 mode="outlined"
//                                 keyboardType="email-address"
//                                 type="text"
//                                 autoCapitalize="none"
//                                 label={'Mobile Number / Email*'}
//                                 value={phone_email}
//                                 style={styles.form}
//                                 placeholderTextColor="#81ffd7"
//                                 // onChangeText={text => {
//                                 //     setPhoneEmail(text);
//                                 //     const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//                                 //     setErrorPhoneemail(!reg.test(text));
//                                 // }}
//                                 onChangeText={text => {
//                                     setPhoneEmail(text);
//                                     const emailReg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//                                     const phoneReg = /^\d{10}$/;

//                                     if (text === '' || text === undefined) {
//                                         setErrorPhoneemail('Please enter a valid email address or Mobile Number');
//                                     } else if (!isNaN(text)) {
//                                         if (!phoneReg.test(text)) {
//                                             setErrorPhoneemail('Please enter a valid Mobile Number');
//                                         } else {
//                                             setErrorPhoneemail('');
//                                         }
//                                     } else {
//                                         if (!emailReg.test(text)) {
//                                             setErrorPhoneemail('Please enter a valid email address');
//                                         } else {
//                                             setErrorPhoneemail('');
//                                         }
//                                     }
//                                 }}
//                                 error={errorphone_email}
//                                 theme={{
//                                     colors: {
//                                         primary: '#1CF9F9',
//                                     },
//                                     roundness: 25, // Change the border radius here
//                                 }}
//                             />
//                             {/* <View style={styles.iconContainerStart}>
//                 <IonIcon name="eye-sharp" size={24} color="#a9a9a9" style={styles.iconContainerStart} />
//               </View> */}


//                             {errorphone_email !== '' &&
//                                 <Text style={styles.errorMsg}>{errorphone_email}</Text>
//                             }
//                         </View>

//                     </View>
//                     <View style={styles.inputcontainers}>
//                         <ButtonColor onPress={handleLoginwithOtpPress} text="Login with OTP" />
//                     </View>

//                 </View>
//             </SafeAreaView>
//         </ScrollView >

//     );
// };

// const styles = StyleSheet.create({

//     container: {
//         height: '100%',
//         backgroundColor: '#FFFFFF',
//     },

//     subcontainer: {
//         marginTop: '3%',
//     },
//     inputcontainer: {
//         marginHorizontal: '3%',
//         // marginVertical: '3%',
//     },
//     inputcontainers:{
//         marginHorizontal: '3%',
//         marginBottom:'3%',
//     },
//     errorMsg: {
//         color: 'red',
//         marginLeft: '5%',
//         marginTop: '2%',
//     },
//     form: {
//         width: '100%',
//         height: 45,
//         backgroundColor: '#fff',
//         // borderRadius:'1%',

//     },
//     iconContainerStart: {
//         position: 'absolute',
//         left: '4%',
//         top: '35%',
//     },
//     iconContainerEnd: {
//         position: 'absolute',
//         right: '8%',
//         top: '35%',
//     },
// });

// export default LoginwithOtpPage;
