import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { Divider } from 'react-native-paper';
import Ionicons from 'react-native-vector-icons/MaterialCommunityIcons';
import { useNavigation } from '@react-navigation/native';

const ViewIncident = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigation = useNavigation();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axios.get('https://fakestoreapi.com/products');
                setProducts(response.data);
                setLoading(false);
            } catch (error) {
                setError(error);
                setLoading(false);
            }
        };

        fetchData();
    }, []);

    if (loading) {
        return (
            <View style={styles.container}>
                <Text>Loading...</Text>
            </View>
        );
    }

    if (error) {
        return (
            <View style={styles.container}>
                <Text>Error: {error.message}</Text>
            </View>
        );
    }
    const getStatusStyles = (status) => {
        switch (status) {
            case 1:
                return {
                    backgroundColor: '#d4e6ff',
                    color: '#0000ff',
                    borderWidth: 1,
                    paddingHorizontal: '4%',
                    borderRadius: 20
                };
            case 2:
                return {
                    backgroundColor: '#ffffcc', color: '#ffcc00', borderWidth: 1,
                    paddingHorizontal: '4%',
                    borderRadius: 20
                };
            case 3:
                return {
                    backgroundColor: '#ffd6d6', color: '#ff0000', borderWidth: 1,
                    paddingHorizontal: '4%',
                    borderRadius: 20
                };
            case 4:
                return {
                    backgroundColor: '#d6ffd6', color: '#008000', borderWidth: 1,
                    paddingHorizontal: '4%',
                    borderRadius: 20
                };
            default:
                return {
                    backgroundColor: '#fff', color: '#000', borderWidth: 1,
                    paddingHorizontal: '4%',
                    borderRadius: 20
                };
        }
    };

    return (
        <ScrollView style={styles.container}>
            <View style={styles.card}>
                <Text style={styles.title}>Complaint Details</Text>
                {products.map((product, index) => {
                    const status = index;
                    const statusStyles = getStatusStyles(status);
                    return (
                        <View key={product.id} style={styles.productContainer}>
                            <View style={styles.row}>
                                <Text style={styles.header}>Sl. No </Text><Text style={styles.data}>{index + 1}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row1}>
                                <Text style={styles.header}>Name </Text><Text style={styles.data}>{product.category}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row}>
                                <Text style={styles.header}>Complaint ID </Text><Text style={styles.data}>{product.description}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row1}>
                                <Text style={styles.header}>Created Date </Text><Text style={styles.data}>{product.price}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row}>
                                <Text style={styles.header}>Mobile No </Text><Text style={styles.data}>{index + 1}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row1}>
                                <Text style={styles.header}>Location </Text><Text style={styles.data}>{product.category}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row}>
                                <Text style={styles.header}>Police Station </Text><Text style={styles.data}>{product.price}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row1}>
                                <Text style={styles.header}>Status </Text>
                                <Text style={[styles.data, {
                                    color: statusStyles.color,
                                    borderWidth: statusStyles.borderWidth,
                                    backgroundColor: statusStyles.backgroundColor,
                                    borderRadius: statusStyles.borderRadius,
                                    paddingHorizontal: statusStyles.paddingHorizontal
                                }]}>{index + 1}</Text>
                            </View>
                            <Divider style={styles.divider} />
                            <View style={styles.row}>
                                <Text style={styles.header}>Action </Text>
                                <View style={styles.iconContainer}>
                                    <TouchableOpacity onPress={() => navigation.navigate('trackcomplaint', { id: product.id })}>
                                        <Ionicons name="circle-edit-outline" size={30} color="blue" style={styles.iconStyle} />
                                    </TouchableOpacity>
                                    <TouchableOpacity onPress={() => navigation.navigate('trackcomplaint', { id: product.id })}>
                                        <Ionicons name="delete-outline" size={30} color="red" style={styles.iconStyle} />
                                    </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    );
                })}
            </View>
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: '3%',
        backgroundColor: '#fff',
    },
    productContainer: {
        marginBottom: '5%',
        padding: '3%',
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 10,
        backgroundColor: '#fff',
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: '5%',
    },
    divider: {
        marginVertical: '2%',
    },
    card: {
        margin: '2%',
        backgroundColor: '#d4fcff',
        borderRadius: 20,
        padding: '2%',
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '0.4%',
    },
    row1: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: '0.4%',
        backgroundColor:'#f5f5f5',
    },
    data: {
        marginLeft: '35%',

    },
    iconStyle: {
        marginLeft: '60%',
    },
    iconContainer: {
        flexDirection: 'row',
        marginLeft: 'auto',
    },
    iconStyle: {
        marginHorizontal: '12%',
    },
    header: {
        position: 'absolute',
        fontWeight: 'bold',
        paddingRight: '1%',
    },
});

export default ViewIncident;



