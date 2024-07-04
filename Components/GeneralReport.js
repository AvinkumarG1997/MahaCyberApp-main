/* eslint-disable prettier/prettier */
import { format } from 'date-fns';
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions, TouchableOpacity } from 'react-native';
import DatePicker from 'react-native-date-picker';
import { Button, Card, DefaultTheme, TextInput } from 'react-native-paper';
import IonIcon from 'react-native-vector-icons/Ionicons';
import ButtonColor from './ButtonColor';


const { width } = Dimensions.get('window');

const GeneralReport = () => {
    const [suspectedDescription, setSuspectedDescription] = useState('');
    const [delayremarks, setdelayRemarks] = useState('');
    const [complaintDescriptionErr, setComplaintDescriptionErr] = useState(false);
    const [entrynumber, setentryNumber] = useState('');
    const [entrynumberErr, setentryNumberErr] = useState(false);

    const [open, setOpen] = useState(false);
    const [showdate, setShowDate] = useState(false);
    const [date, setDate] = useState(new Date());
    const [dob, setDob] = useState('');
    const [dobtime, setDobtime] = useState('');
    const formattedDate = date ? format(date, 'dd/MM/yyyy', { timeZone: 'Asia/Kolkata' }) : '';

    const formattedTime = format(date, 'hh:mm', { timeZone: 'Asia/Kolkata' });

    const [time, setTime] = useState(new Date(Date.now()));
    const [open1, setOpen1] = useState(false);
    const [showtime, setShowTime] = useState(false);

    const [acts, setActs] = useState([{ id: 1, value: '' }]);



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

    const handleAddAct = () => {
        setActs([...acts, { id: acts.length + 1, value: '' }]);
    };

    const handleRemoveAct = (id) => {
        setActs(acts.filter((act) => act.id !== id));
    };

    const handleActChange = (text, id) => {
        const updatedActs = acts.map((act) => (act.id === id ? { ...act, value: text } : act));
        setActs(updatedActs);
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.subcontainer}>
                    <Card.Content>
                        <View>
                            <Text style={styles.lable}>{'Details of known / suspected / unknown / accused with full particulars '}</Text>
                        </View>
                        <TextInput
                            label="Description"
                            value={suspectedDescription}
                            onChangeText={text => {
                                setSuspectedDescription(text);
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
                            {MAX_CHAR_COUNT - suspectedDescription.length} characters
                        </Text>
                        <View>
                            <Text style={styles.lable}>{'Reasons for delay in reporting by the complainant / Informant'}</Text>
                        </View>
                        <TextInput
                            label="Description"
                            value={delayremarks}
                            onChangeText={text => setdelayRemarks(text)}
                            mode="outlined"
                            multiline={true}
                            numberOfLines={4}
                            style={styles.inputcontainer}
                            maxLength={MAX_CHAR_COUNT}
                            theme={customTheme}
                        />
                        <Text style={styles.charCount}>
                            {MAX_CHAR_COUNT - delayremarks.length} characters
                        </Text>
                        <View>
                            <Text style={styles.lable}>{'General Diary Reference*'}</Text>
                        </View>

                        <View style={styles.inputcontainer}>
                            <TextInput
                                mode="outlined"
                                value={entrynumber}
                                keyboardType="numeric"
                                label={'Entry Number*'}
                                style={styles.form}
                                placeholderTextColor="#000000"
                                onChangeText={text => {
                                    // Check for special characters
                                    const regex =
                                        /^[0-9]+$/;
                                    setentryNumber(text);
                                    if (regex.test(text)) {
                                        setentryNumberErr(false);
                                    } else {
                                        setentryNumberErr(true);
                                    }
                                }}
                                maxLength={6}
                                error={entrynumberErr}
                                theme={{
                                    colors: {
                                        primary: '#1CF9F9',
                                    },
                                    roundness: 25,
                                }}
                            />

                            {entrynumberErr &&
                                <Text style={styles.errorMsg}>{'Please enter correct entry Number'}</Text>
                            }
                        </View>

                        <View style={styles.rowdatetime}>
                            <View style={styles.rowcontainer}>

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

                            <View style={styles.rowcontainer}>

                                <DatePicker
                                    modal
                                    mode="time"
                                    open={open1}
                                    date={time}
                                    onConfirm={time => {
                                        setOpen1(false);
                                        setTime(time);
                                        setShowTime(true);
                                    }}
                                    onCancel={() => {
                                        setOpen1(false);
                                    }}
                                />
                                <View>
                                    <Button
                                        style={styles.dobsty}
                                        mode="outlined"
                                        labelStyle={styles.btnlbe}
                                        onPress={() => setOpen1(true)}>
                                        {showtime ? formattedTime : dobtime ? dobtime : 'Time'}
                                    </Button>
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="time-outline" size={25} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                    </View>
                                </View>
                            </View>
                        </View>

                        <View>
                            <Text style={styles.lable}>{'Complainant Under the Acts & Sections '}</Text>
                        </View>
                        <View style={styles.inputcontainer}>
                            {acts.map((act) => (<View>
                                <View key={act.id} style={styles.actContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label={'Act*'}
                                        value={act.value}
                                        onChangeText={(text) => handleActChange(text, act.id)}
                                        style={styles.actinput}
                                        theme={customTheme}
                                    />
                                    <TouchableOpacity
                                        style={styles.deleteIcon}
                                        onPress={() => handleRemoveAct(act.id)}
                                    >
                                        <IonIcon name="close-circle-outline" size={25} color="red" />
                                    </TouchableOpacity>
                                </View>

                                <View style={styles.actContainer}>
                                    <TextInput
                                        mode="outlined"
                                        label={'Section*'}
                                        value={act.value}
                                        onChangeText={(text) => handleActChange(text, act.id)}
                                        style={styles.actinput}
                                        theme={customTheme}
                                    />
                                    {/* <TouchableOpacity
                                        style={styles.deleteIcon}
                                        onPress={() => handleRemoveAct(act.id)}
                                    >
                                        <IonIcon name="close-circle-outline" size={25} color="red" />
                                    </TouchableOpacity> */}
                                </View>
                            </View>

                            ))}

                            <View style={styles.addButton}>
                                <ButtonColor onPress={handleAddAct} text="＋" />
                            </View>
                        </View>

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
        backgroundColor: '#d4fcff',
        borderRadius: 20,
        paddingBottom: '5%',
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
    rowcontainer: {
        flex: 1,
        marginTop: '5%',
        marginHorizontal: '2%',
        marginVertical: '2%',

    },
    charCount: {
        marginHorizontal: '9%',
        marginBottom: '1%',
        color: '#918F8F',
        textAlign: 'left',
    },
    lable: {
        marginTop: '2%',
        marginHorizontal: '4%',
        fontWeight: '500',
        color: '#000',
    },
    rowdatetime: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
    },
    errorMsg: {
        color: 'red',
        marginLeft: '5%',
        marginTop: '2%',
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
    iconContainerEnd: {
        position: 'absolute',
        right: '8%',
        top: '25%',
    },
    actinput: {
        flex: 1,
    },
    actContainer: {
        position: 'relative',
        marginVertical: '3%',
    },
    deleteIcon: {
        position: 'absolute',
        top: -12,
        right: -10,
        color: 'red',
    },
    addButton: {
        width: '26%',
        marginHorizontal: '80%',
        borderRadius: 25,
    },
});

export default GeneralReport;

