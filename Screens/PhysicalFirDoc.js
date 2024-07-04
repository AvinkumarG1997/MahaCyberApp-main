/* eslint-disable prettier/prettier */

import React from 'react';
import { ScrollView, View } from 'react-native';
import ComplaintRegistration from './ComplaintRegistration';
import PhysicalFir from '../Components/PhysicalFir';
import GeneralReport from '../Components/GeneralReport';
import Officerincharge from '../Components/Officerincharge';

const PhysicalFirDoc = () => {
    return (
        <ScrollView>
            <View>
                <PhysicalFir />
                <ComplaintRegistration />
                <GeneralReport />
                <Officerincharge />

            </View>
        </ScrollView>
    );
};

export default PhysicalFirDoc;
