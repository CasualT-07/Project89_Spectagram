import { RFValue } from 'react-native-responsive-fontsize';
import Ionicons from 'react-native-vector-icons/Ionicons';
import React, {Component} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native';
import * as Font from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';

SplashScreen.preventAutoHideAsync();

let customFonts = {
    "salsa" : require('../assets/font/Salsa-Regular.ttf')
};

export default class PostCard extends Component {
    constructor(props) {
        super(props);
        this.state={
            fontsLoaded: false
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
                <View style={styles.cardContainer}>
                    <View style={styles.authorContainer}>

                        <View style={styles.authorImageContainer}>
                            <Image source={require("../assets/profile_img.png")} style={styles.profileImage} />
                        </View>

                        <View style={styles.authorNameContainer}>
                            <Text style={styles.authorNameText}>{this.props.post.author}</Text>
                        </View>

                    </View>
                
                    <Image source={require("../assets/post.jpeg")} style={styles.postImage} />

                    <View style={styles.captionContainer}>
                        <Text style={styles.captionText}>{this.props.post.caption}</Text>
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
        flex: 1
    },
    cardContainer: {
        margin: RFValue(13),
        backgroundColor: "#2f345d",
        borderRadius: RFValue(20)
    },
    authorContainer: {
        flex: 1,
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
    authorNameContainer: {

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