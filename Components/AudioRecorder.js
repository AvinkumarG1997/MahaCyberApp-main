/* eslint-disable prettier/prettier */

import React, { useEffect, useRef, useState } from 'react';

import {
  View,
  TouchableOpacity,
  StyleSheet,
  Linking,
  Modal,
  Text,
  Platform,
  PermissionsAndroid,
} from 'react-native';

import Icon from 'react-native-vector-icons/AntDesign';
import Icond from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome';
import Iconm from 'react-native-vector-icons/Ionicons';
import { Card } from 'react-native-paper';
import AudioRecorderPlayer from 'react-native-audio-recorder-player';

import RNFS from 'react-native-fs';
import SoundPlayer from 'react-native-sound-player';

const audioRecorderPlayer = new AudioRecorderPlayer();


const AudioRecorder = (props) => {

  const { isVisible, onAction } = props;

  const [isRecording, setIsRecording] = useState(false);
  const [audioPath, setAudioPath] = useState('');
  const [isPlaying, setIsPlaying] = useState(false);

  const [showPlayer, setShowPlayer] = useState(false);

  const [totalDuration, setTotalDuration] = useState(0);
  const [startCountdown, setStartCountdown] = useState(false);
  const [recorderDuration, setRecorderDuration] = useState(0);

  const timerId = useRef(null);

  //  PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
  //  PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,

  const checkPermission = async () => {
    if (Platform.OS === 'android') {

      try {
        const grants = await PermissionsAndroid.requestMultiple([
          PermissionsAndroid.PERMISSIONS.RECORD_AUDIO,
        ]);

        console.warn('write external stroage', grants);

        if (
          // grants['android.permission.WRITE_EXTERNAL_STORAGE'] ===
          //   PermissionsAndroid.RESULTS.GRANTED &&
          // grants['android.permission.READ_EXTERNAL_STORAGE'] ===
          //   PermissionsAndroid.RESULTS.GRANTED &&
          grants['android.permission.RECORD_AUDIO'] === PermissionsAndroid.RESULTS.GRANTED) {
          console.log('Permissions granted');
        } else {
          console.warn('All required permissions not granted');
          Linking.openSettings();
          return;
        }
      } catch (err) {
        console.warn(err);
        Linking.openSettings();
        return;
      }
    }
  };

  useEffect(() => {

    checkPermission();

  }, []);


  const startRecording = async () => {

    if (isRecording) return;

    // const meteringEnabled = false;

    try {


      const uri = await audioRecorderPlayer.startRecorder();

      audioRecorderPlayer.addRecordBackListener(e => {
        console.log('Recording . . . ', e.currentPosition);
        setRecorderDuration(e.currentPosition / 1000);
      });

      setIsRecording(true);
      setAudioPath(uri);

    } catch (error) {
      console.warn('Uh-oh! Failed to start recording:', error);
    }
  };

  const stopRecording = async () => {

    if (!isRecording) return;

    setStartCountdown(false);
    try {
      const uri = await audioRecorderPlayer.stopRecorder();
      //console.warn(uri)
      setAudioPath(uri);
      audioRecorderPlayer.removeRecordBackListener();
      setIsRecording(false);
      setShowPlayer(true);
      setTotalDuration(recorderDuration);

    } catch (error) {
      console.warn('Oops! Failed to stop recording:', error);
    }
  };

  const playAudio = async () => {

    if (!audioPath || isPlaying)
      return

    try {

      setIsPlaying(true);
      SoundPlayer.playUrl(audioPath); // Play the new audio
      const audio = await SoundPlayer.getInfo();
      setTotalDuration(audio?.duration);

      // console.warn(audio?.duration)
      SoundPlayer.addEventListener('FinishedPlaying', () => {
        setIsPlaying(false);

        if (timerId.current != null) {
          clearInterval(timerId.current);
          timerId.current = null;
        }
      });

      timerId.current = setInterval(() => {

        setTotalDuration(prev => prev - 1);

      }, 1000);

    }
    catch (e) {
      console.error('unable to play', e);
      setIsPlaying(false);
      if (timerId.current != null) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    }
  };

  const stopAudioPlay = async () => {

    if (!isPlaying) return;

    try {
      SoundPlayer.stop();
      //setTotalDuration(0)
      setIsPlaying(false);

      if (timerId.current != null) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    }
    catch (e) {
      console.error('unable to stop', e);
      setIsPlaying(false);
      if (timerId.current != null) {
        clearInterval(timerId.current);
        timerId.current = null;
      }
    }
  };

  const reset = () => {

    setIsRecording(false);
    setIsPlaying(false);
    //setAudioPath("");
    setTotalDuration(0);
    setRecorderDuration(0);
    setShowPlayer(false);
  };

  const onSelect = async () => {

    if (!audioPath) {

      onAction('dismiss', null);
      return;
    }

    let fileInfo = await RNFS.stat(audioPath);
    const filename = fileInfo.path.substring(fileInfo.path.lastIndexOf('/') + 1, fileInfo.path.length)
    const fileExtension = filename.split('.').pop();
    const mime = fileExtension ? 'audio/' + fileExtension : 'audio/mp4';

    fileInfo['uri'] = fileInfo.path;
    fileInfo['type'] = mime;
    fileInfo['name'] = filename;

    onAction('success', fileInfo);

    reset();
  };


  const onDismiss = () => {

    if (isRecording) {
      stopRecording();
    }

    if (isPlaying) {
      stopAudioPlay();
    }

    onAction('dismiss', null);
    reset();
  };

  const recordUI = () => {

    return (

      <View style={{ justifyContent: 'center', alignItems: 'center', paddingVertical: '10%' }}>

        {recorderDuration >= 0 &&
          <Text style={{ textAlign: 'center', color: 'white', paddingBottom: '5%' }}>
            {formatTime(recorderDuration)}
          </Text>}

        {isRecording ?
          <TouchableOpacity onPress={stopRecording}>
            <Icon
              name={'pause'}
              size={40}
              color="red" />
            {/* <Image source={stopicon} style={{ width: 40, height: 40, marginBottom: 10, borderRadius: 20, }} /> */}

          </TouchableOpacity>
          :
          <TouchableOpacity onPress={startRecording}>
            <Iconm
              name={'mic-circle-outline'}
              size={45}
              color="white" />
            {/* <Image source={mics} style={{ width: 40, height: 40, marginBottom: 10, borderRadius: 15, }} /> */}

          </TouchableOpacity>}
      </View>
    );
  };


  const playUI = () => {

    return (

      <View>
        {totalDuration >= 0 &&
          <Text style={{ textAlign: 'center', color: 'white', paddingBottom: '10%' }}>
            {formatTime(totalDuration)}
          </Text>}

        <View style={{ flexDirection: 'row', justifyContent: "space-evenly", marginBottom: '6%' }}>

          <TouchableOpacity onPress={onDismiss}>
            <Icond
              name={'delete-forever-outline'}
              size={30}
              color="red" />

            {/* <Image source={closeicon} style={{ width: 40, height: 40, marginBottom: 10, borderRadius: 30, }} /> */}

          </TouchableOpacity>

          {isPlaying ?
            <TouchableOpacity onPress={stopAudioPlay}>
              <Icons
                name={'stop'}
                size={30}
                color="white" />
              {/* <Image source={pasueicon} style={{ width: 40, height: 40, marginBottom: 10, borderRadius: 30, }} /> */}
            </TouchableOpacity>
            :
            <TouchableOpacity onPress={playAudio}>
              <Icons
                name={'play'}
                size={30}
                color="white" />
              {/* <Image source={playicon} style={{ width: 40, height: 40, marginBottom: 10, borderRadius: 19, }} /> */}

            </TouchableOpacity>
          }

          <TouchableOpacity onPress={onSelect}>
            <Icons
              name={'save'}
              size={30}
              color="green" />
            {/* <Image source={saveicon} style={{ width: 40, height: 40, marginBottom: 10, borderRadius: 15, }} /> */}

          </TouchableOpacity>

        </View>
      </View>
    );
  };

  const formatTime = time => {
    let hours = Math.floor(time / 3600);
    let minutes = Math.floor((time % 3600) / 60);
    let seconds = Math.floor(time % 60);

    hours = hours.toString().padStart(2, '0');
    minutes = minutes.toString().padStart(2, '0');
    seconds = seconds.toString().padStart(2, '0');

    return `${minutes}:${seconds}`;
  };


  return (

    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onDismiss}>

      <View style={styles.modalContainer}>

        <Card style={styles.cardadio}>
          <Text style={{ textAlign: 'center', paddingVertical: '4%', color: 'white' }}>Record voice note</Text>

          {showPlayer ?
            playUI()
            :
            recordUI()
          }


          <TouchableOpacity style={{ position: 'absolute', top: 5, right: 5 }} onPress={onDismiss}>
            <Icon
              name={'closecircle'}
              size={30}
              color="red" />

            {/* <Image source={closeicon} style={{ width: 30, height: 30, marginBottom: 10, borderRadius: 30, }} /> */}
          </TouchableOpacity>


        </Card>

      </View>
    </Modal>
  );

};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    margin: '3%',
  },
  cardadio: {
    backgroundColor: 'rgba(0,0,0,0.85)',
    marginHorizontal: '4%',
    elevation: 8,
  },




});
export default AudioRecorder;




