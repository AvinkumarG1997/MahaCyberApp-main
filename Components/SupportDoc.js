/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { CreantFilePicker } from './CreantFilePicker';
import { DefaultTheme, TextInput, } from 'react-native-paper';
import DocumentPicker, { types } from 'react-native-document-picker';
import ButtonColor from './ButtonColor';
import { SelectDropDown } from './SelectDropDown';
import natinaldocumentidData from '../Data/natinaldocumentidData';
const SupportDoc = () => {


    const [file, setFile] = useState([]);
    const [fileError, setFileError] = useState(false);

    const [filevalue, setFileValue] = useState(null);
    const [fileuri, setFileUri] = useState(null);
    const [filetype, setFileType] = useState(null);
    const [documentid, setDocumentId] = useState(null);
    const [documentidno, setDocumentIdNo] = useState('');
    const [errdocumentidno, setErrDocumentIdNo] = useState(false);

    const [natinaldocumentid, setNlDocumentId] = useState(null);
    const [errMsg, setErrMsg] = useState('');

    const getfileReaderAudio = () => {

        return (
            <>
                <CreantFilePicker
                    compress={true}
                    sizeLimit={10}
                    reset={file.length === 0}
                    errorMessage={'strings'.Filesizeisgreaterthan2MB}
                    onFileSelected={(fileInfo, isError) => {
                        if (fileInfo) {
                            setFile(prevState => [...prevState, fileInfo]);
                        }

                        setFileError(isError ? 'strings'.Filesizeisgreaterthan4MB : '');
                    }}
                    onFileRemoved={removeFile}
                />

            </>
        );

    };

    function removeFile(index) {
        setFileError(false);
        setFile(prevFile => {
            const updatedFile = [...prevFile];
            updatedFile.splice(index, 1);
            return updatedFile;
        });

    }

    const pickDocument = async () => {
        try {
            setDocumentId(null);
            const res = await DocumentPicker.pick({
                type: [types.pdf],
            });

            // console.log('res : ' + JSON.stringify(res));

            res.forEach(element => {
                setFileValue(element.name);
                setFileUri(element.uri);
                setFileType(element.type);
            });
        } catch (err) {
            if (DocumentPicker.isCancel(err)) {
                ('pdf not selected');
            } else {
                throw err;
            }
        }
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
    const validateDocumentIdNo = (text) => {
        setDocumentIdNo(text);
        const aadharRegex = /^\d{12}$/;
        const panRegex = /^[A-Z]{5}\d{4}[A-Z]{1}$/;
        const dlRegex = /^[A-Z]{2}\d{2}[A-Z]{1} \d{11}$/;
        const voterRegex = /^[A-Z]{3}\d{7}$/;
        const passportregex = /^[A-Z]{1}\d{7}$/;
        if (natinaldocumentid === 1) {
            if (!aadharRegex.test(text)) {
                setErrDocumentIdNo(true);
                setErrMsg('Aadhar number must be 12 digits.');
            } else {
                setErrDocumentIdNo(false);
                setErrMsg('');
            }
        } else if (natinaldocumentid === 2) {
            if (!panRegex.test(text.toUpperCase())) {
                setErrDocumentIdNo(true);
                setErrMsg('PAN number must contain 5 letters, 4 digits, and 1 letter.');
            } else {
                setErrDocumentIdNo(false);
                setErrMsg('');
            }
        } else if (natinaldocumentid === 3) {
            if (!dlRegex.test(text.toUpperCase())) {
                setErrDocumentIdNo(true);
                setErrMsg('DL number must contain 2 letters, 2 digits,1 letters and 11 digits.');
            } else {
                setErrDocumentIdNo(false);
                setErrMsg('');
            }
        } else if (natinaldocumentid === 4) {
            if (!voterRegex.test(text.toUpperCase())) {
                setErrDocumentIdNo(true);
                setErrMsg('Voter ID number must contain 3 letters, and 7 digits.');
            } else {
                setErrDocumentIdNo(false);
                setErrMsg('');
            }
        }else if (natinaldocumentid === 5) {
            if (!passportregex.test(text.toUpperCase())) {
                setErrDocumentIdNo(true);
                setErrMsg('Passport number must contain 1 letters, and 7 digits.');
            } else {
                setErrDocumentIdNo(false);
                setErrMsg('');
            }
        } else {
            const regex = /^[a-zA-Z0-9 ]*$/;
            if (regex.test(text)) {
                setErrDocumentIdNo(false);
                setErrMsg('');
            } else {
                setErrDocumentIdNo(true);
                setErrMsg('Special characters are not allowed.');
            }
        }
    };




    return (

        <SafeAreaView style={styles.container}>
            <View style={styles.card}>
                <View style={styles.subcontainer}>
                    <View style={styles.formdoc}>
                        <Text
                            style={{ color: 'gray', marginVertical: '4%', }}
                            onPress={pickDocument}>
                            {filevalue ? filevalue : 'Choose File'}
                        </Text>
                        <TouchableOpacity style={styles.uploadButtonContainer}>
                            <ButtonColor onPress={pickDocument} text="Upload" />
                        </TouchableOpacity>
                    </View>

                </View>
                <View>
                    <>{getfileReaderAudio()}</>
                </View>

                <View style={styles.inputcontainer}>
                    <SelectDropDown
                        key={natinaldocumentid}
                        style={styles.selectdrop}
                        label={'Type of National Id*'}
                        mode="outlined"
                        value={natinaldocumentid}
                        setValue={setNlDocumentId}
                        list={natinaldocumentidData}
                        theme={customTheme}
                    />

                    {natinaldocumentid === '' && natinaldocumentid === 'Type of National Id*' ? (
                        <Text style={styles.errorMsg}>
                            {'Please select National id type'}
                        </Text>
                    ) : null}

                </View>

                <View style={styles.inputcontainer}>
                    <TextInput
                        mode="outlined"
                        keyboardType="default"
                        label={'National Id Number'}
                        style={styles.form}
                        placeholderTextColor="#000000"
                        value={documentidno}
                        onChangeText={validateDocumentIdNo}
                        // onChangeText={text => {
                        //     setDocumentIdNo(text);
                        //     const regex = /^[a-zA-Z0-9 ]*$/;
                        //     if (natinaldocumentid === 1) {
                        //         setErrDocumentIdNo(false);
                        //         console.log('id=======dfdf========', natinaldocumentid);
                        //     }
                        //     else if (natinaldocumentid === 2) {
                        //         setErrDocumentIdNo(false);
                        //         console.log('id=======bnbn========', natinaldocumentid);
                        //     }else if (natinaldocumentid === 3) {
                        //         setErrDocumentIdNo(false);
                        //         console.log('id=======bnbn========', natinaldocumentid);
                        //     }else if (natinaldocumentid === 4) {
                        //         setErrDocumentIdNo(false);
                        //         console.log('id=======bnbn========', natinaldocumentid);
                        //     }else if (natinaldocumentid === 5) {
                        //         setErrDocumentIdNo(false);
                        //         console.log('id=======bnbn========', natinaldocumentid);
                        //     }
                        //     else if (regex.test(text)) {
                        //         setErrDocumentIdNo(false);
                        //     }
                        //     else {
                        //         setErrDocumentIdNo(true);
                        //     }
                        // }}
                        error={errdocumentidno}
                        theme={customTheme}
                        disabled={!natinaldocumentid}
                    />
                    {errdocumentidno && <Text style={styles.errorMsg}>{errMsg}</Text>}
                </View>
                <View>
                    <Text style={{ marginTop: '2%', marginHorizontal: '6%', fontWeight: 'bold', color: '#000' }}>{'Soft copy of National Id '}</Text>
                </View>
                <View style={styles.subcontainer}>
                    <View style={styles.formdoc}>
                        <Text
                            style={{ color: 'gray', marginVertical: '4%', }}
                            onPress={pickDocument}>
                            {filevalue ? filevalue : 'Choose File'}
                        </Text>
                        <TouchableOpacity style={styles.uploadButtonContainer}>
                            <ButtonColor onPress={pickDocument} text="Upload" />
                        </TouchableOpacity>
                    </View>

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
        borderWidth:1,
    },
    cardInner: {
        marginHorizontal: '5%',
        marginVertical: '2%',
        backgroundColor: '#fff',
    },
    inputcontainer: {
        marginHorizontal: '6%',
        marginVertical: '3%',
    },
    charCount: {
        marginHorizontal: '9%',
        marginBottom: '1%',
        color: '#918F8F',
        textAlign: 'left',
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
    selectdrop: {
        width: 100,
        flex: 1,
    },
    formdoc: {
        flexDirection: 'row',
        width: '90%',
        height: 48,
        marginHorizontal: '10%',
        marginLeft: '6%',
        backgroundColor: '#fff',
        borderRadius: 30,
        borderColor: 'gray',
        borderWidth: 1,
        paddingHorizontal: '4%',


    },
    uploadButtonContainer: {
        marginLeft: '28%',
        borderRadius: 50,
        width: '62%',
        marginBottom: '3%',
    },
});

export default SupportDoc;



