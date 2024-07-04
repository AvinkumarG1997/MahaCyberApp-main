/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Dimensions, StyleSheet, Text, View } from 'react-native';
import { Button, DefaultTheme, RadioButton, TextInput } from 'react-native-paper';
import { Divider } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import BankNameData from '../Data/BankNameData';
import { format } from 'date-fns';
import DatePicker from 'react-native-date-picker';
import IonIcon from 'react-native-vector-icons/Ionicons';
import DateTimePicker from '@react-native-community/datetimepicker';
const { width } = Dimensions.get('window');
const FinancialMode = () => {
    const [lostmoney, setLostMoney] = useState('no');
    const [refrenceno, setRefrenceno] = useState('');
    const [bankVictim, setBankVictim] = useState('');
    const [accountnovtm, setAccountnovtm] = useState('');
    const [utrnovtm, setUtrnovtm] = useState('');
    const [amountvtm, setAmountnovtm] = useState('');





    const [open, setOpen] = useState(false);
    const [showdate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState('');
    const [times, setTimes] = useState(new Date());
    const [showTimePicker, setShowTimePicker] = useState(false);


    const [suspect, setSuspect] = useState('no');
    const [bankSuspect, setBankSuspect] = useState('');
    const [accountnoSuspect, setAccountnoSuspect] = useState('');
    const [utrnoSuspect, setUtrnoSuspect] = useState('');
    const [amountSuspect, setAmountnoSuspect] = useState('');

    const [openst, setOpenst] = useState(false);
    const [showdatest, setShowDatest] = useState(false);
    const [datest, setDatest] = useState(new Date());
    const [dobst, setDobst] = useState('');


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


    return (<View>
        <View style={styles.inputcontainer}>
            <Text style={styles.label}>Have you lost money?</Text>
            <RadioButton.Group
                onValueChange={value => setLostMoney(value)}
                value={lostmoney}
            >
                <View style={styles.radioButtonRow}>
                    <RadioButton value="yes" />
                    <Text style={styles.radioButtonLabel}>Yes</Text>
                    <RadioButton value="no" />
                    <Text style={styles.radioButtonLabel}>No</Text>
                </View>
            </RadioButton.Group>
        </View>

        {lostmoney === 'yes' && (
            <View>
                <Divider />
                <View style={styles.inputcontainer}>
                    <Text style={styles.label}>
                        Victim Account Details
                    </Text>
                    <View style={styles.inputcontainer}>
                        <SelectDropDown
                            key={bankVictim}
                            style={styles.selectdrop}
                            label={'Bank/(Wallet/PG/PA)/Merchant *'}
                            mode="outlined"
                            value={bankVictim}
                            setValue={setBankVictim}
                            list={BankNameData}
                            theme={customTheme}
                        />

                        {bankVictim === '' && bankVictim === 'Bank/ (Wallet/ PG/ PA) /Merchant *' ? (
                            <Text style={styles.errorMsg}>
                                {'Please select Bank*'}
                            </Text>
                        ) : null}
                    </View>

                    <TextInput
                        label="Account No./Wallet/Merchant/UPI Id*"
                        value={accountnovtm}
                        onChangeText={setAccountnovtm}
                        mode="outlined"
                        style={styles.inputcontainer}
                        theme={customTheme}
                    />
                    <TextInput
                        label="Transaction ID / UTR Number *"
                        value={utrnovtm}
                        onChangeText={setUtrnovtm}
                        mode="outlined"
                        style={styles.inputcontainer}
                        theme={customTheme}
                    />

                    <TextInput
                        label="Amount*"
                        value={amountvtm}
                        onChangeText={setAmountnovtm}
                        mode="outlined"
                        style={styles.inputcontainer}
                        theme={customTheme}
                        keyboardType='numeric'
                    />

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
                        </View>

                    </View>



                    <TextInput
                        label="Refrence No"
                        value={refrenceno}
                        onChangeText={setRefrenceno}
                        mode="outlined"
                        style={styles.inputcontainer}
                        theme={customTheme}
                    />
                </View>
                <Divider />
                <View>




                    <View style={styles.inputcontainer}>
                        <Text style={styles.label}>Do You have Suspect Account Details ?</Text>
                        <RadioButton.Group
                            onValueChange={value => setSuspect(value)}
                            value={suspect}
                        >
                            <View style={styles.radioButtonRow}>
                                <RadioButton value="yes" />
                                <Text style={styles.radioButtonLabel}>Yes</Text>
                                <RadioButton value="no" />
                                <Text style={styles.radioButtonLabel}>No</Text>
                            </View>
                        </RadioButton.Group>
                    </View>

                    {suspect === 'yes' && (
                        <View>
                            <Divider />
                            <View style={styles.inputcontainer}>
                                <Text style={styles.label}>
                                    Suspect Account Details
                                </Text>
                                <View style={styles.inputcontainer}>
                                    <SelectDropDown
                                        key={bankSuspect}
                                        style={styles.selectdrop}
                                        label={'Bank/(Wallet/PG/PA)/Merchant *'}
                                        mode="outlined"
                                        value={bankSuspect}
                                        setValue={setBankSuspect}
                                        list={BankNameData}
                                        theme={customTheme}
                                    />

                                    {bankSuspect === '' && bankSuspect === 'Bank/ (Wallet/ PG/ PA) /Merchant *' ? (
                                        <Text style={styles.errorMsg}>
                                            {'Please select Bank*'}
                                        </Text>
                                    ) : null}
                                </View>

                                <TextInput
                                    label="Account No./Wallet/Merchant/UPI Id*"
                                    value={accountnoSuspect}
                                    onChangeText={setAccountnoSuspect}
                                    mode="outlined"
                                    style={styles.inputcontainer}
                                    theme={customTheme}
                                />
                                <TextInput
                                    label="Transaction ID / UTR Number *"
                                    value={utrnoSuspect}
                                    onChangeText={setUtrnoSuspect}
                                    mode="outlined"
                                    style={styles.inputcontainer}
                                    theme={customTheme}
                                />

                                <TextInput
                                    label="Amount*"
                                    value={amountSuspect}
                                    onChangeText={setAmountnoSuspect}
                                    mode="outlined"
                                    style={styles.inputcontainer}
                                    theme={customTheme}
                                    keyboardType='numeric'
                                />

                                <View style={styles.rowContainer}>

                                    <View style={[styles.inputcontainer, styles.dateContainer]}>

                                        <DatePicker
                                            modal
                                            mode="date"
                                            open={openst}
                                            date={datest}
                                            maximumDate={new Date()}
                                            onConfirm={date => {
                                                setOpenst(false);
                                                setDatest(datest);
                                                setShowDatest(true);
                                            }}
                                            onCancel={() => {
                                                setOpenst(false);
                                            }}
                                        />
                                        <View>
                                            <Button
                                                style={styles.dobsty}
                                                mode="outlined"
                                                labelStyle={styles.btnlbe}
                                                onPress={() => setOpenst(true)}>
                                                {showdatest ? formattedDate : dobst ? dobst : 'Date*'}
                                            </Button>
                                            <View style={styles.iconContainerEnd}>
                                                <IonIcon name="calendar-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpenst(true)} />
                                            </View>
                                        </View>
                                    </View>

                                    {/* <View style={[styles.inputcontainer, styles.dateContainer]}>
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
                        </View> */}

                                </View>

                            </View>
                            <Divider />
                        </View>
                    )}


                </View>
            </View>


        )}



    </View>




    );
};

const styles = StyleSheet.create({
    inputcontainer: {
        marginHorizontal: '1%',
        marginVertical: '3%',
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
    selectdrop: {
        width: 100,
        flex: 1,
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
    timeText: {
        color: '#000000',
        fontSize: 16,
    },

});

export default FinancialMode;




// Do You have Suspect Account Details ?
// Suspect Account Details
// Money Transfer
// Bank/ (Wallet/PG/PA) /Merchant
// Account No./Wallet Id/Merchant Id
// Transaction Id
// Amount
// Transaction date