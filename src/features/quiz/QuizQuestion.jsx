import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { answerQuestion } from '../../redux/quizSlice';

const QuizQuestion = () => {
  const dispatch = useDispatch();
  const currentQuestionIndex = useSelector((state) => state.quiz.currentQuestionIndex);
  const question = useSelector((state) => state.quiz.questions[currentQuestionIndex]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [timeLeft, setTimeLeft] = useState(5); 

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      dispatch(answerQuestion({ questionIndex: currentQuestionIndex, answerIndex: selectedAnswer }));
    }
  }, [timeLeft, dispatch, currentQuestionIndex, selectedAnswer]);

  const handleAnswer = (index) => {
    if (selectedAnswer !== null) {
      return; 
    }

    setSelectedAnswer(index);

    
    setTimeout(() => {
      dispatch(answerQuestion({ questionIndex: currentQuestionIndex, answerIndex: index }));
    }, 1000); 
  };

  return (
    <div className="p-6 bg-gradient-to-r from-teal-400 to-blue-600 rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-white">{question.question}</h2>
        <div className="w-16 h-16 rounded-full border-4 border-white flex items-center justify-center text-white text-lg font-bold">
          {timeLeft}s
        </div>
      </div>
      <ul className="space-y-2">
        {question.options.map((option, index) => (
          <li key={index}>
            <button
              className={`w-full px-4 py-2 text-left rounded bg-white text-gray-800 hover:bg-blue-100`}
              onClick={() => handleAnswer(index)}
              disabled={selectedAnswer !== null} 
            >
              {option}
            </button>
          </li>
        ))}
      </ul>
      {selectedAnswer !== null && (
        <div className="mt-4">
          <p className="text-lg text-white">
            Please wait while we check your answer...
          </p>
        </div>
      )}
    </div>
  );
};

export default QuizQuestion;
