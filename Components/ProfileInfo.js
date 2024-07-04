/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, DefaultTheme, TextInput } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import userTitleData from '../Data/userTitleData';
import userGenderData from '../Data/userGenderData';
import userRelationTypeData from '../Data/userRelationTypeData';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const ProfileInfo = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [mobileNumber, setMobileNumber] = useState('');
    const [errorfirstName, setErrorfirstName] = useState(false);
    const [errorlastName, setErrorlastName] = useState(false);
    const [errormobileNumber, setErrormobileNumber] = useState(false);
    const [email, setEmail] = useState('');
    const [erroremail, setErroremail] = useState(false);
    const [userTitle, setUserTitle] = useState('User Title');


    const [gender, setGender] = useState('Gender*');

    const [relationName, setRelationName] = useState('');
    const [userTypeRelation, setTypeRelation] = useState('Relationship Type*');
    const [errorRelationName, setErrorRelationName] = useState(false);

    const [open, setOpen] = useState(false);
    const [showdate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState('');
    const formattedDate = date
        ? format(date, 'dd/MM/yyyy', { timeZone: 'Asia/Kolkata' })
        : '';

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
        <ScrollView enableOnAndroid={true}>
            <SafeAreaView style={styles.container}>
                <View style={styles.card}>
                    <View style={styles.subcontainer}>
                        <View style={styles.inputcontainer}>
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

                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={userTitle}
                                style={styles.selectdrop}
                                label={'User Title'}
                                mode="outlined"
                                value={userTitle}
                                setValue={setUserTitle}
                                list={userTitleData}
                                theme={customTheme}
                            />

                            {userTitle === '' && userTitle === 'Mx' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select user title'}
                                </Text>
                            ) : null}

                        </View>
                        <View style={styles.inputcontainer}>
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
                            }</View>
                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'LastName*'}
                                style={styles.form}
                                value={lastName}
                                placeholderTextColor="#000000"
                                onChangeText={text => {

                                    setLastName(text);
                                    // Check for special characters
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorlastName(false);
                                    }
                                    else {
                                        setErrorlastName(true);
                                    }
                                }}
                                error={
                                    errorlastName
                                }
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

                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                value={mobileNumber}
                                keyboardType="numeric"
                                label={'Mobile Number*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                onChangeText={text => {
                                    // Check for special characters
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
                                    roundness: 25, // Change the border radius here
                                }}
                            />

                            {errormobileNumber &&
                                <Text style={styles.errorMsg}>{'Please enter 10 digit Mobile Number'}</Text>
                            }
                        </View>

                        <View style={styles.inputcontainer}>

                            <DatePicker
                                modal
                                mode="date"
                                open={open}
                                date={date}
                                maximumDate={new Date()}
                                onConfirm={date => {
                                    setOpen(false);
                                    setDate(date);
                                    setShowDate(true);
                                }}
                                onCancel={() => {
                                    setOpen(false);
                                }}
                            />
                            <View>
                                <Button
                                    style={styles.dobsty}
                                    mode="outlined"
                                    labelStyle={styles.btnlbe}
                                    onPress={() => setOpen(true)}>
                                    {showdate ? formattedDate : dob ? dob : 'Date of Birth'}
                                </Button>
                                <View style={styles.iconContainerEnd}>
                                    <IonIcon name="calendar-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                </View>
                            </View>
                        </View>

                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={gender}
                                style={styles.selectdrop}
                                label={'Gender*'}
                                mode="outlined"
                                value={gender}
                                setValue={setGender}
                                list={userGenderData}
                                theme={customTheme}
                            />

                            {gender === '' && gender === 'Mx' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Gender'}
                                </Text>
                            ) : null}

                        </View>

                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={userTypeRelation}
                                style={styles.selectdrop}
                                label={'Relationship Type*'}
                                mode="outlined"
                                value={userTypeRelation}
                                setValue={setTypeRelation}
                                list={userRelationTypeData}
                                theme={customTheme}
                            />

                            {userTypeRelation === '' && userTypeRelation === 'Relationship Type*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Relationship type'}
                                </Text>
                            ) : null}

                        </View>

                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'Relation Name*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                value={relationName}
                                onChangeText={text => {
                                    // Check for special characters
                                    setRelationName(text);
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorRelationName(false);
                                    }
                                    else {
                                        setErrorRelationName(true);
                                    }
                                }}
                                error={errorRelationName}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, // Change the border radius here
                                }}
                            />
                            {errorRelationName &&
                                <Text style={styles.errorMsg}>{'Please enter Relation name'}</Text>
                            }</View>

                        {/* <View style={styles.inputcontainer}>
                            <ButtonColor onPress={() => Alert.alert('Save')} text="Save" />

                        </View> */}

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
    card: {
        margin: '2%',
        backgroundColor: '#FEFEFE',
        borderRadius: 20,
        padding: '2%',
        borderWidth:1,
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
    form: {
        width: '100%',
        height: 45,
        backgroundColor: '#fff',

    },
    dobsty: {
        borderRadius: 70,
        padding: '1%',
        backgroundColor: '#fff',
    },
    selectdrop: {
        width: 100,
        flex: 1,
    },
    btnlbe:
    {
        color: '#454545',
        flex: 1,
        right: width * 0.02,
        backgroundColor: '#fff',
    },


    iconContainerStart: {
        position: 'absolute',
        left: '4%',
        top: '30%',
      },
      iconContainerEnd: {
        position: 'absolute',
        right: '8%',
        top: '30%',
      },

});
export default ProfileInfo;
