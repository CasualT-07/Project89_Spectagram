import React, {Component} from 'react';
import {Text, View, StyleSheet, StatusBar, Image} from 'react-native';
import { RFValue } from 'react-native-responsive-fontsize';
import * as SplashScreen from 'expo-splash-screen';
import * as Font from 'expo-font';
import {SafeAreaView} from 'react-native-safe-area-context'
import Ionicons from 'react-native-vector-icons/Ionicons';

SplashScreen.preventAutoHideAsync();

let customFonts = {
    'salsa' : require('../assets/font/Salsa-Regular.ttf')
}

export default class PostScreen extends Component {
    constructor(props) {
        super(props);
        this.state={
            fontsLoaded : false,
        }
    }

    async _loadFontsAsync() {
        await Font.loadAsync(customFonts);
        this.setState({fontsLoaded: true})
    }

    componentDidMount() {
        this._loadFontsAsync();
    }
    
    render() {
        if(this.state.fontsLoaded) {
        SplashScreen.hideAsync();

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

                <View style={styles.cardContainer}>
                    <View style={styles.authorContainer}>

                        <View style={styles.authorImageContainer}>
                            <Image source={require("../assets/profile_img.png")} style={styles.profileImage} />
                        </View>

                        <View>
                            <Text style={styles.authorNameText}>{this.props.route.params.post.author}</Text>
                        </View>

                    </View>

                    <Image source={require("../assets/post.jpeg")} style={styles.postImage} />

                    <View style={styles.captionContainer}>
                        <Text style={styles.captionText}>{this.props.route.params.post.caption}</Text>
                    </View>

                    <View style={styles.actionContainer}>
                        <View style={styles.likeButton}>
                            <Ionicons name={"heart"} size={RFValue(30)} color={"white"} />
                            <Text style={styles.likeText}>12k</Text>
                        </View>
                    </View>
                </View>
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

    droidSafeArea: {
        marginTop: Platform.OS === 'android' ? StatusBar.currentHeight -45 : RFValue(35)
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
    cardContainer: {
        flex: 1,
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    authorContainer: {
        flex: .5,
        flexDirection: 'row',
        alignItems: 'center', 
            
    },
    authorImageContainer: {
        padding: 20
    },
    profileImage: {
        borderRadius: RFValue(10),
        height: RFValue(50),
        width: RFValue(50)
    },

    authorNameText: {
        fontFamily: 'salsa',
        fontSize: RFValue(25),
        color: 'white'
    },
    postImage: {
        resizeMode: 'contain',
        width: '95%',
        alignSelf: 'center',
        height: RFValue(250),
        
    },
    captionContainer: {
        alignSelf: 'center'
    },
    captionText: {
        fontFamily: 'salsa',
        fontSize: RFValue(18),
        color: 'white',
        paddingTop: RFValue(10)
    },
    actionContainer: {
        justifyContent: 'center',
        alignItems: 'center',
        padding: RFValue(10)
    },
    likeButton: {
        width: RFValue(160),
        height: RFValue(40),
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        backgroundColor: '#eb3948',
        borderRadius: RFValue(30)
    }, 
    likeText: {
        color: "white",
        fontFamily: "salsa",
        fontSize: RFValue(25),
        marginLeft: RFValue(5)
    }
})