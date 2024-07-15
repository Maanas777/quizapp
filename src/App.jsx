import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { nextQuestion, resetQuiz } from './redux/quizSlice';
import QuizQuestion from './features/quiz/QuizQuestion';


const App = () => {
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const showResults = useSelector((state) => state.quiz.showResults);
  const score = useSelector((state) => state.quiz.score);
  const questions = useSelector((state) => state.quiz.questions);
  const [quizStarted, setQuizStarted] = useState(false); 
  const [timeLeft, setTimeLeft] = useState(5); 

  const handleStartQuiz = () => {
    setQuizStarted(true); 
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      dispatch(nextQuestion());
      setTimeLeft(5);
    }
  };

  const handleResetQuiz = () => {
    dispatch(resetQuiz());
    setQuizStarted(false); 
    setTimeLeft(5); 
  };

  useEffect(() => {
    if (showResults && currentQuestionIndex < questions.length - 1) {
      const timer = setTimeout(() => {
        handleNextQuestion();
      }, 5000); // 5 seconds timer

      return () => clearTimeout(timer);
    }
  }, [showResults, currentQuestionIndex, questions.length]);

  useEffect(() => {
    if (showResults && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, showResults]);

  return (
    <div
      className="flex items-center justify-center min-h-screen"
      style={{
        backgroundImage: `url('https://static.vecteezy.com/ti/gratis-vector/p1/6895963-neon-quiz-spel-sjabloon-vier-opties-antwoorden-voor-kennis-examen-in-school-tv-showillustratie-10-eps-vector.jpg')`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="w-full max-w-4xl h-[80vh] p-8 bg-white rounded-lg shadow-lg flex flex-col justify-center backdrop-filter backdrop-blur-lg bg-opacity-40">
        <h1 className="text-4xl font-bold text-center text-purple-950 mb-8">Quiz</h1>
        {!quizStarted ? (
          <div className="text-center text-purple-900">
            <h2 className="text-4xl font-bold mb-6">Welcome to the Quiz</h2>
            <p className="text-xl mb-8">Click the button below to start the quiz!</p>
            <button
              className="px-6 py-3 text-white bg-purple-700 rounded transition-all duration-300 hover:bg-purple-800"
              onClick={handleStartQuiz}
            >
              Start Quiz
            </button>
          </div>
        ) : showResults ? (
          <div className="text-center text-purple-900">
            <h2 className="text-4xl font-bold mb-6">Results</h2>
            <p className="mb-6 text-2xl font-">Score: {score}/{questions.length}</p>
            {currentQuestionIndex < questions.length - 1 ? (
              <div>
                <p className="text-xl mb-4 font-extrabold ">Moving to the next question in {timeLeft} seconds...</p>
                <button
                  className="px-6 py-3 text-white bg-purple-700 rounded transition-all duration-300 hover:bg-purple-800"
                  onClick={handleNextQuestion}
                >
                  Next Question
                </button>
              </div>
            ) : (
              <button
                className="px-6 py-3 text-white bg-green-500 rounded transition-all duration-300 hover:bg-green-600"
                onClick={handleResetQuiz}
              >
                Play Again
              </button>
            )}
          </div>
        ) : (
          <QuizQuestion />
        )}
      </div>
    </div>
  );
};

export default App;
