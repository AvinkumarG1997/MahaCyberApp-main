/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { View, Image, TouchableOpacity, StyleSheet, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialIcons';
import ImagePicker from 'react-native-image-picker';

const { width } = Dimensions.get('window');
const IMAGE_SIZE = width * 0.3;
const ICON_SIZE = IMAGE_SIZE * 0.13;
const ProfilePicture = () => {
  const [imageUri, setImageUri] = useState('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS3oo0tHTZ0hgXIfdUjC7TIeTOCXhUpvRBd3g&usqp=CAU');
  const [borderColor, setBorderColor] = useState('#70E3F5');

  const pickImage = () => {
    ImagePicker.showImagePicker({}, response => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.uri };
        setImageUri(source.uri);
        setBorderColor('#FF0000'); // Change border color to red
      }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: imageUri }} style={[styles.image, { borderColor: borderColor }]} />
        <TouchableOpacity style={styles.editIcon} onPress={pickImage}>
          <Icon name="edit" size={ICON_SIZE} color="#000" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  imageContainer: {
    position: 'relative',
  },
  image: {
    width: IMAGE_SIZE,
    height: IMAGE_SIZE,
    borderRadius: IMAGE_SIZE / 2,
    borderWidth: 7,
    borderColor: '#70E3F5',
    borderLeftColor: '#FF0000',
  },
  editIcon: {
    position: 'absolute',
    bottom: ICON_SIZE / 2,
    right: ICON_SIZE / 2,
    backgroundColor: '#FFF',
    borderRadius: ICON_SIZE / 1,
    padding: ICON_SIZE / 4,
    borderWidth: 1,
  },
});

export default ProfilePicture;
