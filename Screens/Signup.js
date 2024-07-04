/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
import { DefaultTheme, TextInput } from 'react-native-paper';
import ButtonColor from '../Components/ButtonColor';
import { SelectDropDown } from '../Components/SelectDropDown';
import userTypeData from '../Data/userTypes';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Ioniconmi from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const Signup = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorfirstName, setErrorfirstName] = useState(false);
    const [errorlastName, setErrorlastName] = useState(false);
    const [errormobileNumber, setErrormobileNumber] = useState(false);
    const [email, setEmail] = useState('');
    const [erroremail, setErroremail] = useState(false);
    const [userType, setUserType] = useState('');
    const [erroruserType, setErrorUserType] = useState(false);
    const [tradelicense, setTradelicense] = useState('');
    const [tradelicenseerr, setTradelicenseerr] = useState(false);
    const [gstNumber, setGstNumber] = useState('');
    const [gstNumbererr, setGstNumbererr] = useState(false);
    const [businessDescription, setbusinessDescription] = useState('');
    const [businessDescriptionErr, setbusinessDescriptionErr] = useState(false);
    const [businessName, setBusinessName] = useState('');
    const [errorbusinessName, setErrorBusinessName] = useState(false);

    const [panNumber, setPanNumber] = useState('');
    const [panNumbererr, setPanNumbererr] = useState(false);
    const navigation = useNavigation();
    const MAX_CHAR_COUNT = 2000;

    const handleUserTypeChange = (value) => {
        setUserType(value);
        setErrorUserType(false);
        // console.log('data=====================',userType);

        if (value === 2 || value === 5) {
            navigation.navigate('ssologin');
        }
    };

    const handleRegister = () => {

    };

    const customTheme = {
        ...DefaultTheme,
        colors: {
            ...DefaultTheme.colors,
            primary: '#1CF9F9',
            background: '#FFFFFF',
            text: '#000000',
            placeholder: '#454545',
        },
        roundness: 25,
    };

    return (
        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <SafeAreaView style={styles.container}>
                <View style={styles.subcontainer}>
                    <View style={styles.inputcontainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} color="gray" style={styles.iconStyle} />
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'FirstName*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                value={firstName}
                                onChangeText={text => {
                                    setFirstName(text);
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorfirstName(false);
                                    }
                                    else {
                                        setErrorfirstName(true);
                                    }
                                }}
                                error={errorfirstName}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25,
                                }}
                            />
                            {errorfirstName &&
                                <Text style={styles.errorMsg}>{'Please enter firstname'}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.inputcontainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="person-outline" size={20} color="gray" style={styles.iconStyle} />
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'LastName*'}
                                style={styles.form}
                                value={lastName}
                                placeholderTextColor="#000000"
                                onChangeText={text => {
                                    setLastName(text);
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorlastName(false);
                                    }
                                    else {
                                        setErrorlastName(true);
                                    }
                                }}
                                error={errorlastName}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25,
                                }}
                            />
                            {errorlastName &&
                                <Text style={styles.errorMsg}>{'Please enter lastname'}</Text>
                            }
                        </View>
                    </View>
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
                                    roundness: 25,
                                }}
                            />
                            {erroremail &&
                                <Text style={styles.errorMsg}>{'Please enter a valid email address'}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.inputcontainer}>
                        <View style={styles.inputWrapper}>
                            <Ionicons name="send-to-mobile" size={20} color="gray" style={styles.iconStyle} />
                            <TextInput
                                mode="outlined"
                                value={mobileNumber}
                                keyboardType="numeric"
                                label={'Mobile Number*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                onChangeText={text => {
                                    const regex = /^(?:(?:\+|0{0,2})91(\s*|[ -])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
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
                            {errormobileNumber &&
                                <Text style={styles.errorMsg}>{'Please enter 10 digit Mobile Number'}</Text>
                            }
                        </View>
                    </View>
                    <View style={styles.inputcontainer}>
                        <SelectDropDown
                            key={userType}
                            style={styles.selectdrop}
                            label={'👥   Type of User*'}
                            mode="outlined"
                            value={userType}
                            setValue={handleUserTypeChange}
                            list={userTypeData}
                            theme={{
                                colors: {
                                    primary: '#1CF9F9',
                                },
                                roundness: 25,
                            }}
                        />
                        {erroruserType !== '' && userType === '' && userType === 'Citizens' ? (
                            <Text style={styles.errorMsg}>
                                {'Please select type of user'}
                            </Text>
                        ) : null}
                    </View>

                    {userType === 3 || userType === 4 ? (
                        <>
                            <View style={styles.inputcontainer}>
                                <View style={styles.inputWrapper}>
                                    <Ioniconmi name="license" size={20} color="gray" style={styles.iconStyle} />
                                    <TextInput
                                        mode="outlined"
                                        keyboardType="default"
                                        label={'Trade license*'}
                                        style={styles.form}
                                        value={tradelicense}
                                        placeholderTextColor="#000000"
                                        onChangeText={text => {
                                            setTradelicense(text)
                                            const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                                            setTradelicenseerr(!reg.test(text));
                                        }}
                                        maxLength={30}
                                        error={tradelicenseerr}
                                        theme={{
                                            colors: {
                                                primary: '#1CF9F9',
                                            },
                                            roundness: 25,
                                        }}
                                    />
                                    {tradelicenseerr &&
                                        <Text style={styles.errorMsg}>{'Please enter a valid Trade license'}</Text>
                                    }

                                </View>
                            </View>
                            <View style={styles.inputcontainer}>
                                <View style={styles.inputWrapper}>
                                    <Ioniconmi name="license" size={20} color="gray" style={styles.iconStyle} />
                                    <TextInput
                                        mode="outlined"
                                        keyboardType="default"
                                        label={'GST Number'}
                                        style={styles.form}
                                        value={gstNumber}
                                        placeholderTextColor="#000000"
                                        onChangeText={text => {
                                            setGstNumber(text)
                                            const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
                                            setGstNumbererr(!reg.test(text));
                                        }}
                                        maxLength={30}
                                        error={gstNumbererr}
                                        theme={{
                                            colors: {
                                                primary: '#1CF9F9',
                                            },
                                            roundness: 25,
                                        }}
                                    />
                                    {gstNumbererr &&
                                        <Text style={styles.errorMsg}>{'Please enter a valid GST Number'}</Text>
                                    }

                                </View>
                            </View>

                            <View style={styles.inputcontainer}>
                                <View style={styles.inputWrapper}>
                                    <Ioniconmi name="credit-card" size={20} color="gray" style={styles.iconStyle} />
                                    <TextInput
                                        mode="outlined"
                                        keyboardType="default"
                                        label={'PAN Number'}
                                        style={styles.form}
                                        value={panNumber}
                                        placeholderTextColor="#000000"
                                        onChangeText={text => {
                                            setPanNumber(text)
                                            const reg = /^[A-Z]{5}[0-9]{4}[A-Z]{1}$/;
                                            setPanNumbererr(!reg.test(text));
                                        }}
                                        maxLength={30}
                                        error={panNumbererr}
                                        theme={{
                                            colors: {
                                                primary: '#1CF9F9',
                                            },
                                            roundness: 25,
                                        }}
                                    />
                                    {panNumbererr &&
                                        <Text style={styles.errorMsg}>{'Please enter a valid PAN Number'}</Text>
                                    }

                                </View>
                            </View>
                            <TextInput
                                label="Business Overview*"
                                value={businessDescription}
                                onChangeText={text => {
                                    setbusinessDescription(text);
                                    if (text.length > MAX_CHAR_COUNT) {
                                        setbusinessDescriptionErr(true);
                                    } else {
                                        setbusinessDescriptionErr(false);
                                    }
                                }}
                                mode="outlined"
                                multiline={true}
                                numberOfLines={4}
                                style={styles.inputcontainer}
                                error={businessDescriptionErr}
                                maxLength={MAX_CHAR_COUNT}
                                theme={customTheme}
                            />
                            <Text style={styles.charCount}>
                                {MAX_CHAR_COUNT - businessDescription.length} characters
                            </Text>
                            {businessDescriptionErr &&
                                <Text style={styles.errorMsg}>{'Please enter a Business Overview'}</Text>
                            }

                            <View style={styles.inputcontainer}>
                                <View style={styles.inputWrapper}>
                                    <Ionicons name="person-outline" size={20} color="gray" style={styles.iconStyle} />
                                    <TextInput
                                        mode="outlined"
                                        keyboardType="default"
                                        label={'Contact personnel Name*'}
                                        style={styles.form}
                                        placeholderTextColor="#000000"
                                        value={businessName}
                                        onChangeText={text => {
                                            setBusinessName(text);
                                            const regex = /^[a-zA-Z ]*$/;
                                            if (regex.test(text)) {
                                                setErrorBusinessName(false);
                                            }
                                            else {
                                                setErrorBusinessName(true);
                                            }
                                        }}
                                        error={errorbusinessName}
                                        theme={{
                                            colors: {
                                                primary: '#1CF9F9',
                                            },
                                            roundness: 25,
                                        }}
                                    />
                                    {errorbusinessName &&
                                        <Text style={styles.errorMsg}>{'Please enter Contact personnel Name'}</Text>
                                    }
                                </View>
                            </View>

                        </>
                    ) : null}


                    <View style={styles.inputcontainer}>
                    <ButtonColor onPress={() => navigation.navigate('complaintForm')} text="Register" />
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
    inputcontainer: {
        marginHorizontal: '3%',
        marginVertical: '3%',
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
    },
    selectdrop: {
        justifyContent: 'center',
        width: '100%',
    },
    charCount: {
        marginHorizontal: '9%',
        marginBottom: '1%',
        color: '#918F8F',
        textAlign: 'left',
    },
});

export default Signup;





// /* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
// import { View, Text, SafeAreaView, StyleSheet, ScrollView } from 'react-native';
// import { TextInput } from 'react-native-paper';
// import ButtonColor from '../Components/ButtonColor';
// import { SelectDropDown } from '../Components/SelectDropDown';
// import userTypeData from '../Data/userTypes';
// import Ionicons from 'react-native-vector-icons/MaterialIcons';
// import { useNavigation } from '@react-navigation/native';


// const Signup = () => {
//     const [firstName, setFirstName] = useState('');
//     const [lastName, setLastName] = useState('');
//     const [mobileNumber, setMobileNumber] = useState('');
//     const [errorfirstName, setErrorfirstName] = useState(false);
//     const [errorlastName, setErrorlastName] = useState(false);
//     const [errormobileNumber, setErrormobileNumber] = useState(false);
//     const [email, setEmail] = useState('');
//     const [erroremail, setErroremail] = useState(false);
//     const [userType, setUserType] = useState('');
//     const [erroruserType, setErrorUserType] = useState(false);

//     const navigation = useNavigation();



//     return (
//         <ScrollView contentContainerStyle={styles.scrollViewContent}>
//             <SafeAreaView style={styles.container}>
//                 <View style={styles.subcontainer}>
//                     <View style={styles.inputcontainer}>
//                         <View style={styles.inputWrapper}>
//                             <Ionicons name="person-outline" size={20} color="gray" style={styles.iconStyle} />
//                             <TextInput
//                                 mode="outlined"
//                                 keyboardType="default"
//                                 label={'FirstName*'}
//                                 style={styles.form}
//                                 placeholderTextColor="#000000"
//                                 value={firstName}
//                                 onChangeText={text => {
//                                     // Check for special characters
//                                     setFirstName(text);
//                                     const regex = /^[a-zA-Z ]*$/;
//                                     if (regex.test(text)) {
//                                         setErrorfirstName(false);
//                                     }
//                                     else {
//                                         setErrorfirstName(true);
//                                     }
//                                 }}
//                                 error={errorfirstName}
//                                 theme={{
//                                     colors: {
//                                         primary: '#1CF9F9',
//                                     },
//                                     roundness: 25, // Change the border radius here
//                                 }}
//                             />
//                             {errorfirstName &&
//                                 <Text style={styles.errorMsg}>{'Please enter firstname'}</Text>
//                             }</View>
//                     </View>
//                     <View style={styles.inputcontainer}>
//                         <View style={styles.inputWrapper}>
//                             <Ionicons name="person-outline" size={20} color="gray" style={styles.iconStyle} />
//                             <TextInput
//                                 mode="outlined"
//                                 keyboardType="default"
//                                 label={'LastName*'}
//                                 style={styles.form}
//                                 value={lastName}
//                                 placeholderTextColor="#000000"
//                                 onChangeText={text => {

//                                     setLastName(text);
//                                     // Check for special characters
//                                     const regex = /^[a-zA-Z ]*$/;
//                                     if (regex.test(text)) {
//                                         setErrorlastName(false);
//                                     }
//                                     else {
//                                         setErrorlastName(true);
//                                     }
//                                 }}
//                                 error={
//                                     errorlastName
//                                 }
//                                 theme={{
//                                     colors: {
//                                         primary: '#1CF9F9',
//                                     },
//                                     roundness: 25, // Change the border radius here
//                                 }}
//                             />

//                             {errorlastName &&
//                                 <Text style={styles.errorMsg}>{'Please enter lastname'}</Text>
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.inputcontainer}>
//                         <View style={styles.inputWrapper}>
//                             <Ionicons name="mail-outline" size={20} color="gray" style={styles.iconStyle} />
//                             <TextInput
//                                 mode="outlined"
//                                 keyboardType="email-address"
//                                 type="text"
//                                 autoCapitalize="none"
//                                 label={'Email*'}
//                                 value={email}
//                                 style={styles.form}
//                                 placeholderTextColor="#81ffd7"
//                                 onChangeText={text => {
//                                     setEmail(text);
//                                     const reg = /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/;
//                                     setErroremail(!reg.test(text));
//                                 }}
//                                 error={erroremail}
//                                 theme={{
//                                     colors: {
//                                         primary: '#1CF9F9',
//                                     },
//                                     roundness: 25,
//                                 }}
//                             />
//                             {erroremail &&
//                                 <Text style={styles.errorMsg}>{'Please enter a valid email address'}</Text>
//                             }

//                         </View>

//                     </View>
//                     <View style={styles.inputcontainer}>
//                         <View style={styles.inputWrapper}>
//                             <Ionicons name="send-to-mobile" size={20} color="gray" style={styles.iconStyle} />
//                             <TextInput
//                                 mode="outlined"
//                                 value={mobileNumber}
//                                 keyboardType="numeric"
//                                 label={'Mobile Number*'}
//                                 style={styles.form}
//                                 placeholderTextColor="#000000"
//                                 onChangeText={text => {
//                                     // Check for special characters
//                                     const regex =
//                                         /^(?:(?:\+|0{0,2})91(\s*|[ -])?|[0]?)?([6789]\d{2}([ -]?)\d{3}([ -]?)\d{4})$/;
//                                     setMobileNumber(text);
//                                     if (regex.test(text)) {
//                                         setErrormobileNumber(false);
//                                     } else {
//                                         setErrormobileNumber(true);
//                                     }
//                                 }}
//                                 maxLength={10}
//                                 error={errormobileNumber}
//                                 theme={{
//                                     colors: {
//                                         primary: '#1CF9F9',
//                                     },
//                                     roundness: 25, // Change the border radius here
//                                 }}
//                             />

//                             {errormobileNumber &&
//                                 <Text style={styles.errorMsg}>{'Please enter 10 digit Mobile Number'}</Text>
//                             }
//                         </View>
//                     </View>
//                     <View style={styles.inputcontainer}>
//                         <SelectDropDown
//                             key={userType}
//                             style={styles.selectdrop}
//                             label={'👥   Type of User*'}
//                             mode="outlined"
//                             value={userType}
//                             setValue={setUserType}
//                             list={userTypeData}
//                             theme={{
//                                 colors: {
//                                     primary: '#1CF9F9',
//                                 },
//                                 roundness: 25, // Change the border radius here
//                             }}
//                         />

//                         {erroruserType !== '' && userType === '' && userType === 'Citizens' ? (
//                             <Text style={styles.errorMsg}>
//                                 {'Please select type of user'}
//                             </Text>
//                         ) : null}

//                     </View>

//                     <View style={styles.inputcontainer}>
//                         <ButtonColor onPress={() => navigation.navigate('complaintForm')} text="Register" />

//                     </View>

//                 </View>
//             </SafeAreaView>
//         </ScrollView >

//     );
// };

// const styles = StyleSheet.create({

//     container: {
//         flex:1,
//         height: '100%',
//         backgroundColor: '#FFFFFF',
//     },
//     subcontainer: {
//         marginTop: '3%',
//     },
//     inputcontainer: {
//         marginHorizontal: '3%',
//         marginVertical: '3%',
//     },
//     errorMsg: {
//         color: 'red',
//         marginLeft: '5%',
//         marginTop: '2%',
//     },
//     inputWrapper: {
//         position: 'relative',
//         justifyContent: 'center',
//     },
//     iconStyle: {
//         position: 'absolute',
//         left: 15,
//         top: 20,
//         zIndex: 1,
//     },
//     form: {
//         width: '100%',
//         height: 45,
//         backgroundColor: '#fff',
//         paddingLeft: 30,
//     },
//     selectdrop: {
//        justifyContent: 'center',
//        width: '100%',
//     },

// });
// export default Signup;

