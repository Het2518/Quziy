import React from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Title = () => {
    return (
        <LinearGradient 
            colors={['#2C5F9E', '#1A73E8']} 
            style={styles.container}
        >
            <Text style={styles.titleText}>QuizMaster</Text>
            <Text style={styles.subtitleText}>Test Your Knowledge</Text>
            <View style={styles.underline}></View>
        </LinearGradient>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 25,
        paddingHorizontal: 15,
        width: '100%',
        borderBottomLeftRadius: 20,
        borderBottomRightRadius: 20,
    },
    titleText: {
        fontSize: 36,
        fontWeight: '900',
        color: 'white',
        letterSpacing: 1.5,
        textShadowColor: 'rgba(0, 0, 0, 0.2)',
        textShadowOffset: { width: 1, height: 1 },
        textShadowRadius: 4,
    },
    subtitleText: {
        fontSize: 16,
        color: 'rgba(255,255,255,0.8)',
        marginTop: 5,
    },
    underline: {
        width: width * 0.4,
        height: 4,
        backgroundColor: 'white',
        marginTop: 10,
        borderRadius: 2,
        opacity: 0.7,
    },
});

export default Title;