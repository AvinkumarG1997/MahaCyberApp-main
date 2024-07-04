/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text } from 'react-native';
import { Card, DefaultTheme, TextInput } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import typeGrievanceData from '../Data/typeGrievanceData';

const GrievanceInfo = () => {
    const [complaintDescription, setComplaintDescription] = useState('');
    // const [remarks, setRemarks] = useState('');
    const [complaintDescriptionErr, setComplaintDescriptionErr] = useState(false);
    const [typeGrievance, setTypeGrievance] = useState('Type of Grievance');
    const MAX_CHAR_COUNT = 8000;

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
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.subcontainer}>
                    <Card.Content>
                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={typeGrievance}
                                style={styles.selectdrop}
                                label={'Type of Grievance*'}
                                mode="outlined"
                                value={typeGrievance}
                                setValue={setTypeGrievance}
                                list={typeGrievanceData}
                                theme={customTheme}
                            />

                            {typeGrievance === '' && typeGrievance === 'Type of Grievance*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select type of Grievance'}
                                </Text>
                            ) : null}
                            </View>

                        <TextInput
                            label="Description"
                            value={complaintDescription}
                            onChangeText={text => {
                                setComplaintDescription(text);
                                if (text.length > MAX_CHAR_COUNT) {
                                    setComplaintDescriptionErr(true);
                                } else {
                                    setComplaintDescriptionErr(false);
                                }
                            }}
                            mode="outlined"
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputcontainer}
                            error={complaintDescriptionErr}
                            maxLength={MAX_CHAR_COUNT}
                            theme={customTheme}
                        />
                        <Text style={styles.charCount}>
                            {MAX_CHAR_COUNT - complaintDescription.length} characters
                        </Text>
                        {/* <TextInput
                            label="Remarks"
                            value={remarks}
                            onChangeText={text => setRemarks(text)}
                            mode="outlined"
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputcontainer}
                            maxLength={MAX_CHAR_COUNT}
                            theme={customTheme}
                        />
                        <Text style={styles.charCount}>
                            {MAX_CHAR_COUNT - remarks.length} characters
                        </Text> */}
                    </Card.Content>
                </View>
            </View>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFFFFF',
    },
    subcontainer: {
        marginTop: '3%',
    },
    card: {
        margin: '2%',
        backgroundColor: '#FEFEFE',
        borderRadius: 20,
        paddingBottom: '5%',
        borderWidth: 1,
    },
    inputcontainer: {
        marginHorizontal: '3%',
        marginVertical: '3%',
    },
    charCount: {
        marginHorizontal: '9%',
        marginBottom: '1%',
        color: '#918F8F',
        textAlign: 'left',
    },
    selectdrop: {
        width: 100,
        flex: 1,
    },
});

export default GrievanceInfo;
