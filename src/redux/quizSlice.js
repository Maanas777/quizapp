import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  questions: [
    {
      id: 1,
      question: 'What is the capital of France?',
      options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
      correctAnswer: 2,
    },
    {
      id: 2,
      question: 'Which planet is known as the Red Planet?',
      options: ['Earth', 'Mars', 'Jupiter', 'Venus'],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: 'Who wrote "Romeo and Juliet"?',
      options: ['Mark Twain', 'Charles Dickens', 'William Shakespeare', 'Jane Austen'],
      correctAnswer: 2,
    },
    {
      id: 4,
      question: 'What is the smallest prime number?',
      options: ['0', '1', '2', '3'],
      correctAnswer: 2,
    },
  ],
  currentQuestionIndex: 0,
  score: 0,
  showResults: false,
  answerStatus: null,
};

const quizSlice = createSlice({
  name: 'quiz',
  initialState,
  reducers: {
    answerQuestion: (state, action) => {
      const { questionIndex, answerIndex } = action.payload;
      if (state.questions[questionIndex].correctAnswer === answerIndex) {
        state.score += 1;
        state.answerStatus = 'correct';
      } else {
        state.answerStatus = 'incorrect';
      }
      state.showResults = true;
    },
    nextQuestion: (state) => {
      state.currentQuestionIndex += 1;
      state.showResults = false;
      state.answerStatus = null;
    },
    resetQuiz: (state) => {
      state.currentQuestionIndex = 0;
      state.score = 0;
      state.showResults = false;
      state.answerStatus = null;
    },
  },
});

export const { answerQuestion, nextQuestion, resetQuiz } = quizSlice.actions;
export default quizSlice.reducer;
