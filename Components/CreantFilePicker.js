/* eslint-disable prettier/prettier */
import React, {
    useContext,
    useEffect,
    useState,
} from 'react';

import {
    View,
    TouchableOpacity,
    StyleSheet,
    Text,
    Platform,
    Linking,
    Image,

} from 'react-native';

import { Card, IconButton, Button, Modal } from 'react-native-paper';
import Icon from 'react-native-vector-icons/AntDesign';
import Iconmc from 'react-native-vector-icons/MaterialCommunityIcons';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import RNFS from 'react-native-fs';
import { pickMultiple } from 'react-native-document-picker';

import closeicon from '../Assets/icons/closeicon.png';

import {
    Image as ImageCompressor,
    Video as VideoCompressor,
    Audio as AudioCompressor,

} from 'react-native-compressor';
import AudioRecorder from './AudioRecorder';

// *****************************************************************************************************************************//
export const compressFile = async (uri, type = 'video', options = {}) => {

    let result = null;

    try {

        switch (type) {

            case 'video':

                result = await VideoCompressor.compress(uri,
                    options,
                    (progress) => {
                        console.log('Video Compression Progress: ', progress);
                    }
                )

                break;

            case 'image':

                // result = await ImageCompressor.compress(uri);

                result = await ImageCompressor.compress(uri, options,
                    (progress) => {
                        console.warn('Image Compression Progress: ', progress);
                    }
                )

                break;

            case 'audio':

                result = await AudioCompressor.compress(uri,
                    options,
                    (progress) => {
                        console.log('Audio Compression Progress: ', progress);
                    }
                )

                break;
        }


        //console.warn({result})

        if (!result) {
            return null;
        }

        let fileInfo = await RNFS.stat(result);

        const filename = fileInfo.path.substring(fileInfo.path.lastIndexOf('/') + 1, fileInfo.path.length);
        const fileExtension = filename.split('.').pop();
        const mime = fileExtension ? type + '/' + fileExtension : 'application/octet-stream';

        fileInfo['uri'] = fileInfo.path;
        fileInfo['type'] = mime;
        fileInfo['name'] = filename;

        return fileInfo;

    }
    catch (e) {
        console.warn(e);
        return null;
    }

}

// *****************************************************************************************************************************//



export const CreantFilePicker = (props) => {

    const {
        onFileSelected,
        onFileRemoved,
        sizeLimit = 10,
        reset = false,
        compress = true,
        errorMessage
    } = props;

    const strings = useContext('LocalizationContext');

    const [files, setFiles] = useState([]);
    const [fileError1, setFileError1] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    const [modalVisible, setModalVisibleimg] = useState(false);
    const [selectedImage, setSelectedImage] = useState('');

    useEffect(() => {

        if (reset) {

            // console.warn("reset");
            setFiles([]);
        }

    }, [reset]);


    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const processFile = async (file, type) => {

        const fileSize = file.size;

        if (!compress) {

            if (fileSize <= sizeLimit * 1024 * 1024) {


                setFiles(prevState => [...prevState, file]);
                onFileSelected(file, false);
            }
            else {
                setFileError1(true);
                onFileSelected(null, true);
            }

            return;
        }

        const limit = 1; // isVideo ? 10 : 5

        if (fileSize <= limit * 1024 * 1024) {
            console.warn({ fileSize });
            setFiles(prevState => [...prevState, file]);
            onFileSelected(file, false);

        }
        else {

            setLoading(true);
            const compressedFile = await compressFile(file.uri, type);
            setLoading(false);

            console.warn({ compressedFile });

            console.warn(file.size, compressedFile.size);

            if (compressedFile.size <= sizeLimit * 1024 * 1024) {
                setFiles(prevState => [...prevState, compressedFile]);
                onFileSelected(compressedFile, false);
            }
            else {
                setFileError1(true);
                onFileSelected(null, true);
            }

        }

    }


    const handleCameraError = (e) => {

        const errors = [
            'E_NO_CAMERA_PERMISSION',
            'E_CAMERA_IS_NOT_AVAILABLE',
            'E_CANNOT_LAUNCH_CAMERA',
            'E_NO_LIBRARY_PERMISSION',
            'E_FAILED_TO_SHOW_PICKER',
            'E_NO_IMAGE_DATA_FOUND',
        ];

        if (e['code'] != null && errors.includes(e.code)) {

            // showToast(e.message);

            setTimeout(() => {
                Linking.openSettings();
            }, 1000);
        }
    };

    const onPressCameraOption = async () => {

        // if(actionSheetRef.current != null)
        // actionSheetRef.current?.hide();

        //  toggleModal()

        const options = {
            mediaType: 'photo',
            includeBase64: false,
            quality: 0.7,
            //  maxWidth: 265,
            //  maxHeight: 240,
            //  quality:0.5,
        };


        setTimeout(async () => {

            try {
                const result = await launchCamera(options);
                if (result != null && result.assets?.length > 0) {
                    const f = result.assets[0];
                    // console.warn("+++++++++++++++kjhjhjhjhj>>>",f);

                    const fileInfo = {
                        name: f.fileName,
                        type: f.type,
                        size: f.fileSize,
                        uri: f.uri,
                    };
                    processFile(fileInfo, 'image');
                }

            }
            catch (e) {
                handleCameraError(e);
            }

        }, 1200);
    };

    const onPressVideoOption = () => {


        // if(actionSheetRef.current != null)
        // actionSheetRef.current?.hide();

        const options = {
            formatAsMp4: true,
            mediaType: 'video',
            videoQuality: Platform.OS === 'ios' ? 'medium' : 'low',
        };

        setTimeout(async () => {

            try {
                const result = await launchCamera(options);
                if (result != null && result.assets?.length > 0) {
                    const f = result.assets[0];

                    const fileInfo = {
                        name: f.fileName,
                        type: f.type,
                        size: f.fileSize,
                        uri: f.uri
                    };
                    processFile(fileInfo, 'video');
                }
            }
            catch (e) {
                handleCameraError(e);
                onFileSelected(null, true);
            }

        }, 1200);
    };



    const onPressGalleryOption = () => {

        // if(actionSheetRef.current != null)
        // actionSheetRef.current?.hide();

        //  toggleModal()

        const options = {
            selectionLimit: 1,
            mediaType: 'mixed',
            quality: 0.6,
            includeBase64: false,
            // maxWidth: 265,
            // maxHeight: 240,
        };


        setTimeout(async () => {

            try {
                const result = await launchImageLibrary(options);

                if (result != null && result.assets?.length > 0) {
                    const f = result.assets[0];

                    //  console.warn(f)

                    const isVideo = f.type.includes('mp4');

                    const fileInfo = {
                        name: f.fileName,
                        type: f.type,
                        size: f.fileSize,
                        uri: f.uri
                    };

                    processFile(fileInfo, (isVideo ? 'video' : 'image'));

                }

            }
            catch (e) {
                handleCameraError(e);
            }

        }, 800);
    };

    const onAudioAction = (action, fileInfo) => {

        switch (action) {
            case 'success':

                if (fileInfo != null) {

                    try {

                        processFile(fileInfo, 'audio');

                    }
                    catch (e) {
                        console.log(e);
                        onFileSelected(null, true);
                    }

                }

                break;

            case 'dismiss':
                break;
        }

        toggleModal();
    };

    const onPressAudioOption = () => {

        toggleModal();
    };

    function removeFile1(index) {

        setFileError1(false);

        setModalVisibleimg(false);
        onFileRemoved(index);


        setFiles(prevFile1 => {
            const updatedFile1 = [...prevFile1];
            updatedFile1.splice(index, 1);
            return updatedFile1;
        })
    }

    const showPhotosModel = (uriSelect) => {
        setSelectedImage(uriSelect);
        setModalVisibleimg(true);
    };

    const hideModal = () => {
        setSelectedImage('');
        setModalVisibleimg(false);
    };

    const selectimagesize = () => {
        return (<Modal animationType="slide" transparent={true} visible={modalVisible} onRequestClose={hideModal} style={{ backgroundColor: 'red' }}>
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: 'rgba(0, 0, 0, 0.5)', margin: 8 }}>

                <Card style={{ marginHorizontal: 50, elevation: 8 }}>
                    <View style={{ backgroundColor: 'white', borderRadius: 10, }}>
                        <TouchableOpacity onPress={hideModal} style={{ position: 'absolute', top: 10, right: 10, zIndex: 999 }}>
                            {/* <Text style={{ color: 'red' }}>Close</Text> */}
                            <Icon
                                name={'closecircle'}
                                size={30}
                                color="red" />
                            {/* <Image source={close} style={{ width: 30, height: 30, marginBottom: 10, borderRadius: 30, }} /> */}
                        </TouchableOpacity>
                        <Image source={{ uri: selectedImage }} style={{ width: 400, height: 400, borderRadius: 10 }} />
                        {/* <TouchableOpacity style={{ marginTop: 10,backgroundColor:'red' }} onPress={hideModal}>
                    <Text style={{ color: 'red',marginTop:10 }}>Close</Text>
                </TouchableOpacity> */}
                    </View>
                </Card>
            </View>
        </Modal>);
    }




    return (

        <View style={{ marginVertical: '3%' }}>
            <Card style={{ zIndex: 100, }}>
                {selectedImage && (
                    selectimagesize()
                )}

            </Card>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: '3%',

                }}>


                {files.length > 0 &&
                    files.map((item, index) => {

                        return (
                            <View
                                key={index}
                                style={{
                                    flexDirection: 'row',
                                    justifyContent: 'space-between',
                                    width: '80%',
                                    alignItems: 'center',
                                    borderWidth: 0.5,
                                    borderRadius: 10,
                                    paddingHorizontal: '3%',
                                    marginBottom: '3%',
                                    backgroundColor: 'white',
                                }}>

                                {/* <TouchableOpacity onPress={() => showPhotosModel(item.uri)}><Text style={{ color: 'black', width: '80%', backgroundColor: 'white' }}>{item.name}</Text></TouchableOpacity> */}

                                <Text style={{ color: 'black', width: '80%', backgroundColor: 'white' }}>{item.name}</Text>
                                <View>
                                    <TouchableOpacity onPress={() => showPhotosModel(item.uri)}>

                                        <Image source={{ uri: item.uri }} style={{ width: 40, height: 40, borderRadius: 10 }} />
                                    </TouchableOpacity>
                                </View>




                                <TouchableOpacity
                                    style={{
                                        borderRadius: 15,
                                        borderTopRightRadius: 30,



                                    }}>

                                    <TouchableOpacity onPress={() => removeFile1(index)}>
                                        <Icon
                                            name={'closecircle'}
                                            size={25}
                                            color="red" />
                                        {/* <Image source={closeicon} style={{ width: 50, height: 52, borderRadius: 30 }} /> */}
                                    </TouchableOpacity>
                                </TouchableOpacity>
                            </View>
                        );
                    })}




                {/* //+++++++++++++++++++++++++++++++++ CARD OF MEDIA+++++++++++++++++++++++++++++++++++++++++++++++++++++++// */}
                <Card style={{ borderRadius: 20, width: '90%', backgroundColor: '#fff' }}>

                    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', }}>

                        {/* <Pressable style={{ padding: 10, justifyContent: 'center' }} onPress={onPressCameraOption} >
                            <Icon
                                name={"photo-camera"}
                                size={30}
                                color="black" />
                        </Pressable>

                        <Pressable style={{ padding: 10, justifyContent: 'center' }} onPress={onPressVideoOption} >
                            <IconC
                                name={"video-plus"}
                                size={36}
                                color="black" />
                        </Pressable>

                        <Pressable style={{ padding: 10, justifyContent: 'center' }} onPress={onPressGalleryOption} >
                            <Icon
                                name={"photo-library"}
                                size={30}
                                color="black" />
                        </Pressable> */}


                        {/* <Pressable style={{ padding: 5, justifyContent: 'center' }} onPress={onPressAudioOption} >
                            <Icon
                                name={""}
                                size={30}
                                color="black" />
                            

                        </Pressable> */}


                        <View style={styles.mediapad}>
                            <TouchableOpacity onPress={onPressCameraOption} style={styles.iconContainer} >
                                <Iconmc
                                    name={"camera-plus-outline"}
                                    size={30}
                                    color="gray" />

                                <Text style={{ color: 'gray', textAlign: 'center' }}>Camera</Text>


                                {/* <Image source={cameraicon} style={{ width: 30, height: 40 }} /> */}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mediapad}>
                            <TouchableOpacity onPress={onPressGalleryOption} style={styles.iconContainer} >
                                <Iconmc
                                    name={"image-plus"}
                                    size={30}
                                    color="gray" />
                                <Text style={{ color: 'gray', textAlign: 'center' }}>Picture</Text>
                                {/* <Image source={galleryicon} style={{ width: 30, height: 40 }} /> */}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mediapad}>
                            <TouchableOpacity onPress={onPressAudioOption} style={styles.iconContainer} >
                                <Iconmc
                                    name={"microphone-plus"}
                                    size={30}
                                    color="gray" />
                                <Text style={{ color: 'gray', textAlign: 'center' }}>Audio</Text>

                                {/* <Image source={mics} style={{ width: 30, height: 40 }} /> */}
                            </TouchableOpacity>
                        </View>
                        <View style={styles.mediapad}>
                            <TouchableOpacity onPress={onPressVideoOption} style={styles.iconContainer} >
                                <Iconmc
                                    name={"video-plus-outline"}
                                    size={30}
                                    color="gray" />
                                <Text style={{ color: 'gray', textAlign: 'center' }}>Video</Text>
                                {/* <Image source={videoicon} style={{ width: 30, height: 40 }} /> */}
                            </TouchableOpacity>
                        </View>



                        {/* <View style={{ justifyContent: 'space-evenly', flexDirection: 'row', }}> */}


                    </View>

                </Card>




                {fileError1 && (
                    <View
                        style={{ marginHorizontal: '5%', marginVertical: '2%' }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            {errorMessage || strings.Filesizeisgreaterthan5MB}
                        </Text>
                    </View>
                )}
            </View>

            <View>
                {isModalVisible &&
                    <AudioRecorder isVisible={isModalVisible} onAction={onAudioAction} />}
            </View>


            {/* {loading &&
         <ScreenLoader text={'Processing..'} loading={loading}/>
         } */}
        </View>
    )
}

// *****************************************************************************************************************************//

export const CreantGalleryPicker = (props) => {

    const {
        onFileSelected,
        onFileRemoved,
        reset = false,
        sizeLimit = 4,
        compress = false,
        errorMessage
    } = props;

    const strings = useContext('LocalizationContext');

    const [files, setFiles] = useState([]);
    const [fileError1, setFileError1] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (reset) {

            console.warn("reset")
            setFiles([])
        }

    }, [reset])




    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    };

    const processFile = async (file, type) => {

        const fileSize = file.size


        if (!compress) {

            console.warn({ fileSize })

            if (fileSize <= sizeLimit * 1024 * 1024) {
                setFiles(prevState => [...prevState, file]);
                onFileSelected(file, false);
            }
            else {
                setFileError1(true);
                onFileSelected(null, true);
            }
            return;
        }

        const limit = 1 // isVideo ? 10 : 5

        if (fileSize <= limit * 1024 * 1024) {

            setFiles(prevState => [...prevState, file]);
            onFileSelected(file, false)

        }
        else {

            setLoading(true);
            const compressedFile = await compressFile(file.uri, type);
            setLoading(false);

            if (compressedFile == null) {
                setFileError1(true);
                onFileSelected(null, true);
                return;
            }

            console.warn(file.size, compressedFile.size)

            if (compressedFile.size <= sizeLimit * 1024 * 1024) {
                setFiles(prevState => [...prevState, compressedFile]);
                onFileSelected(compressedFile, false);
            }
            else {
                setFileError1(true);
                onFileSelected(null, true);
            }

        }

    }


    const handleCameraError = (e) => {

        const errors = [
            'E_NO_CAMERA_PERMISSION',
            'E_CAMERA_IS_NOT_AVAILABLE',
            'E_CANNOT_LAUNCH_CAMERA',
            'E_NO_LIBRARY_PERMISSION',
            'E_FAILED_TO_SHOW_PICKER',
            'E_NO_IMAGE_DATA_FOUND'
        ]

        if (e['code'] != null && errors.includes(e.code)) {

            // showToast(e.message);

            setTimeout(() => {
                Linking.openSettings();
            }, 1000);
        }
    }



    const onPressGalleryOption = async () => {

        // if(actionSheetRef.current != null)
        // actionSheetRef.current?.hide();

        //  toggleModal()

        const options = {
            selectionLimit: 1,
            mediaType: 'mixed',
            quality: 0.7,
            includeBase64: false,
        }


        // setTimeout(async () => {

        try {
            const result = await launchImageLibrary(options);

            if (result != null && result.assets?.length > 0) {
                const f = result.assets[0];

                // console.warn(f)

                const isVideo = f.type.includes("mp4")

                const fileInfo = {
                    name: f.fileName,
                    type: f.type,
                    size: f.fileSize,
                    uri: f.uri
                }

                processFile(fileInfo, (isVideo ? 'video' : 'image'))

            }

        }
        catch (e) {
            handleCameraError(e);
        }

        // }, 800);
    }



    function removeFile1(index) {

        setFileError1(false);


        onFileRemoved(index);


        setFiles(prevFile1 => {
            const updatedFile1 = [...prevFile1];
            updatedFile1.splice(index, 1);
            return updatedFile1;
        })
    }

    return (

        <View style={{ marginVertical: '3%' }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: '3%',

                }}>

                {files.length > 0 &&
                    files.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.filelen}>


                                <Text style={{ color: 'grey', width: '80%' }}>{item.name}</Text>




                                <TouchableOpacity
                                    style={{
                                        borderRadius: 15,
                                        borderTopRightRadius: 30,
                                    }}>
                                    <IconButton
                                        mode="contained"
                                        icon={closeicon}
                                        color="#262571"
                                        size={20}
                                        onPress={() => removeFile1(index)}
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    })}



                <View style={styles.pdfcontainer}>
                    <View style={styles.pdf}>

                        <Text
                            style={{ color: '#262571', marginVertical: 10 }}
                        >
                            {'strings'.AttachFile}

                        </Text>
                        <Button
                            onPress={onPressGalleryOption}
                            title="Upload Document"
                            mode="contained"
                            style={styles.pdfbtn}>
                            {'strings'.ChooseFile}
                        </Button>

                    </View>
                </View>


                {fileError1 && (
                    <View
                        style={{ marginHorizontal: '5%', marginVertical: '2%' }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            {errorMessage || 'strings'.Filesizeisgreaterthan2MB}
                        </Text>
                    </View>
                )}
            </View>
            <View>
            </View>

            {/* {loading &&
       <ScreenLoader text={'Processing..'} loading={loading}/>
       } */}
        </View>
    )
}


// ********************************************************************************************


export const CreantDocumentPicker = (props) => {

    const {
        onFileSelected,
        onFileRemoved,
        reset = false,
        sizeLimit = 4,
        compress = false,
        errorMessage
    } = props

    const strings = useContext('LocalizationContext');

    const [files, setFiles] = useState([]);
    const [fileError1, setFileError1] = useState('');
    const [isModalVisible, setModalVisible] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        if (reset) {

            console.warn("reset")
            setFiles([])
        }

    }, [reset])

    const toggleModal = () => {
        setModalVisible(!isModalVisible);
    }

    const processFile = async (file, type) => {

        console.warn(file);

        const fileSize = file.size;

        const limit = 1 // isVideo ? 10 : 5

        if (fileSize <= limit * 1024 * 1024) {

            setFiles(prevState => [...prevState, file]);
            onFileSelected(file, false)

        }
        else {

            setLoading(true);
            const compressedFile = await compressFile(file.uri, type);
            setLoading(false);

            if (compressedFile == null) {
                setFileError1(true);
                onFileSelected(null, true);
                return;
            }

            console.warn(file.size, compressedFile.size);

            if (compressedFile.size <= sizeLimit * 1024 * 1024) {
                setFiles(prevState => [...prevState, compressedFile]);
                onFileSelected(compressedFile, false);
            }
            else {
                setFileError1(true);
                onFileSelected(null, true);
            }

        }

    }


    const handleCameraError = (e) => {

        const errors = [
            'E_NO_CAMERA_PERMISSION',
            'E_CAMERA_IS_NOT_AVAILABLE',
            'E_CANNOT_LAUNCH_CAMERA',
            'E_NO_LIBRARY_PERMISSION',
            'E_FAILED_TO_SHOW_PICKER',
            'E_NO_IMAGE_DATA_FOUND'
        ]

        if (e['code'] != null && errors.includes(e.code)) {

            // showToast(e.message);

            setTimeout(() => {
                Linking.openSettings();
            }, 1000);
        }
    }



    const onPressDocumentOption = async () => {
        setFiles([]); //clear the previous selected file

        pickMultiple({
            mediaType: 'document',
            compressImageQuality: 0.5,
            allowMultiSelection: true,
            includeBase64: true,
            copyTo: 'cachesDirectory',
            transitionStyle: 'flipHorizontal',
        })
            .then(res => {

                if (res.length >= 0) {

                    const largeFiles = res.filter(item => item.size > (sizeLimit * 1024 * 1024));

                    res.forEach(async (file, index) => {

                        const fileInfo = { ...file, uri: file.fileCopyUri }

                        if (compress) {
                            const isVideo = file.type.includes('mp4');
                            const isImage = file.type.includes('mage');
                            const type = isVideo ? 'video' : isImage ? 'image' : 'other';
                            await processFile(fileInfo, type);
                        }
                        else {

                            setFileError1(largeFiles.length > 0);
                            setFiles(prevState => [...prevState, fileInfo]);
                            onFileSelected(fileInfo, largeFiles.length > 0)
                        }
                    })
                }
            })
            .catch(err => {
                console.log(err);
            });
    };



    function removeFile1(index) {

        setFileError1(false);

        onFileRemoved(index);

        setFiles(prevFile1 => {
            const updatedFile1 = [...prevFile1];
            updatedFile1.splice(index, 1);
            const largeFiles = updatedFile1.filter(item => item.size > (sizeLimit * 1024 * 1024)); // 4MB in bytes
            setFileError1(largeFiles.length > 0);
            return updatedFile1;
        })
    }

    return (

        <View style={{ marginVertical: 8 }}>
            <View
                style={{
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '100%',
                    paddingTop: '3%',

                }}>

                {files.length > 0 &&
                    files.map((item, index) => {
                        return (
                            <View
                                key={index}
                                style={styles.filelen}>
                                <Text style={{ color: 'grey', width: '80%' }}>{item.name}</Text>
                                <TouchableOpacity
                                    style={{
                                        borderRadius: 15,
                                        borderTopRightRadius: 30,
                                    }}>
                                    <IconButton
                                        mode="contained"
                                        icon={closeicon}
                                        color="#262571"
                                        size={20}
                                        onPress={() => removeFile1(index)}
                                    />
                                </TouchableOpacity>
                            </View>
                        );
                    })}



                <View style={styles.pdfcontainer}>
                    <View style={styles.pdf}>

                        <Text
                            style={{ color: '#262571', marginVertical: 10 }}
                        >
                            {strings.AttachFile}

                        </Text>
                        <Button
                            onPress={onPressDocumentOption}
                            title="Upload Document"
                            mode="contained"
                            style={styles.pdfbtn}>
                            {strings.ChooseFile}
                        </Button>

                    </View>
                </View>


                {fileError1 && (
                    <View
                        style={{ marginHorizontal: '5%', marginVertical: '2%' }}>
                        <Text style={{ color: 'red', fontSize: 12 }}>
                            {errorMessage || strings.Filesizeisgreaterthan2MB}
                        </Text>
                    </View>
                )}
            </View>
            <View>
            </View>

            {/* {loading &&
       <ScreenLoader text={'Processing..'} loading={loading}/>
       } */}
        </View>
    )
}

const styles = StyleSheet.create({
    pdfcontainer: {
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        marginBottom: 4,
    },
    pdf: {
        fontSize: 14,
        borderRadius: 5,
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: '#C9C0DA',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingLeft: 10,
        width: '100%',
        height: 42,
    },
    pdfbtn: {
        borderRadius: 5,
    },
    mediapad: {
        padding: '2%',

    },
    iconContainer: {
        alignItems: 'center',
        marginTop:'5%',
    },
    filelen: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
        borderWidth: 0.5,
        borderRadius: 10,
        paddingHorizontal: '3%',
        marginBottom: '3%',
    },
});

