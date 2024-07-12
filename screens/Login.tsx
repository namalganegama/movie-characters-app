import React, { useState, useEffect } from 'react';
import {
    View, TextInput, TouchableOpacity,
    Text, StyleSheet
} from 'react-native';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = () => {
        console.log('Login Sucessful');
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My App</Text>

            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#C0C0C0"
                value={email}
                onChangeText={setEmail}
            />

            <TextInput
                style={styles.input}
                placeholder="Password"
                placeholderTextColor="#C0C0C0"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
            />

            <Text style={styles.forgotPassword}>Forgot Password?</Text>

            <TouchableOpacity
                style={styles.button}
                onPress={handleSubmit}
            >
                <Text style={styles.buttonText}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        backgroundColor: '#2A2A2A',
    },
    title: {
        color: '#FFFFFF',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,
        marginBottom: 72,
        textAlign: 'center',
    },
    input: {
        color: '#FFFFFF',
        height: 64,
        backgroundColor: '#3D3D3D',
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 12,
        fontSize: 16,
    },
    forgotPassword: {
        color: '#FFFFFF',
        fontSize: 14,
        fontWeight: '400',
        textAlign: 'right',
    },
    button: {
        backgroundColor: '#FFD482',
        borderRadius: 10,
        height: 48,
        paddingVertical: 10,
        alignItems: 'center',
        marginTop: 60,
        marginBottom: 12,
    },
    buttonText: {
        color: '#000000',
        fontWeight: 'bold',
        fontSize: 20,
    },
});

export default Login;
