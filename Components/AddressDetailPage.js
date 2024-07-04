/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { DefaultTheme, TextInput } from 'react-native-paper';

import { SelectDropDown } from './SelectDropDown';
import statesData from '../Data/statesData';
import countryData from '../Data/countryData';
import districtData from '../Data/districtData';
import policestationData from '../Data/policestationData';



const { width } = Dimensions.get('window');

const AddressDetailPage = () => {
    const [streetName, setStreetName] = useState('');
    const [colonyName, setColonyName] = useState('');
    const [pincodeNumber, setPincodeNumber] = useState('');
    const [errorStreetName, setErrorStreetName] = useState(false);
    const [errorColonyName, setErrorColonyName] = useState(false);
    const [errorpincodeNumber, setErrorPincodeNumber] = useState(false);
    const [hmNo, setHomeNo] = useState('');

    const [policestation, setPoliceStation] = useState('');
    const [tehsilName, setTehsilName] = useState('');
    const [errorTehsilName, setErrorTehsilName] = useState(false);
    const [country, setCountry] = useState('India');
    const [states, setStates] = useState('Maharashtra');

    const [cityName, setCityName] = useState('');
    const [district, setDistrict] = useState('');
    const [errorCityName, setErrorCityName] = useState(false);

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
                                keyboardType="numeric"
                                type="text"
                                autoCapitalize="none"
                                label={'House Number'}
                                value={hmNo}
                                style={styles.form}
                                placeholderTextColor="#81ffd7"
                                onChangeText={text => {
                                    setHomeNo(text);
                                }}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25,
                                }}
                            />

                        </View>


                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'Street Name'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                value={streetName}
                                onChangeText={text => {
                                    // Check for special characters
                                    setStreetName(text);
                                    const regex = /^[a-zA-Z0-9 ]*$/;
                                    if (regex.test(text)) {
                                        setErrorStreetName(false);
                                    }
                                    else {
                                        setErrorStreetName(true);
                                    }
                                }}
                                error={errorStreetName}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, 
                                }}
                            />
                            {errorStreetName &&
                                <Text style={styles.errorMsg}>{'Special charecter are not allowed '}</Text>
                            }</View>
                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'Colony '}
                                style={styles.form}
                                value={colonyName}
                                placeholderTextColor="#000000"
                                onChangeText={text => {

                                    setColonyName(text);
                                    // Check for special characters
                                    const regex = /^[a-zA-Z0-9 ]*$/;
                                    if (regex.test(text)) {
                                        setErrorColonyName(false);
                                    }
                                    else {
                                        setErrorColonyName(true);
                                    }
                                }}
                                error={
                                    errorColonyName
                                }
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25,
                                }}
                            />

                            {errorColonyName &&
                                <Text style={styles.errorMsg}>{'Special charecter are not allowed'}</Text>
                            }
                        </View>

                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'Vill/Town/City*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                value={cityName}
                                onChangeText={text => {
                                    // Check for special characters
                                    setCityName(text);
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorCityName(false);
                                    }
                                    else {
                                        setErrorCityName(true);
                                    }
                                }}
                                error={errorCityName}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, // Change the border radius here
                                }}
                            />
                            {errorCityName &&
                                <Text style={styles.errorMsg}>{'Special charecter are not allowed'}</Text>
                            }</View>

                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'Tehsil'}
                                style={styles.form}
                                value={tehsilName}
                                placeholderTextColor="#000000"
                                onChangeText={text => {

                                    setTehsilName(text);
                                    // Check for special characters
                                    const regex = /^[a-zA-Z0-9 ]*$/;
                                    if (regex.test(text)) {
                                        setErrorTehsilName(false);
                                    }
                                    else {
                                        setErrorTehsilName(true);
                                    }
                                }}
                                error={
                                    errorTehsilName
                                }
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25,
                                }}
                            />

                            {errorTehsilName &&
                                <Text style={styles.errorMsg}>{'Special charecter are not allowed'}</Text>
                            }
                        </View>

                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={country}
                                style={styles.selectdrop}
                                label={'Country*'}
                                mode="outlined"
                                value={country}
                                setValue={setCountry}
                                list={countryData}
                                theme={customTheme}
                            />

                            {country === '' && country === 'Country' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select country'}
                                </Text>
                            ) : null}

                        </View>


                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={states}
                                style={styles.selectdrop}
                                label={'State*'}
                                mode="outlined"
                                value={states}
                                setValue={setStates}
                                list={statesData}
                                theme={customTheme}
                            />

                            {states === '' && states === 'State' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select State'}
                                </Text>
                            ) : null}

                        </View>

                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={district}
                                style={styles.selectdrop}
                                label={'District*'}
                                mode="outlined"
                                value={district}
                                setValue={setDistrict}
                                list={districtData}
                                theme={customTheme}
                            />

                            {district === '' && district === 'District*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select district'}
                                </Text>
                            ) : null}

                        </View>
                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={policestation}
                                style={styles.selectdrop}
                                label={'Police Station*'}
                                mode="outlined"
                                value={policestation}
                                setValue={setPoliceStation}
                                list={policestationData}
                                theme={customTheme}
                            />

                            {policestation === '' && policestation === 'Police Station*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Police Station'}
                                </Text>
                            ) : null}

                        </View>



                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                value={pincodeNumber}
                                keyboardType="numeric"
                                label={'Pincode*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                onChangeText={text => {
                                    // Check for special characters
                                    const regex =
                                        /^\d{6}$/;
                                    setPincodeNumber(text);
                                    if (regex.test(text)) {
                                        setErrorPincodeNumber(false);
                                    } else {
                                        setErrorPincodeNumber(true);
                                    }
                                }}
                                maxLength={6}
                                error={errorpincodeNumber}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, // Change the border radius here
                                }}
                            />

                            {errorpincodeNumber &&
                                <Text style={styles.errorMsg}>{'Please enter 6 digit pincode'}</Text>
                            }
                        </View>

                        <View style={styles.inputcontainer}>
                            {/* <ButtonColor onPress={() => Alert.alert('Save')} text="Save" /> */}

                        </View>

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
        // borderRadius:'1%',

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
export default AddressDetailPage;

