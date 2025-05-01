import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import * as Animatable from 'react-native-animatable';
// 正確的圖片引用
import healthBg from '../assets/health_bg.png';  // 確保這是正確的路徑

const questions = [
  "您最近是否感到關節不適？",
  "是否有膝蓋或腳踝的疼痛？",
  "是否有活動範圍受限的情況？",
  "是否經常覺得關節僵硬？",
  "是否曾因關節問題請過醫生治療？",
  "是否有過任何關節手術？",
  "是否感覺到關節周圍有腫脹現象？",
  "是否在做運動後感覺關節疼痛加劇？",
  "是否有關節部位的紅腫熱現象？",
  "是否曾經摔倒或撞擊造成關節損傷？"
];

function HealthPage() {
  const navigation = useNavigation();
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState([]);
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (answer) => {
    setAnswers([...answers, { question: questions[currentQuestionIndex], answer }]);
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      setShowResults(true); // 顯示結果
    }
  };

  return (
    <ImageBackground source={healthBg} style={styles.healthBackground} resizeMode="cover">
      <ScrollView contentContainerStyle={styles.scrollButtonContainer}>
        <Text style={styles.pageTitle}>關節健康自評</Text>
        {showResults ? (
          <View style={styles.resultContainer}>
            <Text style={styles.resultTitle}>您的自評結果</Text>
            {answers.map((answer, index) => (
              <Text key={index} style={styles.resultText}>
                問題: {answer.question} 回答: {answer.answer}
              </Text>
            ))}
            <TouchableOpacity
              style={styles.backButton}
              onPress={() => navigation.replace('Health')}
            >
              <Text style={styles.backButtonText}>返回健康頁面</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <View style={styles.questionContainer}>
            <Text style={styles.questionText}>{questions[currentQuestionIndex]}</Text>
            <TouchableOpacity
              style={styles.answerButton}
              onPress={() => handleAnswer('是')}
            >
              <Text style={styles.buttonText}>是</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.answerButton}
              onPress={() => handleAnswer('否')}
            >
              <Text style={styles.buttonText}>否</Text>
            </TouchableOpacity>
          </View>
        )}
      </ScrollView>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  healthBackground: {
    flex: 1,
    width: '100%',
  },
  scrollButtonContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 40,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    color: '#333',
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    backgroundColor: '#6C44AF',
    paddingVertical: 12,
    paddingHorizontal: 24,
    marginVertical: 8,
    borderRadius: 8,
    alignItems: 'center',
    width: 200,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  resultContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  resultTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: '#333',
    marginBottom: 20,
  },
  resultText: {
    fontSize: 16,
    color: '#444',
    marginBottom: 10,
  },
  backButton: {
    backgroundColor: '#6C44AF',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  backButtonText: {
    color: '#fff',
    fontSize: 16,
  },
});

export default HealthPage;
