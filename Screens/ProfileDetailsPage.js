/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import ProfileInfo from '../Components/ProfileInfo';
import AddressDetailPage from '../Components/AddressDetailPage';
import ProfilePicture from '../Components/ProfilePicture';
import Ioniconsm from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
const ProfileDetailsPage = () => {

  const [showProfileInfo, setShowProfileInfo] = useState(false);
  const [showAddressDetail, setShowAddressDetail] = useState(false);

  return (
    <ScrollView style={styles.container}>
      <View>
        <ProfilePicture />
      </View>
      <View style={styles.inputcontainer}>
        <TouchableOpacity onPress={() => setShowProfileInfo(!showProfileInfo)} style={styles.header}>
          <Ioniconsm name="file-import-outline" size={25} color="gray" style={styles.iconStyle} />
          <Text style={styles.headerText}>PERSONAL DETAILS</Text>
          <Ionicons
            name={showProfileInfo ? 'expand-less' : 'expand-more'}
            size={30}
            color="gray"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        {showProfileInfo && <ProfileInfo />}
      </View>
      <View style={styles.inputcontainer}>
        <TouchableOpacity onPress={() => setShowAddressDetail(!showAddressDetail)} style={styles.header}>
          <Ioniconsm name="file-import-outline" size={25} color="gray" style={styles.iconStyle} />
          <Text style={styles.headerText}>ADDRESS DETAILS</Text>
          <Ionicons
            name={showAddressDetail ? 'expand-less' : 'expand-more'}
            size={30}
            color="gray"
            style={styles.iconStyle}
          />
        </TouchableOpacity>
        {showAddressDetail && <AddressDetailPage />}
      </View>
    </ScrollView>);
};

export default ProfileDetailsPage;

const styles = StyleSheet.create({
  header: {
    padding: '4%',
    backgroundColor: '#FEFEFE',
    borderWidth:1,
    borderBottomColor: '#ccc',
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  container: {
    height: '100%',
    backgroundColor: '#FFFFFF',
  },
  inputcontainer: {
    marginHorizontal: '5%',
    marginVertical: '4%',

  },
  headerText: {
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});
