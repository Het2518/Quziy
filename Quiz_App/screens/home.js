import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Image, Dimensions } from 'react-native';
import Title from '../components/title';
import Quiz_Logo from '../Images/quiz_logo.png';
import { LinearGradient } from 'expo-linear-gradient';

const { width } = Dimensions.get('window');

const Home = ({navigation}) => {
  return (
    <View style={styles.container}>
      <Title />
      <View style={styles.contentContainer}>
        <View style={styles.bannerContainer}>
          <Image
            source={Quiz_Logo}
            style={styles.banner}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.descriptionText}>
          Challenge yourself with our diverse range of quizzes. 
          Test your knowledge across multiple categories and track your progress.
        </Text>
        <LinearGradient 
          colors={['#2C5F9E', '#1A73E8']} 
          style={styles.startButton}
        >
          <TouchableOpacity 
            onPress={() => navigation.navigate('Quiz')}
            style={styles.buttonTouchable}
            activeOpacity={0.7}
          >
            <Text style={styles.startButtonText}>Start Quiz</Text>
          </TouchableOpacity>
        </LinearGradient>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7FAFC',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  banner: {
    width: width * 0.8,
    height: width * 0.8,
    maxHeight: 400,
    maxWidth: 400,
  },
  bannerContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  descriptionText: {
    textAlign: 'center',
    color: '#2D3748',
    fontSize: 16,
    marginBottom: 30,
    lineHeight: 24,
  },
  startButton: {
    width: '80%',
    paddingVertical: 15,
    borderRadius: 25,
    alignItems: 'center',
    shadowColor: '#1A73E8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  buttonTouchable: {
    width: '100%',
    alignItems: 'center',
  },
  startButtonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
  },
});

export default Home;