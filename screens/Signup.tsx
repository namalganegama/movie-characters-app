import { useState, useEffect } from 'react';
import {
	View, TextInput, TouchableOpacity,
	Text, StyleSheet
} from 'react-native';
import { Linking } from 'react-native';

interface Errors {
	name?: string;
	email?: string;
	password?: string;
	confirmPassword?: string;
}

const Signup = ({ navigation }: { navigation: any }) => {
	const [name, setName] = useState('');
	const [email, setEmail] = useState('');
	const [password, setPassword] = useState('');
	const [confirmPassword, setConfirmPassword] = useState('');
	const [errors, setErrors] = useState<Errors>({});
	const [isFormValid, setIsFormValid] = useState(false);
	const [touchedFields, setTouchedFields] = useState({
		name: false,
		email: false,
		password: false,
		confirmPassword: false
	});

	useEffect(() => {
		validateForm();
	}, [name, email, password, confirmPassword]);

	const validateForm = () => {
		let errors: Errors = {};

		if (!name) {
			errors.name = 'Name is required.';
		}

		if (!email) {
			errors.email = 'Email is required.';
		} else if (!/\S+@\S+\.\S+/.test(email)) {
			errors.email = 'Email is invalid.';
		}

		if (!password) {
			errors.password = 'Password is required.';
		} else if (password.length < 6) {
			errors.password = 'Password must be at least 6 characters.';
		}

		if (!confirmPassword) {
			errors.confirmPassword = 'Confirm Password is required.';
		} else if (confirmPassword !== password) {
			errors.confirmPassword = 'Passwords do not match.';
		}

		setErrors(errors);
		setIsFormValid(Object.keys(errors).length === 0);
	};

	const handleSubmit = () => {
		if (isFormValid) {
			console.log('Form submitted successfully!');
		} else {
			console.log('Form has errors. Please correct them.');
		}
	};

	const handleFocus = (field: keyof typeof touchedFields) => {
		setTouchedFields({ ...touchedFields, [field]: true });
	};

	return (
		<View style={styles.container}>
			<Text style={styles.title}>My App</Text>
			<TextInput
				style={styles.input}
				placeholder="Name"
				value={name}
				placeholderTextColor="#C0C0C0"
				onChangeText={setName}
				onFocus={() => handleFocus('name')}
			/>

			<TextInput
				style={styles.input}
				placeholder="Email Address"
				value={email}
				placeholderTextColor="#C0C0C0"
				onChangeText={setEmail}
				onFocus={() => handleFocus('email')}
			/>

			<TextInput
				style={styles.input}
				placeholder="Password"
				value={password}
				placeholderTextColor="#C0C0C0"
				onChangeText={setPassword}
				secureTextEntry
				onFocus={() => handleFocus('password')}
			/>

			<TextInput
				style={styles.input}
				placeholder="Confirm Password"
				value={confirmPassword}
				placeholderTextColor="#C0C0C0"
				onChangeText={setConfirmPassword}
				secureTextEntry
				onFocus={() => handleFocus('confirmPassword')}
			/>
			{touchedFields.name && errors.name && (
				<Text style={styles.error}>{errors.name}</Text>
			)}
			{touchedFields.email && errors.email && (
				<Text style={styles.error}>{errors.email}</Text>
			)}
			{touchedFields.password && errors.password && (
				<Text style={styles.error}>{errors.password}</Text>
			)}
			{touchedFields.confirmPassword && errors.confirmPassword && (
				<Text style={styles.error}>{errors.confirmPassword}</Text>
			)}

			<TouchableOpacity
				style={styles.button}
				disabled={!isFormValid}
				onPress={handleSubmit}
			>
				<Text style={styles.buttonText}>Sign Up</Text>
			</TouchableOpacity>

			<Text style={styles.bottomText}>
				Have an account? 
				&nbsp;
				<Text style={{ color: '#FFD482' }} onPress={() => navigation.navigate('login')}>
					Sign In
				</Text>
			</Text>
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
		marginTop: 50,
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
	button: {
		backgroundColor: '#FFD482',
		borderRadius: 10,
		height: 48,
		paddingVertical: 10,
		alignItems: 'center',
		marginTop: 16,
		marginBottom: 12,
	},
	buttonText: {
		color: '#000000',
		fontWeight: 'bold',
		fontSize: 20,
	},
	error: {
		color: '#D0D0D0',
		fontSize: 12,
		marginBottom: 12,
	},
	bottomText: {
		color: '#FFFFFF',
		fontSize: 15,
		fontWeight: 'bold',
		marginTop: 78,
		marginBottom: 12,
		textAlign: 'center',
	},
});

export default Signup;
