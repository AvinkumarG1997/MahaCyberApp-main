/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { SafeAreaView, ScrollView, View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ProfileInfo from '../Components/ProfileInfo';
import AddressDetailPage from '../Components/AddressDetailPage';
import SupportDoc from '../Components/SupportDoc';
import Ionicons from 'react-native-vector-icons/MaterialIcons';
import Ioniconsm from 'react-native-vector-icons/MaterialCommunityIcons';
import ButtonColor from '../Components/ButtonColor';
import { useNavigation } from '@react-navigation/native';
import GrievanceInfo from '../Components/GrievanceInfo';

const GrievanceReport = () => {
    const navigation = useNavigation();
    const [showComplaintInfo, setShowComplaintInfo] = useState(false);
    const [showProfileInfo, setShowProfileInfo] = useState(false);
    const [showAddressDetail, setShowAddressDetail] = useState(false);
    const [showSupportDoc, setShowSupportDoc] = useState(false);

    return (
        <ScrollView>
            <SafeAreaView style={styles.container}>
                <View style={styles.inputcontainer}>
                    <TouchableOpacity onPress={() => setShowComplaintInfo(!showComplaintInfo)} style={styles.header}>
                    <Ioniconsm name="file-plus-outline" size={25} color="gray" style={styles.iconStyle} />
                        <Text style={styles.headerText}>GRAIEVANCE DETAILS</Text>
                        <Ionicons
                            name={showComplaintInfo ? 'expand-less' : 'expand-more'}
                            size={30}
                            color="gray"
                            style={styles.iconStyle}
                        />
                    </TouchableOpacity>
                    {showComplaintInfo && <GrievanceInfo />}
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
                <View style={styles.inputcontainer}>
                    <TouchableOpacity onPress={() => setShowSupportDoc(!showSupportDoc)} style={styles.header}>
                    <Ionicons name="file-present" size={25} color="gray" style={styles.iconStyle} />
                        <Text style={styles.headerText}>SUPPORTING DOCUMENTS</Text>
                        <Ionicons
                            name={showSupportDoc ? 'expand-less' : 'expand-more'}
                            size={30}
                            color="gray"
                            style={styles.iconStyle}
                        />
                    </TouchableOpacity>
                    {showSupportDoc && <SupportDoc />}
                </View>
                <View>
                    <ButtonColor onPress={() => navigation.navigate('trackcomplaint')} text="Register" />
                </View>
            </SafeAreaView>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    header: {
        padding: '4%',
        backgroundColor: '#FEFEFE',
        borderWidth:1,
        borderBottomColor: '#ccc',
        borderRadius:30,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignContent:'center',
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
        textAlign:'center',
    },
});

export default GrievanceReport;
