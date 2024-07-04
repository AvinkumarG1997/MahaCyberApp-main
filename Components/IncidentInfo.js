/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
import { Button, Card, DefaultTheme, TextInput } from 'react-native-paper';
import { SelectDropDown } from './SelectDropDown';
import typeComplaintData from '../Data/typeComplaintData';
import subtypeComplaintData from '../Data/subtypeComplaintData';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';
import IonIcon from 'react-native-vector-icons/Ionicons';

const { width } = Dimensions.get('window');

const IncidentInfo = () => {
    const [complaintDescription, setComplaintDescription] = useState('');
    const [remarks, setRemarks] = useState('');
    const [complaintDescriptionErr, setComplaintDescriptionErr] = useState(false);
    const [typeComplaint, setTypeComplaint] = useState('');
    const [subtypeComplaint, setsubTypeComplaint] = useState('');

    const MAX_CHAR_COUNT = 5000;

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
        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.subcontainer}>
                    <Card.Content>
                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={typeComplaint}
                                style={styles.selectdrop}
                                label={'Category of Incident*'}
                                mode="outlined"
                                value={typeComplaint}
                                setValue={setTypeComplaint}
                                list={typeComplaintData}
                                theme={customTheme}
                            />

                            {typeComplaint === '' && typeComplaint === 'Category of Incident*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Category of Incident*'}
                                </Text>
                            ) : null}
                        </View>
                        <View style={styles.inputcontainer}>
                            <SelectDropDown
                                key={subtypeComplaint}
                                style={styles.selectdrop}
                                label={'Sub Category of Incident*'}
                                mode="outlined"
                                value={subtypeComplaint}
                                setValue={setsubTypeComplaint}
                                list={subtypeComplaintData}
                                theme={customTheme}
                            />

                            {subtypeComplaint === '' && subtypeComplaint === 'Sub Category of Incident*' ? (
                                <Text style={styles.errorMsg}>
                                    {'Please select Sub Category of Incident*'}
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
                                        {showdate ? formattedDate : dob ? dob : ' To Date*'}
                                    </Button>
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="calendar-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                    </View>
                                </View>
                            </View>

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
                                        {showdate ? formattedDate : dob ? dob : 'Form Date*'}
                                    </Button>
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="calendar-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                    </View>
                                </View>
                            </View>

                        </View>

                        <View style={styles.rowContainer}>
                            <View style={[styles.inputcontainer, styles.dateContainer]}>

                                <DatePicker
                                    modal
                                    mode="time"
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
                                        {showdate ? formattedDate : dob ? dob : 'To Time*'}
                                    </Button>
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="time-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                    </View>
                                </View>
                            </View>

                            <View style={[styles.inputcontainer, styles.dateContainer]}>

                                <DatePicker
                                    modal
                                    mode="time"
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
                                        {showdate ? formattedDate : dob ? dob : 'From Time*'}
                                    </Button>
                                    <View style={styles.iconContainerEnd}>
                                        <IonIcon name="time-outline" size={24} color="#a9a9a9" style={styles.iconContainerEnd} onPress={() => setOpen(true)} />
                                    </View>
                                </View>
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
        top: '25%',
    },
    rowContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    dateContainer: {
        flex: 1,
        marginRight: '4%',
    },
});

export default IncidentInfo;



// /* eslint-disable prettier/prettier */
// import React, { useState } from 'react';
// import { SafeAreaView, StyleSheet, View, Text, Dimensions } from 'react-native';
// import { Button, Card, DefaultTheme, TextInput } from 'react-native-paper';
// import { SelectDropDown } from './SelectDropDown';
// import typeComplaintData from '../Data/typeComplaintData';
// import subtypeComplaintData from '../Data/subtypeComplaintData';
// import DatePicker from 'react-native-date-picker';
// import { format } from 'date-fns';
// import IonIcon from 'react-native-vector-icons/Ionicons';

// const { width } = Dimensions.get('window');

// const IncidentInfo = () => {
//     const [complaintDescription, setComplaintDescription] = useState('');
//     const [remarks, setRemarks] = useState('');
//     const [complaintDescriptionErr, setComplaintDescriptionErr] = useState(false);
//     const [typeComplaint, setTypeComplaint] = useState('');
//     const [subtypeComplaint, setsubTypeComplaint] = useState('');

//     const MAX_CHAR_COUNT = 8000;

//     const [open, setOpen] = useState(false);
//     const [showdate, setShowDate] = useState(false);
//     const [date, setDate] = useState(new Date());
//     const [dob, setDob] = useState('');

//     const formattedDate = date
//         ? format(date, 'dd/MM/yyyy', { timeZone: 'Asia/Kolkata' })
//         : '';

//     const customTheme = {
//         ...DefaultTheme,
//         colors: {
//             ...DefaultTheme.colors,
//             primary: '#1CF9F9',
//             background: '#FFFFFF',
//             text: '#000000',
//             placeholder: '#454545',
//         },
//         roundness: 25,
//     };

//     return (
//         <SafeAreaView style={styles.container}>
//             <View style={styles.card}>
//                 <View style={styles.subcontainer}>
//                     <Card.Content>
//                         {/* Category and Subcategory selection */}
//                         <View style={styles.inputcontainer}>
//                             <SelectDropDown
//                                 key={typeComplaint}
//                                 style={styles.selectdrop}
//                                 label={'Category of Incident*'}
//                                 mode="outlined"
//                                 value={typeComplaint}
//                                 setValue={setTypeComplaint}
//                                 list={typeComplaintData}
//                                 theme={customTheme}
//                             />
//                             {typeComplaint === '' && typeComplaint === 'Category of Incident*' ? (
//                                 <Text style={styles.errorMsg}>
//                                     {'Please select Category of Incident*'}
//                                 </Text>
//                             ) : null}
//                         </View>
//                         <View style={styles.inputcontainer}>
//                             <SelectDropDown
//                                 key={subtypeComplaint}
//                                 style={styles.selectdrop}
//                                 label={'Sub Category of Incident*'}
//                                 mode="outlined"
//                                 value={subtypeComplaint}
//                                 setValue={setsubTypeComplaint}
//                                 list={subtypeComplaintData}
//                                 theme={customTheme}
//                             />
//                             {subtypeComplaint === '' && subtypeComplaint === 'Sub Category of Incident*' ? (
//                                 <Text style={styles.errorMsg}>
//                                     {'Please select Sub Category of Incident*'}
//                                 </Text>
//                             ) : null}
//                         </View>

//                         {/* Description and Remarks */}
//                         <TextInput
//                             label="Description"
//                             value={complaintDescription}
//                             onChangeText={text => {
//                                 setComplaintDescription(text);
//                                 if (text.length > MAX_CHAR_COUNT) {
//                                     setComplaintDescriptionErr(true);
//                                 } else {
//                                     setComplaintDescriptionErr(false);
//                                 }
//                             }}
//                             mode="outlined"
//                             multiline={true}
//                             numberOfLines={4}
//                             style={styles.inputcontainer}
//                             error={complaintDescriptionErr}
//                             maxLength={MAX_CHAR_COUNT}
//                             theme={customTheme}
//                         />
//                         <Text style={styles.charCount}>
//                             {MAX_CHAR_COUNT - complaintDescription.length} characters
//                         </Text>
//                         <TextInput
//                             label="Remarks"
//                             value={remarks}
//                             onChangeText={text => setRemarks(text)}
//                             mode="outlined"
//                             multiline={true}
//                             numberOfLines={4}
//                             style={styles.inputcontainer}
//                             maxLength={MAX_CHAR_COUNT}
//                             theme={customTheme}
//                         />
//                         <Text style={styles.charCount}>
//                             {MAX_CHAR_COUNT - remarks.length} characters
//                         </Text>

//                         {/* Date Selection */}
//                         <View style={styles.rowContainer}>
//                             <View style={[styles.inputcontainer, styles.dateContainer]}>
//                                 <DatePicker
//                                     modal
//                                     mode="date"
//                                     open={open}
//                                     date={date}
//                                     maximumDate={new Date()}
//                                     onConfirm={date => {
//                                         setOpen(false);
//                                         setDate(date);
//                                         setShowDate(true);
//                                     }}
//                                     onCancel={() => {
//                                         setOpen(false);
//                                     }}
//                                 />
//                                 <Button
//                                     style={styles.dobsty}
//                                     mode="outlined"
//                                     labelStyle={styles.btnlbe}
//                                     onPress={() => setOpen(true)}>
//                                     {showdate ? formattedDate : dob ? dob : 'From Date*'}
//                                 </Button>
//                                 <View style={styles.iconContainerEnd}>
//                                     <IonIcon name="calendar-outline" size={24} color="#a9a9a9" onPress={() => setOpen(true)} />
//                                 </View>
//                             </View>

//                             <View style={[styles.inputcontainer, styles.dateContainer]}>
//                                 <DatePicker
//                                     modal
//                                     mode="date"
//                                     open={open}
//                                     date={date}
//                                     maximumDate={new Date()}
//                                     onConfirm={date => {
//                                         setOpen(false);
//                                         setDate(date);
//                                         setShowDate(true);
//                                     }}
//                                     onCancel={() => {
//                                         setOpen(false);
//                                     }}
//                                 />
//                                 <Button
//                                     style={styles.dobsty}
//                                     mode="outlined"
//                                     labelStyle={styles.btnlbe}
//                                     onPress={() => setOpen(true)}>
//                                     {showdate ? formattedDate : dob ? dob : 'To Date*'}
//                                 </Button>
//                                 <View style={styles.iconContainerEnd}>
//                                     <IonIcon name="calendar-outline" size={24} color="#a9a9a9" onPress={() => setOpen(true)} />
//                                 </View>
//                             </View>
//                         </View>

//                         {/* Time Selection - Example placeholders, replace with actual time pickers */}
//                         <View style={styles.rowContainer}>
//                             <View style={[styles.inputcontainer, styles.timeContainer]}>
//                                 {/* Replace with Time Picker component */}
//                                 <TextInput
//                                     label="From Time*"
//                                     value={dob}  // Replace with actual time state
//                                     mode="outlined"
//                                     style={styles.dobsty}
//                                     theme={customTheme}
//                                 />
//                                 <View style={styles.iconContainerEnd}>
//                                     <IonIcon name="time-outline" size={24} color="#a9a9a9" />
//                                 </View>
//                             </View>

//                             <View style={[styles.inputcontainer, styles.timeContainer]}>
//                                 {/* Replace with Time Picker component */}
//                                 <TextInput
//                                     label="To Time*"
//                                     value={dob}  // Replace with actual time state
//                                     mode="outlined"
//                                     style={styles.dobsty}
//                                     theme={customTheme}
//                                 />
//                                 <View style={styles.iconContainerEnd}>
//                                     <IonIcon name="time-outline" size={24} color="#a9a9a9" />
//                                 </View>
//                             </View>
//                         </View>
//                     </Card.Content>
//                 </View>
//             </View>
//         </SafeAreaView>
//     );
// };

// const styles = StyleSheet.create({
//     container: {
//         flex: 1,
//         backgroundColor: '#FFFFFF',
//     },
//     subcontainer: {
//         marginTop: '3%',
//     },
//     card: {
//         margin: '2%',
//         backgroundColor: '#FEFEFE',
//         borderRadius: 20,
//         paddingBottom: '5%',
//         borderWidth: 1,
//     },
//     cardInner: {
//         marginHorizontal: '5%',
//         marginVertical: '2%',
//         backgroundColor: '#fff',
//     },
//     inputcontainer: {
//         marginHorizontal: '3%',
//         marginVertical: '3%',
//     },
//     charCount: {
//         marginHorizontal: '9%',
//         marginBottom: '1%',
//         color: '#918F8F',
//         textAlign: 'left',
//     },
//     dobsty: {
//         borderRadius: 70,
//         padding: '1%',
//         backgroundColor: '#fff',
//     },
//     selectdrop: {
//         width: 100,
//         flex: 1,
//     },
//     btnlbe:
//     {
//         color: '#454545',
//         flex: 1,
//         right: width * 0.02,
//         backgroundColor: '#fff',
//     },
//     iconContainerStart: {
//         position: 'absolute',
//         left: '4%',
//         top: '30%',
//     },
//     iconContainerEnd: {
//         position: 'absolute',
//         right: '8%',
//         top: '30%',
//     },
//     rowContainer: {
//         flexDirection: 'row',
//         justifyContent: 'space-between',
//     },
//     dateContainer: {
//         flex: 1,
//         marginRight: 5,
//     },
//     timeContainer: {
//         flex: 1,
//     },
// });

// export default IncidentInfo;
