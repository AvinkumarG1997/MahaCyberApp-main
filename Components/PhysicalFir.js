/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Text, SafeAreaView, StyleSheet, ScrollView, Dimensions } from 'react-native';
import { Button, DefaultTheme, TextInput } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import districtData from '../Data/districtData';
import policestationData from '../Data/policestationData';

const { width } = Dimensions.get('window');

const PhysicalFir = () => {
    const [firNum, setFirNum] = useState('');
    const [errorfirNum, setErrorFirNum] = useState(false);
    const [district, setDistrict] = useState('');
    const [policestation, setPoliceStation] = useState('');


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
                        <View>
                            <Text style={styles.maintext}>FIRST INFORMATION REPORT</Text>
                        </View>
                        <View>
                            <Text style={styles.subtext}>(Under Section 154 Cr.P.C)</Text>
                        </View>
                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                keyboardType="default"
                                label={'FIR Number*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                value={firNum}
                                onChangeText={text => {
                                    // Check for special characters
                                    setFirNum(text);
                                    const regex = /^[a-zA-Z ]*$/;
                                    if (regex.test(text)) {
                                        setErrorFirNum(false);
                                    }
                                    else {
                                        setErrorFirNum(true);
                                    }
                                }}
                                error={errorfirNum}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25, // Change the border radius here
                                }}
                            />
                            {errorfirNum &&
                                <Text style={styles.errorMsg}>{'Please enter FIR Number'}</Text>
                            }</View>

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
                                    {showdate ? formattedDate : dob ? dob : 'Date*'}
                                </Button>
                                <View style={styles.iconContainerEnd}>
                                    <IonIcon name="calendar-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                </View>
                            </View>
                        </View>


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
        backgroundColor: '#d4fcff',
        borderRadius: 20,
        padding: '2%',
    },
    inputcontainer: {
        marginHorizontal: '3%',
        marginVertical: '3%',
    },
    maintext: {
        textAlign: 'center',
        color: 'black',
        fontWeight: 'bold',
    },
    subtext: {
        textAlign: 'center',
        color: 'black',
        marginBottom:'4%',
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
export default PhysicalFir;
