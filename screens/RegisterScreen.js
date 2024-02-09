import React, { Component } from 'react';
import {
	View,
	StyleSheet,
	SafeAreaView,
	Platform,
	StatusBar,
	Image,
	TextInput,
	Alert,
	TouchableOpacity,
	Text,
} from 'react-native';

import { getAuth, createUserWithEmailAndPassword, confirmPasswordReset } from 'firebase/auth';
import { ref, set } from 'firebase/database';
import db from '../config';

import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
	'salsa': require('../assets/font/Salsa-Regular.ttf'),
};

export default class RegisterScreen extends Component {
    constructor(props) {
        super(props);
        this.state ={
            fontsLoaded: false,
            first_name: '',
            last_name: '',
            email: '',
            password: '',
            confirmPassword: '',
        }
    }

    async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

    registerUser = (email, password, confirmPassword, first_name, last_name) => {
        if (password == confirmPassword) {
            const auth = getAuth();
            createUserWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    Alert.alert('User registered!');
                    console.log(userCredential.user.uid);
                    this.props.navigation.replace('Login');

                    const dbRef = ref(db, '/users/' + userCredential.user.uid);

                    set(dbRef, {
                        email: userCredential.user.email,
                        first_name: first_name,
                        last_name: last_name,
                        current_theme: 'dark',
                    })
                })
                .catch((error)=>{
                    Alert.alert(error.message);
                })
        } else {
            Alert.alert("Passwords don't match");
        }
    }

    render() {
        if(this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            const {email, password, confirmPassword, first_name, last_name} = this.state;

            return(
                <View style={styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>

                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                            <Image source={require('../assets/logo.png')} style={styles.iconImage} />
                        </View>
                        <View style={styles.appTitleTextContainer}>
                            <Text style={styles.appTitleText}>Spectagram</Text>
                        </View>
                    </View>

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({first_name: text})}
                        placeholder={'First name'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({last_name: text})}
                        placeholder={'Last name'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({email: text})}
                        placeholder={'Email'}
                        placeholderTextColor={'#FFFFFF'}
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({password: text})}
                        placeholder={'Password'}
                        placeholderTextColor={'#FFFFFF'}
                        secureTextEntry
                    />

                    <TextInput
                        style={styles.textinput}
                        onChangeText={(text) => this.setState({confirmPassword: text})}
                        placeholder={'Confirm Password'}
                        placeholderTextColor={'#FFFFFF'}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[styles.button, {marginTop: 20}]}
                        onPress={() => {
                            this.registerUser(email, password, confirmPassword, first_name, last_name)
                        }}
                    >
                        <Text style={styles.buttonText}>Register</Text>
                    </TouchableOpacity>

                    <TouchableOpacity onPress={() => this.props.navigation.replace('Login')}>
                        <Text style={styles.buttonTextNewUser}>Login?</Text>
                    </TouchableOpacity>

                </View>
            )
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
		backgroundColor: '#15193c',
		alignItems: 'center',
		justifyContent: 'center',
    },
    droidSafeArea: {
		marginTop: Platform.OS === 'android' ? StatusBar.currentHeight -45 : RFValue(35),
	},
    appTitle: {
        
        flexDirection: 'row',
        marginBottom: RFValue(20),  
    },

    appIcon: {
        marginRight: RFValue(10),
        justifyContent: 'center',
        alignItems: 'center',
        width: RFValue(50),
        height: RFValue(50)
    },

    iconImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain',
    },

    appTitleTextContainer: {
        flex: .8,
        justifyContent: 'center',
    },

    appTitleText: {
        color: 'white',
        fontSize: RFValue(28),
        fontFamily: 'salsa'
    },
    textinput: {
        width: RFValue(250),
        height: RFValue(50),
        padding: RFValue(10),
        marginTop: RFValue(10),
        borderColor: '#FFFFFF',
        borderWidth: RFValue(4),
        borderRadius: RFValue(10),
        fontSize: RFValue(20),
        color: '#FFFFFF',
        backgroundColor: '#15193c',
        fontFamily: 'salsa',
    },
    buttonTextNewUser: {
        fontSize: RFValue(12),
		color: '#FFFFFF',
		fontFamily: 'salsa',
		textDecorationLine: 'underline',
    },
    buttonText: {
        fontSize: RFValue(24),
        color: '#15193c',
		fontFamily: 'salsa',
    },
    button: {
        width: RFValue(250),
		height: RFValue(50),
		flexDirection: 'row',
		justifyContent: 'space-evenly',
		alignItems: 'center',
		borderRadius: RFValue(30),
		backgroundColor: 'white',
		marginBottom: RFValue(20),
    }
})