/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button, Card, DefaultTheme, RadioButton, TextInput } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import typeComplaintData from '../Data/typeComplaintData';
import subtypeComplaintData from '../Data/subtypeComplaintData';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
import typeIncidentData from '../Data/typeIncidentData';
import FinancialMode from './FinancialMode';

const { width } = Dimensions.get('window');

const ComplaintInfo = () => {
    const [complaintDescription, setComplaintDescription] = useState('');

    const [complaintDescriptionErr, setComplaintDescriptionErr] = useState(false);
    const [typeComplaint, setTypeComplaint] = useState('');
    const [subtypeComplaint, setsubTypeComplaint] = useState('');
    const [knowDelay, setKnowDelay] = useState('no');
    const [reason, setReason] = useState('');
    const [typeIncident, setTypeIncident] = useState('');
    const [incidentDetail, setIncidentDetail] = useState('');

    const MAX_CHAR_COUNT = 5000;

    const [open, setOpen] = useState(false);
    const [showdate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState('');

    // const [opent, setOpent] = useState(false);
    // const [showdatet, setShowDatet] = useState(false);
    // const [time, setTime] = useState(new Date());
    // const [timed, setTimed] = useState('');
    const [times, setTimes] = useState(new Date());

    const [showTimePicker, setShowTimePicker] = useState(false);

    const formattedDate = date
        ? format(date, 'dd/MM/yyyy', { timeZone: 'Asia/Kolkata' })
        : '';


    const handleTimeChange = (event, selectedTime) => {
        const currentTime = selectedTime || times;
        setShowTimePicker(false);
        setTimes(currentTime);
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
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.subcontainer}>
                    <Card.Content>
                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={typeComplaint}
                                style={styles.selectdrop}
                                label={'Category of complaint*'}
                                mode="outlined"
                                value={typeComplaint}
                                setValue={setTypeComplaint}
                                list={typeComplaintData}
                                theme={customTheme}
                            />

                            {typeComplaint === '' && typeComplaint === 'Category of complaint*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Category of complaint*'}
                                </Text>
                            ) : null}
                        </View>
                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={subtypeComplaint}
                                style={styles.selectdrop}
                                label={'Sub Category of complaint*'}
                                mode="outlined"
                                value={subtypeComplaint}
                                setValue={setsubTypeComplaint}
                                list={subtypeComplaintData}
                                theme={customTheme}
                            />

                            {subtypeComplaint === '' && subtypeComplaint === 'Sub Category of complaint*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Sub Category of complaint*'}
                                </Text>
                            ) : null}
                        </View>

                        <View>
                           <FinancialMode />
                        </View>

                        <Text style={styles.label}>Approximate date & time of Incident/receiving/viewing of content *</Text>
                        <View style={styles.rowContainer}>
                             
                            <View style={[styles.inputcontainer, styles.dateContainer]}>

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

                            <View style={[styles.inputcontainer, styles.dateContainer]}>
                                <View style={styles.timeContainer}>
                                  
                                    <Text onPress={() => setShowTimePicker(true)} style={styles.timeText}>
                                        {times.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                    </Text>
                                    {showTimePicker && (
                                        <DateTimePicker
                                            value={times}
                                            mode="time"
                                            display="default"
                                            onChange={handleTimeChange}
                                        />
                                    )}
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="time-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                    </View>
                                </View>


                                {/* <DatePicker
                                    modal
                                    mode="time"
                                    open={opent}
                                    date={time}
                                    // maximumDate={new Date()}
                                    onConfirm={time => {
                                        setOpent(false);
                                        setTime(time);
                                        setShowDatet(true);
                                    }}
                                    onCancel={() => {
                                        setOpent(false);
                                    }}
                                />
                                <View>
                                    <Button
                                        style={styles.dobsty}
                                        mode="outlined"
                                        labelStyle={styles.btnlbe}
                                        onPress={() => setOpent(true)}>
                                        {showdatet ? formattedDate : timed ? timed : 'Time*'}
                                    </Button>
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="calendar-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpent(true)} />
                                    </View>
                                </View> */}
                            </View>

                        </View>


                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={typeIncident}
                                style={styles.selectdrop}
                                label={'Where did the incident occur?*'}
                                mode="outlined"
                                value={typeIncident}
                                setValue={setTypeIncident}
                                list={typeIncidentData}
                                theme={customTheme}
                            />

                            {typeIncident === '' && typeIncident === 'Where did the incident occur?' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Incident occur*'}
                                </Text>
                            ) : null}
                        </View>

                        {typeIncident && (
                            <TextInput
                                label={`Enter the ${typeIncidentData.find(item => item.value === typeIncident)?.label}`}
                                value={incidentDetail}
                                onChangeText={setIncidentDetail}
                                mode="outlined"
                                style={styles.inputcontainer}
                                theme={customTheme}
                            />
                        )}


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

                        <View style={styles.inputcontainer}>
                            <Text style={styles.label}>Is there any delay in reporting?</Text>
                            <RadioButton.Group
                                onValueChange={value => setKnowDelay(value)}
                                value={knowDelay}
                            >
                                <View style={styles.radioButtonRow}>
                                    <RadioButton value="yes" />
                                    <Text style={styles.radioButtonLabel}>Yes</Text>
                                    <RadioButton value="no" />
                                    <Text style={styles.radioButtonLabel}>No</Text>
                                </View>
                            </RadioButton.Group>
                        </View>

                        {knowDelay === 'yes' && (
                            <TextInput
                                label="Enter reason for delay"
                                value={reason}
                                onChangeText={setReason}
                                mode="outlined"
                                style={styles.inputcontainer}
                                theme={customTheme}
                            />
                        )}



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
    cardInner: {
        marginHorizontal: '5%',
        marginVertical: '2%',
        backgroundColor: '#fff',
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
    label: {
        fontSize: 16,
        marginBottom: '3%',
    },
    radioButtonRow: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    radioButtonLabel: {
        marginRight: '7%',
    },
    errorMsg: {
        color: 'red',
        marginHorizontal: '3%',
        marginTop: '1%',
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
        top: '20%',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateContainer: {
        flex: 1,
        marginRight: '4%',

    },
    timeContainer: {
        borderWidth: 1,
        borderColor: 'gray',
        borderRadius: 25,
        padding: 10,


    },
    timeText:{
        color:'#000000',
        fontSize:16,
    },




});

export default ComplaintInfo;



// const [remarks, setRemarks] = useState('');
//  <TextInput
//     label="Remarks"
//     value={remarks}
//     onChangeText={text => setRemarks(text)}
//     mode="outlined"
//     multiline={true}
//     numberOfLines={4}
//     style={styles.inputcontainer}
//     maxLength={MAX_CHAR_COUNT}
//     theme={customTheme}
// />
// <Text style={styles.charCount}>
//     {MAX_CHAR_COUNT - remarks.length} characters
// </Text>