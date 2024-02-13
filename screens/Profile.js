import React, {Component} from 'react';
import { View, Text, StyleSheet, StatusBar, Image, SafeAreaView, Switch, Alert, Platform} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

import { getAuth } from 'firebase/auth';
import { get, onValue, ref, update } from 'firebase/database';
import db from '../config';


SplashScreen.preventAutoHideAsync();

let customFonts = {
    "salsa" : require('../assets/font/Salsa-Regular.ttf')
};

export default class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fontsLoaded : false,
            isEnabled: false,
            light_theme: true,
            name: '',
            profile_image: '',
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true})
    }

    fetchUser() {
        let theme, name, image;
        const auth = getAuth();
        const userId = auth.currentUser.uid;

        onValue(ref(db, '/users/' + userId), (snapshot) => {
            theme = snapshot.val().current_theme;
            name = `${snapshot.val().first_name} ${snapshot.val().last_name}`;
            this.setState({
                light_theme: theme === 'light' ? true : false,
                isEnabled: theme === 'light' ? false :  true,
                name: name,
            })
        })
    }

    toggleSwitch() {
        const previous_state = this.state.isEnabled;
        const theme = !this.state.isEnabled ? 'dark' : 'light';

        const auth = getAuth();
        const user = auth.currentUser;

        if(user) {
            var updates = {};
            updates['users/' + user.uid + '/current_theme'] = theme;

            const dbRef = ref(db, '/');
            update(dbRef, updates);

            this.setState({isEnabled: !previous_state, light_theme: previous_state})
            console.log(theme);
        }
    }

    componentDidMount() {
        this._loadFontsAsync();
        this.fetchUser();
    }
    
    render() {
        if(this.state.fontsLoaded) {
            SplashScreen.hideAsync();
            return(
                <View style={this.state.light_theme ? styles.containerLight : styles.container}>
                    <SafeAreaView style={styles.droidSafeArea}/>

                    <View style={styles.appTitle}>
                        <View style={styles.appIcon}>
                          <Image source={require('../assets/logo.png')} style={styles.iconImage} />
                        </View>
                        <View style={styles.appTitleTextContainer}>
                           <Text style={this.state.light_theme ? styles.appTitleTextLight : styles.appTitleText}>Spectagram</Text>
                        </View>
                    </View>

                    <View style={styles.screenContainer}>

                        <Image source={require('../assets/profile_img.png')} style={styles.profileImage}/>
                        <Text style={this.state.light_theme ? styles.nameTextLight : styles.nameText}>{this.state.name}</Text>

                        <View style={styles.themeContainer}>
                            <Text style={this.state.light_theme ? styles.themeTextLight : styles.themeText}>Dark Theme</Text>
                                <Switch
                                style={{transform: [{scaleX: 1.3}, {scaleY: 1.3}] }}
                                trackColor={{false: '#767577', true: 'white'}}
                                thumbColor={this.state.isEnabled ? '#ee8249' : '#f4f3f4'}
                                ios_backgroundColor='#3e3e3e'
                                onValueChange={() => this.toggleSwitch()}
                                value={this.state.isEnabled}
                                />
                        </View>
                        <View style={{ flex: 0.3 }} />
                    </View>
                    <View style={{ flex: 0.08 }} />

                    
                </View>
            )
        }
        
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'black',
    },
    containerLight: {
        flex: 1,
        backgroundColor: 'white',
    }, 
    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    },
    appTitle: {
        flex: 0.07,
        flexDirection: 'row'
    },
    appIcon: {
        flex: .2,
        justifyContent: 'center',
        alignItems: 'center',
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
    appTitleTextLight: {
        color: 'black',
        fontSize: RFValue(28),
        fontFamily: 'salsa'
    },
    themeContainer: {
        flex: .2,
        flexDirection: 'row',
        justifyContent: 'center',
        marginTop: RFValue(20),
        alignItems: 'center'
    },
    themeText: {
        color: 'white',
        fontSize: RFValue(30),
        fontFamily: 'salsa',
        marginRight: RFValue(15),
    },
    themeTextLight: {
        color: 'black',
        fontSize: RFValue(30),
        fontFamily: 'salsa',
        marginRight: RFValue(15),
    },
    screenContainer: {
        flex: .85
    },
    profileImage: {
        width: RFValue(120),
        height: RFValue(120),
        borderRadius: RFValue(60),
        alignSelf: 'center',
        marginTop: RFValue(15),
    },
    nameText: {
        color: 'white',
        fontSize: RFValue(40),
        fontFamily: 'salsa',
        alignSelf: 'center'
      },
      nameTextLight: {
        color: 'black',
        fontFamily: 'salsa',
        fontSize: RFValue(40),
        alignSelf: 'center'
      },
}) 