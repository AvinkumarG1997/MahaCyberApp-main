/* eslint-disable prettier/prettier */
import React, { useState } from 'react';
import { Dimensions, View } from 'react-native';
import DropDown from 'react-native-paper-dropdown';
import FontIcon from 'react-native-vector-icons/FontAwesome';
const screenWidth = Dimensions.get('window').width;
const marginLeftPercentage = (screenWidth * -10) / 100;
export const SelectDropDown = (props) => {

    const { key = '', style, label, value, setValue, list, theme } = props;

    const [showDropDown, setShowDropDown] = useState(false);


    return (
        <View style={{ flexDirection: 'row', flex: 1, justifyContent: 'flex-start' }}>
            <View style={style}>

                <DropDown
                    key={key}
                    style={style}
                    label={label}
                    mode="outlined"
                    value={value}
                    setValue={setValue}
                    list={list}
                    visible={showDropDown}
                    showDropDown={() => { setShowDropDown(true); }}
                    onDismiss={() => setShowDropDown(false)}
                    dropDownItemTextStyle={{
                        fontSize: 12,
                        color: '#000000',
                        width: '100%',
                        flexWrap: 'wrap',
                    }}
                    theme={theme}
                    
                />

            </View>
            <View style={{ justifyContent: 'center', marginLeft: marginLeftPercentage, marginTop: '2%', width: '10%' }}>

                <FontIcon
                    name={showDropDown ? 'angle-up' : 'angle-down'}
                    size={25}
                    color="#808080"
                />

            </View>

        </View>

    );

};
