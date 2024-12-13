import React, { useEffect, useRef } from 'react'
import { 
    StyleSheet, 
    Text, 
    TouchableOpacity, 
    View, 
    Image, 
    Dimensions, 
    Animated as RNAnimated 
} from 'react-native'

// Color palette
const colors = {
    background: '#f4f7f9',
    primary: '#3498db',
    secondary: '#2ecc71',
    accent: '#e74c3c',
    text: '#2c3e50',
    white: '#ffffff',
    lightGray: '#ecf0f1',
    shadow: '#34495e'
};

const { width, height } = Dimensions.get('window');

const Result = ({ navigation, route }) => {
    const { score } = route.params;
    const totalQuestions = 10;
    const percentage = ((score / totalQuestions) * 100).toFixed(2);

    // Animation values
    const scaleValue = useRef(new RNAnimated.Value(0)).current;
    const translateValue = useRef(new RNAnimated.Value(50)).current;

    // Determine result details
    const getResultDetails = () => {
        if (percentage >= 90) return {
            message: 'Excellent Performance!',
            textColor: colors.secondary,
            emoji: '🏆'
        };
        if (percentage >= 70) return {
            message: 'Great Job!',
            textColor: colors.primary,
            emoji: '👏'
        };
        if (percentage >= 50) return {
            message: 'Good Effort!',
            textColor: colors.text,
            emoji: '👍'
        };
        return {
            message: 'Keep Practicing!',
            textColor: colors.accent,
            emoji: '💪'
        };
    };

    const resultDetails = getResultDetails();

    useEffect(() => {
        // Animate result container
        RNAnimated.parallel([
            RNAnimated.spring(scaleValue, {
                toValue: 1,
                friction: 4,
                tension: 40,
                useNativeDriver: true
            }),
            RNAnimated.timing(translateValue, {
                toValue: 0,
                duration: 500,
                useNativeDriver: true
            })
        ]).start();
    }, []);

    return (
        <View style={styles.container}>
            {/* Result Logo */}
            <Image 
                source={require('../Images/result.png')} 
                style={styles.resultLogo} 
                resizeMode="contain" 
            />

            {/* Animated Result Container */}
            <RNAnimated.View 
                style={[
                    styles.resultContainer, 
                    {
                        transform: [
                            { scale: scaleValue },
                            { translateY: translateValue }
                        ]
                    }
                ]}
            >
                <Text style={styles.resultTitle}>Quiz Result</Text>

                {/* Emoji Display */}
                <Text style={styles.emoji}>
                    {resultDetails.emoji}
                </Text>

                <View style={styles.scoreContainer}>
                    <Text style={styles.scoreLabel}>Your Score</Text>
                    <Text style={styles.scoreValue}>
                        {score} / {totalQuestions}
                    </Text>
                    <Text 
                        style={[
                            styles.percentageText, 
                            { color: resultDetails.textColor }
                        ]}
                    >
                        {percentage}%
                    </Text>
                </View>

                <Text 
                    style={[
                        styles.resultMessage, 
                        { color: resultDetails.textColor }
                    ]}
                >
                    {resultDetails.message}
                </Text>

                {/* Navigation Buttons */}
                <View style={styles.buttonsContainer}>
                    <TouchableOpacity 
                        style={styles.button} 
                        activeOpacity={0.7} 
                        onPress={() => navigation.navigate('Home')}
                    >
                        <Text style={styles.buttonText}>HOME</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                        style={styles.endButton}
                        onPress={() => navigation.replace('Quiz')}
                        activeOpacity={0.7}
                    >
                        <Text style={styles.endButtonText}>RETRY</Text>
                    </TouchableOpacity>
                </View>
            </RNAnimated.View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: colors.background,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 20,
    },
    resultLogo: {
        width: width * 0.6,
        height: height * 0.2,
        marginBottom: 20,
    },
    emoji: {
        fontSize: 80,
        marginBottom: 20,
    },
    resultContainer: {
        width: '100%',
        backgroundColor: colors.white,
        borderRadius: 12,
        padding: 20,
        alignItems: 'center',
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    resultTitle: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.text,
        marginBottom: 30,
    },
    scoreContainer: {
        alignItems: 'center',
        marginBottom: 30,
    },
    scoreLabel: {
        fontSize: 18,
        color: colors.text,
        marginBottom: 10,
    },
    scoreValue: {
        fontSize: 36,
        fontWeight: 'bold',
        color: colors.primary,
    },
    percentageText: {
        fontSize: 20,
        marginTop: 10,
    },
    resultMessage: {
        fontSize: 20,
        fontWeight: '600',
        marginBottom: 30,
        textAlign: 'center',
    },
    buttonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        width: '100%',
    },
    button: {
        backgroundColor: colors.lightGray,
        padding: 15,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    buttonText: {
        fontSize: 16,
        color: colors.text,
        fontWeight: '600',
    },
    endButton: {
        backgroundColor: colors.secondary,
        padding: 15,
        borderRadius: 10,
        width: '30%',
        alignItems: 'center',
    },
    endButtonText: {
        fontSize: 16,
        color: colors.white,
        fontWeight: '600',
    },
});

export default Result;