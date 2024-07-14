import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';

const SplashScreen = ({ navigation }: { navigation: any }) => {
    useEffect(() => {
        setTimeout(() => {
            navigation.replace('signUp');
        }, 800);
    }, []);

    return (
        <View style={styles.container}>
            <Text style={styles.text}>My App</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#2A2A2A',
    },
    text: {
        color: '#FFFFFF',
        fontSize: 24,
        marginBottom: 20,
        fontFamily: 'Inter',
    },
});

export default SplashScreen;
