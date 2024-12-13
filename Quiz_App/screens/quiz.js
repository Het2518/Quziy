import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, Dimensions, Alert } from 'react-native'

// Color palette
const colors = {
    background: '#f4f7f9',
    primary: '#3498db',
    secondary: '#2ecc71',
    text: '#2c3e50',
    white: '#ffffff',
    lightGray: '#ecf0f1',
    shadow: '#34495e'
};

const { width, height } = Dimensions.get('window');

const Quiz = ({ navigation }) => {
    const [selectedOption, setSelectedOption] = useState(null);
    const [questions, setQuestions] = useState([]);
    const [questionNumber, setQuestionNumber] = useState(0);
    const [options, setOptions] = useState([])
    const [score, setScore] = useState(0)
    const [timer, setTimer] = useState(30); // 30 seconds per question

    useEffect(() => {
        const getQuiz = async () => {
            try {
                const api = 'https://opentdb.com/api.php?amount=10&type=multiple&encode=url3986';
                const response = await fetch(api);
                const json = await response.json();
                
                if (json.results && json.results.length > 0) {
                    const formattedQuestions = json.results.map(q => ({
                        ...q,
                        options: shuffleArray([
                            ...q.incorrect_answers,
                            q.correct_answer
                        ])
                    }));

                    setQuestions(formattedQuestions);
                    setOptions(formattedQuestions[0].options);
                } else {
                    Alert.alert('Error', 'No questions found. Please try again.');
                }
            } catch (error) {
                console.error('Quiz Fetch Error:', error);
                Alert.alert('Network Error', 'Check your internet connection');
            }
        };
        getQuiz();
    }, []);

    // Timer logic
    useEffect(() => {
        let interval;
        if (timer > 0) {
            interval = setInterval(() => {
                setTimer(prevTimer => prevTimer - 1);
            }, 1000);
        } else if (timer === 0) {
            // Automatically move to next question when time runs out
            onPressNext();
        }
        return () => clearInterval(interval);
    }, [timer]);

    const handleOptionSelect = (optionIndex) => {
        const selectedOptionText = options[optionIndex];
        const correctAnswerText = questions[questionNumber].correct_answer;

        // Check if selected option matches correct answer
        if (decodeURIComponent(selectedOptionText) === decodeURIComponent(correctAnswerText)) {
            setScore(score + 1);
        }
        
        // Reset selected option and move to next question
        setSelectedOption(optionIndex);
        setTimeout(onPressNext, 500);
    };

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const onPressNext = () => {
        if (questions.length > questionNumber + 1) {
            setQuestionNumber(questionNumber + 1);
            setOptions(shuffleArray([
                ...questions[questionNumber + 1].incorrect_answers,
                questions[questionNumber + 1].correct_answer
            ]));
            // Reset timer and selected option
            setTimer(30);
            setSelectedOption(null);
        } else {
            // If last question, show result
            handleShowResult();
        }
    };

    const onPressBack = () => {
        if (questions.length > questionNumber - 1 && questionNumber > 0) {
            setQuestionNumber(questionNumber - 1);
            setOptions(shuffleArray([
                ...questions[questionNumber - 1].incorrect_answers,
                questions[questionNumber - 1].correct_answer
            ]));
            // Reset timer and selected option
            setTimer(30);
            setSelectedOption(null);
        }
    };

    const handleShowResult = () => {
        navigation.navigate('Result', { score: score });
    };

    // Loading state
    if (questions.length === 0) {
        return (
            <View style={styles.container}>
                <Text style={styles.loadingText}>Loading Questions...</Text>
            </View>
        );
    }

    return (
        <View style={styles.container}>
            {/* Timer Display */}
            <View style={styles.timerContainer}>
                <Text style={styles.timerText}>Time Left: {timer}s</Text>
            </View>

            {/* Question Container */}
            <View style={styles.questionContainer}>
                <Text style={styles.questionText}>
                    Q. {decodeURIComponent(questions[questionNumber].question)}
                </Text>
            </View>

            {/* Options Container */}
            <View style={styles.optionsContainer}>
                {options.map((option, index) => (
                    <TouchableOpacity
                        key={index}
                        style={[
                            styles.optionButton,
                            selectedOption === index && styles.selectedOptionButton
                        ]}
                        onPress={() => handleOptionSelect(index)}
                        activeOpacity={0.7}
                    >
                        <Text style={[
                            styles.optionText,
                            selectedOption === index && styles.selectedOptionText
                        ]}>
                            {decodeURIComponent(option)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/* Navigation Buttons */}
            <View style={styles.buttonsContainer}>
                {/* Previous Button (only show if not first question) */}
                {questionNumber !== 0 && (
                    <TouchableOpacity 
                        style={styles.button} 
                        activeOpacity={0.7} 
                        onPress={onPressBack}
                    >
                        <Text style={styles.buttonText}>PREV</Text>
                    </TouchableOpacity>
                )}

                {/* Skip Button (only show if not last question) */}
                {questionNumber !== 9 && (
                    <TouchableOpacity 
                        style={styles.button} 
                        activeOpacity={0.7} 
                        onPress={onPressNext}
                    >
                        <Text style={styles.buttonText}>SKIP</Text>
                    </TouchableOpacity>
                )}

                {/* End Button */}
                <TouchableOpacity
                    style={styles.endButton}
                    onPress={handleShowResult}
                    activeOpacity={0.7}
                >
                    <Text style={styles.endButtonText}>END</Text>
                </TouchableOpacity>
            </View>
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
    loadingText: {
        fontSize: 18,
        color: colors.text,
    },
    timerContainer: {
        width: '100%',
        alignItems: 'center',
        marginBottom: 15,
    },
    timerText: {
        fontSize: 18,
        color: colors.accent || colors.primary,
        fontWeight: 'bold',
    },
    questionContainer: {
        width: '100%',
        marginBottom: 30,
        paddingHorizontal: 10,
    },
    questionText: {
        fontSize: 22,
        fontWeight: '700',
        color: colors.text,
        textAlign: 'center',
    },
    optionsContainer: {
        width: '100%',
        marginBottom: 30,
    },
    optionButton: {
        backgroundColor: colors.white,
        padding: 15,
        borderRadius: 12,
        marginBottom: 15,
        borderWidth: 2,
        borderColor: colors.lightGray,
        shadowColor: colors.shadow,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 3,
    },
    selectedOptionButton: {
        backgroundColor: colors.primary,
        borderColor: colors.primary,
    },
    optionText: {
        fontSize: 18,
        color: colors.text,
        textAlign: 'center',
        fontWeight: '500',
    },
    selectedOptionText: {
        color: colors.white,
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

export default Quiz;