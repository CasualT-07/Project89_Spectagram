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

import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';

import * as SplashScreen from 'expo-splash-screen';
SplashScreen.preventAutoHideAsync();

let customFonts = {
	'salsa': require('../assets/font/Salsa-Regular.ttf'),
};

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            fontsLoaded: false,
            userSignedIn: false,
        };
    }

    async _loadFontsAsync() {
		await Font.loadAsync(customFonts);
		this.setState({ fontsLoaded: true });
	}

	componentDidMount() {
		this._loadFontsAsync();
	}

    signIn = async (email, password) => {
        const auth = getAuth();
        signInWithEmailAndPassword(auth, email, password)
            .then(() =>{
                this.props.navigation.replace('Dashboard');
            })
            .catch((error) => {
                Alert.alert(error.message);
            })
    };

    render() {
        if (this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            const {email, password } = this.state;

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
                        onChangeText={(text) => this.setState({email: text})}
                        placeholder={'Enter Email'}
                        placeholderTextColor={'#FFFFFF'}
                        autoFocus
                    />

                    <TextInput 
                        style={[styles.textinput, {marginTop: 20}]}
                        onChangeText={(text) => this.setState({password: text})}
                        placeholder={'Enter Password'}
                        placeholderTextColor={'#FFFFFF'}
                        secureTextEntry
                    />

                    <TouchableOpacity
                        style={[styles.button, {marginTop: 20}]}
                        onPress={() => this.signIn(email, password)}
                    >
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        onPress={() => this.props.navigation.navigate('Register')}
                    >
                        <Text style={styles.buttonTextNewUser}>New User?</Text>
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
        flex: .2,
        flexDirection: 'row',
        marginBottom: RFValue(20),  
    },

    appIcon: {
        flex: .2,
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