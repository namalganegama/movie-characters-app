import { useState, useEffect } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { doc, getDoc } from "firebase/firestore";
import { auth, db } from "../config";
import { onAuthStateChanged } from "@firebase/auth";

const Profile = ({ navigation }: { navigation: any }) => {
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                console.log(user.uid)
                if (userDoc.exists()) {
                    const userData = userDoc.data();
                    setEmail(userData.email);
                    setName(userData.name);
                } else {
                    console.log("No such document!");
                }
            } else {
                navigation.navigate('login');
            }
        });

        return unsubscribe;
    }, [navigation]);

    return (
        <View style={styles.container}>
            <Text style={styles.title}>My App</Text>

            <Text style={styles.label}>Name</Text>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="#C0C0C0"
                value={name}
                editable={false}
            />

            <Text style={styles.label}>Email</Text>
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="#C0C0C0"
                value={email}
                editable={false}
            />

            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    auth.signOut();
                    navigation.navigate('login');
                }}
            >
                <Text style={styles.buttonText}>Log out</Text>
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
    label: {
        color: '#C0C0C0',
        fontSize: 16,
        marginBottom: 8,
        marginLeft: 12,
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

export default Profile;
