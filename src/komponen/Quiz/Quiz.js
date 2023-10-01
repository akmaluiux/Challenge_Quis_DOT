import React, { useState, useEffect } from 'react';
import Results from '../Results/Results';
import "./Quiz.css"

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [timer, setTimer] = useState(30);


  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [wrongAnswers, setWrongAnswers] = useState(0);
  const answeredQuestions = questions.filter((question) => question.userAnswer !== null);
  const [quizFinished, setQuizFinished] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('https://opentdb.com/api.php?amount=10&category=18&difficulty=easy&type=boolean');
        if (!response.ok) {
          throw new Error('Gagal mengambil data soal');
        }

        const data = await response.json();
        // Mengecek jawaban dari user 
        const initializedQuestions = data.results.map((question) => ({
          ...question,
          userAnswer: null,
        }));
        setQuestions(initializedQuestions);
      } catch (error) {
        console.error('Terjadi kesalahan:', error);
      }
    };

    const savedQuizState = localStorage.getItem('quizState');
    if (savedQuizState) {
      const parsedQuizState = JSON.parse(savedQuizState);
      setQuestions(parsedQuizState.questions);
      setCurrentQuestion(parsedQuizState.currentQuestion);
      setTimer(parsedQuizState.timer);
    }

    fetchData();
  }, []);

  useEffect(() => {
    const countdown = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    if (timer === 0) {
      clearInterval(countdown);
      setQuizFinished(true);
      localStorage.removeItem('quizState');
    }else{
      localStorage.setItem('quizState', JSON.stringify({ questions, currentQuestion, timer }));
    }

    return () => {
      clearInterval(countdown);
    };
  }, [timer , currentQuestion, questions]);

  const handleAnswer = (answer) => {
    // Mengambil jawaban yang benar dari soal saat ini
    const correctAnswer = questions[currentQuestion].correct_answer;

    // Memeriksa apakah jawaban yang dipilih oleh pengguna benar atau salah
    const isCorrect = answer === correctAnswer;

    // Update user's answer in the question object
    questions[currentQuestion].userAnswer = answer;
    setQuestions([...questions]); // Update the questions array

    if (isCorrect) {
      setCorrectAnswers((prevCorrectAnswers) => prevCorrectAnswers + 1);
    } else {
      setWrongAnswers((prevWrongAnswers) => prevWrongAnswers + 1);
    }

    if (currentQuestion === questions.length - 1) {
      // If it's the last question, finish the quiz
      setQuizFinished(true);
      setCurrentQuestion(0);
      setTimer(30);
    } else {
      // Lanjut ke kuis selanjutnya
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    }

    localStorage.setItem('quizState', JSON.stringify({ questions, currentQuestion, timer }));
  };

  return (
    <body>
      <h2>Challenge Quiz DOT</h2>
      {quizFinished? (
          <Results
            correctAnswers={correctAnswers}
            wrongAnswers={wrongAnswers}
            totalQuestions={answeredQuestions.length}
          />
      ) : questions.length > 0 ? (
        <div>
          <h3>Question {currentQuestion + 1}/10</h3>
          <p>{questions[currentQuestion].question}</p>
          <button onClick={() => handleAnswer('True')}>True</button>
          <button onClick={() => handleAnswer('False')}>False</button>
          <p>Time left: {timer} seconds</p>
        </div>
      ) : (
        <p>Loading questions...</p>
      )}
    </body>
  );
}

export default Quiz;
