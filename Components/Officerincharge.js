/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions, Alert } from 'react-native';
import {  DefaultTheme, TextInput } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import policestationData from '../Data/policestationData';
import ButtonColor from './ButtonColor';

const { width } = Dimensions.get('window');

const Officerincharge = () => {
    const [name, setName] = useState('');
    const [errorname, setErrorName] = useState(false);



    const [policestation, setPoliceStation] = useState('');
    const [rank, setRank] = useState('');
    const [errrank, setErrRank] = useState(false);
    const [number, setNumber] = useState('');
    const [errNumber, setErrNumber] = useState(false);

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
                        <View>
                            <Text style={styles.maintext}>Officer-in-charge Details</Text>
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
                                keyboardType="default"
                                label={'Name*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                value={name}
                                onChangeText={text => {
                                    // Check for special characters
                                    setName(text);
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorName(false);
                                    }
                                    else {
                                        setErrorName(true);
                                    }
                                }}
                                error={errorname}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, // Change the border radius here
                                }}
                            />
                            {errorname &&
                                <Text style={styles.errorMsg}>{'Please enter Name'}</Text>
                            }</View>


                        <View style={{
                            flexDirection: 'row',
                            justifyContent: 'space-evenly',
                        }}>
                            <View style={styles.inputcontainer}>
                                <TextInput
                                    mode="outlined"
                                    value={rank}
                                    keyboardType="numeric"
                                    label={'Rank*'}
                                    style={styles.form}
                                    placeholderTextColor="#000000"
                                    onChangeText={text => {
                                        const regex =
                                            /^[0-9]*$/;
                                        setRank(text);
                                        if (regex.test(text)) {
                                            setErrRank(false);
                                        } else {
                                            setErrRank(true);
                                        }
                                    }}
                                    maxLength={5}
                                    error={errrank}
                                    theme={{
                                        colors: {
                                            primary: '#1CF9F9',
                                        },
                                        roundness: 25,
                                    }}
                                />

                                {errrank &&
                                    <Text style={styles.errorMsg}>{'Please enter rank'}</Text>
                                }
                            </View>

                            <View style={styles.inputcontainer}>
                                <TextInput
                                    mode="outlined"
                                    value={number}
                                    keyboardType="numeric"
                                    label={'Number'}
                                    style={styles.form}
                                    placeholderTextColor="#000000"
                                    onChangeText={text => {
                                        const regex =
                                            /^[0-9]*$/;
                                        setNumber(text);
                                        if (regex.test(text)) {
                                            setErrNumber(false);
                                        } else {
                                            setErrNumber(true);
                                        }
                                    }}
                                    maxLength={5}
                                    error={errNumber}
                                    theme={{
                                        colors: {
                                            primary: '#1CF9F9',
                                        },
                                        roundness: 25,
                                    }}
                                />

                                {errNumber &&
                                    <Text style={styles.errorMsg}>{'Please enter correct Number'}</Text>
                                }
                            </View>

                        </View>






                        <View style={styles.inputcontainer}>
                            <ButtonColor onPress={() => Alert.alert('Save')} text="Register" />

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
        backgroundColor: '#d4fcff',
        borderRadius: 20,
        padding: '2%',
    },
    inputcontainer: {
        flex: 1,
        marginHorizontal: '3%',
        marginVertical: '3%',
    },
    maintext: {
        textAlign: 'center',
        color: 'black',
        fontWeight: '500',
        fontSize: 15,
    },
    subtext: {
        textAlign: 'center',
        color: 'black',
        marginBottom: '4%',
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
export default Officerincharge;
